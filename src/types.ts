export type PetStatus = 'lost' | 'found' | 'reunited';
export type PetSpecies = 'dog' | 'cat' | 'bird' | 'other';

export interface PetReport {
  id: string;
  petName: string;
  status: PetStatus;
  type: PetSpecies;
  breed: string;
  color: string;
  distinctiveFeatures: string;
  location: string;
  area: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  lastSeenDate: string;
  photoUrl: string;
  contactName: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactNotes?: string;
  reward?: string;
  active: boolean;
  createdAt: number;
  resolved?: boolean;
  resolvedDate?: string;
  syncSource?: 'cloud' | 'local';
}

export interface FirebaseCustomConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FilterOptions {
  search: string;
  status: PetStatus | 'all';
  species: PetSpecies | 'all';
  area: string;
}
