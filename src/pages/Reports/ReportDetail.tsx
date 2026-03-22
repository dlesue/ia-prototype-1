import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';

export default function ReportDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const title = decodeURIComponent(name || 'Report');

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1"
      >
        <Icon name="chevron-left" size={10} />
        Back
      </button>
      <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
        <Link to="/reports" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Reports</Link>
        <Icon name="chevron-right" size={8} />
        <span>{title}</span>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">{title}</h1>

      {/* Toolbar row: filters + export */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-32 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-8 w-28 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-8 w-24 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-8 w-20 rounded-lg bg-[var(--border-neutral-xx-weak)]" />
        </div>
      </div>

      {/* Summary cards row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)] mb-2" />
            <div className="h-5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] p-6 mb-6">
        {/* Chart header */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-3 w-32 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[3px] rounded-full bg-black/[0.15]" />
              <div className="h-2 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-[3px] rounded-full bg-black/[0.08]" />
              <div className="h-2 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
          </div>
        </div>
        {/* Y-axis + bars/lines area */}
        <div className="flex gap-3">
          <div className="flex flex-col justify-between py-1 shrink-0">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-2 w-6 rounded bg-[var(--border-neutral-xx-weak)]" />
            ))}
          </div>
          <div className="flex-1 flex items-end gap-3 border-b border-l border-[var(--border-neutral-xx-weak)] pl-2 pb-2" style={{ height: 180 }}>
            {[65, 45, 80, 55, 90, 70, 50, 85, 60, 75, 40, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-[2px] justify-end h-full">
                <div className="w-full rounded-t bg-black/[0.08]" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
        </div>
        {/* X-axis labels */}
        <div className="flex gap-3 ml-9 mt-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div className="h-2 w-6 rounded bg-[var(--border-neutral-xx-weak)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Data table */}
      <div className="bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-6 px-5 py-3 border-b border-[var(--border-neutral-xx-weak)] bg-[var(--surface-neutral-xx-weak)]">
          <div className="h-2.5 w-32 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-24 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-20 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
          <div className="flex-1" />
          <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
        </div>
        {/* Table rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="flex items-center gap-6 px-5 py-3.5 border-b border-[var(--border-neutral-xx-weak)] last:border-b-0">
            <div className="h-2.5 rounded bg-[var(--border-neutral-xx-weak)]" style={{ width: `${100 + (i * 17) % 60}px` }} />
            <div className="h-2.5 w-14 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 rounded bg-[var(--border-neutral-xx-weak)]" style={{ width: `${70 + (i * 23) % 50}px` }} />
            <div className="h-2.5 w-16 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="h-2.5 w-12 rounded bg-[var(--border-neutral-xx-weak)]" />
            <div className="flex-1" />
            <div className="h-2.5 w-12 rounded bg-[var(--border-neutral-xx-weak)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
