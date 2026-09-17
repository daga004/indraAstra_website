import { ContactForm } from '../components/ContactForm';
import { FallbackNotice, LoadingState } from '../components/LoadingState';
import { useAsyncResource } from '../hooks/useAsyncResource';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getContactContent } from '../services/contentService';

export function ContactPage() {
  const { data: result, loading } = useAsyncResource(getContactContent);
  usePageMetadata('Contact | IndraAstra', 'Contact IndraAstra about AI performance engineering: lower cost, faster inference, and more reliable results.');

  if (loading || !result) {
    return (
      <section className="contact-page">
        <LoadingState label="Loading contact details" />
      </section>
    );
  }

  const content = result.data;

  return (
    <section className="contact-page">
      <div className="contact-grid">
        <div className="contact-info-panel">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-label">{content.eyebrow || '05 / Connect'}</div>
            <h2>{content.title}</h2>
            <p>{content.lead}</p>
          </div>

          <div className="contact-badge-box">
            <div className="contact-badge-item">
              <span className="contact-badge-label">{content.locationLabel || 'Location'}</span>
              <span className="contact-badge-value">{content.location}</span>
            </div>
            <div className="contact-badge-item">
              <span className="contact-badge-label">Focus</span>
              <span className="contact-badge-value">AI Performance Engineering</span>
            </div>
            <div className="contact-badge-item">
              <span className="contact-badge-label">Inquiries</span>
              <span className="contact-badge-value">Inference Optimization, Compound Systems</span>
            </div>
          </div>

          {result.warning && <FallbackNotice message={result.warning} />}
        </div>

        <div className="contact-card">
          <h3>Send an inquiry</h3>
          <p className="contact-card-sub">Tell us what needs to perform better.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
