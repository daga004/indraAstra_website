import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Vite always provides import.meta.env. The defensive fallback keeps the isolated
// local preview build usable when it is bundled outside Vite for QA.
const runtimeEnv: Record<string, string | undefined> =
  typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

const firebaseConfig: FirebaseClientConfig = {
  apiKey: runtimeEnv.VITE_FIREBASE_API_KEY ?? '',
  authDomain: runtimeEnv.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: runtimeEnv.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: runtimeEnv.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: runtimeEnv.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: runtimeEnv.VITE_FIREBASE_APP_ID ?? '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

const app: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;
