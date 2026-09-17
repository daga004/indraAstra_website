import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';
import {
  fallbackContactContent,
  fallbackHomeContent,
  fallbackSiteSettings,
} from '../data/fallbackContent';
import type {
  ContactPageContent,
  ContentResult,
  HomeContent,
  SiteSettings,
} from '../types/content';

const localFallbackMessage = 'Previewing local fallback content because Firebase is not configured.';
const unavailableMessage = 'Previewing local fallback content because Firebase content could not be loaded.';

function normaliseObject<T extends object>(fallback: T, value: unknown): T {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback;
  return { ...fallback, ...value } as T;
}

async function fetchContentDocument<T extends object>(
  documentId: 'home' | 'contact' | 'settings',
  fallback: T,
): Promise<ContentResult<T>> {
  if (!isFirebaseConfigured || !db) {
    return { data: fallback, source: 'local', warning: localFallbackMessage };
  }

  try {
    const snapshot = await getDoc(doc(db, 'siteContent', documentId));
    if (!snapshot.exists()) {
      return { data: fallback, source: 'local', warning: unavailableMessage };
    }
    return { data: normaliseObject(fallback, snapshot.data()), source: 'firebase' };
  } catch {
    return { data: fallback, source: 'local', warning: unavailableMessage };
  }
}

export const getHomeContent = () =>
  fetchContentDocument<HomeContent>('home', fallbackHomeContent);

export const getContactContent = () =>
  fetchContentDocument<ContactPageContent>('contact', fallbackContactContent);

export const getSiteSettings = () =>
  fetchContentDocument<SiteSettings>('settings', fallbackSiteSettings);
