interface ContentBlockProps {
  label?: string;
  height?: number;
  variant?: 'default' | 'white';
}

export function ContentBlock({ label, height = 200, variant = 'default' }: ContentBlockProps) {
  return (
    <div
      className={`rounded-lg flex items-center justify-center ${
        variant === 'white'
          ? 'bg-white border border-[var(--border-neutral-xx-weak)]'
          : 'bg-[var(--border-neutral-xx-weak)]'
      }`}
      style={{ height }}
    >
      {label && (
        <span className="text-sm text-[var(--text-neutral-weak)]">{label}</span>
      )}
    </div>
  );
}

export default ContentBlock;
