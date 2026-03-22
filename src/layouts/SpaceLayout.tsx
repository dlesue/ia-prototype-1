import { useState, useCallback, useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { PEOPLE, CURRENT_USER } from '../data/people';
import type { Person } from '../data/people';
import { PersonCard } from '../components/Space/PersonCard';
import { PersonChip } from '../components/Space/PersonChip';
import { PersonProfile } from '../components/Space/PersonProfile';
import { SpaceAppShell } from '../components/Space/SpaceAppShell';
import { Avatar } from '../components/Space/Avatar';
import { Icon } from '../components/Icon';
import type { IconName } from '../components/Icon';
import bambooIcon from '../assets/images/bamboo-icon.svg';

// ─── Design tokens ───

const bg = '#E8F0F5';
const cardBg = '#FFFFFF';
const cardBorder = '#D6E4EC';
const cardBorderHover = '#B8CDD8';
const textPrimary = '#1C1917';
const textSecondary = '#78716C';
const textTertiary = '#9CA3A0';
const accent = '#2D6A35';
const accentHover = '#245A2C';
const accentLight = '#E8F5EE';
const coral = '#D94F3A';
const aiBadgeBg = '#FEF3C7';
const aiBadgeText = '#92400E';
const inactiveBg = '#F0F5F8';           // inactive pill/button background
const inputBg = '#F6F9FB';              // textarea/input background
const contextBorder = '#E2E8F0';        // context card borders
const cardShadow = '0 2px 12px rgba(0,0,0,0.06)';  // subtle card elevation

// Surface-aware tertiary colors (set via CSS custom properties)
const surfaceBlueTertiary = '#8FAAB8';    // buttons/links on blue bg
const surfaceBlueHover = '#6D8FA0';       // hover state on blue bg
const surfaceWhiteTertiary = '#9CA3A0';   // buttons/links on white bg (same as textTertiary)
const surfaceWhiteHover = '#78716C';      // hover state on white bg (same as textSecondary)

// ─── SVG Icons (consistent 1.5px stroke) ───

function IconSearch() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke={textSecondary} strokeWidth="1.5" /><path d="M12.5 12.5L16 16" stroke={textSecondary} strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function IconBell() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 6.5a4.5 4.5 0 00-9 0c0 4.5-2 6.5-2 6.5h13s-2-2-2-6.5" stroke={textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.3 15a1.5 1.5 0 01-2.6 0" stroke={textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconBack() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconClose() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function IconSend() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconChat() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5a7 7 0 017 7 7 7 0 01-7 7 7.05 7.05 0 01-3.78-1.1L2 15.5l1.1-3.22A7 7 0 019 1.5z" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

// Widget line icons
function IconCalendar({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke={accent} strokeWidth="1.5" /><path d="M3 8h14M7 2v4M13 2v4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function IconOrgChart({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="7" y="2" width="6" height="4" rx="1" stroke={accent} strokeWidth="1.5" /><rect x="2" y="14" width="5" height="4" rx="1" stroke={accent} strokeWidth="1.5" /><rect x="13" y="14" width="5" height="4" rx="1" stroke={accent} strokeWidth="1.5" /><path d="M10 6v4M10 10H4.5V14M10 10h5.5V14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function IconUsers({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3" stroke={accent} strokeWidth="1.5" /><path d="M1 17c0-3 2.5-5 6-5s6 2 6 5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" /><circle cx="14" cy="6" r="2.5" stroke={accent} strokeWidth="1.5" /><path d="M15 12c2.5.5 4 2 4 5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" /></svg>;
}
function IconHandshake({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M2 10l4-4 3 1 3-3 4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10l2 2 4-4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14h3l3 3h4l3-3h3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconGrid({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke={accent} strokeWidth="1.5" /><rect x="11" y="2" width="7" height="7" rx="1.5" stroke={accent} strokeWidth="1.5" /><rect x="2" y="11" width="7" height="7" rx="1.5" stroke={accent} strokeWidth="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" stroke={accent} strokeWidth="1.5" /></svg>;
}
function IconSparkle({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
function IconDocument({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 2v4h4M8 10h4M8 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

const WIDGET_ICONS: Record<string, (props: { size?: number }) => JSX.Element> = {
  'pto': IconCalendar,
  'org-chart': IconOrgChart,
  'directory': IconUsers,
  'one-on-one': IconHandshake,
  'app-store': IconGrid,
};

// ─── Types ───

type WidgetSize = '1x1' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2';
type AppId = 'pto' | 'org-chart' | 'directory' | 'one-on-one' | 'app-store';
type SpaceView = { type: 'home' } | { type: 'app'; id: AppId } | { type: 'profile'; person: Person } | { type: 'chat' };

interface WidgetDef {
  id: AppId;
  label: string;
  defaultSize: WidgetSize;
  aiBadge?: boolean;
}

const WIDGET_DEFS: WidgetDef[] = [
  { id: 'pto', label: 'Time Off', defaultSize: '2x2' },
  { id: 'org-chart', label: 'Org Chart', defaultSize: '2x1' },
  { id: 'directory', label: 'Directory', defaultSize: '1x1' },
  { id: 'one-on-one', label: '1:1 Prep', defaultSize: '4x2', aiBadge: true },
  { id: 'app-store', label: 'App Store', defaultSize: '1x1' },
];

const SIZE_OPTIONS: { value: WidgetSize; label: string; cols: number; rows: number }[] = [
  { value: '1x1', label: '1 x 1  Icon', cols: 1, rows: 1 },
  { value: '2x1', label: '2 x 1  Small', cols: 2, rows: 1 },
  { value: '2x2', label: '2 x 2  Medium', cols: 2, rows: 2 },
  { value: '3x1', label: '3 x 1  Wide', cols: 3, rows: 1 },
  { value: '4x1', label: '4 x 1  Wide', cols: 4, rows: 1 },
  { value: '4x2', label: '4 x 2  Large', cols: 4, rows: 2 },
];

function sizeToGrid(size: WidgetSize) {
  const s = SIZE_OPTIONS.find(o => o.value === size)!;
  return { cols: s.cols, rows: s.rows };
}

// ─── Briefing Cards ───

type VisualType = 'turnover' | 'comp-gap' | 'headcount' | 'new-hire' | 'span-of-control' | 'flight-risk' | 'enps' | 'recognition';

interface BriefingCard {
  id: string;
  avatarInitials: string;
  avatarColor: string;
  avatar?: string;
  name: string;
  context: string;
  copy: string;
  primaryAction: string;
  ghostAction: string;
  isPositive?: boolean;
  isIcon?: boolean;
  isCelebratory?: boolean;
  statCallout?: string;
  statLabel?: string;
  statColor?: string;
  backTitle: string;
  backContent: string;
  backConfirm: string;
  backEditable?: boolean;
  backExpandedHeight?: number;
  backLayout?: 'simple' | 'medium' | 'heavy';
  backCustom?: string;
  visualType?: VisualType;
}

const BRIEFING_CARDS: BriefingCard[] = [
  {
    id: 'toni',
    avatarInitials: 'TN',
    avatarColor: '#2D6A35',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Toni',
    context: '4-year anniversary tomorrow',
    copy: 'Four years is a big deal. BambooHR wrote a short note — just review and send.',
    primaryAction: 'Review and send',
    ghostAction: 'Write my own',
    isPositive: true,
    isCelebratory: true,
    statCallout: '4 years',
    statLabel: 'tomorrow',
    statColor: '#2D6A35',
    backTitle: 'Anniversary note for Toni',
    backContent: "Happy 4 years, Toni! Your dedication to the team has made a real impact \u2014 from leading the onboarding redesign to mentoring three new hires this year. Here\u2019s to many more.",
    backConfirm: 'Send note',
    backEditable: true,
    backExpandedHeight: 360,
  },
  {
    id: 'sara',
    avatarInitials: 'SR',
    avatarColor: '#C2402C',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    name: 'Sara',
    context: 'No PTO in 6 months',
    copy: "Engagement dipped last quarter. Her manager might want a heads up — one quick message could make a real difference.",
    primaryAction: 'Nudge her manager',
    ghostAction: 'Dismiss',
    statCallout: '6 mo',
    statLabel: 'no time off',
    statColor: '#D94F3A',
    backTitle: 'Message to James (Sara\u2019s manager)',
    backContent: "Hey James \u2014 just a heads up that Sara hasn\u2019t taken any PTO in over 6 months and her engagement scores dipped last quarter. Might be worth a quick check-in to see how she\u2019s doing.",
    backConfirm: 'Send via Slack',
    backEditable: true,
    backExpandedHeight: 360,
  },
  {
    id: 'kyle',
    avatarInitials: 'KW',
    avatarColor: '#4B4B8F',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Kyle',
    context: 'Review due in 4 days',
    copy: "You haven't started his performance review yet. Takes about 20 minutes — BambooHR has his context ready to go.",
    primaryAction: 'Start review',
    ghostAction: 'Snooze',
    statCallout: '4 days',
    statLabel: 'until due',
    statColor: '#B45309',
    backTitle: 'Performance review for Kyle',
    backContent: '',
    backConfirm: 'Submit review',
    backEditable: false,
    backExpandedHeight: 360,
    backLayout: 'heavy',
    backCustom: 'kyle-review',
  },
  {
    id: 'team',
    avatarInitials: '',
    avatarColor: '',
    name: 'Team',
    context: '3 people over-assigned',
    copy: "Looks like a few people are stretched thin this sprint. Want to see who and shuffle things around?",
    primaryAction: 'Review assignments',
    ghostAction: 'Not now',
    isIcon: true,
    statCallout: '3',
    statLabel: 'over-assigned',
    statColor: '#B45309',
    backTitle: 'Over-assigned this sprint',
    backContent: "Sara R. \u2014 6 tasks (capacity: 4)\nMike T. \u2014 5 tasks (capacity: 3)\nJen L. \u2014 7 tasks (capacity: 4)\n\nBambooHR suggests redistributing 5 tasks to team members with open capacity.",
    backConfirm: 'Rebalance tasks',
    backEditable: false,
    backExpandedHeight: 360,
  },
  {
    id: 'turnover',
    avatarInitials: '', avatarColor: '',
    name: 'Engineering',
    context: 'Turnover up 40%',
    copy: 'Engineering turnover spiked this quarter — 8 departures vs. 5 last quarter. Most exits from the Platform team.',
    primaryAction: 'See breakdown',
    ghostAction: 'Dismiss',
    isIcon: true,
    backTitle: 'Turnover by team — Q1 2026',
    backContent: '',
    backConfirm: 'Open report',
    backExpandedHeight: 360,
    visualType: 'turnover',
  },
  {
    id: 'comp-gap',
    avatarInitials: '', avatarColor: '',
    name: 'Compensation',
    context: '3 below midpoint',
    copy: '3 people on your team are paid below the market midpoint for their role. This can affect retention.',
    primaryAction: 'Review comp',
    ghostAction: 'Not now',
    isIcon: true,
    backTitle: 'Below-market compensation',
    backContent: '',
    backConfirm: 'Adjust comp',
    backExpandedHeight: 360,
    visualType: 'comp-gap',
  },
  {
    id: 'headcount',
    avatarInitials: '', avatarColor: '',
    name: 'Headcount',
    context: '+12 net new this quarter',
    copy: 'Your organization grew by 12 this quarter. Hiring is outpacing departures 3:1.',
    primaryAction: 'See trend',
    ghostAction: 'Dismiss',
    isIcon: true,
    backTitle: 'Headcount change — last 6 months',
    backContent: '',
    backConfirm: 'Open workforce plan',
    backExpandedHeight: 360,
    visualType: 'headcount',
  },
  {
    id: 'new-hire',
    avatarInitials: 'AP',
    avatarColor: '#5A7A8A',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Alex Park',
    context: 'Starting Monday',
    copy: 'New Sr. Product Designer joining the Growth team. Her onboarding plan is 60% ready.',
    primaryAction: 'Review plan',
    ghostAction: 'Later',
    backTitle: 'Onboarding checklist — Alex Park',
    backContent: '',
    backConfirm: 'Approve plan',
    backExpandedHeight: 360,
    visualType: 'new-hire',
  },
  {
    id: 'span-of-control',
    avatarInitials: 'JM',
    avatarColor: '#8B6B4A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'James Miller',
    context: '12 direct reports',
    copy: 'James has 12 direct reports — well above the recommended 6–8. This often correlates with lower engagement scores.',
    primaryAction: 'See org tree',
    ghostAction: 'Dismiss',
    backTitle: 'Suggested team split',
    backContent: '',
    backConfirm: 'Start reorg',
    backExpandedHeight: 360,
    visualType: 'span-of-control',
  },
  {
    id: 'flight-risk',
    avatarInitials: 'MR',
    avatarColor: '#9B6B7A',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    name: 'Marcus Reed',
    context: 'High attrition risk',
    copy: 'ML model flagged Marcus as high flight risk. Tenure, comp, and engagement signals all trending down.',
    primaryAction: 'View factors',
    ghostAction: 'Dismiss',
    backTitle: 'Risk factors — Marcus Reed',
    backContent: '',
    backConfirm: 'View profile',
    backExpandedHeight: 360,
    visualType: 'flight-risk',
  },
  {
    id: 'enps',
    avatarInitials: '', avatarColor: '',
    name: 'eNPS',
    context: 'Dropped 15 points',
    copy: 'Employee Net Promoter Score fell from 42 to 27 this quarter. Detractors up significantly.',
    primaryAction: 'See details',
    ghostAction: 'Dismiss',
    isIcon: true,
    backTitle: 'eNPS trend & themes',
    backContent: '',
    backConfirm: 'Open survey results',
    backExpandedHeight: 360,
    visualType: 'enps',
  },
  {
    id: 'recognition',
    avatarInitials: '', avatarColor: '',
    name: 'Recognition',
    context: '4 people overlooked',
    copy: 'These 4 team members haven\u2019t received any recognition in 90+ days.',
    primaryAction: 'Send kudos',
    ghostAction: 'Not now',
    isIcon: true,
    backTitle: 'Send recognition',
    backContent: 'Great work this quarter! Your contributions haven\u2019t gone unnoticed.',
    backConfirm: 'Send kudos to all',
    backEditable: true,
    backExpandedHeight: 360,
    visualType: 'recognition',
  },
];

// ─── Briefing Card Visuals ───

function SparklineSVG({ data, width = 120, height = 32, color = coral }: { data: number[]; width?: number; height?: number; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline points={points} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function MiniBarChart({ bars, height = 80 }: { bars: { label: string; value: number; max: number; color: string }[]; height?: number }) {
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {bars.map(b => (
        <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full rounded-t-sm" style={{ height: `${(b.value / b.max) * (height - 20)}px`, backgroundColor: b.color, minHeight: 4 }} />
          <span className="text-[10px]" style={{ color: textTertiary }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function MiniGauge({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.min(value / max, 1);
  const angle = -90 + pct * 180;
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" fill="none">
      <path d="M6 30 A22 22 0 0 1 50 30" stroke={cardBorder} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M6 30 A22 22 0 0 1 50 30" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"
        strokeDasharray={`${pct * 69} 69`} />
      <circle cx="28" cy="30" r="2.5" fill={textPrimary} />
      <line x1="28" y1="30" x2={28 + 16 * Math.cos((angle * Math.PI) / 180)} y2={30 + 16 * Math.sin((angle * Math.PI) / 180)}
        stroke={textPrimary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MiniOrgTree({ centerName, reports, color }: { centerName: string; reports: string[]; color: string }) {
  const count = reports.length;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white" style={{ backgroundColor: color }}>
        {centerName.split(' ').map(w => w[0]).join('')}
      </div>
      <div className="w-px h-2" style={{ backgroundColor: cardBorder }} />
      <div className="flex gap-0.5 items-start">
        {reports.slice(0, Math.min(count, 8)).map((r, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px h-1.5" style={{ backgroundColor: cardBorder }} />
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-medium" style={{ backgroundColor: inactiveBg, color: textSecondary }}>
              {r}
            </div>
          </div>
        ))}
        {count > 8 && (
          <div className="flex flex-col items-center">
            <div className="w-px h-1.5" style={{ backgroundColor: cardBorder }} />
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px]" style={{ backgroundColor: inactiveBg, color: textTertiary }}>
              +{count - 8}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniDonut({ value, total, color, bgColor = '#E8F0F5' }: { value: number; total: number; color: string; bgColor?: string }) {
  const pct = value / total;
  const circ = 2 * Math.PI * 14;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="14" fill="none" stroke={bgColor} strokeWidth="5" />
      <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" transform="rotate(-90 20 20)" />
    </svg>
  );
}

function CardFrontVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'turnover':
      return (
        <div className="flex items-center gap-4 mt-1">
          <SparklineSVG data={[3, 2, 4, 3, 5, 8]} width={100} height={28} color={coral} />
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 10V4M4 6l3-3 3 3" stroke={coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[20px] font-medium" style={{ color: coral }}>40%</span>
          </div>
        </div>
      );
    case 'comp-gap':
      return (
        <div className="flex flex-col gap-1.5 mt-1">
          {[{ name: 'Sara R.', pct: 0.72 }, { name: 'Dev K.', pct: 0.81 }, { name: 'Jen L.', pct: 0.68 }].map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-[11px] w-12 shrink-0" style={{ color: textTertiary }}>{p.name}</span>
              <div className="flex-1 h-2 rounded-full relative" style={{ backgroundColor: '#E8F0F5' }}>
                <div className="absolute left-[45%] top-0 bottom-0 w-px" style={{ backgroundColor: cardBorder }} />
                <div className="h-full rounded-full" style={{ width: `${p.pct * 100}%`, backgroundColor: p.pct < 0.8 ? coral : accent }} />
              </div>
            </div>
          ))}
          <div className="flex justify-between text-[9px] mt-0.5" style={{ color: textTertiary }}>
            <span>Min</span><span>Midpoint</span><span>Max</span>
          </div>
        </div>
      );
    case 'headcount':
      return (
        <div className="mt-1">
          <svg width="100%" height="36" viewBox="0 0 200 36" preserveAspectRatio="none" fill="none">
            <defs><linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={accent} stopOpacity="0.2" /><stop offset="1" stopColor={accent} stopOpacity="0" /></linearGradient></defs>
            <path d="M0 30 Q20 28 40 26 Q60 24 80 22 Q100 18 120 16 Q140 12 160 8 Q180 6 200 4 V36 H0 Z" fill="url(#hcGrad)" />
            <path d="M0 30 Q20 28 40 26 Q60 24 80 22 Q100 18 120 16 Q140 12 160 8 Q180 6 200 4" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div className="flex justify-between text-[10px] mt-1" style={{ color: textTertiary }}>
            <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
          </div>
        </div>
      );
    case 'new-hire':
      return (
        <div className="flex items-center gap-3 mt-1">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-medium text-white" style={{ backgroundColor: '#8B6B4A' }}>VP</div>
            <div className="w-px h-1.5" style={{ backgroundColor: cardBorder }} />
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-medium text-white" style={{ backgroundColor: '#5A7A8A' }}>DM</div>
            <div className="w-px h-1.5" style={{ backgroundColor: cardBorder }} />
            <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[9px] font-medium" style={{ borderColor: accent, color: accent, backgroundColor: accentLight }}>AP</div>
          </div>
          <div className="flex-1">
            <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F0F5' }}>
              <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: accent }} />
            </div>
            <div className="text-[11px] mt-1" style={{ color: textTertiary }}>Onboarding 60% ready</div>
          </div>
        </div>
      );
    case 'span-of-control':
      return (
        <div className="mt-1">
          <MiniOrgTree
            centerName="James Miller"
            color="#8B6B4A"
            reports={['SR', 'KW', 'TN', 'MT', 'JL', 'AP', 'RD', 'CS', 'BW', 'LM', 'NH', 'PG']}
          />
        </div>
      );
    case 'flight-risk':
      return (
        <div className="flex items-center gap-4 mt-1">
          <MiniGauge value={78} max={100} color={coral} />
          <div>
            <div className="text-[22px] font-medium leading-none" style={{ color: coral }}>78</div>
            <div className="text-[10px]" style={{ color: textTertiary }}>risk score</div>
          </div>
        </div>
      );
    case 'enps':
      return (
        <div className="flex items-center gap-4 mt-1">
          <MiniDonut value={27} total={100} color={coral} />
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-medium leading-none" style={{ color: coral }}>27</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v6M3 6l3 3 3-3" stroke={coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="text-[10px]" style={{ color: textTertiary }}>was 42 last quarter</div>
          </div>
        </div>
      );
    case 'recognition':
      return (
        <div className="flex items-center gap-1 mt-2">
          {[
            { initials: 'SR', color: '#C2402C', avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
            { initials: 'MT', color: '#5A7A8A', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
            { initials: 'JL', color: '#6B8F5E', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
            { initials: 'PG', color: '#4B4B8F', avatar: 'https://randomuser.me/api/portraits/men/71.jpg' },
          ].map((p, i) => (
            <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0 overflow-hidden -ml-1 first:ml-0 border-2 border-white" style={{ backgroundColor: p.color }}>
              <img src={p.avatar} alt={p.initials} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          ))}
          <span className="text-[11px] ml-1" style={{ color: textTertiary }}>90+ days</span>
        </div>
      );
    default:
      return null;
  }
}

function PowerBar({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const levels = [
    { label: 'Below', color: '#E87461' },
    { label: 'Inconsistent', color: '#E8A44C' },
    { label: 'Meets', color: '#D4B84C' },
    { label: 'Exceeds', color: '#5AAFA8' },
    { label: 'Exceptional', color: '#3D9B8F' },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5 flex-1">
          {levels.map((level, i) => {
            const filled = i < value;
            return (
              <button
                key={i}
                onClick={() => onChange(i + 1)}
                className="relative h-7 flex-1 rounded-md transition-all"
                style={{
                  backgroundColor: filled ? level.color : '#E8F0F5',
                  boxShadow: filled && i === value - 1 ? `0 0 8px ${level.color}60` : 'none',
                  transform: filled && i === value - 1 ? 'scaleY(1.08)' : 'scaleY(1)',
                  transition: 'all 0.25s cubic-bezier(0.34, 1.3, 0.64, 1)',
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Labels */}
      <div className="flex gap-0.5">
        {levels.map((level, i) => (
          <span
            key={i}
            className="flex-1 text-center text-[9px] font-medium transition-colors"
            style={{ color: i < value ? levels[Math.min(i, value - 1)].color : textTertiary }}
          >
            {level.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function KyleReviewBack({ contextExpanded }: { contextExpanded: boolean }) {
  const [overallRating, setOverallRating] = useState(4);
  const [ratings, setRatings] = useState<Record<string, number>>({
    execution: 4, collaboration: 5, leadership: 4, growth: 3,
  });
  const ratingLabels = [
    { key: 'execution', label: 'Execution' },
    { key: 'collaboration', label: 'Collaboration' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'growth', label: 'Growth' },
  ];
  const [doingWell, setDoingWell] = useState(
    "Kyle has been a standout contributor this cycle. He led the API migration with minimal downtime and mentored two junior engineers through their first on-call rotations.\n\nHis technical judgment is excellent — he consistently identifies the right trade-offs between speed and quality. The team trusts his code reviews and his architectural instincts."
  );
  const [couldImprove, setCouldImprove] = useState(
    "Kyle tends to take on too much himself rather than delegating or escalating early. We've talked about this, and he's made progress, but it's worth continuing to reinforce.\n\nCould also benefit from sharing context more proactively with cross-functional partners — a few stakeholders have mentioned feeling out of the loop."
  );
  const timeline = [
    { year: '2025', role: 'Sr. Software Engineer', event: 'Promoted', salary: '$142k' },
    { year: '2024', role: 'Software Engineer II', event: 'Led API migration', salary: '$128k' },
    { year: '2023', role: 'Software Engineer II', event: 'Promoted', salary: '$118k' },
    { year: '2022', role: 'Software Engineer I', event: 'Hired', salary: '$105k' },
  ];
  const peerQuotes = [
    { quote: 'Kyle is the first person I go to when I\u2019m stuck. He explains things without making you feel dumb.', from: 'Peer' },
    { quote: 'Really strong technically, but sometimes takes on too much and doesn\u2019t ask for help early enough.', from: 'Peer' },
    { quote: 'Great mentor \u2014 helped me ramp up in half the time I expected.', from: 'Direct report' },
  ];

  return (
    <div className={`flex-1 flex ${contextExpanded ? 'gap-4' : ''} mb-3`} onClick={e => e.stopPropagation()}>
      {/* Left column — rating + two text inputs */}
      <div className={`${contextExpanded ? 'flex-[1]' : 'w-full'} flex flex-col gap-3`}>
        {/* Overall performance rating */}
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: textTertiary }}>Overall performance</div>
          <PowerBar value={overallRating} onChange={setOverallRating} />
        </div>

        {/* Doing well */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5z" fill={textTertiary} opacity="0.7" /></svg>
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Doing well</span>
          </div>
          <textarea
            className="briefing-textarea rounded-xl p-3 text-[13px] leading-relaxed w-full flex-1"
            style={{
              backgroundColor: inputBg,
              color: textSecondary,
              border: `1px solid ${cardBorder}`,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              minHeight: 120,
            }}
            value={doingWell}
            onChange={e => setDoingWell(e.target.value)}
          />
        </div>

        {/* Could improve */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 8 8)" /></svg>
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Could improve</span>
          </div>
          <textarea
            className="briefing-textarea rounded-xl p-3 text-[13px] leading-relaxed w-full flex-1"
            style={{
              backgroundColor: inputBg,
              color: textSecondary,
              border: `1px solid ${cardBorder}`,
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
              minHeight: 120,
            }}
            value={couldImprove}
            onChange={e => setCouldImprove(e.target.value)}
          />
        </div>
      </div>

      {/* Right column — data cards grouped by source, 2-col grid */}
      {contextExpanded && (
      <div className="flex-[1]">
        <div className="text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: textTertiary }}>Context</div>
        <div className="grid grid-cols-2 gap-3">
          {/* Jira */}
          <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#2684FF' }}>
                <span className="text-[7px] font-bold text-white">J</span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Jira</span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>3</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>Projects shipped</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>100%</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>On-time delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>92%</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>Sprint goal completion</span>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#24292F' }}>
                <span className="text-[7px] font-bold text-white">G</span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>GitHub</span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>47</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>PRs merged</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4.2h</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>Avg review turnaround</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>112</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>Reviews given</span>
              </div>
            </div>
          </div>

          {/* BambooHR */}
          <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}>
                <span className="text-[7px] font-bold text-white">B</span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
            </div>
            <div className="space-y-2">
              {ratingLabels.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-[11px] w-20 shrink-0" style={{ color: textSecondary }}>{label}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        onClick={() => setRatings(prev => ({ ...prev, [key]: n }))}
                        className="w-5 h-5 rounded-full text-[9px] font-medium transition-colors"
                        style={{
                          backgroundColor: n <= ratings[key] ? accent : '#E8F0F5',
                          color: n <= ratings[key] ? '#FFFFFF' : textTertiary,
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-1 mt-1" style={{ borderTop: `1px solid ${cardBorder}` }}>
                <div className="relative pl-4">
                  <div className="absolute left-[5px] top-1 bottom-1 w-px" style={{ backgroundColor: cardBorder }} />
                  {timeline.map((t, i) => (
                    <div key={i} className="relative flex items-start gap-2 pb-2 last:pb-0">
                      <div className="absolute left-[-13px] top-[4px] w-2 h-2 rounded-full border-2" style={{ borderColor: i === 0 ? accent : cardBorder, backgroundColor: i === 0 ? accent : cardBg }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[11px] font-medium" style={{ color: textPrimary }}>{t.role}</span>
                          <span className="text-[10px]" style={{ color: textTertiary }}>{t.year}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] font-medium" style={{ color: textSecondary }}>{t.salary}</span>
                          <span className="text-[10px]" style={{ color: textTertiary }}>{t.event}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lattice (360 feedback) */}
          <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#7B61FF' }}>
                <span className="text-[7px] font-bold text-white">L</span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Lattice</span>
            </div>
            <div className="flex flex-col mb-2">
              <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4.6/5</span>
              <span className="text-[10px]" style={{ color: textTertiary }}>Peer feedback score</span>
            </div>
            <div className="space-y-1.5">
              {peerQuotes.map((pq, i) => (
                <div key={i} className="text-[11px] leading-relaxed" style={{ color: textSecondary }}>
                  <span style={{ color: textTertiary }}>&ldquo;</span>{pq.quote}<span style={{ color: textTertiary }}>&rdquo;</span>
                  <span className="ml-1 text-[10px]" style={{ color: textTertiary }}>&mdash; {pq.from}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function ContextColumn({ cardId }: { cardId: string }) {
  const entry = CARD_CONTEXT[cardId];
  if (!entry) return null;
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const hasPeople = entry.people && entry.people.length > 0;
  const activeSources = selectedPerson
    ? entry.people?.find(p => p.name === selectedPerson)?.sources ?? entry.allSummary
    : entry.allSummary;
  return (
    <div className="flex flex-col gap-3">
      {hasPeople && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={e => { e.stopPropagation(); setSelectedPerson(null); }}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
            style={{
              backgroundColor: selectedPerson === null ? textPrimary : '#F0F5F8',
              color: selectedPerson === null ? '#FFFFFF' : textSecondary,
            }}
          >
            All
          </button>
          {entry.people!.map(p => (
            <button
              key={p.name}
              onClick={e => { e.stopPropagation(); setSelectedPerson(prev => prev === p.name ? null : p.name); }}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
              style={{
                backgroundColor: selectedPerson === p.name ? textPrimary : '#F0F5F8',
                color: selectedPerson === p.name ? '#FFFFFF' : textSecondary,
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
      {activeSources.map(src => (
        <div key={src.source} className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: src.color }}>
              <span className="text-[7px] font-bold text-white">{src.letter}</span>
            </div>
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>{src.source}</span>
          </div>
          <div className="space-y-2">
            {src.metrics.map(m => (
              <div key={m.label} className="flex flex-col">
                <span className="text-[16px] font-semibold" style={{ color: textPrimary }}>{m.value}</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>{m.label}</span>
              </div>
            ))}
            {src.teams && src.teams.length > 0 && (
              <div className="pt-1 mt-1" style={{ borderTop: `1px solid ${contextBorder}` }}>
                <span className="text-[10px]" style={{ color: textTertiary }}>Teams</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {src.teams.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: inactiveBg, color: textSecondary }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardBackVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'turnover':
      return (
        <div className="flex-1 flex flex-col gap-2 mb-3">
          <MiniBarChart bars={[
            { label: 'Platform', value: 4, max: 5, color: coral },
            { label: 'Frontend', value: 2, max: 5, color: '#E8A87C' },
            { label: 'Infra', value: 1, max: 5, color: '#D6E4EC' },
            { label: 'Mobile', value: 1, max: 5, color: '#D6E4EC' },
            { label: 'Data', value: 0, max: 5, color: '#D6E4EC' },
          ]} height={70} />
          <div className="text-[11px] leading-relaxed" style={{ color: textSecondary }}>
            Platform team accounts for 50% of departures. Exit interviews cite career growth and comp.
          </div>
        </div>
      );
    case 'comp-gap':
      return (
        <div className="flex-1 flex flex-col gap-2 mb-3 overflow-y-auto">
          {[
            { name: 'Sara Rodriguez', role: 'Sr. Designer', current: 115, midpoint: 135 },
            { name: 'Dev Kapoor', role: 'Engineer II', current: 108, midpoint: 125 },
            { name: 'Jen Liu', role: 'PM', current: 98, midpoint: 130 },
          ].map(p => (
            <div key={p.name} className="rounded-xl p-3" style={{ backgroundColor: inputBg }}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <div className="text-[13px] font-medium" style={{ color: textPrimary }}>{p.name}</div>
                  <div className="text-[11px]" style={{ color: textTertiary }}>{p.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-medium" style={{ color: coral }}>${p.current}k</div>
                  <div className="text-[10px]" style={{ color: textTertiary }}>mid ${p.midpoint}k</div>
                </div>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E8F0F5' }}>
                <div className="h-full rounded-full" style={{ width: `${(p.current / p.midpoint) * 100}%`, backgroundColor: coral }} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'headcount':
      return (
        <div className="flex-1 flex flex-col gap-2 mb-3">
          <div className="flex items-end gap-1.5" style={{ height: 70 }}>
            {[
              { month: 'Oct', hires: 3, deps: 1 },
              { month: 'Nov', hires: 4, deps: 0 },
              { month: 'Dec', hires: 2, deps: 2 },
              { month: 'Jan', hires: 5, deps: 1 },
              { month: 'Feb', hires: 4, deps: 0 },
              { month: 'Mar', hires: 6, deps: 2 },
            ].map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div className="w-full rounded-t-sm" style={{ height: m.hires * 8, backgroundColor: accent }} />
                  {m.deps > 0 && <div className="w-full rounded-b-sm" style={{ height: m.deps * 8, backgroundColor: coral, opacity: 0.6 }} />}
                </div>
                <span className="text-[9px]" style={{ color: textTertiary }}>{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[10px]" style={{ color: textTertiary }}>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: accent }} /> Hires</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: coral, opacity: 0.6 }} /> Departures</span>
          </div>
        </div>
      );
    case 'new-hire':
      return (
        <div className="flex-1 flex flex-col gap-1.5 mb-3 overflow-y-auto">
          {[
            { task: 'Equipment ordered', done: true },
            { task: 'Accounts provisioned', done: true },
            { task: 'Buddy assigned', done: true },
            { task: 'First-week schedule', done: false },
            { task: 'Team intro email', done: false },
            { task: '30-day goals set', done: false },
          ].map(t => (
            <div key={t.task} className="flex items-center gap-2.5 py-1">
              <div className="w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0"
                style={{ borderColor: t.done ? accent : cardBorder, backgroundColor: t.done ? accent : 'transparent' }}>
                {t.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 5.5L4 7l3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span className="text-[13px]" style={{ color: t.done ? textTertiary : textPrimary, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
            </div>
          ))}
        </div>
      );
    case 'span-of-control':
      return (
        <div className="flex-1 flex flex-col gap-3 mb-3">
          <div className="text-[12px]" style={{ color: textSecondary }}>BambooHR suggests splitting into two teams:</div>
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: inputBg }}>
              <div className="text-[12px] font-medium mb-2" style={{ color: textPrimary }}>Team A (6)</div>
              <div className="flex flex-wrap gap-0.5">
                {['SR', 'KW', 'TN', 'MT', 'JL', 'AP'].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-medium" style={{ backgroundColor: '#E8F0F5', color: textSecondary }}>{i}</div>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: inputBg }}>
              <div className="text-[12px] font-medium mb-2" style={{ color: textPrimary }}>Team B (6)</div>
              <div className="flex flex-wrap gap-0.5">
                {['RD', 'CS', 'BW', 'LM', 'NH', 'PG'].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-medium" style={{ backgroundColor: '#E8F0F5', color: textSecondary }}>{i}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-[11px]" style={{ color: textTertiary }}>New Team B lead: recommend promoting Sara R.</div>
        </div>
      );
    case 'flight-risk':
      return (
        <div className="flex-1 flex flex-col gap-2 mb-3">
          {[
            { factor: 'Tenure', detail: '4.2 yrs (peer avg: 2.8)', pct: 0.85, color: coral },
            { factor: 'Comp ratio', detail: '0.82 (below midpoint)', pct: 0.82, color: coral },
            { factor: 'Engagement', detail: 'Declined 3 of 4 quarters', pct: 0.7, color: '#E8A87C' },
            { factor: 'Growth', detail: 'No promotion in 2+ years', pct: 0.6, color: '#E8A87C' },
          ].map(f => (
            <div key={f.factor}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[12px] font-medium" style={{ color: textPrimary }}>{f.factor}</span>
                <span className="text-[10px]" style={{ color: textTertiary }}>{f.detail}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E8F0F5' }}>
                <div className="h-full rounded-full" style={{ width: `${f.pct * 100}%`, backgroundColor: f.color }} />
              </div>
            </div>
          ))}
        </div>
      );
    case 'enps':
      return (
        <div className="flex-1 flex flex-col gap-3 mb-3">
          <div>
            <div className="text-[11px] font-medium mb-1.5" style={{ color: textTertiary }}>Quarterly trend</div>
            <div className="flex items-end gap-2" style={{ height: 40 }}>
              {[{ q: 'Q2', v: 45 }, { q: 'Q3', v: 48 }, { q: 'Q4', v: 42 }, { q: 'Q1', v: 27 }].map(d => (
                <div key={d.q} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-medium" style={{ color: d.q === 'Q1' ? coral : textTertiary }}>{d.v}</span>
                  <div className="w-full rounded-t-sm" style={{ height: d.v * 0.6, backgroundColor: d.q === 'Q1' ? coral : accent }} />
                  <span className="text-[9px]" style={{ color: textTertiary }}>{d.q}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium mb-1" style={{ color: textTertiary }}>Top themes from detractors</div>
            <div className="flex flex-col gap-1">
              {['Lack of career growth path', 'Compensation concerns', 'Work-life balance'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[11px]" style={{ color: textSecondary }}>{i + 1}. {t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'recognition':
      return (
        <div className="flex-1 flex flex-col gap-1.5 mb-3 overflow-y-auto">
          {[
            { name: 'Sara Rodriguez', days: 94, avatar: 'https://randomuser.me/api/portraits/women/26.jpg', color: '#C2402C' },
            { name: 'Mike Torres', days: 102, avatar: 'https://randomuser.me/api/portraits/men/55.jpg', color: '#5A7A8A' },
            { name: 'Jen Liu', days: 97, avatar: 'https://randomuser.me/api/portraits/women/33.jpg', color: '#6B8F5E' },
            { name: 'Pat Garcia', days: 91, avatar: 'https://randomuser.me/api/portraits/men/71.jpg', color: '#4B4B8F' },
          ].map(p => (
            <div key={p.name} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ backgroundColor: inputBg }}>
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ backgroundColor: p.color }}>
                <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium truncate" style={{ color: textPrimary }}>{p.name}</div>
              </div>
              <span className="text-[10px] shrink-0" style={{ color: coral }}>{p.days}d ago</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// ─── Widget Content Reflow ───

function PTOWidgetContent({ size }: { size: WidgetSize }) {
  const { cols, rows } = sizeToGrid(size);
  if (cols === 1 && rows === 1) return null;

  const user = CURRENT_USER;
  if (cols <= 2 && rows === 1) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: textSecondary }}>Balance</span>
        <span className="text-[24px] font-medium" style={{ color: textPrimary }}>{user.ptoBalance}<span className="text-[14px] ml-1" style={{ color: textTertiary }}>days</span></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-[13px] mb-1" style={{ color: textSecondary }}>Your balance</div>
        <div className="flex items-baseline gap-1">
          <span className="text-[40px] font-medium leading-none" style={{ color: textPrimary }}>{user.ptoBalance}</span>
          <span className="text-[15px]" style={{ color: textTertiary }}>days</span>
        </div>
      </div>
      <div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#DCE8EE' }}>
          <div className="h-full rounded-full" style={{ width: `${(user.ptoBalance / 25) * 100}%`, backgroundColor: accent }} />
        </div>
        <div className="flex justify-between mt-1.5 text-[12px]" style={{ color: textTertiary }}>
          <span>{user.ptoBalance} available</span>
          <span>25 total</span>
        </div>
      </div>
      {rows >= 2 && (
        <button className="w-full py-2.5 rounded-full text-[14px] font-medium text-white transition-colors" style={{ backgroundColor: accent }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)} onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}>
          Request time off
        </button>
      )}
    </div>
  );
}

function OneOnOneWidgetContent({ size, onOpenProfile }: { size: WidgetSize; onOpenProfile: (p: Person) => void }) {
  const { cols, rows } = sizeToGrid(size);
  if (cols === 1 && rows === 1) return null;

  const reports = PEOPLE.filter(p => p.manager === CURRENT_USER.name);

  if (cols <= 2 && rows === 1) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: textSecondary }}>Next</span>
        <span className="text-[14px] font-medium" style={{ color: textPrimary }}>{reports[0]?.name ?? 'None'}</span>
      </div>
    );
  }

  if (cols <= 2 && rows === 2) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-[13px]" style={{ color: textSecondary }}>This week</div>
        {reports.slice(0, 3).map(p => (
          <PersonChip key={p.id} person={p} onClick={() => onOpenProfile(p)} />
        ))}
      </div>
    );
  }

  // 4x2 large
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[13px]" style={{ color: textSecondary }}>This week's 1:1s</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reports.slice(0, 4).map(p => (
          <button
            key={p.id}
            onClick={() => onOpenProfile(p)}
            className="flex items-center gap-3 p-3 rounded-full transition-colors text-left"
            style={{ backgroundColor: inactiveBg }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E4ECF1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
          >
            <Avatar person={p} size={36} fontSize={12} />
            <div className="min-w-0">
              <div className="text-[14px] font-medium truncate" style={{ color: textPrimary }}>{p.name}</div>
              <div className="text-[12px] truncate" style={{ color: textTertiary }}>{p.title}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[12px]" style={{ color: textTertiary }}>
        <IconSparkle size={12} />
        AI-prepared talking points available
      </div>
    </div>
  );
}

function OrgChartWidgetContent({ size }: { size: WidgetSize }) {
  const { cols, rows } = sizeToGrid(size);
  if (cols === 1 && rows === 1) return null;

  if (rows === 1) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ color: textSecondary }}>Your team</span>
        <span className="text-[24px] font-medium" style={{ color: textPrimary }}>{CURRENT_USER.directReports}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar person={CURRENT_USER} size={40} fontSize={13} />
      <div className="w-px h-3" style={{ backgroundColor: cardBorder }} />
      <div className="flex gap-1.5">
        {PEOPLE.filter(p => p.manager === CURRENT_USER.name).slice(0, 5).map(p => (
          <Avatar key={p.id} person={p} size={28} fontSize={9} />
        ))}
      </div>
      <span className="text-[12px]" style={{ color: textTertiary }}>{CURRENT_USER.directReports} direct reports</span>
    </div>
  );
}

function GenericWidgetContent({ size, label }: { size: WidgetSize; label: string }) {
  const { cols, rows } = sizeToGrid(size);
  if (cols === 1 && rows === 1) return null;
  return (
    <div className="text-[13px]" style={{ color: textSecondary }}>{label}</div>
  );
}

// ─── App Views ───

function PTOApp({ onOpenProfile }: { onOpenProfile: (p: Person) => void }) {
  const others = PEOPLE.filter(p => p.id !== CURRENT_USER.id);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="mb-8 sm:mb-10">
        <div className="text-[13px] mb-2" style={{ color: textSecondary }}>Your balance</div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[40px] sm:text-[56px] font-medium leading-none" style={{ color: textPrimary }}>{CURRENT_USER.ptoBalance}</span>
          <span className="text-[18px]" style={{ color: textTertiary }}>days available</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden max-w-sm mb-2" style={{ backgroundColor: '#DCE8EE' }}>
          <div className="h-full rounded-full" style={{ width: `${(CURRENT_USER.ptoBalance / 25) * 100}%`, backgroundColor: accent }} />
        </div>
        <div className="flex gap-8 text-[13px] max-w-sm" style={{ color: textTertiary }}>
          <span>{CURRENT_USER.ptoBalance} available</span>
          <span>7 used</span>
          <span>25 total</span>
        </div>
      </div>
      <button className="mb-10 px-6 py-3 rounded-full text-[15px] font-medium text-white transition-colors" style={{ backgroundColor: accent }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)} onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}>
        Request time off
      </button>
      <h3 className="text-[17px] font-medium mb-4" style={{ color: textPrimary }}>Team balances</h3>
      <div className="flex flex-col gap-2">
        {others.sort((a, b) => b.ptoBalance - a.ptoBalance).map(p => (
          <PersonCard key={p.id} person={p} onClick={() => onOpenProfile(p)} showPto />
        ))}
      </div>
    </div>
  );
}

function AppStoreApp() {
  const sections = [
    {
      title: 'Featured',
      apps: [
        { name: 'Workforce Analytics', desc: 'AI-powered insights across your workforce', aiBadge: false },
        { name: 'Workflow Builder', desc: 'Automate any HR process', aiBadge: false },
      ],
    },
    {
      title: 'Built by BambooHR',
      apps: [
        { name: 'Time Off', desc: 'Track and manage time off', aiBadge: false },
        { name: '1:1 Prep', desc: 'AI-prepared talking points', aiBadge: true },
        { name: 'Reviews', desc: 'Performance review cycles', aiBadge: false },
      ],
    },
    {
      title: 'Trending at your company',
      apps: [
        { name: 'Team Pulse', desc: 'Quick weekly check-ins', aiBadge: true },
        { name: 'OKR Tracker', desc: 'Goals and key results', aiBadge: false },
      ],
    },
    {
      title: 'AI-generated',
      apps: [
        { name: 'Attrition Predictor', desc: 'Predict flight risk with ML', aiBadge: true },
        { name: 'Comp Analyzer', desc: 'Market comp benchmarking', aiBadge: true },
        { name: 'Onboarding Bot', desc: 'AI onboarding assistant', aiBadge: true },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search apps..."
          className="w-full max-w-md px-5 py-3 rounded-2xl border text-[15px] focus:outline-none transition-colors"
          style={{ backgroundColor: bg, borderColor: cardBorder, color: textPrimary }}
          onFocus={e => (e.currentTarget.style.borderColor = cardBorderHover)}
          onBlur={e => (e.currentTarget.style.borderColor = cardBorder)}
        />
      </div>
      {sections.map(section => (
        <div key={section.title} className="mb-10">
          <h3 className="text-[17px] font-medium mb-4" style={{ color: textPrimary }}>{section.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.apps.map(app => (
              <div
                key={app.name}
                className="flex items-center gap-4 p-4 rounded-2xl border bg-white cursor-pointer transition-all"
                style={{ borderColor: cardBorder }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cardBorderHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: accentLight }}>
                  <IconGrid size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium truncate" style={{ color: textPrimary }}>{app.name}</span>
                    {app.aiBadge && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>}
                  </div>
                  <div className="text-[13px] truncate mt-0.5" style={{ color: textSecondary }}>{app.desc}</div>
                </div>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white shrink-0 transition-colors" style={{ backgroundColor: accent }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)} onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}>
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Chat Panel ───

interface ChatMessage {
  role: 'user' | 'assistant';
  text?: string;
  personCards?: Person[];
  widget?: { name: string };
}

function SpaceChatPanel({ onClose, onOpenProfile, onAddWidget }: { onClose: () => void; onOpenProfile: (p: Person) => void; onAddWidget: (name: string) => void }) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const teamByPto = PEOPLE.filter(p => p.manager === CURRENT_USER.name).sort((a, b) => b.ptoBalance - a.ptoBalance);

  const [messages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Who on my team has the most PTO banked?' },
    { role: 'assistant', text: 'Here are your direct reports ranked by PTO balance:', personCards: teamByPto },
    { role: 'user', text: 'Build me a widget that shows this live' },
    { role: 'assistant', text: 'Done \u2014 I built a Team PTO Leaderboard widget for your home screen.', widget: { name: 'Team PTO Leaderboard' } },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center" style={{ backgroundColor: 'rgba(28, 25, 23, 0.3)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="w-full max-w-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh]" style={{ backgroundColor: cardBg }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: cardBorder }}>
          <span className="text-[16px] font-medium" style={{ color: textPrimary }}>Ask BambooHR</span>
          <button onClick={onClose} className="transition-colors" style={{ color: textSecondary }} onMouseEnter={e => (e.currentTarget.style.color = textPrimary)} onMouseLeave={e => (e.currentTarget.style.color = textSecondary)}>
            <IconClose />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'rounded-2xl rounded-br-sm px-5 py-3 text-white' : ''}`} style={msg.role === 'user' ? { backgroundColor: accent } : undefined}>
                {msg.role === 'assistant' && (
                  <div className="flex flex-col gap-3">
                    {msg.text && <div className="text-[15px]" style={{ color: textPrimary }}>{msg.text}</div>}
                    {msg.personCards && (
                      <div className="flex flex-col gap-2 mt-1">
                        {msg.personCards.map(p => (
                          <PersonCard key={p.id} person={p} onClick={() => onOpenProfile(p)} showPto />
                        ))}
                      </div>
                    )}
                    {msg.widget && (
                      <div className="mt-2">
                        <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: cardBorder, backgroundColor: bg }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                            <IconCalendar size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[15px] font-medium" style={{ color: textPrimary }}>{msg.widget.name}</span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>
                            </div>
                            <div className="text-[12px] mt-0.5" style={{ color: textTertiary }}>Live widget</div>
                          </div>
                        </div>
                        <button
                          onClick={() => onAddWidget(msg.widget!.name)}
                          className="mt-3 px-4 py-2 rounded-full border text-[13px] font-medium transition-colors"
                          style={{ borderColor: cardBorder, color: textPrimary, backgroundColor: cardBg }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = cardBorderHover)}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}
                        >
                          Add to home screen
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {msg.role === 'user' && <span className="text-[15px]">{msg.text}</span>}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t" style={{ borderColor: cardBorder }}>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your people..."
              className="flex-1 px-5 py-3 rounded-2xl border text-[15px] focus:outline-none transition-colors"
              style={{ backgroundColor: bg, borderColor: cardBorder, color: textPrimary }}
              onFocus={e => (e.currentTarget.style.borderColor = cardBorderHover)}
              onBlur={e => (e.currentTarget.style.borderColor = cardBorder)}
            />
            <button className="w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 transition-colors" style={{ backgroundColor: accent }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)} onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}>
              <IconSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Size Picker Overlay ───

function SizePicker({ currentSize, onSelect, onClose }: { currentSize: WidgetSize; onSelect: (s: WidgetSize) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90]" onClick={onClose}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl border p-5 min-w-[260px]" style={{ backgroundColor: cardBg, borderColor: cardBorder }} onClick={e => e.stopPropagation()}>
        <div className="text-[14px] font-medium mb-4" style={{ color: textPrimary }}>Widget size</div>
        <div className="flex flex-col gap-1">
          {SIZE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onSelect(opt.value); onClose(); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-full text-[13px] transition-colors"
              style={{
                backgroundColor: opt.value === currentSize ? accentLight : 'transparent',
                color: opt.value === currentSize ? accent : textPrimary,
                fontWeight: opt.value === currentSize ? 500 : 400,
              }}
              onMouseEnter={e => { if (opt.value !== currentSize) e.currentTarget.style.backgroundColor = bg; }}
              onMouseLeave={e => { if (opt.value !== currentSize) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div className="w-8 h-4 grid grid-cols-4 gap-px">
                {Array.from({ length: 8 }).map((_, i) => {
                  const col = i % 4;
                  const row = Math.floor(i / 4);
                  const filled = col < opt.cols && row < opt.rows;
                  return (
                    <div key={i} className="rounded-[1px]" style={{ backgroundColor: filled ? accent : cardBorder }} />
                  );
                })}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Briefing Section (Spring Stack) ───

// Per-card rotation/offset for the fanned stack look
const STACK_OFFSETS = [
  { rotate: 0, x: 0, y: 0 },        // front card — flat, centered
  { rotate: 2.5, x: 8, y: 6 },      // second — slight right tilt
  { rotate: -1.8, x: -4, y: 10 },   // third — slight left tilt
  { rotate: 3.2, x: 12, y: 14 },    // fourth — more right
  { rotate: -2.2, x: -6, y: 16 },   // fifth+
];

// Priority tiers — first 4 are high priority, rest are lower
const HIGH_PRIORITY_IDS = new Set(['sara', 'kyle', 'toni', 'team']);

// Context cards for simple/medium card backs — keyed by card id
interface ContextSource {
  source: string;
  color: string;
  letter: string;
  metrics: { value: string; label: string }[];
  teams?: string[];
}
interface PersonContext {
  name: string;
  sources: ContextSource[];
}
interface CardContextEntry {
  allSummary: ContextSource[];
  people?: PersonContext[];
}
const CARD_CONTEXT: Record<string, CardContextEntry> = {
  toni: { allSummary: [
    { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['Design Systems', 'Product Design'], metrics: [
      { value: '3 yrs', label: 'Tenure' },
      { value: 'Sr. Designer', label: 'Current role' },
      { value: '2 promotions', label: 'Career moves' },
    ]},
    { source: 'Lattice', color: '#7B61FF', letter: 'L', metrics: [
      { value: '4.8/5', label: 'Last review score' },
      { value: 'Exceeds', label: 'Performance rating' },
    ]},
  ]},
  sara: { allSummary: [
    { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['Platform Engineering'], metrics: [
      { value: '8 days', label: 'PTO remaining' },
      { value: 'Jun 15', label: 'Requested dates' },
      { value: '0 conflicts', label: 'Team overlap' },
    ]},
  ]},
  team: {
    allSummary: [
      { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['Platform Engineering', 'API Team', 'DevOps'], metrics: [
        { value: '6', label: 'Direct reports' },
        { value: '2', label: 'On leave this week' },
        { value: '94%', label: 'Attendance rate' },
      ]},
      { source: 'Jira', color: '#2684FF', letter: 'J', metrics: [
        { value: '18', label: 'Total tasks assigned' },
        { value: '11', label: 'Combined capacity' },
      ]},
    ],
    people: [
      { name: 'Sara R.', sources: [
        { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['Platform Engineering'], metrics: [
          { value: '2 yrs', label: 'Tenure' },
          { value: 'SE II', label: 'Current role' },
        ]},
        { source: 'Jira', color: '#2684FF', letter: 'J', metrics: [
          { value: '6 / 4', label: 'Tasks / capacity' },
          { value: '83%', label: 'Sprint completion' },
        ]},
      ]},
      { name: 'Mike T.', sources: [
        { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['API Team'], metrics: [
          { value: '1.5 yrs', label: 'Tenure' },
          { value: 'SE I', label: 'Current role' },
        ]},
        { source: 'Jira', color: '#2684FF', letter: 'J', metrics: [
          { value: '5 / 3', label: 'Tasks / capacity' },
          { value: '71%', label: 'Sprint completion' },
        ]},
      ]},
      { name: 'Jen L.', sources: [
        { source: 'BambooHR', color: '#2D6A35', letter: 'B', teams: ['DevOps'], metrics: [
          { value: '3 yrs', label: 'Tenure' },
          { value: 'Sr. Engineer', label: 'Current role' },
        ]},
        { source: 'Jira', color: '#2684FF', letter: 'J', metrics: [
          { value: '7 / 4', label: 'Tasks / capacity' },
          { value: '90%', label: 'Sprint completion' },
        ]},
      ]},
    ],
  },
  turnover: { allSummary: [
    { source: 'BambooHR', color: '#2D6A35', letter: 'B', metrics: [
      { value: '12%', label: 'Annual turnover' },
      { value: '3', label: 'Exits this quarter' },
      { value: '18 mo', label: 'Avg tenure at exit' },
    ]},
  ]},
  'comp-gap': { allSummary: [
    { source: 'BambooHR', color: '#2D6A35', letter: 'B', metrics: [
      { value: '3', label: 'Below midpoint' },
      { value: '$12k', label: 'Avg gap' },
      { value: '87th', label: 'Market percentile target' },
    ]},
  ]},
  kyle: { allSummary: [
    { source: 'Jira', color: '#2684FF', letter: 'J', metrics: [
      { value: '3', label: 'Projects shipped' },
      { value: '100%', label: 'On-time delivery' },
    ]},
    { source: 'GitHub', color: '#24292F', letter: 'G', metrics: [
      { value: '47', label: 'PRs merged' },
      { value: '4.2h', label: 'Avg review turnaround' },
    ]},
    { source: 'BambooHR', color: '#2D6A35', letter: 'B', metrics: [
      { value: '$142k', label: 'Current comp' },
      { value: '3 yrs', label: 'Tenure' },
    ]},
    { source: 'Lattice', color: '#7B61FF', letter: 'L', metrics: [
      { value: '4.6/5', label: 'Peer feedback score' },
    ]},
  ]},
};

function IconMoreMenu() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="1.2" fill="currentColor" /><circle cx="8" cy="8" r="1.2" fill="currentColor" /><circle cx="12" cy="8" r="1.2" fill="currentColor" /></svg>;
}
function IconChevronLeft() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function IconChevronRight() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function BriefingSection({ completedCards, onComplete, onDismiss }: {
  completedCards: Set<string>;
  onComplete: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const [showLowerPriority, setShowLowerPriority] = useState(false);
  const [dismissedLowerPriority, setDismissedLowerPriority] = useState(false);
  const [showMoreExiting, setShowMoreExiting] = useState(false);
  const [dealInActive, setDealInActive] = useState(false);
  const [viewMode, setViewMode] = useState<'stack' | 'row'>('stack');
  const [viewTransitioning, setViewTransitioning] = useState(false);
  const [lastCardExiting, setLastCardExiting] = useState(false);
  const [rowPage, setRowPage] = useState(0);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [exitDir, setExitDir] = useState<'left' | 'right'>('left');
  const [rotation, setRotation] = useState(0);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [contextExpandedId, setContextExpandedId] = useState<string | null>(null);
  const [navAnimDir, setNavAnimDir] = useState<'left' | 'right' | null>(null);
  const [slidingUnderId, setSlidingUnderId] = useState<string | null>(null);
  const [collapsingRows, setCollapsingRows] = useState<Set<number>>(new Set());
  const [displayedGreeting, setDisplayedGreeting] = useState<string | null>(null);
  const [greetingAnimState, setGreetingAnimState] = useState<'idle' | 'out' | 'in'>('idle');

  // Grid constants for "See all" view
  const ROW_CARD_WIDTH = 320;
  const ROW_GAP = 16;
  const CARDS_PER_ROW = 3;

  // Split into tiers
  const highPriorityCards = BRIEFING_CARDS.filter(c => HIGH_PRIORITY_IDS.has(c.id));
  const lowerPriorityCards = BRIEFING_CARDS.filter(c => !HIGH_PRIORITY_IDS.has(c.id));
  const highVisible = highPriorityCards.filter(c => !completedCards.has(c.id));
  const lowerVisible = lowerPriorityCards.filter(c => !completedCards.has(c.id));
  const highAllDone = highVisible.length === 0;
  const lowerAllDone = lowerVisible.length === 0;

  // Current active cards — show-more only appears as a standalone card after all high-priority cleared
  const activeCards = !highAllDone ? highVisible : (showLowerPriority ? lowerVisible : []);
  const visibleCards = activeCards;

  // All cards in current tier (including completed) — used for stable row assignment
  const allCardsInTier = !highAllDone ? highPriorityCards : (showLowerPriority ? lowerPriorityCards : []);
  // Chunk into rows of CARDS_PER_ROW based on original order
  const cardRows: BriefingCard[][] = [];
  for (let i = 0; i < allCardsInTier.length; i += CARDS_PER_ROW) {
    cardRows.push(allCardsInTier.slice(i, i + CARDS_PER_ROW));
  }
  // Filter each row to only visible (non-completed) cards, preserving row assignment
  const visibleCardRows = cardRows.map(row => row.filter(c => !completedCards.has(c.id)));

  const getContent = useCallback((card: BriefingCard) => {
    return editedContent[card.id] ?? card.backContent;
  }, [editedContent]);

  const handleFlip = useCallback((id: string) => {
    setFlippedId(prev => {
      if (prev === id) {
        setContextExpandedId(null);
        return null;
      }
      return id;
    });
  }, []);

  const handleConfirm = useCallback((id: string) => {
    const isLast = visibleCards.filter(c => c.id !== id).length === 0;
    if (isLast) {
      setLastCardExiting(true);
      setExitingId(id);
      setExitDir('right');
      setTimeout(() => {
        onComplete(id);
        setExitingId(null);
        setFlippedId(null);
        setContextExpandedId(null);
        setRotation(0);
        setLastCardExiting(false);
      }, 500);
    } else {
      setExitingId(id);
      setExitDir('right');
      setTimeout(() => {
        onComplete(id);
        setExitingId(null);
        setFlippedId(null);
        setContextExpandedId(null);
        setRotation(0);
      }, 400);
    }
  }, [onComplete, visibleCards]);

  const handleDismissCard = useCallback((id: string) => {
    const isLast = visibleCards.filter(c => c.id !== id).length === 0;
    const isGrid = viewMode === 'row';

    // Find which row this card belongs to (for grid row-collapse)
    const rowIdx = cardRows.findIndex(row => row.some(c => c.id === id));
    const rowVisible = visibleCardRows[rowIdx]?.filter(c => c.id !== id) ?? [];
    const isLastInRow = isGrid && rowVisible.length === 0;

    if (isLast) {
      setLastCardExiting(true);
      setExitingId(id);
      setExitDir('left');
      setTimeout(() => {
        onDismiss(id);
        setExitingId(null);
        setFlippedId(null);
        setContextExpandedId(null);
        setRotation(0);
        setLastCardExiting(false);
      }, 500);
    } else {
      setExitingId(id);
      setExitDir('left');

      const exitDuration = isGrid ? 550 : 400;
      setTimeout(() => {
        // If this was the last card in its row, trigger row collapse
        if (isLastInRow && rowIdx >= 0) {
          setCollapsingRows(prev => new Set(prev).add(rowIdx));
          // After row collapse animation, remove from state and dismiss
          setTimeout(() => {
            onDismiss(id);
            setExitingId(null);
            setFlippedId(null);
            setContextExpandedId(null);
            setRotation(0);
            setCollapsingRows(prev => { const next = new Set(prev); next.delete(rowIdx); return next; });
          }, 350);
        } else {
          onDismiss(id);
          setExitingId(null);
          setFlippedId(null);
          setContextExpandedId(null);
          setRotation(0);
        }
      }, exitDuration);
    }
  }, [onDismiss, visibleCards, viewMode, cardRows, visibleCardRows]);

  const getCurrentFrontId = useCallback(() => {
    if (visibleCards.length === 0) return null;
    const r = rotation % visibleCards.length;
    return visibleCards[r].id;
  }, [visibleCards, rotation]);

  const triggerNavAnim = useCallback((dir: 'left' | 'right') => {
    const currentId = getCurrentFrontId();
    setSlidingUnderId(currentId);
    setNavAnimDir(dir);
    setTimeout(() => { setFlippedId(null); }, 350);
    setTimeout(() => { setNavAnimDir(null); setSlidingUnderId(null); }, 450);
  }, [getCurrentFrontId]);

  const handlePrev = useCallback(() => {
    if (visibleCards.length <= 1) return;
    triggerNavAnim('left');
    setRotation(prev => (prev - 1 + visibleCards.length) % visibleCards.length);
  }, [visibleCards.length, triggerNavAnim]);

  const handleNext = useCallback(() => {
    if (visibleCards.length <= 1) return;
    triggerNavAnim('right');
    setRotation(prev => (prev + 1) % visibleCards.length);
  }, [visibleCards.length, triggerNavAnim]);

  const handleDotClick = useCallback((idx: number) => {
    setFlippedId(null);
    const safeR = visibleCards.length > 0 ? rotation % visibleCards.length : 0;
    if (idx !== safeR) {
      triggerNavAnim(idx > safeR ? 'right' : 'left');
    }
    setRotation(idx);
  }, [visibleCards.length, rotation, triggerNavAnim]);

  const safeRotation = visibleCards.length > 0 ? rotation % visibleCards.length : 0;
  const orderedCards = visibleCards.length > 0
    ? [...visibleCards.slice(safeRotation), ...visibleCards.slice(0, safeRotation)]
    : [];
  const frontCard = orderedCards[0] ?? null;

  // Row pagination

  const flippedCard = flippedId ? BRIEFING_CARDS.find(c => c.id === flippedId) : null;
  const baseHeight = 310;
  const maxExpandedHeight = typeof window !== 'undefined' ? window.innerHeight - 220 : 500;
  const contextHeightBoost = flippedId && contextExpandedId === flippedId
    ? (flippedCard?.backLayout === 'heavy' ? 400 : 200)
    : 0;
  const rawHeight = flippedCard ? ((flippedCard.backExpandedHeight ?? baseHeight) + contextHeightBoost) : baseHeight;
  const containerHeight = Math.min(rawHeight, maxExpandedHeight);
  const isWideBack = flippedCard?.backLayout === 'heavy' || flippedCard?.backLayout === 'medium';

  // Greeting text
  const firstName = CURRENT_USER.name.split(' ')[0];
  const greetingText = highAllDone && !showLowerPriority && lowerVisible.length > 0
    ? `Nice work, ${firstName}. Top priorities handled.`
    : highAllDone && showLowerPriority && !lowerAllDone
    ? `A few more things if you have time.`
    : highAllDone && lowerAllDone
    ? `Nice work, ${firstName}. All clear.`
    : `Good morning, ${firstName}. Let's knock these out.`;

  // Animate greeting text transitions
  useEffect(() => {
    if (displayedGreeting === null) {
      // Initial mount — set without animation
      setDisplayedGreeting(greetingText);
      return;
    }
    if (greetingText !== displayedGreeting && greetingAnimState === 'idle') {
      // Text changed — animate out, then swap, then animate in
      setGreetingAnimState('out');
      setTimeout(() => {
        setDisplayedGreeting(greetingText);
        setGreetingAnimState('in');
        setTimeout(() => {
          setGreetingAnimState('idle');
        }, 400);
      }, 300);
    }
  }, [greetingText, displayedGreeting, greetingAnimState]);

  return (
    <div className="mb-8 pt-4 flex flex-col items-center">
      {/* 3D flip + stack + nav animations */}
      <style>{`
        .briefing-card-perspective { perspective: 800px; }
        .briefing-card-flipper {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.34, 1.3, 0.64, 1);
          position: relative; width: 100%; height: 100%;
        }
        .briefing-card-flipper.flipped { transform: rotateY(180deg); }
        .briefing-card-face {
          backface-visibility: hidden;
          position: absolute; inset: 0; border-radius: 16px; overflow: hidden;
        }
        .briefing-card-back { transform: rotateY(180deg); }
        .briefing-textarea { resize: none; font-family: inherit; }
        .briefing-textarea:focus {
          outline: none;
          border-color: ${cardBorderHover} !important;
          box-shadow: 0 0 0 3px rgba(90, 139, 163, 0.1);
        }
        @keyframes briefing-exit-left {
          0% { transform: rotate(0deg) translateX(0); opacity: 1; }
          100% { transform: rotate(-12deg) translateX(-120%) translateY(20px); opacity: 0; }
        }
        @keyframes briefing-exit-right {
          0% { transform: rotate(0deg) translateX(0); opacity: 1; }
          100% { transform: rotate(8deg) translateX(120%) translateY(20px); opacity: 0; }
        }
        @keyframes briefing-grid-exit {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(0.92); opacity: 0; }
        }
        .briefing-grid-cell {
          transition: width 0.35s ease 0.15s, min-width 0.35s ease 0.15s, margin 0.35s ease 0.15s, padding 0.35s ease 0.15s, opacity 0.35s ease 0.15s;
        }
        .briefing-grid-cell-exiting {
          width: 0 !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
        }
        @keyframes briefing-slide-left {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(-80px) scale(0.95); opacity: 0; }
        }
        @keyframes briefing-slide-right {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(80px) scale(0.95); opacity: 0; }
        }
        @keyframes briefing-enter-from-right {
          0% { transform: translateX(40px) scale(0.97); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes briefing-enter-from-left {
          0% { transform: translateX(-40px) scale(0.97); opacity: 0; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        .briefing-slide-left { animation: briefing-slide-left 0.3s cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none !important; }
        .briefing-slide-right { animation: briefing-slide-right 0.3s cubic-bezier(0.4, 0, 0.7, 0.2) forwards; pointer-events: none !important; }
        .briefing-enter-right { animation: briefing-enter-from-right 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
        .briefing-enter-left { animation: briefing-enter-from-left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both; }
        @keyframes briefing-section-fade-in {
          0% { opacity: 0; transform: translateY(12px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .briefing-section-fade-in { animation: briefing-section-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes briefing-section-fade-out {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }
        .briefing-section-fade-out { animation: briefing-section-fade-out 0.4s cubic-bezier(0.4, 0, 0.7, 0.2) forwards; }
        @keyframes briefing-showmore-exit {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        .briefing-showmore-exit { animation: briefing-showmore-exit 0.4s cubic-bezier(0.4, 0, 0.7, 0.2) forwards; }
        @keyframes briefing-morph-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(280px) rotate(360deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 1px;
          opacity: 0.6;
          animation: confetti-fall linear forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Greeting */}
      <div className="mb-2 text-center">
        <h1
          className="text-[18px] font-medium leading-snug"
          style={{
            color: accent,
            opacity: greetingAnimState === 'out' ? 0 : 1,
            transform: greetingAnimState === 'out' ? 'translateY(-8px)' : greetingAnimState === 'in' ? 'translateY(0)' : undefined,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {displayedGreeting ?? greetingText}
        </h1>
      </div>

      {/* View toggle — centered below headline */}
      {visibleCards.length > 1 && (
        <button
          onClick={() => {
            if (viewTransitioning) return;
            setViewTransitioning(true);
            setTimeout(() => {
              setViewMode(prev => prev === 'stack' ? 'row' : 'stack');
              setFlippedId(null);
              setRotation(0);
              setRowPage(0);
              setTimeout(() => setViewTransitioning(false), 50);
            }, 300);
          }}
          className="mb-4 text-[13px] font-medium transition-colors"
          style={{ color: surfaceBlueTertiary }}
          onMouseEnter={e => (e.currentTarget.style.color = surfaceBlueHover)}
          onMouseLeave={e => (e.currentTarget.style.color = surfaceBlueTertiary)}
        >
          {viewMode === 'stack' ? 'See all' : 'One at a time'}
        </button>
      )}

      {/* Show more prompt — animates in after all high-priority cleared */}
      {highAllDone && !showLowerPriority && !dismissedLowerPriority && lowerVisible.length > 0 && (
        <div
          className={`w-[380px] sm:w-[460px] rounded-2xl border p-6 flex flex-col items-center gap-3 text-center cursor-pointer transition-all relative ${showMoreExiting ? 'briefing-showmore-exit' : 'briefing-section-fade-in'}`}
          style={{ backgroundColor: cardBg, borderColor: cardBorder, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          onClick={() => { if (!showMoreExiting) { setShowMoreExiting(true); setTimeout(() => { setShowLowerPriority(true); setRotation(0); setDealInActive(true); setTimeout(() => setDealInActive(false), 800); }, 350); } }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = cardBorderHover)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}
        >
          {/* Close X */}
          <button
            onClick={e => { e.stopPropagation(); setDismissedLowerPriority(true); }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ color: textTertiary }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <IconClose />
          </button>
          <div className="flex -space-x-1">
            {lowerVisible.slice(0, 4).map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-medium" style={{ backgroundColor: '#E8F0F5', color: textSecondary }}>
                {c.isIcon ? (
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke={textTertiary} strokeWidth="1.5" /></svg>
                ) : (
                  c.avatarInitials || c.name.charAt(0)
                )}
              </div>
            ))}
          </div>
          <div className="text-[14px] font-medium" style={{ color: textPrimary }}>
            {lowerVisible.length} more item{lowerVisible.length !== 1 ? 's' : ''} if you have a minute
          </div>
          <div className="text-[13px]" style={{ color: textTertiary }}>
            Lower priority — review when you have time
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              className="px-5 py-2 rounded-full text-[13px] font-medium transition-colors border"
              style={{ borderColor: cardBorder, color: textPrimary, backgroundColor: cardBg }}
              onClick={e => { e.stopPropagation(); if (!showMoreExiting) { setShowMoreExiting(true); setTimeout(() => { setShowLowerPriority(true); setRotation(0); setDealInActive(true); setTimeout(() => setDealInActive(false), 800); }, 350); } }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = cardBorderHover)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}
            >
              Show me
            </button>
            <button
              className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
              style={{ color: textTertiary }}
              onClick={e => { e.stopPropagation(); setDismissedLowerPriority(true); }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Cards section */}
      {visibleCards.length > 0 && (
        <div className={`flex flex-col items-center ${lastCardExiting ? 'briefing-section-fade-out' : ''}`} style={{ opacity: viewTransitioning ? 0 : 1, transform: viewTransitioning ? 'scale(0.97)' : 'scale(1)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>

        {/* ── GRID VIEW (See all) ── */}
        {viewMode === 'row' && !flippedId && (
          <div className="flex flex-col gap-4 w-full items-center briefing-grid-container briefing-section-fade-in" style={{ maxWidth: CARDS_PER_ROW * ROW_CARD_WIDTH + (CARDS_PER_ROW - 1) * ROW_GAP }}>
            {visibleCardRows.map((rowCards, rowIdx) => {
              const isCollapsing = collapsingRows.has(rowIdx);
              const isEmpty = rowCards.length === 0 && !isCollapsing;
              if (isEmpty) return null;
              return (
                <div
                  key={rowIdx}
                  className="flex gap-4 justify-center w-full overflow-hidden"
                  style={{
                    maxHeight: isCollapsing ? 0 : 300,
                    opacity: isCollapsing ? 0 : 1,
                    marginTop: isCollapsing ? -8 : undefined,
                    marginBottom: isCollapsing ? -8 : undefined,
                    transition: 'max-height 0.35s ease, opacity 0.25s ease, margin 0.35s ease',
                  }}
                >
                  {rowCards.map(card => {
                    const isExiting = exitingId === card.id;
                    return (
                      <div
                        key={card.id}
                        className={`briefing-grid-cell ${isExiting ? 'briefing-grid-cell-exiting' : ''}`}
                        style={{ width: ROW_CARD_WIDTH, minWidth: isExiting ? 0 : ROW_CARD_WIDTH }}
                      >
                      <div
                        className="rounded-2xl border p-5 flex flex-col gap-2 cursor-pointer relative h-full"
                        style={{
                          backgroundColor: cardBg,
                          borderColor: cardBorder,
                          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                          animation: isExiting ? 'briefing-grid-exit 0.35s ease forwards' : undefined,
                          minWidth: ROW_CARD_WIDTH,
                        }}
                        onClick={() => { if (!isExiting) handleFlip(card.id); }}
                        onMouseEnter={e => { if (!isExiting) e.currentTarget.style.borderColor = cardBorderHover; }}
                        onMouseLeave={e => { if (!isExiting) e.currentTarget.style.borderColor = cardBorder; }}
                      >
                        {/* Confetti */}
                        {card.isCelebratory && (
                          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            {[
                              { left: '12%', delay: '0s', dur: '2.8s', color: '#F59E0B' },
                              { left: '35%', delay: '0.4s', dur: '3s', color: '#34D399' },
                              { left: '60%', delay: '0.7s', dur: '2.6s', color: '#60A5FA' },
                              { left: '82%', delay: '0.3s', dur: '3.1s', color: '#F472B6' },
                              { left: '50%', delay: '1s', dur: '2.7s', color: '#A78BFA' },
                              { left: '25%', delay: '0.8s', dur: '2.9s', color: '#FBBF24' },
                            ].map((c, i) => (
                              <div key={i} className="confetti-piece" style={{ left: c.left, top: -6, backgroundColor: c.color, animationDelay: c.delay, animationDuration: c.dur, width: i % 2 === 0 ? 5 : 6, height: i % 2 === 0 ? 5 : 4, borderRadius: i % 2 === 0 ? '50%' : '1px' }} />
                            ))}
                          </div>
                        )}
                        {/* Avatar + name */}
                        <div className="flex items-center gap-3">
                          {card.isIcon ? (
                            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: inactiveBg }}>
                              <IconDocument size={16} />
                            </div>
                          ) : (
                            <div className="relative shrink-0">
                              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium text-white overflow-hidden" style={{ backgroundColor: card.avatarColor }}>
                                {card.avatar ? <img src={card.avatar} alt={card.name} className="w-full h-full object-cover" /> : card.avatarInitials}
                              </div>
                              {card.isCelebratory && (
                                <div className="absolute -left-1.5 -bottom-0.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7', border: '2px solid white' }}>
                                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 3.5L13 5l-2.5 2.5.5 3.5L8 9.5 5 11l.5-3.5L3 5l3.5-.5z" fill="#F59E0B" /></svg>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-[14px] font-medium" style={{ color: textPrimary }}>{card.name}</div>
                            <div className="text-[12px]" style={{ color: textTertiary }}>{card.context}</div>
                          </div>
                          <button onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }} className="w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0" style={{ color: textTertiary }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                            <IconClose />
                          </button>
                        </div>
                        {/* Stat */}
                        {card.statCallout && (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[22px] font-semibold leading-none" style={{ color: card.statColor || textPrimary }}>{card.statCallout}</span>
                            <span className="text-[12px] font-medium" style={{ color: card.statColor ? `${card.statColor}99` : textTertiary }}>{card.statLabel}</span>
                          </div>
                        )}
                        <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color: textSecondary }}>{card.copy}</p>
                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-auto pt-1">
                          <button onClick={e => { e.stopPropagation(); handleFlip(card.id); }} className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors border" style={{ borderColor: cardBorder, color: textPrimary, backgroundColor: cardBg }} onMouseEnter={e => (e.currentTarget.style.borderColor = cardBorderHover)} onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}>
                            {card.primaryAction}
                          </button>
                          <button onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }} className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors" style={{ color: textTertiary }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                            Not now
                          </button>
                        </div>
                      </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* ── GRID VIEW — flipped single card ── */}
        {viewMode === 'row' && flippedId && (() => {
          const card = visibleCards.find(c => c.id === flippedId);
          if (!card) return null;
          const flippedWidth = contextExpandedId === card.id
            ? (card.backLayout === 'heavy' ? Math.min(1200, window.innerWidth - 120) : Math.min(780, window.innerWidth - 120))
            : 460;
          const gridContextBoost = contextExpandedId === card.id ? (card.backLayout === 'heavy' ? 400 : 200) : 0;
          const flippedHeight = (card.backExpandedHeight ?? 300) + gridContextBoost;
          return (
            <div className="flex flex-col items-center briefing-section-fade-in" style={{ width: flippedWidth, transition: 'width 0.4s cubic-bezier(0.34, 1.3, 0.64, 1)' }}>
              <div
                className="rounded-2xl border flex flex-col w-full overflow-hidden"
                style={{
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  minHeight: flippedHeight,
                  maxHeight: typeof window !== 'undefined' ? window.innerHeight - 220 : 600,
                }}
              >
                {/* Back header — sticky top */}
                <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-2 shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-[13px] font-medium" style={{ color: accent }}>
                        {card.backEditable ? 'Edit & send' : 'Ready to go'}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => setFlippedId(null)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: textTertiary }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <IconBack />
                      </button>
                      <button
                        onClick={() => handleDismissCard(card.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                        style={{ color: textTertiary }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <IconClose />
                      </button>
                    </div>
                  </div>
                  <div className="text-[15px] font-medium mb-1" style={{ color: textPrimary }}>
                    {card.backTitle}
                  </div>
                </div>

                {/* Back content — scrollable */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 min-h-0">
                  <div className={`flex ${contextExpandedId === card.id ? 'gap-4' : ''}`}>
                    <div className={`flex-1 flex flex-col ${contextExpandedId === card.id ? 'min-w-0' : ''}`}>
                      {card.backCustom === 'kyle-review' ? (
                        <KyleReviewBack contextExpanded={contextExpandedId === card.id} />
                      ) : card.visualType && !card.backEditable ? (
                        <CardBackVisual type={card.visualType} />
                      ) : card.backEditable ? (
                        <>
                          {card.visualType && <CardBackVisual type={card.visualType} />}
                          <textarea
                            className="briefing-textarea flex-1 rounded-xl p-3.5 text-[13px] leading-relaxed w-full"
                            style={{
                              backgroundColor: inputBg,
                              color: textSecondary,
                              border: `1px solid ${cardBorder}`,
                              transition: 'border-color 0.2s, box-shadow 0.2s',
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                              minHeight: 140,
                            }}
                            value={getContent(card)}
                            onChange={e => setEditedContent(prev => ({ ...prev, [card.id]: e.target.value }))}
                          />
                        </>
                      ) : (
                        <div
                          className="flex-1 text-[13px] leading-relaxed whitespace-pre-line"
                          style={{ color: textSecondary }}
                        >
                          {card.backContent}
                        </div>
                      )}
                    </div>
                    {contextExpandedId === card.id && !card.backCustom && CARD_CONTEXT[card.id] && (
                      <div className="w-[240px] shrink-0">
                        <ContextColumn cardId={card.id} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Fade gradient above sticky footer */}
                <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />

                {/* Back actions — sticky bottom */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
                  <button
                    onClick={() => handleConfirm(card.id)}
                    className="px-4 py-2 rounded-full text-[13px] font-medium text-white transition-colors"
                    style={{ backgroundColor: accent }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}
                  >
                    {card.backConfirm}
                  </button>
                  <button
                    onClick={() => setFlippedId(null)}
                    className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                    style={{ color: textTertiary }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Back to all
                  </button>
                  {CARD_CONTEXT[card.id] && (
                    <button
                      onClick={() => setContextExpandedId(prev => prev === card.id ? null : card.id)}
                      className="flex items-center gap-1.5 py-2 text-[13px] font-medium transition-colors ml-auto"
                      style={{ color: surfaceWhiteTertiary }}
                      onMouseEnter={e => (e.currentTarget.style.color = surfaceWhiteHover)}
                      onMouseLeave={e => (e.currentTarget.style.color = surfaceWhiteTertiary)}
                    >
                      {contextExpandedId === card.id
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                        : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M7 4v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                      }
                      {contextExpandedId === card.id ? 'Less context' : 'More context'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── STACK VIEW ── */}
        {viewMode === 'stack' && (
        <div className="flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0"
            style={{ color: visibleCards.length > 1 ? surfaceBlueTertiary : cardBorder }}
            disabled={visibleCards.length <= 1}
            onMouseEnter={e => { if (visibleCards.length > 1) { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = surfaceBlueHover; } }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = visibleCards.length > 1 ? surfaceBlueTertiary : cardBorder; }}
          >
            <IconChevronLeft />
          </button>

          {/* Card stack */}
          <div
            className="relative"
            style={{
              width: (flippedId && contextExpandedId === flippedId)
                ? (flippedCard?.backLayout === 'heavy' ? Math.min(1200, window.innerWidth - 120) : Math.min(780, window.innerWidth - 120))
                : 460,
              minWidth: 380,
              height: containerHeight,
              transition: 'width 0.4s cubic-bezier(0.34, 1.3, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.3, 0.64, 1)',
            }}
          >
            {[...orderedCards].reverse().map((card, reverseIdx) => {
              const stackIdx = orderedCards.length - 1 - reverseIdx;
              const offset = STACK_OFFSETS[stackIdx] ?? STACK_OFFSETS[STACK_OFFSETS.length - 1];
              const isFront = stackIdx === 0;
              const isExiting = exitingId === card.id;
              const isSlidingUnder = slidingUnderId === card.id;
              const isFlipped = flippedId === card.id;
              const scale = 1 - stackIdx * 0.03;
              const cardContextBoost = contextExpandedId === card.id ? (card.backLayout === 'heavy' ? 400 : 200) : 0;
              const cardExpandedH = (card.backExpandedHeight ?? baseHeight) + cardContextBoost;



              return (
                <div
                  key={card.id}
                  className={`absolute left-0 right-0 top-0 briefing-card-perspective ${isFront && navAnimDir && !isExiting && !isSlidingUnder ? (navAnimDir === 'right' ? 'briefing-enter-right' : 'briefing-enter-left') : ''} ${isSlidingUnder && navAnimDir ? (navAnimDir === 'right' ? 'briefing-slide-left' : 'briefing-slide-right') : ''}`}
                  style={{
                    height: isFlipped ? cardExpandedH : baseHeight,
                    transition: isSlidingUnder ? 'none' : 'height 0.4s cubic-bezier(0.34, 1.3, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: isExiting ? 20 : isSlidingUnder ? 15 : (10 - stackIdx),
                    transform: isExiting || isSlidingUnder
                      ? undefined
                      : `rotate(${offset.rotate}deg) translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: 'center bottom',
                    animation: isExiting
                      ? `briefing-exit-${exitDir} 0.4s cubic-bezier(0.4, 0, 0.7, 0.2) forwards`
                      : dealInActive
                      ? `briefing-morph-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both`
                      : undefined,
                    pointerEvents: isFront ? 'auto' : 'none',
                  }}
                >
                  <div className={`briefing-card-flipper ${isFlipped ? 'flipped' : ''}`} style={isSlidingUnder ? { transition: 'none' } : undefined}>
                    {/* ── FRONT ── */}
                    <div
                      className="briefing-card-face rounded-2xl border p-5 sm:p-6 flex flex-col gap-2 sm:gap-3 cursor-pointer"
                      style={{
                        backgroundColor: cardBg,
                        borderColor: cardBorder,
                        boxShadow: isFront
                          ? '0 4px 20px rgba(0,0,0,0.08)'
                          : `0 ${2 + stackIdx}px ${8 + stackIdx * 4}px rgba(0,0,0,${0.04 + stackIdx * 0.02})`,
                      }}
                      onClick={isFront ? () => handleFlip(card.id) : undefined}
                    >
                      {/* Confetti for celebratory cards */}
                      {card.isCelebratory && (
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          {[
                            { left: '12%', delay: '0s', dur: '2.8s', color: '#F59E0B' },
                            { left: '28%', delay: '0.3s', dur: '3.2s', color: '#34D399' },
                            { left: '45%', delay: '0.6s', dur: '2.5s', color: '#60A5FA' },
                            { left: '62%', delay: '0.2s', dur: '3s', color: '#F472B6' },
                            { left: '78%', delay: '0.8s', dur: '2.6s', color: '#A78BFA' },
                            { left: '90%', delay: '0.4s', dur: '3.1s', color: '#FBBF24' },
                            { left: '5%', delay: '1s', dur: '2.9s', color: '#6EE7B7' },
                            { left: '35%', delay: '1.2s', dur: '2.7s', color: '#93C5FD' },
                            { left: '55%', delay: '0.5s', dur: '3.3s', color: '#FCA5A5' },
                            { left: '72%', delay: '1.1s', dur: '2.4s', color: '#C4B5FD' },
                            { left: '18%', delay: '0.7s', dur: '3s', color: '#FDE68A' },
                            { left: '85%', delay: '0.9s', dur: '2.8s', color: '#6EE7B7' },
                          ].map((c, i) => (
                            <div
                              key={i}
                              className="confetti-piece"
                              style={{
                                left: c.left,
                                top: -6,
                                backgroundColor: c.color,
                                animationDelay: c.delay,
                                animationDuration: c.dur,
                                width: i % 3 === 0 ? 5 : i % 3 === 1 ? 7 : 4,
                                height: i % 3 === 0 ? 5 : i % 3 === 1 ? 4 : 7,
                                borderRadius: i % 2 === 0 ? '50%' : '1px',
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Top bar: avatar/name + menu + close */}
                      <div className="flex items-center gap-3">
                        {card.isIcon ? (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: inactiveBg }}>
                            <IconDocument size={18} />
                          </div>
                        ) : (
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium text-white overflow-hidden" style={{ backgroundColor: card.avatarColor }}>
                              {card.avatar ? (
                                <img src={card.avatar} alt={card.name} className="w-full h-full object-cover" />
                              ) : (
                                card.avatarInitials
                              )}
                            </div>
                            {card.isCelebratory && (
                              <div className="absolute -left-2 -bottom-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7', border: '2px solid white' }}>
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 1l1.5 3.5L13 5l-2.5 2.5.5 3.5L8 9.5 5 11l.5-3.5L3 5l3.5-.5z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.5" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-[15px] font-medium" style={{ color: textPrimary }}>{card.name}</div>
                          <div className="text-[13px]" style={{ color: textTertiary }}>{card.context}</div>
                        </div>
                        {/* Menu + Close */}
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={e => e.stopPropagation()}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                            style={{ color: textTertiary }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <IconMoreMenu />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }}
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                            style={{ color: textTertiary }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <IconClose />
                          </button>
                        </div>
                      </div>

                      {/* Stat callout */}
                      {card.statCallout && (
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-[28px] font-semibold leading-none" style={{ color: card.statColor || textPrimary }}>{card.statCallout}</span>
                          <span className="text-[13px] font-medium" style={{ color: card.statColor ? `${card.statColor}99` : textTertiary }}>{card.statLabel}</span>
                        </div>
                      )}

                      <p className="text-[14px] leading-relaxed" style={{ color: textSecondary }}>
                        {card.copy}
                      </p>
                      {card.visualType && <CardFrontVisual type={card.visualType} />}

                      {/* Front action button */}
                      {isFront && (
                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            onClick={e => { e.stopPropagation(); handleFlip(card.id); }}
                            className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors border"
                            style={{ borderColor: cardBorder, color: textPrimary, backgroundColor: cardBg }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = cardBorderHover)}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}
                          >
                            {card.primaryAction}
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }}
                            className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                            style={{ color: textTertiary }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            Not now
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ── BACK ── */}
                    <div
                      className="briefing-card-face briefing-card-back rounded-2xl border flex flex-col cursor-pointer overflow-hidden"
                      style={{
                        backgroundColor: cardBg,
                        borderColor: cardBorder,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      }}
                      onClick={() => handleFlip(card.id)}
                    >
                      {/* Back header — sticky top */}
                      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-2 shrink-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                            <span className="text-[13px] font-medium" style={{ color: accent }}>
                              {card.backEditable ? 'Edit & send' : 'Ready to go'}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={e => e.stopPropagation()}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ color: textTertiary }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <IconMoreMenu />
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ color: textTertiary }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <IconClose />
                            </button>
                          </div>
                        </div>
                        <div className="text-[15px] font-medium mb-1" style={{ color: textPrimary }}>
                          {card.backTitle}
                        </div>
                      </div>

                      {/* Back content — scrollable */}
                      <div className="flex-1 overflow-y-auto px-5 sm:px-6 min-h-0">
                        <div className={`flex ${contextExpandedId === card.id ? 'gap-4' : ''}`}>
                          <div className={`flex-1 flex flex-col ${contextExpandedId === card.id ? 'min-w-0' : ''}`}>
                            {card.backCustom === 'kyle-review' ? (
                              <KyleReviewBack contextExpanded={contextExpandedId === card.id} />
                            ) : card.visualType && !card.backEditable ? (
                              <CardBackVisual type={card.visualType} />
                            ) : card.backEditable ? (
                              <>
                                {card.visualType && <CardBackVisual type={card.visualType} />}
                                <textarea
                                  className="briefing-textarea flex-1 rounded-xl p-3.5 text-[13px] leading-relaxed w-full"
                                  style={{
                                    backgroundColor: inputBg,
                                    color: textSecondary,
                                    border: `1px solid ${cardBorder}`,
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                                    minHeight: 140,
                                  }}
                                  value={getContent(card)}
                                  onChange={e => setEditedContent(prev => ({ ...prev, [card.id]: e.target.value }))}
                                  onClick={e => e.stopPropagation()}
                                />
                              </>
                            ) : (
                              <div
                                className="flex-1 text-[13px] leading-relaxed whitespace-pre-line"
                                style={{ color: textSecondary }}
                              >
                                {card.backContent}
                              </div>
                            )}
                          </div>
                          {contextExpandedId === card.id && !card.backCustom && CARD_CONTEXT[card.id] && (
                            <div className="w-[240px] shrink-0">
                              <ContextColumn cardId={card.id} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Fade gradient above sticky footer */}
                      <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />

                      {/* Back actions — sticky bottom */}
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
                        <button
                          onClick={e => { e.stopPropagation(); handleConfirm(card.id); }}
                          className="px-4 py-2 rounded-full text-[13px] font-medium text-white transition-colors"
                          style={{ backgroundColor: accent }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentHover)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = accent)}
                        >
                          {card.backConfirm}
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); handleDismissCard(card.id); }}
                          className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                          style={{ color: textTertiary }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Not now
                        </button>
                        {CARD_CONTEXT[card.id] && (
                          <button
                            onClick={e => { e.stopPropagation(); setContextExpandedId(prev => prev === card.id ? null : card.id); }}
                            className="flex items-center gap-1.5 py-2 text-[13px] font-medium transition-colors ml-auto"
                            style={{ color: surfaceWhiteTertiary }}
                            onMouseEnter={e => (e.currentTarget.style.color = surfaceWhiteHover)}
                            onMouseLeave={e => (e.currentTarget.style.color = surfaceWhiteTertiary)}
                          >
                            {contextExpandedId === card.id
                              ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                              : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M7 4v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                            }
                            {contextExpandedId === card.id ? 'Less context' : 'More context'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0"
            style={{ color: visibleCards.length > 1 ? surfaceBlueTertiary : cardBorder }}
            disabled={visibleCards.length <= 1}
            onMouseEnter={e => { if (visibleCards.length > 1) { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = surfaceBlueHover; } }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = visibleCards.length > 1 ? surfaceBlueTertiary : cardBorder; }}
          >
            <IconChevronRight />
          </button>
        </div>
        )}

        {/* Clickable dot indicators — stack view only */}
        {viewMode === 'stack' && visibleCards.length > 1 && (
          <div className="flex items-center gap-3 mt-10">
            <div className="flex gap-2">
              {visibleCards.map((card, idx) => {
                const isActive = frontCard && card.id === frontCard.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => handleDotClick(idx)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: isActive ? '#5A8BA3' : '#C8DAE4',
                      transform: isActive ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}


        </div>
      )}
    </div>
  );
}

// ─── Primitives Showcase ───

function PrimitivesPage() {
  const teamByPto = PEOPLE.filter(p => p.manager === CURRENT_USER.name).sort((a, b) => b.ptoBalance - a.ptoBalance);

  // Interactive toggles
  const [showPto, setShowPto] = useState(false);
  const [cardBackLayout, setCardBackLayout] = useState<'simple' | 'medium' | 'heavy'>('simple');
  const [contextExpanded, setContextExpanded] = useState(false);
  const [contentMode, setContentMode] = useState<'editable' | 'readonly'>('editable');
  const [briefingTone, setBriefingTone] = useState<'neutral' | 'positive'>('neutral');
  const [powerBarValue, setPowerBarValue] = useState(3);
  const [stickyFooterDemo, setStickyFooterDemo] = useState(false);
  const [personTabDemo, setPersonTabDemo] = useState<string | null>(null);

  // Section label helper
  const SectionLabel = ({ children }: { children: string }) => (
    <div className="text-[12px] font-medium uppercase tracking-wider mb-3" style={{ color: textTertiary }}>{children}</div>
  );
  const SubLabel = ({ children }: { children: string }) => (
    <div className="text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: textTertiary }}>{children}</div>
  );
  const CategoryHeader = ({ children }: { children: string }) => (
    <div className="pt-4 pb-2 mb-2" style={{ borderBottom: `1px solid ${cardBorder}` }}>
      <h2 className="text-[18px] font-medium" style={{ color: textPrimary }}>{children}</h2>
    </div>
  );
  const Toggle = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
      style={{
        backgroundColor: active ? textPrimary : '#F0F5F8',
        color: active ? '#FFFFFF' : textSecondary,
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
        <div>
          <h1 className="text-[28px] font-medium mb-2" style={{ color: accent }}>Design Library</h1>
          <p className="text-[15px]" style={{ color: textSecondary }}>Interactive primitives for the Space experience. Toggle states and variants below.</p>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* TYPOGRAPHY */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Typography</CategoryHeader>

        <div className="flex flex-col gap-6">
          <SectionLabel>Greeting H1</SectionLabel>
          <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="text-[18px] font-medium leading-snug" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>
              Good morning, Dave. Let&apos;s knock these out.
            </div>
            <div className="text-[18px] font-medium leading-snug" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>
              Nice work, Dave. Top priorities handled.
            </div>
            <div className="text-[18px] font-medium leading-snug" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>
              Nice work, Dave. All clear.
            </div>
            <div className="text-[18px] font-medium leading-snug" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>
              A few more things if you have time.
            </div>
            <div className="pt-2 text-[12px]" style={{ color: textTertiary }}>
              18px medium, font: Fields, color: accent ({accent}). Used for briefing section greeting.
            </div>
          </div>

          <SectionLabel>Onboarding H1</SectionLabel>
          <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="text-[28px] sm:text-[36px] font-medium leading-snug" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>
              Welcome! Tell me about your business.
            </div>
            <div className="pt-2 text-[12px]" style={{ color: textTertiary }}>
              28–36px medium, font: Fields, color: accent ({accent}). Used for onboarding welcome state.
            </div>
          </div>

          <SectionLabel>Page &amp; Section Headings</SectionLabel>
          <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
            <div className="text-[28px] font-medium" style={{ color: accent, fontFamily: "'Fields', system-ui, sans-serif" }}>Page Title (28px, Fields, accent)</div>
            <div className="text-[18px] font-medium" style={{ color: textPrimary }}>Section Header (18px, Inter, textPrimary)</div>
            <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Subsection (15px, Inter, textPrimary)</div>
            <div className="text-[13px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Label (13px caps, Inter, textTertiary)</div>
            <div className="pt-2 text-[12px]" style={{ color: textTertiary }}>
              H1s &amp; page titles: Fields, accent ({accent}). Section headers: 18px Inter medium, textPrimary. Labels: 13px Inter caps, textTertiary.
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* TOKENS & BADGES */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Tokens &amp; Badges</CategoryHeader>

        <section>
          <SectionLabel>Design Tokens</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'bg', value: bg },
              { name: 'cardBg', value: cardBg },
              { name: 'cardBorder', value: cardBorder },
              { name: 'cardBorderHover', value: cardBorderHover },
              { name: 'textPrimary', value: textPrimary },
              { name: 'textSecondary', value: textSecondary },
              { name: 'textTertiary', value: textTertiary },
              { name: 'accent', value: accent },
              { name: 'accentHover', value: accentHover },
              { name: 'accentLight', value: accentLight },
              { name: 'coral', value: coral },
              { name: 'inactiveBg', value: inactiveBg },
              { name: 'inputBg', value: inputBg },
              { name: 'contextBorder', value: contextBorder },
              { name: 'surfaceBlueTertiary', value: surfaceBlueTertiary },
            ].map(t => (
              <div key={t.name} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: t.value, borderColor: cardBorder }} />
                <div>
                  <div className="text-[11px] font-medium" style={{ color: textPrimary }}>{t.name}</div>
                  <div className="text-[10px]" style={{ color: textTertiary }}>{t.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Status Badges</SectionLabel>
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium" style={{ backgroundColor: accentLight, color: accent }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#FEF3E2] text-[#9A6B3A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A6B3A]" />
              On Leave
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#EDF2F7] text-[#5A7A8A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A7A8A]" />
              Remote
            </span>
          </div>
        </section>

        <section>
          <SectionLabel>AI-built Badge</SectionLabel>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* PEOPLE */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>People</CategoryHeader>

        <section>
          <SectionLabel>Person Chip</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {PEOPLE.slice(0, 4).map(p => (
              <PersonChip key={p.id} person={p} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Person Card</SectionLabel>
            <div className="flex gap-1.5">
              <Toggle label="Default" active={!showPto} onClick={() => setShowPto(false)} />
              <Toggle label="With PTO" active={showPto} onClick={() => setShowPto(true)} />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-md">
            {PEOPLE.slice(0, 2).map(p => (
              <PersonCard key={p.id} person={p} showPto={showPto} />
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Person Profile Header</SectionLabel>
          <div className="rounded-2xl border overflow-hidden p-8" style={{ borderColor: cardBorder, backgroundColor: cardBg }}>
            <div className="flex items-start gap-6">
              <Avatar person={PEOPLE[0]} size={72} fontSize={24} />
              <div className="pt-1">
                <h2 className="text-[28px] font-medium leading-tight" style={{ color: textPrimary }}>{PEOPLE[0].name}</h2>
                <div className="text-[16px] mt-1" style={{ color: textSecondary }}>{PEOPLE[0].title}</div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium" style={{ backgroundColor: accentLight, color: accent }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    {PEOPLE[0].status}
                  </span>
                  <span className="text-[13px]" style={{ color: textTertiary }}>{PEOPLE[0].location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* INPUTS & CONTENT */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Inputs &amp; Content</CategoryHeader>

        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Text Content</SectionLabel>
            <div className="flex gap-1.5">
              <Toggle label="Editable" active={contentMode === 'editable'} onClick={() => setContentMode('editable')} />
              <Toggle label="Read-only" active={contentMode === 'readonly'} onClick={() => setContentMode('readonly')} />
            </div>
          </div>
          <div className="max-w-md">
            {contentMode === 'editable' ? (
              <div>
                <SubLabel>Editable Input — blue tint + inset shadow</SubLabel>
                <textarea
                  className="rounded-xl p-3 text-[13px] leading-relaxed w-full resize-none"
                  rows={4}
                  defaultValue="Hey James — just a heads up that Sara hasn't taken any PTO in over 6 months. Might be worth a quick check-in."
                  style={{
                    backgroundColor: inputBg,
                    color: textSecondary,
                    border: `1px solid ${cardBorder}`,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                  }}
                />
              </div>
            ) : (
              <div>
                <SubLabel>Read-only Text — plain, no container</SubLabel>
                <div className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: textSecondary }}>
                  Sara is currently assigned to 3 active sprints across Platform and Frontend. Two of those sprints overlap, creating a scheduling conflict for the next two weeks.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* CONTEXT CARDS */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Context Cards</CategoryHeader>

        <section>
          <SectionLabel>Context Card — Single Source</SectionLabel>
          <p className="text-[13px] mb-3" style={{ color: textSecondary }}>White bg, contextBorder ({contextBorder}). Displays metrics from a single integration source.</p>
          <div className="flex gap-3 max-w-md">
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}><span className="text-[7px] font-bold text-white">B</span></div>
                <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4 years</span><span className="text-[10px]" style={{ color: textTertiary }}>Tenure</span></div>
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>3</span><span className="text-[10px]" style={{ color: textTertiary }}>New hires mentored</span></div>
                <div className="pt-1 mt-1" style={{ borderTop: `1px solid ${contextBorder}` }}>
                  <span className="text-[10px]" style={{ color: textTertiary }}>Teams</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: inactiveBg, color: textSecondary }}>Design Systems</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: inactiveBg, color: textSecondary }}>Product Design</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.7" /><rect x="10" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="1" y="10" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="10" y="10" width="5" height="5" rx="1" fill="#7B61FF" /></svg>
                <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Lattice</span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4.8/5</span><span className="text-[10px]" style={{ color: textTertiary }}>Peer feedback</span></div>
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>12</span><span className="text-[10px]" style={{ color: textTertiary }}>Goals completed</span></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Person Tabs (Multi-person Context)</SectionLabel>
          </div>
          <p className="text-[13px] mb-3" style={{ color: textSecondary }}>When context applies to multiple people, tabs let you switch between All summary and individual data.</p>
          <div className="max-w-[260px]">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                onClick={() => setPersonTabDemo(null)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
                style={{
                  backgroundColor: personTabDemo === null ? textPrimary : '#F0F5F8',
                  color: personTabDemo === null ? '#FFFFFF' : textSecondary,
                }}
              >
                All
              </button>
              {['Sara R.', 'Mike T.', 'Jen L.'].map(name => (
                <button
                  key={name}
                  onClick={() => setPersonTabDemo(prev => prev === name ? null : name)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
                  style={{
                    backgroundColor: personTabDemo === name ? textPrimary : '#F0F5F8',
                    color: personTabDemo === name ? '#FFFFFF' : textSecondary,
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}><span className="text-[7px] font-bold text-white">B</span></div>
                <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>{personTabDemo ? '2' : '6'}</span><span className="text-[10px]" style={{ color: textTertiary }}>Active sprints</span></div>
                <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>{personTabDemo ? '1' : '3'}</span><span className="text-[10px]" style={{ color: textTertiary }}>Overlapping</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* POWER BAR */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Interactive Controls</CategoryHeader>

        <section>
          <SectionLabel>Power Bar</SectionLabel>
          <p className="text-[13px] mb-3" style={{ color: textSecondary }}>Segmented rating with 5 levels. Click to change. Active segment glows and scales.</p>
          <div className="max-w-sm">
            <PowerBar value={powerBarValue} onChange={setPowerBarValue} />
          </div>
        </section>

        <section>
          <SectionLabel>More / Less Context Button</SectionLabel>
          <p className="text-[13px] mb-3" style={{ color: textSecondary }}>Plus/minus circle icon toggles the context column on card backs.</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1.5 py-2 text-[13px] font-medium transition-colors" style={{ color: surfaceWhiteTertiary }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M7 4v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              More context
            </button>
            <button className="flex items-center gap-1.5 py-2 text-[13px] font-medium transition-colors" style={{ color: surfaceWhiteTertiary }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              Less context
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* BRIEFING CARDS (FRONT) */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Briefing Cards — Front</CategoryHeader>

        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Briefing Action Card</SectionLabel>
            <div className="flex gap-1.5">
              <Toggle label="Neutral" active={briefingTone === 'neutral'} onClick={() => setBriefingTone('neutral')} />
              <Toggle label="Positive" active={briefingTone === 'positive'} onClick={() => setBriefingTone('positive')} />
            </div>
          </div>
          <div className="max-w-[320px]">
            {briefingTone === 'neutral' ? (
              <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium text-white shrink-0" style={{ backgroundColor: '#C2402C' }}>SR</div>
                  <div>
                    <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Sara</div>
                    <div className="text-[13px]" style={{ color: textTertiary }}>No PTO in 6 months</div>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: textSecondary }}>Engagement dipped last quarter. Her manager might want a heads up — one quick message could make a real difference.</p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Nudge her manager</button>
                  <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textSecondary }}>Dismiss</button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ backgroundColor: '#F0F8F2', borderColor: '#C2DCC8' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium text-white shrink-0" style={{ backgroundColor: '#2D6A35' }}>TN</div>
                  <div>
                    <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Toni</div>
                    <div className="text-[13px]" style={{ color: textTertiary }}>4-year anniversary tomorrow</div>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: textSecondary }}>Four years is a big deal. BambooHR wrote a short note — just review and send.</p>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Review and send</button>
                  <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textSecondary }}>Write my own</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* CARD BACK TEMPLATES */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Card Backs</CategoryHeader>

        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <SectionLabel>Card Back Layout</SectionLabel>
              <p className="text-[13px] -mt-1" style={{ color: textSecondary }}>Three density levels. Toggle context expansion on Simple.</p>
            </div>
            <div className="flex gap-1.5">
              <Toggle label="Simple" active={cardBackLayout === 'simple'} onClick={() => { setCardBackLayout('simple'); setContextExpanded(false); }} />
              <Toggle label="Medium" active={cardBackLayout === 'medium'} onClick={() => { setCardBackLayout('medium'); setContextExpanded(false); }} />
              <Toggle label="Heavy" active={cardBackLayout === 'heavy'} onClick={() => { setCardBackLayout('heavy'); setContextExpanded(false); }} />
            </div>
          </div>

          {/* Simple card back */}
          {cardBackLayout === 'simple' && (
            <div className="rounded-2xl border flex flex-col overflow-hidden" style={{ backgroundColor: cardBg, borderColor: cardBorder, maxWidth: contextExpanded ? 780 : 460, transition: 'max-width 0.3s ease' }}>
              {/* Sticky header */}
              <div className="px-5 pt-5 pb-2 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-[13px] font-medium" style={{ color: accent }}>Edit & send</span>
                </div>
                <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Message to James</div>
              </div>
              {/* Scrollable content */}
              <div className="flex-1 px-5 min-h-0">
                <div className={`flex ${contextExpanded ? 'gap-4' : ''}`}>
                  <div className={`flex-1 flex flex-col ${contextExpanded ? 'min-w-0' : ''}`}>
                    <textarea
                      className="rounded-xl p-3 text-[13px] leading-relaxed w-full resize-none"
                      rows={5}
                      defaultValue="Hey James — just a heads up that Sara hasn't taken any PTO in over 6 months. Might be worth a quick check-in."
                      style={{
                        backgroundColor: inputBg,
                        color: textSecondary,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                        minHeight: 140,
                      }}
                    />
                  </div>
                  {contextExpanded && (
                    <div className="w-[240px] shrink-0">
                      <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}><span className="text-[7px] font-bold text-white">B</span></div>
                          <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>182 days</span><span className="text-[10px]" style={{ color: textTertiary }}>Since last PTO</span></div>
                          <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>18</span><span className="text-[10px]" style={{ color: textTertiary }}>Days banked</span></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Gradient fade */}
              <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />
              {/* Sticky footer */}
              <div className="px-5 pb-5 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Send via Slack</button>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textTertiary }}>Not now</button>
                <button
                  onClick={() => setContextExpanded(prev => !prev)}
                  className="flex items-center gap-1.5 py-2 text-[13px] font-medium transition-colors ml-auto"
                  style={{ color: surfaceWhiteTertiary }}
                >
                  {contextExpanded
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" /><path d="M4 7h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M7 4v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  }
                  {contextExpanded ? 'Less context' : 'More context'}
                </button>
              </div>
            </div>
          )}

          {/* Medium card back */}
          {cardBackLayout === 'medium' && (
            <div className="rounded-2xl border flex flex-col overflow-hidden" style={{ backgroundColor: cardBg, borderColor: cardBorder, maxWidth: 780 }}>
              <div className="px-5 pt-5 pb-2 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-[13px] font-medium" style={{ color: accent }}>Edit & send</span>
                </div>
                <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Anniversary note for Toni</div>
              </div>
              <div className="flex-1 px-5 min-h-0">
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: textTertiary }}>Your message</div>
                    <textarea
                      className="rounded-xl p-3 text-[13px] leading-relaxed w-full resize-none flex-1"
                      rows={5}
                      defaultValue="Happy 4 years, Toni! Your dedication has made a real impact — from leading the onboarding redesign to mentoring three new hires this year."
                      style={{
                        backgroundColor: inputBg,
                        color: textSecondary,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                        minHeight: 140,
                      }}
                    />
                  </div>
                  <div className="w-[240px] shrink-0 flex flex-col gap-3">
                    <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}><span className="text-[7px] font-bold text-white">B</span></div>
                        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4 years</span><span className="text-[10px]" style={{ color: textTertiary }}>Tenure</span></div>
                        <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>3</span><span className="text-[10px]" style={{ color: textTertiary }}>New hires mentored</span></div>
                      </div>
                    </div>
                    <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.7" /><rect x="10" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="1" y="10" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="10" y="10" width="5" height="5" rx="1" fill="#7B61FF" /></svg>
                        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Lattice</span>
                      </div>
                      <div className="flex flex-col"><span className="text-[16px] font-semibold" style={{ color: textPrimary }}>4.8/5</span><span className="text-[10px]" style={{ color: textTertiary }}>Peer feedback</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />
              <div className="px-5 pb-5 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Send note</button>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textTertiary }}>Not now</button>
              </div>
            </div>
          )}

          {/* Heavy card back */}
          {cardBackLayout === 'heavy' && (
            <div className="rounded-2xl border flex flex-col overflow-hidden" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="px-5 pt-5 pb-2 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-[13px] font-medium" style={{ color: accent }}>Ready to go</span>
                </div>
                <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Performance review for Kyle</div>
              </div>
              <div className="flex-1 px-5 min-h-0">
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col min-w-0 gap-2">
                    <div className="max-w-sm mb-1">
                      <PowerBar value={powerBarValue} onChange={setPowerBarValue} />
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Doing well</div>
                    <textarea
                      className="rounded-xl p-3 text-[13px] leading-relaxed w-full resize-none"
                      rows={3}
                      defaultValue="Kyle led the API migration with minimal downtime and mentored two junior engineers through their first on-call rotations."
                      style={{
                        backgroundColor: inputBg,
                        color: textSecondary,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                        minHeight: 120,
                      }}
                    />
                    <div className="text-[11px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Could improve</div>
                    <textarea
                      className="rounded-xl p-3 text-[13px] leading-relaxed w-full resize-none"
                      rows={3}
                      defaultValue="Documentation could be more thorough. Some PRs lack context for future maintainers."
                      style={{
                        backgroundColor: inputBg,
                        color: textSecondary,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                        minHeight: 120,
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14.5 1.5L8 8l6.5 6.5" stroke="#2684FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 8L1.5 1.5M8 8l-6.5 6.5" stroke="#2684FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>
                          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Jira</span>
                        </div>
                        <div className="space-y-1.5">
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>3</span><div className="text-[10px]" style={{ color: textTertiary }}>Projects shipped</div></div>
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>100%</span><div className="text-[10px]" style={{ color: textTertiary }}>On-time</div></div>
                        </div>
                      </div>
                      <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.7 4.8 6.6.35.07.48-.15.48-.34v-1.2c-1.96.43-2.37-.94-2.37-.94-.32-.82-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.73 1.08.73.63 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.48 0-.77.28-1.4.73-1.89-.07-.18-.32-.9.07-1.87 0 0 .6-.19 1.95.72a6.7 6.7 0 013.56 0c1.35-.91 1.95-.72 1.95-.72.39.97.14 1.69.07 1.87.45.49.73 1.12.73 1.89 0 2.71-1.65 3.3-3.22 3.47.25.22.48.65.48 1.31v1.94c0 .19.13.41.48.34C13 13.7 15 11.1 15 8c0-3.87-3.13-7-7-7z" fill="#24292F" /></svg>
                          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>GitHub</span>
                        </div>
                        <div className="space-y-1.5">
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>47</span><div className="text-[10px]" style={{ color: textTertiary }}>PRs merged</div></div>
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>4.2h</span><div className="text-[10px]" style={{ color: textTertiary }}>Review time</div></div>
                        </div>
                      </div>
                      <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accent }}><span className="text-[7px] font-bold text-white">B</span></div>
                          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>BambooHR</span>
                        </div>
                        <div className="space-y-1.5">
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>$142k</span><div className="text-[10px]" style={{ color: textTertiary }}>Current comp</div></div>
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>3 yrs</span><div className="text-[10px]" style={{ color: textTertiary }}>Tenure</div></div>
                        </div>
                      </div>
                      <div className="rounded-xl p-3" style={{ backgroundColor: cardBg, border: `1px solid ${contextBorder}` }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.7" /><rect x="10" y="1" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="1" y="10" width="5" height="5" rx="1" fill="#7B61FF" opacity="0.4" /><rect x="10" y="10" width="5" height="5" rx="1" fill="#7B61FF" /></svg>
                          <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: textTertiary }}>Lattice</span>
                        </div>
                        <div className="space-y-1.5">
                          <div><span className="text-[14px] font-semibold" style={{ color: textPrimary }}>4.6/5</span><div className="text-[10px]" style={{ color: textTertiary }}>Peer feedback</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />
              <div className="px-5 pb-5 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Submit review</button>
                <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textTertiary }}>Not now</button>
              </div>
            </div>
          )}
        </section>

        <section>
          <SectionLabel>Sticky Footer with Gradient Fade</SectionLabel>
          <p className="text-[13px] mb-3" style={{ color: textSecondary }}>Action buttons stay fixed at the bottom. Content scrolls behind a gradient fade.</p>
          <div className="rounded-2xl border flex flex-col overflow-hidden" style={{ backgroundColor: cardBg, borderColor: cardBorder, maxWidth: 460, height: stickyFooterDemo ? 280 : 'auto' }}>
            <div className="px-5 pt-5 pb-2 shrink-0">
              <div className="text-[15px] font-medium" style={{ color: textPrimary }}>Scrollable content demo</div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 min-h-0">
              <div className="text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                {stickyFooterDemo ? (
                  <>
                    <p className="mb-3">This content is tall enough to scroll. The action buttons below stay fixed while this area scrolls.</p>
                    <p className="mb-3">The gradient fade creates a smooth visual transition between the scrolling content and the sticky footer.</p>
                    <p className="mb-3">This pattern is used on all card backs to ensure actions are always accessible regardless of content height.</p>
                    <p className="mb-3">Try scrolling down to see the gradient effect in action.</p>
                    <p className="mb-3">The footer uses the same background color as the card to create a seamless blending effect.</p>
                  </>
                ) : (
                  <p className="mb-3">Toggle the constrained height to see the sticky footer + gradient fade in action.</p>
                )}
              </div>
            </div>
            <div className="h-6 shrink-0 pointer-events-none -mt-6 relative z-10" style={{ background: `linear-gradient(to bottom, transparent, ${cardBg})` }} />
            <div className="px-5 pb-5 pt-2 shrink-0 flex items-center gap-2" style={{ backgroundColor: cardBg }}>
              <button className="px-4 py-2 rounded-full text-[13px] font-medium text-white" style={{ backgroundColor: accent }}>Confirm</button>
              <button className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ color: textTertiary }}>Dismiss</button>
            </div>
          </div>
          <button
            onClick={() => setStickyFooterDemo(prev => !prev)}
            className="mt-3 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
            style={{ backgroundColor: stickyFooterDemo ? textPrimary : '#F0F5F8', color: stickyFooterDemo ? '#FFFFFF' : textSecondary }}
          >
            {stickyFooterDemo ? 'Remove height constraint' : 'Constrain height (280px)'}
          </button>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* CHAT */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Chat</CategoryHeader>

        <section>
          <SectionLabel>User Message</SectionLabel>
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm px-5 py-3 text-white" style={{ backgroundColor: accent }}>
              <span className="text-[15px]">Who on my team has the most PTO banked?</span>
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>AI Message with Cards</SectionLabel>
          <div className="flex justify-start">
            <div className="max-w-[85%] flex flex-col gap-3">
              <div className="text-[15px]" style={{ color: textPrimary }}>Here are your direct reports ranked by PTO balance:</div>
              <div className="flex flex-col gap-2">
                {teamByPto.slice(0, 3).map(p => (
                  <PersonCard key={p.id} person={p} showPto />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>AI Message with Widget</SectionLabel>
          <div className="flex justify-start">
            <div className="max-w-[85%] flex flex-col gap-3">
              <div className="text-[15px]" style={{ color: textPrimary }}>Done — I built a Team PTO Leaderboard widget for your home screen.</div>
              <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: cardBorder, backgroundColor: bg }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                  <IconCalendar size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium" style={{ color: textPrimary }}>Team PTO Leaderboard</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: textTertiary }}>Live widget</div>
                </div>
              </div>
              <button className="self-start px-4 py-2 rounded-full border text-[13px] font-medium" style={{ borderColor: cardBorder, color: textPrimary, backgroundColor: cardBg }}>
                Add to home screen
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* WIDGETS */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Widgets</CategoryHeader>

        <section>
          <SectionLabel>Widget Sizes</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[110px]">
            {/* 1x1 */}
            <div className="rounded-2xl border flex flex-col items-center justify-center gap-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <IconCalendar size={20} />
              </div>
              <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Time Off</span>
            </div>
            {/* 2x1 */}
            <div className="rounded-2xl border p-5 flex flex-col" style={{ gridColumn: 'span 2', backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                  <IconCalendar size={16} />
                </div>
                <span className="text-[14px] font-medium" style={{ color: textPrimary }}>Time Off</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <PTOWidgetContent size="2x1" />
              </div>
            </div>
            {/* 1x1 placeholder */}
            <div className="rounded-2xl border flex flex-col items-center justify-center gap-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <IconUsers size={20} />
              </div>
              <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Directory</span>
            </div>
            {/* 2x2 */}
            <div className="rounded-2xl border p-5 flex flex-col" style={{ gridColumn: 'span 2', gridRow: 'span 2', backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                  <IconCalendar size={16} />
                </div>
                <span className="text-[14px] font-medium" style={{ color: textPrimary }}>Time Off</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <PTOWidgetContent size="2x2" />
              </div>
            </div>
            {/* Fill remaining 2x2 space */}
            <div className="rounded-2xl border flex flex-col items-center justify-center gap-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <IconOrgChart size={20} />
              </div>
              <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Org Chart</span>
            </div>
            <div className="rounded-2xl border flex flex-col items-center justify-center gap-2" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <IconGrid size={20} />
              </div>
              <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Apps</span>
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>Widget — 4x2 Large</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[110px]">
            <div className="rounded-2xl border p-5 flex flex-col" style={{ gridColumn: 'span 4', gridRow: 'span 2', backgroundColor: cardBg, borderColor: cardBorder }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                    <IconHandshake size={16} />
                  </div>
                  <span className="text-[14px] font-medium" style={{ color: textPrimary }}>1:1 Prep</span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <OneOnOneWidgetContent size="4x2" onOpenProfile={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ */}
        {/* LAYOUT */}
        {/* ═══════════════════════════════════════════ */}
        <CategoryHeader>Layout</CategoryHeader>

        <section>
          <SectionLabel>Floating Top Bar</SectionLabel>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}` }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accent }}>
              <span className="text-white text-[13px] font-medium">B</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <IconSearch />
              <span className="text-[14px]" style={{ color: textTertiary }}>Search people, apps, anything...</span>
            </div>
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center">
              <IconBell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: coral }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white shrink-0" style={{ backgroundColor: CURRENT_USER.avatarColor }}>
              {CURRENT_USER.initials}
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>Floating Bottom Chat Input</SectionLabel>
          <div className="flex items-center gap-3 px-5 py-3 rounded-full shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}` }}>
            <IconChat />
            <span className="text-[15px]" style={{ color: textTertiary }}>What do you need to get done?</span>
            <div className="flex-1" />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
              <IconSend />
            </div>
          </div>
        </section>

        <section>
          <SectionLabel>App Shell Chrome</SectionLabel>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: cardBorder }}>
            <div className="flex items-center justify-between px-6 py-4 bg-white" style={{ borderBottom: `1px solid ${cardBorder}` }}>
              <button className="flex items-center gap-2 text-[14px]" style={{ color: textSecondary }}>
                <IconBack />
                Back
              </button>
              <span className="text-[15px] font-medium" style={{ color: textPrimary }}>Time Off</span>
              <button style={{ color: textSecondary }}>
                <IconClose />
              </button>
            </div>
            <div className="flex items-center justify-center h-24" style={{ backgroundColor: bg, color: textTertiary }}>
              <span className="text-[13px]">App content area</span>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}

// ─── Space Nav ───

// Nav items imported from GlobalNavV2 — shared T1/T2 structure
import { navItems } from '../components/GlobalNav/GlobalNavV2';
import type { NavT1Item } from '../components/GlobalNav/GlobalNavV2';

const CHAT_HISTORY = [
  { label: 'PTO balance check', time: '2h ago' },
  { label: 'Sara performance review', time: 'Yesterday' },
  { label: 'Hiring pipeline Q1', time: '2 days ago' },
  { label: 'Comp band analysis', time: 'Last week' },
  { label: 'Onboarding checklist for Alex', time: 'Last week' },
];

const spaceNavCollapsedW = 0;
const spaceNavExpandedW = 230;

function SpaceNav({ expanded, onToggle, hideToggle = false }: { expanded: boolean; onToggle: () => void; hideToggle?: boolean }) {
  const [activeT1, setActiveT1] = useState('home');
  const [expandedT1, setExpandedT1] = useState<string | null>(null);

  // Tone-on-tone colors for blue bg — darker for readability
  const navText = '#4A7589';
  const navTextHover = '#2C5468';
  const navTextActive = '#1A4050';
  const navActiveBg = '#D0DDE6';
  const navHoverBg = '#DCE8EF';
  const navDivider = 'rgba(0,0,0,0.06)';

  const handleT1Click = (item: NavT1Item) => {
    setActiveT1(item.id);
    if (item.children && item.children.length > 0) {
      setExpandedT1(prev => prev === item.id ? null : item.id);
    } else {
      setExpandedT1(null);
    }
  };

  return (
    <>
    {/* Toggle button — always fixed in same spot */}
    <button
      onClick={onToggle}
      className="fixed z-40 w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        top: 'calc(var(--scenario-bar-h, 33px) + 16px + 6px)',
        left: 12,
        color: expanded ? navText : surfaceBlueTertiary,
        opacity: hideToggle ? 0 : 1,
        pointerEvents: hideToggle ? 'none' : 'auto',
        transition: 'opacity 0.8s ease-in-out, background-color 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = expanded ? navTextHover : surfaceBlueHover; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = expanded ? navText : surfaceBlueTertiary; }}
    >
      <Icon name={expanded ? 'arrow-left-from-line' : 'arrow-right-from-line'} size={16} />
    </button>
    <div
      className="shrink-0 flex flex-col self-stretch overflow-hidden"
      style={{
        width: expanded ? spaceNavExpandedW : spaceNavCollapsedW,
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: bg,
        borderRight: expanded ? '1px solid #D6E4EC' : 'none',
      }}
    >
      {/* Spacer for toggle button area */}
      {expanded && <div className="shrink-0" style={{ height: 52, backgroundColor: bg }} />}

      {/* Nav items — only when expanded */}
      {expanded && (
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: 'none' }}>
        <div className="flex flex-col gap-0.5">
          {navItems.map(item => {
            const isActive = activeT1 === item.id;
            const isT1Expanded = expanded && expandedT1 === item.id && item.children.length > 0;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleT1Click(item)}
                  className="w-full flex items-center gap-2.5 rounded-lg transition-colors"
                  style={{
                    height: 34,
                    paddingLeft: 10,
                    backgroundColor: isActive ? navActiveBg : 'transparent',
                    color: isActive ? navTextActive : navText,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = navHoverBg;
                      e.currentTarget.style.color = navTextHover;
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = isActive ? navActiveBg : 'transparent';
                    e.currentTarget.style.color = isActive ? navTextActive : navText;
                  }}
                >
                  <div className="w-5 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={14} variant="regular" />
                  </div>
                  <span className="text-[13px] font-medium whitespace-nowrap overflow-hidden">{item.label}</span>
                </button>

                {/* T2 children */}
                {isT1Expanded && (
                  <div className="ml-[30px] mt-0.5 mb-1 flex flex-col gap-0.5">
                    {item.children.map(child => (
                      <button
                        key={child.label}
                        className="text-left text-[12px] py-1 px-2 rounded-md transition-colors whitespace-nowrap overflow-hidden"
                        style={{ color: navText }}
                        onMouseEnter={e => { e.currentTarget.style.color = navTextHover; e.currentTarget.style.backgroundColor = navHoverBg; }}
                        onMouseLeave={e => { e.currentTarget.style.color = navText; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-3 mx-1" style={{ height: 1, backgroundColor: navDivider }} />

        {/* Chat history */}
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] font-medium uppercase tracking-wider px-2 mb-1" style={{ color: navText, opacity: 0.6 }}>
            Recent chats
          </div>
          {CHAT_HISTORY.map((chat, i) => (
            <button
              key={i}
              className="text-left rounded-md transition-colors overflow-hidden"
              style={{
                color: navText,
                padding: '4px 8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = navTextHover; e.currentTarget.style.backgroundColor = navHoverBg; }}
              onMouseLeave={e => { e.currentTarget.style.color = navText; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] truncate">{chat.label}</span>
                <span className="text-[10px]" style={{ opacity: 0.5 }}>{chat.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      )}
    </div>
    </>
  );
}

// ─── Blank State Onboarding ───

type OnboardingPhase = 'welcome' | 'chat' | 'upload' | 'processing' | 'done';

interface OnboardingMsg {
  from: 'user' | 'bot';
  text: string;
}

const BOT_RESPONSES = [
  "Nice! Tell me a bit more — how many people are on your team?",
  "Got it. And are you handling payroll today, or is that something you'd like help with?",
  "Great, I think I have a good picture. If you have any existing employee data — spreadsheets, org charts, anything really — drop them below and I'll get everything set up.",
];

const GETTING_STARTED_ITEMS = [
  { label: 'Add your first employees', desc: 'Import or manually add your team members', icon: 'users' },
  { label: 'Set up departments', desc: 'Organize your company structure', icon: 'sitemap' },
  { label: 'Configure time off policies', desc: 'PTO, sick leave, holidays', icon: 'calendar' },
  { label: 'Set up payroll', desc: 'Connect your payroll provider or use ours', icon: 'money-bill' },
  { label: 'Invite your team', desc: 'Send invitations to your employees', icon: 'envelope' },
  { label: 'Customize your branding', desc: 'Add your logo and company colors', icon: 'palette' },
];

function BlankStateOnboarding({ spaceNavExpanded, onToggleNav }: { spaceNavExpanded: boolean; onToggleNav: () => void }) {
  const [phase, setPhase] = useState<OnboardingPhase>('welcome');
  const [messages, setMessages] = useState<OnboardingMsg[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [botResponseIndex, setBotResponseIndex] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);
  const [processingPct, setProcessingPct] = useState(0);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [landscapeFading, setLandscapeFading] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const chatEndRef = useRef<HTMLDivElement>(undefined);
  const inputRef = useRef<HTMLInputElement>(undefined);

  const broadcastProgress = useCallback((p: OnboardingPhase, msgCount: number) => {
    localStorage.setItem('bhr-space-onboard-phase', p);
    localStorage.setItem('bhr-space-onboard-msgs', String(msgCount));
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Broadcast progress whenever phase or messages change
  useEffect(() => {
    broadcastProgress(phase, messages.length);
  }, [phase, messages.length, broadcastProgress]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, botTyping, phase]);

  const addBotResponse = (index: number) => {
    setBotTyping(true);
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: BOT_RESPONSES[index] }]);
      const nextIdx = index + 1;
      setBotResponseIndex(nextIdx);
      if (nextIdx >= BOT_RESPONSES.length) {
        setTimeout(() => setPhase('upload'), 600);
      }
    }, delay);
  };

  const handleSend = () => {
    const text = inputVal.trim();
    if (!text || botTyping) return;
    if (phase === 'welcome') {
      setWelcomeFading(true);
      setTimeout(() => {
        setPhase('chat');
        setMessages([{ from: 'user', text }]);
        setInputVal('');
        addBotResponse(0);
      }, 400);
      return;
    }
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInputVal('');
    if (botResponseIndex < BOT_RESPONSES.length) {
      addBotResponse(botResponseIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const names: string[] = [];
    if (e.dataTransfer.files) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        names.push(e.dataTransfer.files[i].name);
      }
    }
    if (names.length === 0) names.push('employees.xlsx');
    setDroppedFiles(names);
  };

  const handleFileSend = () => {
    setMessages(prev => [...prev, { from: 'user', text: `📎 ${droppedFiles.join(', ')}` }]);
    setPhase('processing');
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: "Got it! Let me set everything up for you..." }]);
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.random() * 15 + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(interval);
          setLandscapeFading(true);
          setTimeout(() => setPhase('done'), 2000);
        }
        setProcessingPct(Math.min(100, Math.round(pct)));
      }, 400);
    }, 1500);
  };

  const handleSkipUpload = () => {
    setPhase('processing');
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: "No worries! Let me set up your workspace..." }]);
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.random() * 15 + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(interval);
          setLandscapeFading(true);
          setTimeout(() => setPhase('done'), 2000);
        }
        setProcessingPct(Math.min(100, Math.round(pct)));
      }, 400);
    }, 1000);
  };

  const toggleChecked = (i: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  // Fresh start home
  if (phase === 'done') {
    return (
      <div className="flex flex-1 min-h-0">
        <SpaceNav expanded={spaceNavExpanded} onToggle={onToggleNav} hideToggle={false} />
        <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: bg }}>
          {/* Top bar */}
          <div className="sticky top-0 z-30 px-3 sm:px-6 pt-3 sm:pt-4 pb-3 pointer-events-none" style={{ background: `linear-gradient(${bg} 0%, ${bg} 60%, transparent 100%)` }}>
            <div className="max-w-md sm:max-w-lg mx-auto pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: accent }}>
                <img src={bambooIcon} alt="BambooHR" className="w-[18px]" style={{ filter: 'brightness(0) invert(1)', aspectRatio: '24 / 19' }} />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <IconSearch />
                <input type="text" placeholder="Search people, apps, anything..." className="flex-1 bg-transparent text-[14px] focus:outline-none" style={{ color: textPrimary }} />
              </div>
              <Avatar person={CURRENT_USER} size={32} fontSize={11} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-4 max-w-3xl mx-auto w-full" style={{ animation: 'fadeSlideUp 0.6s ease-out' }}>
            <style>{`
              @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes checkPop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
            `}</style>
            <h1 className="text-[28px] sm:text-[32px] font-medium leading-snug mt-4 mb-1" style={{ color: accent }}>
              You're all set!
            </h1>
            <p className="text-[16px] mb-8" style={{ color: textSecondary }}>
              Here's a few things to do to get the most out of BambooHR.
            </p>

            <div className="flex flex-col gap-3">
              {GETTING_STARTED_ITEMS.map((item, i) => {
                const done = checkedItems.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleChecked(i)}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all"
                    style={{
                      backgroundColor: done ? inactiveBg : cardBg,
                      borderColor: done ? contextBorder : cardBorder,
                      boxShadow: done ? 'none' : cardShadow,
                      opacity: done ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                      style={{ backgroundColor: done ? contextBorder : accentLight }}
                    >
                      {done ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: 'checkPop 0.3s ease-out' }}>
                          <path d="M4 9.5l3.5 3.5L14 5" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <Icon name={item.icon as any} size={18} style={{ color: accent }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium" style={{ color: done ? textTertiary : textPrimary, textDecoration: done ? 'line-through' : 'none' }}>
                        {item.label}
                      </div>
                      <div className="text-[13px] mt-0.5" style={{ color: textTertiary }}>
                        {item.desc}
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: textTertiary }} className="shrink-0">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat bar at bottom */}
          <div className="px-4 pb-6 pt-2">
            <div className="max-w-lg mx-auto">
              <div
                className="flex items-center gap-3 pl-5 pr-3 py-3 rounded-full border shadow-sm"
                style={{ backgroundColor: cardBg, borderColor: cardBorder }}
              >
                <IconChat />
                <input
                  type="text"
                  placeholder="Ask BambooHR anything..."
                  className="flex-1 bg-transparent text-[15px] focus:outline-none"
                  style={{ color: textPrimary }}
                />
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer"
                  style={{ backgroundColor: accent, opacity: 0.4 }}
                >
                  <IconSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat / welcome / upload / processing phases
  return (
    <div className="flex flex-1 min-h-0">
      <SpaceNav expanded={spaceNavExpanded} onToggle={onToggleNav} hideToggle={(phase as string) !== 'done'} />
      <div className="flex-1 flex flex-col min-h-0 relative" style={{ backgroundColor: bg }}>
        {/* Landscape background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0, opacity: landscapeFading ? 0 : 1, transition: 'opacity 1.8s ease-in-out' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMax slice" className="w-full h-full" style={{ position: 'absolute', bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8F0F5"/>
                <stop offset="65%" stopColor="#EEF3EE"/>
                <stop offset="100%" stopColor="#F5F4E8"/>
              </linearGradient>
              <radialGradient id="sunGlow" cx="50%" cy="72%" r="38%">
                <stop offset="0%" stopColor="#FDF8C4" stopOpacity="1"/>
                <stop offset="25%" stopColor="#F6F0A0" stopOpacity="0.85"/>
                <stop offset="50%" stopColor="#F0E880" stopOpacity="0.5"/>
                <stop offset="75%" stopColor="#ECEB9A" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#ECEB9A" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="cloudWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88"/>
                <stop offset="100%" stopColor="#F8FBFD" stopOpacity="0.7"/>
              </linearGradient>
              <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="18"/>
              </filter>
              <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5"/>
              </filter>
              <g id="cloud1" fill="url(#cloudWhite)" filter="url(#cloudBlur)">
                <circle cx="0" cy="0" r="36"/>
                <circle cx="34" cy="-12" r="48"/>
                <circle cx="82" cy="-2" r="38"/>
                <circle cx="122" cy="10" r="28"/>
                <ellipse cx="62" cy="18" rx="115" ry="34"/>
              </g>
              <g id="cloud2" fill="url(#cloudWhite)" filter="url(#cloudBlur)">
                <circle cx="0" cy="0" r="24"/>
                <circle cx="25" cy="-10" r="32"/>
                <circle cx="58" cy="-2" r="26"/>
                <ellipse cx="35" cy="10" rx="72" ry="22"/>
              </g>
            </defs>

            <rect width="1536" height="1024" fill="url(#skyGrad)" className="sky-bg"/>

            <style>{`
              .sky-bg { opacity: 0.4; animation: skyReveal 3s ease-out forwards; }
              @keyframes skyReveal { to { opacity: 1; } }
              .sun-group { transform: translateY(120px); opacity: 0; animation: sunRise 2s ease-out 1.6s forwards; }
              @keyframes sunRise { to { transform: translateY(0); opacity: 1; } }
              .sun-rings { transform: scale(0.6); opacity: 0; transform-origin: 768px 724px; animation: ringsExpand 2s ease-out 2.2s forwards; }
              @keyframes ringsExpand { to { transform: scale(1); opacity: 1; } }
              .mtns-back { opacity: 0; transform: translateY(80px); animation: layerRise 0.8s ease-out 0.3s forwards; }
              .mtns-peaks { opacity: 0; transform: translateY(60px); animation: layerRise 0.8s ease-out 0.5s forwards; }
              .mtns-mid { opacity: 0; transform: translateY(40px); animation: layerRise 0.8s ease-out 0.7s forwards; }
              .mtns-fore { opacity: 0; transform: translateY(30px); animation: layerRise 0.7s ease-out 0.9s forwards; }
              @keyframes layerRise { to { opacity: 1; transform: translateY(0); } }
              @keyframes cloudIn1 { 0% { transform: translate(20px, 440px) scale(2.2); opacity: 0; } 100% { transform: translate(80px, 440px) scale(2.2); opacity: 0.9; } }
              @keyframes cloudIn2 { 0% { transform: translate(1160px, 480px) scale(2.4); opacity: 0; } 100% { transform: translate(1100px, 480px) scale(2.4); opacity: 0.85; } }
              @keyframes cloudIn3 { 0% { transform: translate(400px, 530px) scale(2.0); opacity: 0; } 100% { transform: translate(450px, 530px) scale(2.0); opacity: 0.8; } }
              @keyframes drift1 { 0% { transform: translate(80px, 440px) scale(2.2); } 50% { transform: translate(140px, 438px) scale(2.2); } 100% { transform: translate(80px, 440px) scale(2.2); } }
              @keyframes drift2 { 0% { transform: translate(1100px, 480px) scale(2.4); } 50% { transform: translate(1040px, 478px) scale(2.4); } 100% { transform: translate(1100px, 480px) scale(2.4); } }
              @keyframes drift3 { 0% { transform: translate(450px, 530px) scale(2.0); } 50% { transform: translate(500px, 528px) scale(2.0); } 100% { transform: translate(450px, 530px) scale(2.0); } }
              .cloud-1 { opacity: 0; animation: cloudIn1 1.5s ease-out 2.5s forwards, drift1 45s ease-in-out 4s infinite; }
              .cloud-2 { opacity: 0; animation: cloudIn2 1.5s ease-out 2.8s forwards, drift2 55s ease-in-out 4.3s infinite; }
              .cloud-3 { opacity: 0; animation: cloudIn3 1.5s ease-out 3.1s forwards, drift3 38s ease-in-out 4.6s infinite; }
              .atmo-haze { opacity: 0; animation: hazeIn 2s ease-out 3s forwards; }
              @keyframes hazeIn { to { opacity: 0.2; } }

            `}</style>

            {/* Clouds — wrapped for sunset fade */}
            <g>
              <use href="#cloud1" className="cloud-1"/><use href="#cloud1" className="cloud-2"/><use href="#cloud2" className="cloud-3"/>
            </g>

            {/* Sun glow */}
            <g className="sun-group">
              <ellipse cx="768" cy="710" rx="500" ry="300" fill="url(#sunGlow)"/>
            </g>

            {/* Sun rings */}
            <g className="sun-rings">
              <circle cx="768" cy="724" r="500" fill="#F5E88A" opacity="0.06"/>
              <circle cx="768" cy="724" r="420" fill="#F7EC8E" opacity="0.12"/>
              <circle cx="768" cy="724" r="350" fill="#F9F0A0" opacity="0.19"/>
              <circle cx="768" cy="724" r="285" fill="#FBF4B0" opacity="0.27"/>
              <circle cx="768" cy="724" r="230" fill="#FDF8C4" opacity="0.36"/>
              <circle cx="768" cy="724" r="180" fill="#FDF8C4" opacity="0.46"/>
              <circle cx="768" cy="724" r="140" fill="#FFF9D0" opacity="0.58"/>
              <circle cx="768" cy="724" r="105" fill="#FFF9D0" opacity="0.70"/>
              <circle cx="768" cy="724" r="75" fill="#FFFBE0" opacity="0.85"/>
              <circle cx="768" cy="724" r="50" fill="#FFFBE0"/>
            </g>

            {/* Background mountains */}
            <g className="mtns-back">
              <path d="M0 550 L70 520 L140 548 L220 530 L300 500 L390 530 L470 560 L555 620 L650 700 L760 750 L840 700 L930 620 L1015 560 L1098 530 L1180 500 L1268 520 L1360 548 L1452 520 L1536 550 L1536 1024 L0 1024Z" fill="#E5EF74" opacity="0.9"/>
              <path d="M0 580 L110 540 L220 590 L335 570 L445 610 L540 650 L655 720 L768 780 L905 720 L1010 650 L1128 570 L1260 580 L1388 548 L1536 580 L1536 1024 L0 1024Z" fill="#D8EA63" opacity="0.78"/>
              <path d="M0 610 L95 580 L220 640 L345 660 L470 700 L615 750 L760 800 L890 750 L1025 700 L1140 640 L1288 590 L1410 610 L1536 600 L1536 1024 L0 1024Z" fill="#CBE45C" opacity="0.62"/>
            </g>

            {/* Side peaks */}
            <g className="mtns-peaks">
              <path d="M0 380 L78 470 L150 540 L250 620 L335 640 L390 610 L448 650 L550 750 L0 750Z" fill="#CDE65A" opacity="0.92"/>
              <path d="M1536 360 L1478 460 L1368 570 L1258 620 L1176 650 L1080 820 L1536 820Z" fill="#DDEA57" opacity="0.95"/>
            </g>

            {/* Midground hills */}
            <g className="mtns-mid">
              <path d="M0 600 L92 640 L180 680 L270 660 L388 710 L470 770 L598 830 L690 850 L778 860 L862 850 L956 830 L1042 770 L1138 680 L1245 660 L1378 640 L1536 600 L1536 1024 L0 1024Z" fill="#B7DD62" opacity="0.9"/>
              <path d="M0 680 L142 730 L290 740 L412 790 L522 840 L642 870 L736 890 L848 870 L976 840 L1092 740 L1215 740 L1310 730 L1440 680 L1536 650 L1536 1024 L0 1024Z" fill="#A9D35B" opacity="0.85"/>
              <path d="M0 730 L135 770 L255 780 L350 830 L492 870 L626 910 L760 920 L902 910 L1018 830 L1178 780 L1298 750 L1408 700 L1536 680 L1536 1024 L0 1024Z" fill="#99CC59" opacity="0.72"/>
            </g>

            {/* Foreground hills */}
            <g className="mtns-fore">
              <path d="M0 700 L85 780 L186 810 L300 780 L388 800 L468 840 L556 880 L654 890 L772 900 L882 890 L980 860 L1100 780 L1210 760 L1320 780 L1448 720 L1536 680 L1536 1024 L0 1024Z" fill="#86C45B" opacity="0.82"/>
              <path d="M0 790 L120 830 L208 890 L328 930 L420 940 L530 950 L660 970 L790 960 L930 930 L1065 910 L1192 880 L1320 860 L1418 820 L1536 740 L1536 1024 L0 1024Z" fill="#7BBC57" opacity="0.86"/>
              <path d="M0 820 L104 950 L238 978 L364 960 L505 980 L660 1024 L0 1024Z" fill="#4EAB6D" opacity="0.92"/>
              <path d="M1536 740 L1455 780 L1378 840 L1276 900 L1155 950 L1002 975 L848 1005 L1536 1024Z" fill="#95C857" opacity="0.9"/>
            </g>

            {/* Atmospheric haze */}
            <ellipse cx="768" cy="706" rx="520" ry="210" fill="#F5F5DE" className="atmo-haze" filter="url(#softBlur)"/>
          </svg>
        </div>

        {/* Content overlay */}
        <div className="flex-1 flex flex-col relative" style={{ zIndex: 1 }}>

          {/* Welcome hero + centered chat bar — fades up on send */}
          {phase === 'welcome' && (
            <div
              className="flex-1 flex flex-col items-center justify-center px-4"
              style={{
                opacity: welcomeFading ? 0 : 1,
                transform: welcomeFading ? 'translateY(-30px)' : 'translateY(0)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              }}
            >
              <div className="text-center" style={{ marginBottom: 20, marginTop: -40 }}>
                <div className="mx-auto mb-4 flex items-center justify-center rounded-full" style={{ width: 72, height: 72, backgroundColor: accent }}>
                  <svg viewBox="0 0 24 19.02" style={{ width: 36, height: 'auto' }}>
                    <path d="M17.52 5.85c-2.31 0-3.55.8-4.42 1.66l-.24.25V0h-2v12.68c0 3.9 3.01 6.34 6.46 6.34 3.8 0 6.68-2.92 6.68-6.68 0-3.49-3-6.49-6.48-6.49zm-.2 11.35c-2.51 0-4.63-1.98-4.63-4.63s1.79-4.83 4.68-4.83 4.59 2.34 4.59 4.78c0 2.66-1.8 4.68-4.64 4.68z" fill="white"/>
                    <path d="M6.86 1.53C6.35.99 4.41-.19 4.65.07c2.45 2.64 3.7 5.85 4.19 6.73-.44-.54-.96-1.02-1.56-1.62a14.5 14.5 0 00-1.53-1.28c-.33-.21-.52-.32-.85-.49A9.3 9.3 0 001.36 2c-.69-.17-1.36-.21-1.36-.21S2.19 3.64 3.12 4.81s1.89 2.23 2.95 2.66c1.06.43 1.43.56 2.25.68.72.11 1.59.27 1.59.27l-.89-2.91c-.52-1.53-.68-2.41-2.17-3.98z" fill="white"/>
                  </svg>
                </div>
                <h1 className="text-[28px] sm:text-[36px] font-medium leading-snug" style={{ color: accent }}>
                  Welcome to BambooHR!
                </h1>
                <div className="text-[24px] font-medium mt-0.5" style={{ color: textSecondary, fontFamily: "'Fields', system-ui, sans-serif" }}>
                  Tell us a bit about your business.<br />
                  We'll handle the rest.
                </div>
              </div>
              <div className="w-full max-w-lg">
                <div
                  className="flex items-center gap-3 pl-5 pr-3 py-3 rounded-full border shadow-sm backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: cardBorder }}
                >
                  <IconChat />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="We're a 50-person startup focused on..."
                    className="flex-1 bg-transparent text-[15px] focus:outline-none"
                    style={{ color: textPrimary }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSend()}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 transition-opacity cursor-pointer"
                    style={{ backgroundColor: accent, opacity: inputVal.trim() && !botTyping ? 1 : 0.4 }}
                  >
                    <IconSend />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat messages area */}
          {phase !== 'welcome' && (
            <div className="flex-1 overflow-y-auto px-4 pt-8 pb-4">
              <div className="max-w-lg mx-auto flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animation: 'msgIn 0.3s ease-out' }}>
                    {msg.from === 'bot' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1" style={{ backgroundColor: accent }}>
                        <img src={bambooIcon} alt="" className="w-[14px]" style={{ filter: 'brightness(0) invert(1)', aspectRatio: '24 / 19' }} />
                      </div>
                    )}
                    <div
                      className="px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed max-w-[80%]"
                      style={{
                        backgroundColor: msg.from === 'user' ? accent : 'rgba(255,255,255,0.92)',
                        color: msg.from === 'user' ? '#fff' : textPrimary,
                        borderBottomRightRadius: msg.from === 'user' ? 4 : undefined,
                        borderBottomLeftRadius: msg.from === 'bot' ? 4 : undefined,
                        boxShadow: msg.from === 'bot' ? '0 1px 6px rgba(0,0,0,0.08)' : undefined,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {botTyping && (
                  <div className="flex justify-start" style={{ animation: 'msgIn 0.3s ease-out' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1" style={{ backgroundColor: accent }}>
                      <img src={bambooIcon} alt="" className="w-[14px]" style={{ filter: 'brightness(0) invert(1)', aspectRatio: '24 / 19' }} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl flex gap-1.5 items-center" style={{ backgroundColor: 'rgba(255,255,255,0.92)', borderBottomLeftRadius: 4, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: textTertiary, animation: 'dotBounce 1.2s ease-in-out infinite' }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: textTertiary, animation: 'dotBounce 1.2s ease-in-out 0.2s infinite' }} />
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: textTertiary, animation: 'dotBounce 1.2s ease-in-out 0.4s infinite' }} />
                    </div>
                  </div>
                )}

                {/* Upload drop zone */}
                {phase === 'upload' && droppedFiles.length === 0 && (
                  <div
                    className="mt-4 rounded-xl border-2 border-dashed p-8 text-center transition-colors"
                    style={{
                      borderColor: dragOver ? accent : cardBorder,
                      backgroundColor: dragOver ? 'rgba(45,106,53,0.06)' : 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                      animation: 'msgIn 0.3s ease-out',
                    }}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mx-auto mb-3">
                      <path d="M20 6v20M12 14l8-8 8 8" stroke={dragOver ? accent : textTertiary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 28v4a2 2 0 002 2h24a2 2 0 002-2v-4" stroke={dragOver ? accent : textTertiary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="text-[15px] font-medium mb-1" style={{ color: dragOver ? accent : textPrimary }}>
                      Drop your files here
                    </div>
                    <div className="text-[13px]" style={{ color: textTertiary }}>
                      Spreadsheets, PDFs, org charts — anything helps
                    </div>
                    <button onClick={handleSkipUpload} className="mt-4 text-[13px] underline" style={{ color: textTertiary }}>
                      Skip this step
                    </button>
                  </div>
                )}

                {/* Dropped files preview */}
                {phase === 'upload' && droppedFiles.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2" style={{ animation: 'msgIn 0.3s ease-out' }}>
                    {droppedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}`, backdropFilter: 'blur(8px)' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2h8l4 4v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={accent} strokeWidth="1.5" /><path d="M12 2v4h4" stroke={accent} strokeWidth="1.5" /></svg>
                        <span className="text-[14px] flex-1" style={{ color: textPrimary }}>{f}</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    ))}
                    <button
                      onClick={handleFileSend}
                      className="mt-2 px-6 py-2.5 rounded-full text-[14px] font-medium text-white self-end"
                      style={{ backgroundColor: accent }}
                    >
                      Send files
                    </button>
                  </div>
                )}

                {/* Processing bar */}
                {phase === 'processing' && processingPct > 0 && (
                  <div className="mt-4 rounded-xl p-5" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}`, backdropFilter: 'blur(8px)', animation: 'msgIn 0.3s ease-out' }}>
                    <div className="text-[14px] font-medium mb-3" style={{ color: textPrimary }}>Setting things up for you...</div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: inactiveBg }}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${processingPct}%`, backgroundColor: accent }} />
                    </div>
                    <div className="text-[12px] mt-2 text-right" style={{ color: textTertiary }}>{processingPct}%</div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
              <style>{`
                @keyframes msgIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes dotBounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-4px); } }
              `}</style>
            </div>
          )}

          {/* Input bar — bottom, chat phases only */}
          {(phase as string) !== 'welcome' && (phase as string) !== 'done' && (phase as string) !== 'processing' && !(phase === 'upload' && droppedFiles.length > 0) && (
            <div className="px-4 pb-6 pt-2" style={{ zIndex: 2, animation: 'fadeIn 0.4s ease-out' }}>
              <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
              <div className="max-w-lg mx-auto">
                <div
                  className="flex items-center gap-3 pl-5 pr-3 py-3 rounded-full border shadow-sm backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: cardBorder }}
                >
                  <IconChat />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={(phase as string) === 'welcome' ? "We're a 50-person startup focused on..." : "Type your reply..."}
                    className="flex-1 bg-transparent text-[15px] focus:outline-none"
                    style={{ color: textPrimary }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSend()}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 transition-opacity cursor-pointer"
                    style={{ backgroundColor: accent, opacity: inputVal.trim() && !botTyping ? 1 : 0.4 }}
                  >
                    <IconSend />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SpaceLayout ───

export function SpaceLayout() {
  const [spaceNavExpanded, setSpaceNavExpanded] = useState(false);
  const [view, setView] = useState<SpaceView>({ type: 'home' });
  const [spaceStage, setSpaceStage] = useState<'blank' | 'established' | 'library'>(() => {
    const stored = localStorage.getItem('bhr-space-stage');
    if (stored === 'blank') return 'blank';
    if (stored === 'library') return 'library';
    return 'established';
  });
  const [widgetSizes, setWidgetSizes] = useState<Record<string, WidgetSize>>(() => {
    const sizes: Record<string, WidgetSize> = {};
    WIDGET_DEFS.forEach(w => { sizes[w.id] = w.defaultSize; });
    return sizes;
  });
  const [sizePickerWidget, setSizePickerWidget] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [addedWidgets, setAddedWidgets] = useState<{ name: string }[]>([]);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [editMode, setEditMode] = useState(false);
  const [widgetOrder, setWidgetOrder] = useState<string[]>(() => WIDGET_DEFS.map(w => w.id));
  const [removedWidgetIds, setRemovedWidgetIds] = useState<Set<string>>(new Set());
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetIdx, setDropTargetIdx] = useState<number | null>(null);
  const [showAddPicker, setShowAddPicker] = useState(false);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [resizeStartInfo, setResizeStartInfo] = useState<{ x: number; y: number; cols: number; rows: number } | null>(null);
  const contextMenuTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const gridRef = useRef<HTMLDivElement>(null);

  const [demoPanelOpen, setDemoPanelOpen] = useState(() => localStorage.getItem('bhr-demo-panel-open') === 'true');
  const demoPanelW = demoPanelOpen ? 340 : 0;

  // Match body bg to space bg so no white bleeds through gaps
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#E8F0F5';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const stored = localStorage.getItem('bhr-space-stage');
      setSpaceStage(stored === 'blank' ? 'blank' : stored === 'library' ? 'library' : 'established');
      setDemoPanelOpen(localStorage.getItem('bhr-demo-panel-open') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const goHome = useCallback(() => setView({ type: 'home' }), []);
  const openApp = useCallback((id: AppId) => setView({ type: 'app', id }), []);
  const openProfile = useCallback((person: Person) => setView({ type: 'profile', person }), []);

  const handleWidgetContextMenu = useCallback((e: React.MouseEvent, widgetId: string) => {
    e.preventDefault();
    setSizePickerWidget(widgetId);
  }, []);

  const handleWidgetLongPress = useCallback((widgetId: string) => {
    contextMenuTimeout.current = setTimeout(() => {
      setSizePickerWidget(widgetId);
    }, 500);
  }, []);

  const handleWidgetLongPressEnd = useCallback(() => {
    if (contextMenuTimeout.current) clearTimeout(contextMenuTimeout.current);
  }, []);

  const handleAddWidget = useCallback((name: string) => {
    const newId = `added-${addedWidgets.length}`;
    setAddedWidgets(prev => [...prev, { name }]);
    setWidgetOrder(prev => [...prev, newId]);
    setChatOpen(false);
  }, [addedWidgets.length]);

  const handleCompleteCard = useCallback((id: string) => {
    setCompletedCards(prev => new Set(prev).add(id));
  }, []);

  const handleDismissCard = useCallback((id: string) => {
    setCompletedCards(prev => new Set(prev).add(id));
  }, []);

  // ─── Edit mode handlers ───

  const handleRemoveWidget = useCallback((id: string) => {
    setRemovedWidgetIds(prev => new Set(prev).add(id));
    setWidgetOrder(prev => prev.filter(wid => wid !== id));
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetIdx(idx);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (!sourceId) return;
    setWidgetOrder(prev => {
      const next = prev.filter(id => id !== sourceId);
      next.splice(targetIdx, 0, sourceId);
      return next;
    });
    setDraggedId(null);
    setDropTargetIdx(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDropTargetIdx(null);
  }, []);

  const handleResizeStart = useCallback((e: React.PointerEvent, widgetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const currentSize = widgetSizes[widgetId] ?? WIDGET_DEFS.find(w => w.id === widgetId)?.defaultSize ?? '2x2';
    const { cols, rows } = sizeToGrid(currentSize);
    setResizingId(widgetId);
    setResizeStartInfo({ x: e.clientX, y: e.clientY, cols, rows });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [widgetSizes]);

  const handleResizeMove = useCallback((e: React.PointerEvent) => {
    if (!resizingId || !resizeStartInfo || !gridRef.current) return;
    const gridWidth = gridRef.current.clientWidth;
    const colWidth = (gridWidth - 3 * 16) / 4;
    const rowHeight = 110;
    const gap = 16;
    const deltaCols = Math.round((e.clientX - resizeStartInfo.x) / (colWidth + gap));
    const deltaRows = Math.round((e.clientY - resizeStartInfo.y) / (rowHeight + gap));
    const newCols = Math.max(1, Math.min(4, resizeStartInfo.cols + deltaCols));
    const newRows = Math.max(1, Math.min(2, resizeStartInfo.rows + deltaRows));
    let newSize: WidgetSize;
    if (newCols === 1) newSize = '1x1';
    else if (newCols === 2 && newRows === 1) newSize = '2x1';
    else if (newCols === 2) newSize = '2x2';
    else if (newCols === 3 && newRows === 1) newSize = '3x1';
    else if (newCols >= 4 && newRows === 1) newSize = '4x1';
    else newSize = '4x2';
    setWidgetSizes(prev => ({ ...prev, [resizingId]: newSize }));
  }, [resizingId, resizeStartInfo]);

  const handleResizeEnd = useCallback(() => {
    setResizingId(null);
    setResizeStartInfo(null);
  }, []);

  const handleAddFromPicker = useCallback((appName: string) => {
    const newId = `added-${addedWidgets.length}`;
    setAddedWidgets(prev => [...prev, { name: appName }]);
    setWidgetOrder(prev => [...prev, newId]);
    setWidgetSizes(prev => ({ ...prev, [newId]: '1x1' }));
    setShowAddPicker(false);
  }, [addedWidgets.length]);

  const handleReAddWidget = useCallback((id: string) => {
    setRemovedWidgetIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (!widgetOrder.includes(id)) {
      setWidgetOrder(prev => [...prev, id]);
    }
    setShowAddPicker(false);
  }, [widgetOrder]);

  // Onboarding / Blank state view
  if (spaceStage === 'blank') {
    return <BlankStateOnboarding spaceNavExpanded={spaceNavExpanded} onToggleNav={() => setSpaceNavExpanded(p => !p)} />;
  }

  // Design Library
  if (spaceStage === 'library') {
    return (
      <div className="flex flex-1 min-h-0">
        <SpaceNav expanded={spaceNavExpanded} onToggle={() => setSpaceNavExpanded(p => !p)} />
        <PrimitivesPage />
      </div>
    );
  }

  // Render app view
  if (view.type === 'profile') {
    return (
      <div className="flex flex-1 min-h-0">
        <SpaceNav expanded={spaceNavExpanded} onToggle={() => setSpaceNavExpanded(p => !p)} />
        <PersonProfile person={view.person} onBack={goHome} />
      </div>
    );
  }

  if (view.type === 'app') {
    const def = WIDGET_DEFS.find(w => w.id === view.id);
    const appContent = view.id === 'pto' ? (
      <SpaceAppShell appName="Time Off" onBack={goHome}>
        <PTOApp onOpenProfile={openProfile} />
      </SpaceAppShell>
    ) : view.id === 'app-store' ? (
      <SpaceAppShell appName="App Store" onBack={goHome}>
        <AppStoreApp />
      </SpaceAppShell>
    ) : (
      <SpaceAppShell appName={def?.label ?? 'App'} onBack={goHome}>
        <div className="flex flex-col items-center justify-center h-64" style={{ color: textTertiary }}>
          <div className="mb-2">{def?.label ?? 'App'}</div>
          <div className="text-[13px]">Coming soon</div>
        </div>
      </SpaceAppShell>
    );
    return (
      <div className="flex flex-1 min-h-0">
        <SpaceNav expanded={spaceNavExpanded} onToggle={() => setSpaceNavExpanded(p => !p)} />
        {appContent}
      </div>
    );
  }

  // Home view — compute ordered, visible widgets
  const allWidgetDefs: WidgetDef[] = [
    ...WIDGET_DEFS,
    ...addedWidgets.map((w, i) => ({ id: `added-${i}` as AppId, label: w.name, defaultSize: '2x2' as WidgetSize, aiBadge: true })),
  ];
  const widgetMap = new Map<string, WidgetDef>(allWidgetDefs.map(w => [w.id, w]));
  const orderedWidgets = widgetOrder
    .filter(id => !removedWidgetIds.has(id) && widgetMap.has(id))
    .map(id => widgetMap.get(id)!);

  // Available apps for add picker (removed built-ins + new apps)
  const availableApps = [
    ...WIDGET_DEFS.filter(w => removedWidgetIds.has(w.id)),
    ...[
      { id: 'reviews' as AppId, label: 'Reviews', defaultSize: '2x1' as WidgetSize },
      { id: 'team-pulse' as AppId, label: 'Team Pulse', defaultSize: '2x1' as WidgetSize, aiBadge: true },
      { id: 'goals' as AppId, label: 'Goals', defaultSize: '2x1' as WidgetSize },
    ].filter(a => !widgetOrder.includes(a.id) || removedWidgetIds.has(a.id)),
  ];

  return (
    <div className="flex flex-1 min-h-0">
      <SpaceNav expanded={spaceNavExpanded} onToggle={() => setSpaceNavExpanded(p => !p)} />
    <div className="flex-1 flex flex-col min-h-0 relative" style={{ backgroundColor: bg }}>
      {/* Responsive grid + Wiggle animation */}
      <style>{`
        @media (max-width: 767px) {
          .space-widget[data-cols="3"],
          .space-widget[data-cols="4"] {
            grid-column: span 2 !important;
          }
        }
        ${editMode ? `
          @keyframes space-wiggle {
            0%, 100% { transform: rotate(-0.4deg) scale(0.98); }
            50% { transform: rotate(0.4deg) scale(0.98); }
          }
        ` : ''}
      `}</style>

      {/* Floating top bar */}
      <div className="fixed z-30 px-3 sm:px-6 pr-14 sm:pr-6 pt-3 sm:pt-4 pb-10 pointer-events-none" style={{ top: 'var(--scenario-bar-h, 33px)', left: `calc(var(--chrome-sidebar-w, 0px) + ${spaceNavExpanded ? spaceNavExpandedW : spaceNavCollapsedW}px)`, right: demoPanelW, transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), right 0.5s ease-in-out', background: `linear-gradient(${bg} 0%, ${bg} 40%, transparent 100%)` }}>
        <div className="max-w-md sm:max-w-lg mx-auto pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: `1px solid ${cardBorder}` }}>
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: accent }}>
            <img src={bambooIcon} alt="BambooHR" className="w-[18px]" style={{ filter: 'brightness(0) invert(1)', aspectRatio: '24 / 19' }} />
          </div>
          {/* Search */}
          <div className="flex-1 flex items-center gap-2">
            <IconSearch />
            <input
              type="text"
              placeholder="Search people, apps, anything..."
              className="flex-1 bg-transparent text-[14px] focus:outline-none"
              style={{ color: textPrimary }}
            />
          </div>
          {/* Bell */}
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors" onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')} onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <IconBell />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: coral }} />
          </button>
          {/* Avatar */}
          <Avatar person={CURRENT_USER} size={32} fontSize={11} />
        </div>
      </div>

      {/* Edit / Done button — hidden for demo, re-enable when widgets are shown */}
      <button
        onClick={() => setEditMode(prev => !prev)}
        className="fixed z-30 rounded-full text-[13px] font-medium transition-colors w-9 h-9 sm:w-auto sm:h-auto sm:px-3.5 sm:py-1.5 flex items-center justify-center sm:gap-1.5"
        style={{
          top: 'calc(var(--scenario-bar-h, 33px) + 16px + 6px)',
          right: 12,
          backgroundColor: editMode ? accent : 'transparent',
          color: editMode ? '#FFFFFF' : surfaceBlueTertiary,
        }}
        onMouseEnter={e => { if (!editMode) { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = surfaceBlueHover; } }}
        onMouseLeave={e => { if (!editMode) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = surfaceBlueTertiary; } }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">{editMode ? 'Done' : 'Edit'}</span>
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-16 sm:pt-20 pb-20 sm:pb-24 px-3 sm:px-[clamp(24px,5vw,120px)] flex flex-col">
        <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Briefing section */}
        <BriefingSection
          completedCards={completedCards}
          onComplete={handleCompleteCard}
          onDismiss={handleDismissCard}
        />

        {/* Widget grid — hidden for demo, re-enable when needed */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[110px] relative"
          style={{
            display: 'none',
            gridAutoFlow: 'row dense',
            backgroundImage: editMode ? `radial-gradient(circle, ${cardBorder}50 1px, transparent 1px)` : 'none',
            backgroundSize: '24px 24px',
          }}
          onPointerMove={resizingId ? handleResizeMove : undefined}
          onPointerUp={resizingId ? handleResizeEnd : undefined}
        >
          {orderedWidgets.map((widget, idx) => {
            const size = widgetSizes[widget.id] ?? widget.defaultSize;
            const { cols, rows } = sizeToGrid(size);
            const isIcon = cols === 1 && rows === 1;
            const WidgetIcon = WIDGET_ICONS[widget.id] ?? IconGrid;
            const isDragging = draggedId === widget.id;
            const isDropTarget = dropTargetIdx === idx && draggedId !== null && draggedId !== widget.id;

            return (
              <div
                key={widget.id}
                draggable={editMode}
                onDragStart={editMode ? (e) => handleDragStart(e, widget.id) : undefined}
                onDragOver={editMode ? (e) => handleDragOver(e, idx) : undefined}
                onDrop={editMode ? (e) => handleDrop(e, idx) : undefined}
                onDragEnd={editMode ? handleDragEnd : undefined}
                className={`rounded-2xl cursor-pointer transition-all relative space-widget ${isIcon ? 'flex flex-col items-center justify-center gap-2' : 'p-4 sm:p-5 flex flex-col'}`}
                data-cols={cols}
                style={{
                  gridColumn: `span ${cols}`,
                  gridRow: `span ${rows}`,
                  backgroundColor: cardBg,
                  borderWidth: '1px',
                  borderStyle: editMode ? 'dashed' : 'solid',
                  borderColor: isDropTarget ? accent : cardBorder,
                  opacity: isDragging ? 0.5 : 1,
                  animation: editMode ? `space-wiggle 0.4s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${idx * 0.06}s`,
                  boxShadow: isDropTarget ? `0 0 0 2px ${accent}40` : 'none',
                }}
                onClick={editMode ? undefined : () => openApp(widget.id)}
                onContextMenu={editMode ? undefined : (e) => handleWidgetContextMenu(e, widget.id)}
                onMouseDown={editMode ? undefined : () => handleWidgetLongPress(widget.id)}
                onMouseUp={editMode ? undefined : handleWidgetLongPressEnd}
                onMouseLeave={editMode ? undefined : e => { handleWidgetLongPressEnd(); (e.currentTarget as HTMLElement).style.borderColor = cardBorder; }}
                onMouseEnter={editMode ? undefined : e => { (e.currentTarget as HTMLElement).style.borderColor = cardBorderHover; }}
              >
                {/* Remove button in edit mode */}
                {editMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveWidget(widget.id); }}
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[14px] z-10 shadow-sm transition-colors"
                    style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#DC2626')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#EF4444')}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                )}

                {/* Widget content */}
                {isIcon ? (
                  <>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                      <WidgetIcon size={20} />
                    </div>
                    <span className="text-[12px] font-medium" style={{ color: textSecondary }}>{widget.label}</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                          <WidgetIcon size={16} />
                        </div>
                        <span className="text-[14px] font-medium" style={{ color: textPrimary }}>{widget.label}</span>
                      </div>
                      {widget.aiBadge && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium" style={{ backgroundColor: aiBadgeBg, color: aiBadgeText }}>AI-built</span>}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      {widget.id === 'pto' && <PTOWidgetContent size={size} />}
                      {widget.id === 'one-on-one' && <OneOnOneWidgetContent size={size} onOpenProfile={openProfile} />}
                      {widget.id === 'org-chart' && <OrgChartWidgetContent size={size} />}
                      {widget.id !== 'pto' && widget.id !== 'one-on-one' && widget.id !== 'org-chart' && <GenericWidgetContent size={size} label={widget.label} />}
                    </div>
                  </>
                )}

                {/* Resize handle in edit mode */}
                {editMode && !isIcon && (
                  <div
                    className="absolute bottom-1.5 right-1.5 w-6 h-6 flex items-center justify-center cursor-se-resize rounded-md transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onPointerDown={(e) => handleResizeStart(e, widget.id)}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${cardBorder}80`)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M8 2L2 8" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 6L6 8" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {editMode && isIcon && (
                  <div
                    className="absolute bottom-0.5 right-0.5 w-5 h-5 flex items-center justify-center cursor-se-resize rounded-md transition-colors"
                    style={{ backgroundColor: 'transparent' }}
                    onPointerDown={(e) => handleResizeStart(e, widget.id)}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${cardBorder}80`)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path d="M8 2L2 8" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 6L6 8" stroke={textTertiary} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add widget tile in edit mode */}
          {editMode && (
            <div
              className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{ borderColor: cardBorder, gridColumn: 'span 1', gridRow: 'span 1' }}
              onClick={() => setShowAddPicker(true)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = cardBorder)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: accentLight }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Add</span>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Floating bottom chat bar */}
      <div className="fixed bottom-0 z-30 px-3 sm:px-6 pb-4 sm:pb-5 pt-3 pointer-events-none" style={{ left: `calc(var(--chrome-sidebar-w, 0px) + ${spaceNavExpanded ? spaceNavExpandedW : spaceNavCollapsedW}px)`, right: demoPanelW, transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), right 0.5s ease-in-out', background: `linear-gradient(transparent, ${bg} 40%)` }}>
        <div className="max-w-md sm:max-w-lg mx-auto pointer-events-auto">
          <button
            onClick={() => setChatOpen(true)}
            className="w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border text-left transition-all shadow-sm backdrop-blur-md"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: cardBorder }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = cardBorderHover; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; }}
          >
            <IconChat />
            <span className="text-[15px]" style={{ color: textTertiary }}>What do you need to get done?</span>
            <div className="flex-1" />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accent }}>
              <IconSend />
            </div>
          </button>
        </div>
      </div>

      {/* Size picker (right-click outside edit mode) */}
      {sizePickerWidget && !editMode && (
        <SizePicker
          currentSize={widgetSizes[sizePickerWidget] ?? '2x2'}
          onSelect={(s) => setWidgetSizes(prev => ({ ...prev, [sizePickerWidget]: s }))}
          onClose={() => setSizePickerWidget(null)}
        />
      )}

      {/* Add widget picker */}
      {showAddPicker && (
        <div className="fixed inset-0 z-[90]" onClick={() => setShowAddPicker(false)}>
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl border p-6 min-w-[320px] max-w-md"
            style={{ backgroundColor: cardBg, borderColor: cardBorder }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-[16px] font-medium mb-4" style={{ color: textPrimary }}>Add widget</div>
            {availableApps.length === 0 ? (
              <div className="text-[14px] py-4" style={{ color: textTertiary }}>All widgets are on your home screen.</div>
            ) : (
              <div className="flex flex-col gap-1">
                {availableApps.map(app => {
                  const AppIcon = WIDGET_ICONS[app.id] ?? IconGrid;
                  const isRemoved = removedWidgetIds.has(app.id);
                  return (
                    <button
                      key={app.id}
                      onClick={() => isRemoved ? handleReAddWidget(app.id) : handleAddFromPicker(app.label)}
                      className="flex items-center gap-3 p-3 rounded-full transition-colors text-left"
                      style={{ color: textPrimary }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0F5F8')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: accentLight }}>
                        <AppIcon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium">{app.label}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chat panel */}
      {chatOpen && (
        <SpaceChatPanel
          onClose={() => setChatOpen(false)}
          onOpenProfile={(p) => { setChatOpen(false); openProfile(p); }}
          onAddWidget={handleAddWidget}
        />
      )}
    </div>
    </div>
  );
}
