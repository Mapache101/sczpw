import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
  Firestore
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage
} from 'firebase/storage';
import { PetReport, FirebaseCustomConfig } from '../types.ts';
import { getStoredReports, saveReportLocally, updateReportLocally, getStoredFirebaseConfig } from './storage.ts';

// Default configuration from project or environment
export const DEFAULT_FIREBASE_CONFIG: FirebaseCustomConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDuSlnvRYik3gctcKpaA_B5q8bMKdQgxVQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pet-watch-7d8b0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pet-watch-7d8b0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pet-watch-7d8b0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "862266741136",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:862266741136:web:4474be628228f8985ee315"
};

let currentApp: FirebaseApp | null = null;
let currentDb: Firestore | null = null;
let currentStorage: FirebaseStorage | null = null;

export function getActiveFirebaseConfig(): FirebaseCustomConfig {
  const custom = getStoredFirebaseConfig();
  return custom || DEFAULT_FIREBASE_CONFIG;
}

export function initFirebase(customConfig?: FirebaseCustomConfig) {
  try {
    const config = customConfig || getActiveFirebaseConfig();
    if (getApps().length > 0) {
      currentApp = getApp();
    } else {
      currentApp = initializeApp(config);
    }
    currentDb = getFirestore(currentApp);
    currentStorage = getStorage(currentApp);
    return { app: currentApp, db: currentDb, storage: currentStorage };
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
    return { app: null, db: null, storage: null };
  }
}

// Initial attempt
initFirebase();

export interface SaveReportResult {
  report: PetReport;
  source: 'cloud' | 'local';
  warningMessage?: string;
}

import { uploadToCloudinary } from './cloudinary.ts';

/**
 * Uploads pet photo via Cloudinary (no credit card required)
 * with automatic fallback to data URL
 */
export async function uploadPetPhoto(file: File, fallbackDataUrl: string): Promise<{ url: string; uploadedToCloud: boolean; warning?: string }> {
  try {
    const cloudRes = await uploadToCloudinary(file, fallbackDataUrl);
    return cloudRes;
  } catch (err: unknown) {
    console.warn('Cloudinary upload error, using local photo:', err);
    return { url: fallbackDataUrl, uploadedToCloud: false, warning: 'Photo saved locally in high quality.' };
  }
}

/**
 * Saves report to Firestore with automatic local storage fallback
 */
export async function savePetReport(
  reportData: Omit<PetReport, 'id' | 'createdAt' | 'syncSource'>,
  imageFile?: File,
  dataUrl?: string
): Promise<SaveReportResult> {
  let photoUrl = reportData.photoUrl;
  let photoWarning: string | undefined;

  // If a device photo was selected
  if (imageFile && dataUrl) {
    const uploadRes = await uploadPetPhoto(imageFile, dataUrl);
    photoUrl = uploadRes.url;
    photoWarning = uploadRes.warning;
  }

  const newReport: PetReport = {
    ...reportData,
    id: `pet-${Date.now()}`,
    photoUrl: photoUrl || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    createdAt: Date.now(),
    syncSource: 'local'
  };

  try {
    if (!currentDb) {
      initFirebase();
    }

    if (!currentDb) {
      throw new Error('Firestore not initialized');
    }

    // Attempt save in Firestore collection 'petReports'
    const docRef = await addDoc(collection(currentDb, 'petReports'), {
      petName: newReport.petName,
      status: newReport.status,
      type: newReport.type,
      breed: newReport.breed,
      color: newReport.color,
      distinctiveFeatures: newReport.distinctiveFeatures,
      location: newReport.location,
      area: newReport.area,
      coordinates: newReport.coordinates || { lat: -17.7833, lng: -63.1821 },
      lastSeenDate: newReport.lastSeenDate,
      photoUrl: newReport.photoUrl,
      contactName: newReport.contactName,
      contactPhone: newReport.contactPhone,
      contactWhatsapp: newReport.contactWhatsapp,
      contactNotes: newReport.contactNotes || '',
      reward: newReport.reward || '',
      active: true,
      resolved: false,
      createdAtServer: serverTimestamp(),
      createdAtClient: newReport.createdAt
    });

    const cloudReport: PetReport = {
      ...newReport,
      id: docRef.id,
      syncSource: 'cloud'
    };

    // Cache locally as well for offline resilience
    saveReportLocally(cloudReport);

    return {
      report: cloudReport,
      source: 'cloud',
      warningMessage: photoWarning
    };
  } catch (err: unknown) {
    const errorObj = err as { code?: string; message?: string };
    console.warn('Firestore write notice (saving locally):', errorObj);

    // Save locally so no report is EVER lost
    saveReportLocally(newReport);

    let warningMessage = 'Report saved in browser storage.';
    if (errorObj?.code === 'permission-denied') {
      warningMessage = 'Firebase security rules denied write (permission-denied). Report saved safely in local storage!';
    } else if (errorObj?.message?.includes('network') || errorObj?.message?.includes('offline')) {
      warningMessage = 'Network unavailable. Report saved locally and will be accessible anytime.';
    }

    if (photoWarning) {
      warningMessage += ` ${photoWarning}`;
    }

    return {
      report: newReport,
      source: 'local',
      warningMessage
    };
  }
}

/**
 * Fetches reports from Firestore and merges with local reports
 */
export async function fetchPetReports(): Promise<{ reports: PetReport[]; source: 'cloud' | 'local'; error?: string }> {
  const localReports = getStoredReports();

  try {
    if (!currentDb) {
      initFirebase();
    }
    if (!currentDb) {
      return { reports: localReports, source: 'local' };
    }

    const q = query(collection(currentDb, 'petReports'), orderBy('createdAtClient', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Cloud database has no records yet; use local reports
      return { reports: localReports, source: 'local' };
    }

    const cloudReports: PetReport[] = [];
    snapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      cloudReports.push({
        id: docSnapshot.id,
        petName: data.petName || 'Sin Nombre',
        status: data.status || 'lost',
        type: data.type || 'dog',
        breed: data.breed || '',
        color: data.color || '',
        distinctiveFeatures: data.distinctiveFeatures || '',
        location: data.location || '',
        area: data.area || 'Santa Cruz',
        coordinates: data.coordinates || { lat: -17.7833, lng: -63.1821 },
        lastSeenDate: data.lastSeenDate || new Date().toISOString().slice(0, 10),
        photoUrl: data.photoUrl || '',
        contactName: data.contactName || '',
        contactPhone: data.contactPhone || '',
        contactWhatsapp: data.contactWhatsapp || '',
        contactNotes: data.contactNotes || '',
        reward: data.reward || '',
        active: data.active !== false,
        resolved: data.resolved === true || data.status === 'reunited',
        createdAt: data.createdAtClient || Date.now(),
        syncSource: 'cloud'
      });
    });

    // Merge with any local reports created offline that might not be in cloud yet
    const cloudIds = new Set(cloudReports.map(r => r.id));
    const merged = [
      ...localReports.filter(r => !cloudIds.has(r.id) && r.id.startsWith('pet-')),
      ...cloudReports
    ];

    return { reports: merged, source: 'cloud' };
  } catch (err: unknown) {
    const errorObj = err as { code?: string; message?: string };
    console.warn('Firestore fetch notice (using local reports):', errorObj);
    return {
      reports: localReports,
      source: 'local',
      error: errorObj?.code === 'permission-denied'
        ? 'Firestore read denied (permission-denied). Displaying local reports.'
        : 'Firebase cloud connection unavailable. Displaying local reports.'
    };
  }
}

/**
 * Updates pet report status (e.g. marking as reunited)
 */
export async function updatePetReportStatus(
  id: string,
  newStatus: 'lost' | 'found' | 'reunited'
): Promise<PetReport[]> {
  // Update local storage immediately for fast UI response
  const updatedLocal = updateReportLocally(id, {
    status: newStatus,
    resolved: newStatus === 'reunited',
    resolvedDate: newStatus === 'reunited' ? new Date().toISOString().slice(0, 10) : undefined,
    active: newStatus !== 'reunited'
  });

  // Attempt cloud update if document id is from Firestore
  try {
    if (currentDb && !id.startsWith('pet-') && !id.startsWith('sc-pet-')) {
      const docRef = doc(currentDb, 'petReports', id);
      await updateDoc(docRef, {
        status: newStatus,
        resolved: newStatus === 'reunited',
        resolvedDate: newStatus === 'reunited' ? new Date().toISOString().slice(0, 10) : null,
        active: newStatus !== 'reunited'
      });
    }
  } catch (err) {
    console.warn('Notice updating report status in Firestore:', err);
  }

  return updatedLocal;
}
