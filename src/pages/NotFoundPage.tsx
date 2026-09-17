import { ButtonLink } from '../components/Buttons';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function NotFoundPage() {
  usePageMetadata('Page not found | IndraAstra', 'The requested IndraAstra page could not be found.');
  return (
    <section className="not-found container">
      <p className="eyebrow">404</p>
      <h1>This page is outside the research boundary.</h1>
      <p>Return to the IndraAstra home page to continue.</p>
      <ButtonLink to="/">Go home</ButtonLink>
    </section>
  );
}
