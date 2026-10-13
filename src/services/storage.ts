import { PetReport } from '../types.ts';
import { INITIAL_PET_REPORTS } from '../data/seedData.ts';

const LOCAL_STORAGE_KEY = 'sc_pet_watch_reports_v2';
const FIREBASE_CONFIG_KEY = 'sc_pet_watch_firebase_config_v2';

export const getStoredReports = (): PetReport[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // First run: save seed reports so the app has vibrant initial community data
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PET_REPORTS));
      return INITIAL_PET_REPORTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PET_REPORTS;
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
    return INITIAL_PET_REPORTS;
  }
};

export const saveReportLocally = (report: PetReport): void => {
  try {
    const existing = getStoredReports();
    // Prepend new report
    const updated = [report, ...existing.filter(r => r.id !== report.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

export const updateReportLocally = (id: string, updates: Partial<PetReport>): PetReport[] => {
  try {
    const existing = getStoredReports();
    const updated = existing.map(r => {
      if (r.id === id) {
        return { ...r, ...updates };
      }
      return r;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update local report:', err);
    return getStoredReports();
  }
};

export const deleteReportLocally = (id: string): PetReport[] => {
  try {
    const existing = getStoredReports();
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete report:', err);
    return getStoredReports();
  }
};

export const getStoredFirebaseConfig = () => {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveStoredFirebaseConfig = (config: Record<string, string>) => {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save firebase config:', err);
  }
};

export const exportReportsAsJSON = (): void => {
  const reports = getStoredReports();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `santa-cruz-pet-watch-reports-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
