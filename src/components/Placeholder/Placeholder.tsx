/**
 * Placeholder boxes representing existing product content.
 * Used to de-emphasize page body so viewers focus on the new
 * nav / hub-header / Ask patterns.
 */

interface PlaceholderProps {
  /** Preset layout of placeholder boxes */
  variant?: 'default' | 'two-column' | 'table' | 'form';
}

export function Placeholder({ variant = 'default' }: PlaceholderProps) {
  const box = 'rounded-xl bg-[var(--border-neutral-xx-weak)]';

  if (variant === 'two-column') {
    return (
      <div className="space-y-4">
        <div className={`${box} h-10 w-1/3`} />
        <div className="grid grid-cols-2 gap-4">
          <div className={`${box} h-52`} />
          <div className={`${box} h-52`} />
        </div>
        <div className={`${box} h-36`} />
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`${box} h-9 w-48`} />
          <div className={`${box} h-9 w-32`} />
          <div className="flex-1" />
          <div className={`${box} h-9 w-36`} />
        </div>
        <div className={`${box} h-72`} />
      </div>
    );
  }

  if (variant === 'form') {
    return (
      <div className="space-y-4">
        <div className={`${box} h-10 w-2/5`} />
        <div className={`${box} h-44`} />
        <div className={`${box} h-44`} />
        <div className={`${box} h-28`} />
      </div>
    );
  }

  // default
  return (
    <div className="space-y-4">
      <div className={`${box} h-10 w-1/3`} />
      <div className={`${box} h-48`} />
      <div className={`${box} h-36`} />
      <div className={`${box} h-24`} />
    </div>
  );
}

export default Placeholder;
