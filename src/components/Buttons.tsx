import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function ButtonLink({ to, children, variant = 'primary', className = '' }: ButtonLinkProps) {
  const buttonClass = variant === 'secondary' ? 'secondary-button' : 'primary-button';
  return (
    <Link className={`${buttonClass} ${className}`.trim()} to={to}>
      {children}
    </Link>
  );
}
