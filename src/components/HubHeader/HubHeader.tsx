import { useState } from 'react';
import { Icon } from '../Icon';
import { useNavigate } from 'react-router-dom';

export interface HubMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  sparkData?: number[];
  ringPercent?: number;
  linkTo?: string;
}

export interface HubInsight {
  text: string;
  icon?: string;
}

export interface HubHeaderProps {
  product: string;
  metrics: HubMetric[];
  insights: HubInsight[];
}

function Sparkline({ data }: { data: number[] }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline
        points={pts}
        fill="none"
        stroke="var(--color-primary-medium)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RingMetric({ percent }: { percent: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={54} height={54} viewBox="0 0 54 54">
      <circle cx={27} cy={27} r={r} fill="none" stroke="var(--border-neutral-x-weak)" strokeWidth={5} />
      <circle
        cx={27} cy={27} r={r} fill="none"
        stroke="var(--color-primary-medium)"
        strokeWidth={5}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 27 27)"
      />
      <text x={27} y={31} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--text-neutral-xx-strong)">{percent}%</text>
    </svg>
  );
}

export function HubHeader({ product, metrics, insights }: HubHeaderProps) {
  const navigate = useNavigate();
  const [askValue, setAskValue] = useState('');

  const handleAsk = () => {
    if (askValue.trim()) {
      localStorage.setItem('bhr-chat-panel-open', 'true');
      window.dispatchEvent(new Event('storage'));
      setAskValue('');
    }
  };

  return (
    <div
      className="mx-6 mt-6 mb-4 rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)]"
      style={{ background: 'var(--surface-neutral-white)' }}
    >
      {/* Metrics Strip */}
      <div className="flex gap-0 border-b border-[var(--border-neutral-xx-weak)]">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`flex-1 px-5 py-4 ${i < metrics.length - 1 ? 'border-r border-[var(--border-neutral-xx-weak)]' : ''} ${m.linkTo ? 'cursor-pointer hover:bg-[var(--surface-neutral-xx-weak)] transition-colors' : ''} rounded-tl-[var(--radius-large)] first:rounded-tl-[var(--radius-large)]`}
            onClick={m.linkTo ? () => navigate(m.linkTo!) : undefined}
          >
            <div className="text-xs text-[var(--text-neutral-medium)] font-medium mb-1 uppercase tracking-wide">{m.label}</div>
            <div className="flex items-end gap-3">
              {m.ringPercent !== undefined ? (
                <RingMetric percent={m.ringPercent} />
              ) : (
                <>
                  <span className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] leading-none">{m.value}</span>
                  {m.sparkData && <Sparkline data={m.sparkData} />}
                  {m.trend && (
                    <span className={`text-xs font-medium flex items-center gap-0.5 mb-0.5 ${m.trend === 'up' ? 'text-emerald-600' : m.trend === 'down' ? 'text-red-500' : 'text-[var(--text-neutral-medium)]'}`}>
                      {m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'}
                      {m.trendValue}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Insights + Ask row */}
      <div className="flex gap-0">
        {/* Insights */}
        <div className="flex-1 flex flex-wrap gap-2 px-5 py-3 border-r border-[var(--border-neutral-xx-weak)]">
          <span className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide self-center mr-1">AI Insights</span>
          {insights.map((ins, i) => (
            <button
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors"
              style={{ background: 'var(--surface-neutral-xx-weak)', color: 'var(--text-neutral-x-strong)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-neutral-x-weak)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface-neutral-xx-weak)')}
              onClick={() => { localStorage.setItem('bhr-chat-panel-open', 'true'); window.dispatchEvent(new Event('storage')); }}
            >
              <Icon name="sparkles" size={11} className="text-[var(--color-primary-strong)] shrink-0" />
              <span>{ins.text}</span>
            </button>
          ))}
        </div>

        {/* Ask input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-[280px]">
          <div className="relative flex-1">
            <input
              type="text"
              value={askValue}
              onChange={e => setAskValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
              placeholder={`Ask about ${product}...`}
              className="w-full pl-3 pr-8 py-2 text-sm rounded-[var(--radius-xx-small)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-weak)] focus:outline-none focus:border-[var(--color-primary-medium)] transition-colors"
            />
            <button
              onClick={handleAsk}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-primary-medium)] hover:text-[var(--color-primary-strong)] transition-colors"
            >
              <Icon name="paper-plane" size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HubHeader;
