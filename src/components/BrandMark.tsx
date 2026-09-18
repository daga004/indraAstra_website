interface BrandMarkProps {
  compact?: boolean;
  variant?: 'mark' | 'full';
}

export function BrandMark({ compact = false, variant = 'mark' }: BrandMarkProps) {
  if (variant === 'full') {
    return (
      <div className="logo logo--full" aria-label="IndraAstra">
        <img
          src="/logo-dark.png"
          alt="IndraAstra - Faster and Smarter"
          className="logo-full-img"
          width={185}
        />
      </div>
    );
  }

  return (
    <div className="logo" aria-label="IndraAstra">
      <img
        src="/logo-mark.png"
        alt="IndraAstra"
        className="logo-symbol-img"
        width={40}
        height={40}
      />
      {!compact && <span className="logo-text">IndraAstra</span>}
    </div>
  );
}

