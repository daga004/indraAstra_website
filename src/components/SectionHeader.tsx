interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  alignment?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, lead, alignment = 'left' }: SectionHeaderProps) {
  return (
    <div className={`section-header ${alignment === 'center' ? 'text-center' : ''}`}>
      {eyebrow && <div className="section-label">{eyebrow}</div>}
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}
