interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="logo" aria-label="IndraAstra">
      <div className="logo-symbol" aria-hidden="true">
        IA
      </div>
      {!compact && <span className="logo-text">IndraAstra</span>}
    </div>
  );
}

