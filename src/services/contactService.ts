import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';
import type { ContactSubmissionInput } from '../types/content';

export async function submitContactForm(values: ContactSubmissionInput): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Contact submissions are not configured yet. Add Firebase settings to enable this form.');
  }

  await addDoc(collection(db, 'contactSubmissions'), {
    ...values,
    createdAt: serverTimestamp(),
    status: 'new',
  });
}
