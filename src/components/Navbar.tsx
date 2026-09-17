import { useEffect, useId, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BrandMark } from './BrandMark';

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/team', label: 'Team' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <header>
      <NavLink to="/" aria-label="IndraAstra home" style={{ textDecoration: 'none' }}>
        <BrandMark />
      </NavLink>
      <nav className={isOpen ? 'active' : ''} id={menuId} aria-label="Primary navigation">
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/team"
        >
          Team
        </NavLink>
        <NavLink className="nav-button" to="/contact">
          Contact
        </NavLink>
      </nav>
      <button
        className="hamburger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
    </header>
  );
}
