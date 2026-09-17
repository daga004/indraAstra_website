import { useState, type ChangeEvent, type FormEvent } from 'react';
import { submitContactForm } from '../services/contactService';
import type { ContactSubmissionInput } from '../types/content';

type FieldName = keyof ContactSubmissionInput;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialValues: ContactSubmissionInput = {
  name: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactSubmissionInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactSubmissionInput>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as FieldName;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus('idle');
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');
    try {
      await submitContactForm({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        organization: values.organization.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setValues(initialValues);
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <div className="form-error" role="alert">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <div className="form-error" role="alert">{errors.email}</div>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-org">
            Organization <span>Optional</span>
          </label>
          <input
            id="contact-org"
            name="organization"
            type="text"
            value={values.organization}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
          />
          {errors.subject && <div className="form-error" role="alert">{errors.subject}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
        />
        {errors.message && <div className="form-error" role="alert">{errors.message}</div>}
      </div>

      {status === 'success' && (
        <div className="form-status form-status--success" role="status">
          Thank you. Your inquiry has been received.
        </div>
      )}
      {status === 'error' && (
        <div className="form-status form-status--error" role="alert">
          {errorMessage}
        </div>
      )}

      <button className="primary-button" type="submit" disabled={status === 'loading'} style={{ width: '100%' }}>
        {status === 'loading' ? 'Sending inquiry…' : 'Send inquiry'}
      </button>
    </form>
  );
}
