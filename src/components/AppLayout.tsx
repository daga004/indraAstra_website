import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function AppLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
