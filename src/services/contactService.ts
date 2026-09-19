import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';
import type { ContactSubmissionInput } from '../types/content';

export const NOTIFICATION_RECIPIENTS = [
  'eswar@indraastra.in',
  'dhiraj.daga@indraastra.in',
] as const;

/**
 * Dispatches automated email notification with contact inquiry details
 * to designated company email addresses.
 */
async function dispatchEmailNotification(values: ContactSubmissionInput): Promise<void> {
  const webhookUrl = (import.meta.env.VITE_CONTACT_WEBHOOK_URL as string | undefined)?.trim();

  const promises: Promise<unknown>[] = [];

  // 1. Custom Webhook (Google Apps Script under common@indraastra.in or custom serverless relay)
  if (webhookUrl) {
    promises.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          recipients: NOTIFICATION_RECIPIENTS,
          submittedAt: new Date().toISOString(),
        }),
      }).catch((err) => {
        console.warn('Custom contact webhook dispatch failed:', err);
      })
    );
  }

  // 2. Direct transactional mail delivery forwarding to both recipients
  promises.push(
    fetch('https://formsubmit.co/ajax/eswar@indraastra.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[IndraAstra Inquiry] ${values.subject}`,
        _cc: 'dhiraj.daga@indraastra.in',
        _replyto: values.email,
        _template: 'table',
        name: values.name,
        email: values.email,
        organization: values.organization || 'Not specified',
        subject: values.subject,
        message: values.message,
      }),
    }).catch((err) => {
      console.warn('Direct mail dispatch failed:', err);
    })
  );

  await Promise.allSettled(promises);
}

export async function submitContactForm(values: ContactSubmissionInput): Promise<void> {
  // If Firebase is configured, persist the inquiry in Firestore
  if (isFirebaseConfigured && db) {
    await addDoc(collection(db, 'contactSubmissions'), {
      ...values,
      createdAt: serverTimestamp(),
      status: 'new',
    });

    // If Firebase "Trigger Email" extension is active, enqueue to mail collection
    try {
      await addDoc(collection(db, 'mail'), {
        to: [...NOTIFICATION_RECIPIENTS],
        message: {
          subject: `[IndraAstra Inquiry] ${values.subject}`,
          text: `New inquiry received from ${values.name} (${values.email}):\n\nOrganization: ${values.organization || 'N/A'}\nSubject: ${values.subject}\n\nMessage:\n${values.message}`,
          html: `<h3>New Inquiry from ${values.name}</h3><p><strong>Email:</strong> ${values.email}</p><p><strong>Organization:</strong> ${values.organization || 'N/A'}</p><p><strong>Subject:</strong> ${values.subject}</p><p><strong>Message:</strong></p><blockquote>${values.message.replace(/\n/g, '<br/>')}</blockquote>`,
        },
        createdAt: serverTimestamp(),
      });
    } catch {
      // Non-blocking if mail collection is not used or unindexed
    }
  }

  // Dispatch email notifications to eswar@indraastra.in and dhiraj.daga@indraastra.in
  await dispatchEmailNotification(values);
}
