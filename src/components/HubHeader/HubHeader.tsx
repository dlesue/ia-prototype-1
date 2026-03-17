import { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScenario } from '../../contexts/ScenarioContext';

const METRICS_KEY = 'bhr-show-metrics';
const ASK_KEY = 'bhr-show-ask';
const INSIGHTS_KEY = 'bhr-show-insights';
const AUTOMATIONS_KEY = 'bhr-show-automations';
const ASK_POSITION_KEY = 'bhr-ask-position';

export interface HubMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  sparkData?: number[];
  ringPercent?: number;
  linkTo?: string;
  reportLabel?: string;
  icon?: string;
  vizType?: 'spark' | 'bar' | 'progress' | 'dot';
  progressPercent?: number;
  dotValue?: number;
  dotMax?: number;
}

export interface HubInsight {
  text: string;
  shortText?: string;
  icon?: string;
  response?: string;
}

export interface AutomationField {
  label: string;
  options: string[];
}

export interface HubAutomation {
  text: string;
  shortText?: string;
  response?: string;
  fields?: AutomationField[];
}

export interface HubHeaderProps {
  title: string;
  subtitle?: string;
  product: string;
  metrics: HubMetric[];
  insights: HubInsight[];
  automations?: HubAutomation[];
  reportsPath?: string;
}

/* ─── Mini viz ─── */

function MiniSparkline({ data, color = '#6366f1' }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;
  const w = 44, h = 18, pad = 1;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: pad + (1 - (v - min) / range) * (h - pad * 2),
  }));
  const line = pts.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${pts[0].x},${h} ${line} ${pts[pts.length - 1].x},${h}`;
  const gId = `ms-${color.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg width={w} height={h} className="shrink-0">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gId})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniBarChart({ data, color = '#6366f1' }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null;
  const w = 44, h = 18, max = Math.max(...data);
  const barW = Math.max(3, (w - (data.length - 1) * 2) / data.length), gap = 2;
  return (
    <svg width={w} height={h} className="shrink-0">
      {data.map((v, i) => {
        const barH = Math.max(2, (v / (max || 1)) * (h - 2));
        return <rect key={i} x={i * (barW + gap)} y={h - barH} width={barW} height={barH} rx={1} fill={color} opacity={i === data.length - 1 ? 1 : 0.4} />;
      })}
    </svg>
  );
}

function MiniProgress({ percent, color = '#059669' }: { percent: number; color?: string }) {
  return (
    <div className="w-[44px] h-[6px] rounded-full bg-black/[0.06] shrink-0 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, percent))}%`, backgroundColor: color }} />
    </div>
  );
}

function MiniDot({ value, max, color = '#6366f1' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.max(0, (value / (max || 1)) * 100));
  return (
    <div className="w-[44px] h-[18px] flex items-center shrink-0 relative">
      <div className="w-full h-[2px] rounded-full bg-black/[0.08]" />
      <div className="absolute w-[7px] h-[7px] rounded-full" style={{ left: `calc(${pct}% - 3.5px)`, backgroundColor: color }} />
    </div>
  );
}

function MetricViz({ metric }: { metric: HubMetric }) {
  const color = metric.trend === 'up' ? '#059669' : metric.trend === 'down' ? '#dc2626' : '#6366f1';
  const vizType = metric.vizType || (metric.sparkData ? 'spark' : undefined);
  if (vizType === 'bar' && metric.sparkData) return <MiniBarChart data={metric.sparkData} color={color} />;
  if (vizType === 'progress' && metric.progressPercent != null) return <MiniProgress percent={metric.progressPercent} color={color} />;
  if (vizType === 'dot' && metric.dotValue != null && metric.dotMax != null) return <MiniDot value={metric.dotValue} max={metric.dotMax} color={color} />;
  if (metric.sparkData) return <MiniSparkline data={metric.sparkData} color={color} />;
  return null;
}

/* ─── Main HubHeader ─── */

export function HubHeader({ title, subtitle, product, metrics, insights, automations = [], reportsPath }: HubHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { persona } = useScenario();
  const [askValue, setAskValue] = useState('');
  const [askFocused, setAskFocused] = useState(false);
  const [showMetrics, setShowMetrics] = useState(() => localStorage.getItem(METRICS_KEY) !== 'false');
  const [showAsk, setShowAsk] = useState(() => localStorage.getItem(ASK_KEY) !== 'false');
  const [showInsights, setShowInsights] = useState(() => localStorage.getItem(INSIGHTS_KEY) !== 'false');
  const [showAutomations, setShowAutomations] = useState(() => localStorage.getItem(AUTOMATIONS_KEY) === 'true');
  const [askPosition, setAskPosition] = useState(() => localStorage.getItem(ASK_POSITION_KEY) || 'top');
  const askAreaRef = useRef<HTMLDivElement>(null);
  const bottomDockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setShowMetrics(localStorage.getItem(METRICS_KEY) !== 'false');
      setShowAsk(localStorage.getItem(ASK_KEY) !== 'false');
      setShowInsights(localStorage.getItem(INSIGHTS_KEY) !== 'false');
      setShowAutomations(localStorage.getItem(AUTOMATIONS_KEY) === 'true');
      setAskPosition(localStorage.getItem(ASK_POSITION_KEY) || 'top');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    if (!askFocused) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inTop = askAreaRef.current?.contains(target);
      const inBottom = bottomDockRef.current?.contains(target);
      if (!inTop && !inBottom) setAskFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [askFocused]);

  const isHubHeaderVisible = persona !== 'employee' &&
    !(persona === 'manager' && location.pathname !== '/people/my-direct-reports');

  const handleAsk = () => {
    if (askValue.trim()) {
      localStorage.setItem('bhr-ask-payload', JSON.stringify({ question: askValue.trim(), ts: Date.now() }));
      localStorage.setItem('bhr-chat-panel-open', 'true');
      window.dispatchEvent(new Event('storage'));
      setAskValue('');
      setAskFocused(false);
    }
  };

  const handleInsightClick = (insight: HubInsight) => {
    localStorage.setItem('bhr-insight-payload', JSON.stringify({ question: insight.text, ts: Date.now() }));
    localStorage.setItem('bhr-chat-panel-open', 'true');
    window.dispatchEvent(new Event('storage'));
  };

  const visibleInsights = showInsights ? insights : [];
  const visibleAutomations = showAutomations ? automations : [];
  const defaultReportsPath = `/reports/standard?section=${encodeURIComponent(product.toLowerCase())}`;
  const isBottomDock = askPosition === 'bottom';
  const showAskInHeader = showAsk && !isBottomDock;
  const showAskInDock = showAsk && isBottomDock;

  const handleAutomationClick = (auto: HubAutomation) => {
    localStorage.setItem('bhr-automation-payload', JSON.stringify({ name: auto.text, fields: auto.fields || [], ts: Date.now() }));
    localStorage.setItem('bhr-chat-panel-open', 'true');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="mb-5" ref={askAreaRef}>
      {/* H1 row + Ask input */}
      <div className="px-8 pt-6 flex items-start gap-4">
        {title && (
          <div className="shrink-0 min-h-[38px] flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">{title}</h1>
              {subtitle && <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">{subtitle}</p>}
            </div>
          </div>
        )}
        {isHubHeaderVisible && showAskInHeader && (
          <div
            className={`flex-1 flex flex-col rounded-[24px] border bg-white transition-all mt-[4px] ${
              askFocused
                ? 'border-[var(--color-primary-medium)] shadow-[0_0_0_1px_var(--color-primary-medium)]'
                : 'border-[var(--border-neutral-weak)]'
            }`}
          >
            <div className="flex items-center">
              <Icon name="sparkles" size={16} className="ml-4 text-[var(--color-primary-medium)] shrink-0" />
              <input
                type="text"
                value={askValue}
                onChange={e => setAskValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
                onFocus={() => setAskFocused(true)}
                placeholder={`Ask anything about ${product}...`}
                className="flex-1 min-w-0 pl-2 pr-2 py-3 text-[15px] bg-transparent text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-weak)] focus:outline-none"
              />
              {!askFocused && (visibleInsights.length > 0 || visibleAutomations.length > 0) && (
                <div className="flex items-center gap-1.5 flex-1 min-w-0 mr-1.5">
                  {visibleInsights.slice(0, visibleAutomations.length > 0 ? 2 : 3).map((ins, i) => (
                    <button
                      key={`i-${i}`}
                      className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors whitespace-nowrap truncate"
                      onClick={(e) => { e.stopPropagation(); handleInsightClick(ins); }}
                    >
                      {ins.icon && <Icon name={ins.icon as IconName} size={10} className="text-[var(--text-neutral-weak)] shrink-0" />}
                      <span className="truncate">{ins.shortText || ins.text}</span>
                    </button>
                  ))}
                  {visibleAutomations.slice(0, 1).map((auto, i) => (
                    <button
                      key={`a-${i}`}
                      className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors whitespace-nowrap truncate"
                      onClick={(e) => { e.stopPropagation(); handleAutomationClick(auto); }}
                    >
                      <Icon name="bolt" size={10} className="text-[var(--text-neutral-weak)] shrink-0" />
                      <span className="truncate">Automate: {auto.shortText || auto.text}</span>
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={handleAsk}
                className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-primary-medium)] hover:bg-[var(--color-primary-strong)] text-white transition-colors shrink-0"
              >
                <Icon name="paper-plane" size={14} />
              </button>
            </div>
            {askFocused && (
              <div className="px-3.5 pb-3 pt-1 flex flex-col gap-1.5 animate-fadeIn">
                <div className="flex items-end justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                      <Icon name="circle-plus" size={15} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                      <Icon name="microphone" size={14} />
                    </button>
                  </div>
                  {(visibleInsights.length > 0 || visibleAutomations.length > 0) && (
                    <div className="flex items-stretch gap-1.5 flex-1">
                      {visibleInsights.slice(0, visibleAutomations.length > 0 ? 2 : 3).map((ins, i) => (
                        <button
                          key={`i-${i}`}
                          className="flex-1 flex items-start gap-1.5 px-3 py-2 rounded-lg text-[12px] leading-[16px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors text-left"
                          onClick={(e) => { e.stopPropagation(); handleInsightClick(ins); }}
                        >
                          {ins.icon && <Icon name={ins.icon as IconName} size={10} className="text-[var(--text-neutral-weak)] shrink-0 mt-0.5" />}
                          <span className="line-clamp-2">{ins.text}</span>
                        </button>
                      ))}
                      {visibleAutomations.slice(0, 1).map((auto, i) => (
                        <button
                          key={`a-${i}`}
                          className="flex-1 flex items-start gap-1.5 px-3 py-2 rounded-lg text-[12px] leading-[16px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors text-left"
                          onClick={(e) => { e.stopPropagation(); handleAutomationClick(auto); }}
                        >
                          <Icon name="bolt" size={10} className="text-[var(--text-neutral-weak)] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">Automate: {auto.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isHubHeaderVisible && (
        <div className="mt-4">
          {showMetrics && metrics.length > 0 && (
            <div className="mx-8 flex items-stretch bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] overflow-hidden">
              {metrics.map((m, i) => {
                const trendColor = m.trend === 'up' ? '#059669' : m.trend === 'down' ? '#dc2626' : '#6b7280';

                return (
                  <button
                    key={i}
                    onClick={() => m.linkTo && navigate(m.linkTo)}
                    className={`flex-1 flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                      i > 0 ? 'border-l border-[var(--border-neutral-xx-weak)]' : ''
                    } ${m.linkTo ? 'hover:bg-[var(--bg-neutral-weak)] cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] text-[var(--text-neutral-weak)] leading-tight mb-0.5">{m.label}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[15px] font-bold text-[var(--text-neutral-xx-strong)] leading-tight">{m.value}</span>
                        {m.trendValue && (
                          <span className="text-[11px] font-medium" style={{ color: trendColor }}>
                            {m.trendValue}
                          </span>
                        )}
                      </div>
                    </div>
                    <MetricViz metric={m} />
                  </button>
                );
              })}

              {/* Reports link */}
              <button
                className="shrink-0 border-l border-[var(--border-neutral-xx-weak)] px-4 flex items-center gap-1.5 text-[var(--color-primary-strong)] hover:bg-[var(--bg-neutral-weak)] transition-colors"
                onClick={() => navigate(reportsPath || defaultReportsPath)}
              >
                <Icon name="chart-bar" size={13} />
                <span className="text-[12px] font-medium whitespace-nowrap">View {product} Reports</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Dock */}
      {isHubHeaderVisible && showAskInDock && (
        <div
          ref={bottomDockRef}
          className="fixed bottom-0 z-50 flex justify-center transition-all duration-500 ease-in-out"
          style={{ left: 'var(--nav-w)', right: 'calc(var(--chat-w, 0px) + var(--demo-w, 0px))' }}
        >
          <div className="w-full max-w-[920px] px-4 pb-4">
            <div
              className={`flex flex-col rounded-[24px] border bg-white shadow-lg transition-all ${
                askFocused
                  ? 'border-[var(--color-primary-medium)] shadow-[0_0_0_1px_var(--color-primary-medium),0_-4px_24px_rgba(0,0,0,0.08)]'
                  : 'border-[var(--border-neutral-weak)] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]'
              }`}
            >
              <div className="flex items-center">
                <Icon name="sparkles" size={18} className="ml-4 text-[var(--color-primary-medium)] shrink-0" />
                <input
                  type="text"
                  value={askValue}
                  onChange={e => setAskValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk()}
                  onFocus={() => setAskFocused(true)}
                  placeholder={`Ask anything about ${product}...`}
                  className="flex-1 min-w-0 pl-2 pr-2 py-3.5 text-[16px] bg-transparent text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-weak)] focus:outline-none"
                />
                {!askFocused && (visibleInsights.length > 0 || visibleAutomations.length > 0) && (
                  <div className="flex items-center gap-1.5 flex-1 min-w-0 mr-1.5">
                    {visibleInsights.slice(0, visibleAutomations.length > 0 ? 2 : 3).map((ins, i) => (
                      <button
                        key={`i-${i}`}
                        className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors whitespace-nowrap truncate"
                        onClick={(e) => { e.stopPropagation(); handleInsightClick(ins); }}
                      >
                        {ins.icon && <Icon name={ins.icon as IconName} size={11} className="text-[var(--text-neutral-weak)] shrink-0" />}
                        <span className="truncate">{ins.shortText || ins.text}</span>
                      </button>
                    ))}
                    {visibleAutomations.slice(0, 1).map((auto, i) => (
                      <button
                        key={`a-${i}`}
                        className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors whitespace-nowrap truncate"
                        onClick={(e) => { e.stopPropagation(); handleAutomationClick(auto); }}
                      >
                        <Icon name="bolt" size={11} className="text-[var(--text-neutral-weak)] shrink-0" />
                        <span className="truncate">Automate: {auto.shortText || auto.text}</span>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleAsk}
                  className="mr-2 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-primary-medium)] hover:bg-[var(--color-primary-strong)] text-white transition-colors shrink-0"
                >
                  <Icon name="paper-plane" size={15} />
                </button>
              </div>
              {askFocused && (
                <div className="px-3.5 pb-3 pt-1 flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                        <Icon name="circle-plus" size={15} />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--text-neutral-weak)] hover:text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
                        <Icon name="microphone" size={14} />
                      </button>
                    </div>
                    {(visibleInsights.length > 0 || visibleAutomations.length > 0) && (
                      <div className="flex items-stretch gap-1.5 flex-1">
                        {visibleInsights.slice(0, visibleAutomations.length > 0 ? 2 : 3).map((ins, i) => (
                          <button
                            key={`i-${i}`}
                            className="flex-1 flex items-start gap-1.5 px-3 py-2 rounded-lg text-[13px] leading-[17px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors text-left"
                            onClick={(e) => { e.stopPropagation(); handleInsightClick(ins); }}
                          >
                            {ins.icon && <Icon name={ins.icon as IconName} size={11} className="text-[var(--text-neutral-weak)] shrink-0 mt-0.5" />}
                            <span className="line-clamp-2">{ins.text}</span>
                          </button>
                        ))}
                        {visibleAutomations.slice(0, 1).map((auto, i) => (
                          <button
                            key={`a-${i}`}
                            className="flex-1 flex items-start gap-1.5 px-3 py-2 rounded-lg text-[13px] leading-[17px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors text-left"
                            onClick={(e) => { e.stopPropagation(); handleAutomationClick(auto); }}
                          >
                            <Icon name="bolt" size={11} className="text-[var(--text-neutral-weak)] shrink-0 mt-0.5" />
                            <span className="line-clamp-2">Automate: {auto.text}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HubHeader;
