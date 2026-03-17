import { useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';

interface BenefitTile {
  icon: IconName;
  title: string;
  description: string;
}

interface UpsellConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  benefits: BenefitTile[];
  trustSignal: string;
  ctaLabel: string;
  ctaReassurance: string;
  ctaSecondary?: string;
}

const UPSELL_DATA: Record<string, UpsellConfig> = {
  payroll: {
    eyebrow: 'Payroll Add-On',
    headline: 'Payroll that runs itself (almost)',
    subheadline: `Your employee data is already here. Payroll just picks it up \u2014 no re-entering names, addresses, or tax info. A few clicks and everyone gets paid, on time, every time.`,
    benefits: [
      {
        icon: 'clock',
        title: 'Minutes, not hours',
        description: `New hires, terminations, and address changes flow straight from BambooHR into your payroll run. No spreadsheets, no copy-paste, no "wait, did I update that?"`,
      },
      {
        icon: 'circle-dollar',
        title: 'Taxes handled, filings done',
        description: `Federal, state, and local taxes are calculated automatically. Quarterly and year-end filings happen without you chasing deadlines or second-guessing the math.`,
      },
      {
        icon: 'check-circle',
        title: 'One place for everything',
        description: `Stop toggling between systems. Pay stubs, tax documents, deductions, and garnishments all live where your employee records already do.`,
      },
    ],
    trustSignal: 'Companies using BambooHR Payroll spend 40% less time on payroll processing each month.',
    ctaLabel: 'Add Payroll to Your Account',
    ctaReassurance: 'No long-term commitment. You can start with your next pay cycle.',
    ctaSecondary: 'See pricing details',
  },
  benefits: {
    eyebrow: 'Benefits Add-On',
    headline: 'Benefits without the back-and-forth',
    subheadline: `Open enrollment, life events, carrier changes \u2014 it all happens where your employee data already lives. Less paperwork for you, less confusion for your people.`,
    benefits: [
      {
        icon: 'user-check',
        title: 'Enrollment on autopilot',
        description: `Employees pick their plans, you review and approve. No chasing people down with forms or manually keying elections into a carrier portal.`,
      },
      {
        icon: 'shield',
        title: 'Carrier connections built in',
        description: `Changes sync directly to your carriers. When someone adds a dependent or switches plans, the update goes through without you playing middleman.`,
      },
      {
        icon: 'chart-line',
        title: 'Costs you can actually see',
        description: `Know what you\u2019re spending on benefits at a glance. Track enrollment rates, plan costs, and COBRA status without pulling it together from three different places.`,
      },
    ],
    trustSignal: 'BambooHR Benefits customers reduce enrollment processing time by up to 60%.',
    ctaLabel: 'Add Benefits to Your Account',
    ctaReassurance: 'Set up at your own pace. Most teams are live within a week.',
    ctaSecondary: 'See pricing details',
  },
  performance: {
    eyebrow: 'Pro Plan',
    headline: 'Reviews people actually learn from',
    subheadline: `Performance management that fits how your team already works. Set goals, run review cycles, and keep feedback flowing \u2014 without the spreadsheet circus.`,
    benefits: [
      {
        icon: 'bullseye',
        title: 'Goals that stay visible',
        description: `Employees set goals, managers track progress, and nothing disappears into a doc no one opens again. Everyone stays aligned without the status-update meetings.`,
      },
      {
        icon: 'circle-info',
        title: 'Feedback when it matters',
        description: `Don\u2019t wait for the annual review to say something useful. Peer recognition, manager notes, and continuous feedback happen in real time, right where work gets done.`,
      },
      {
        icon: 'calendar',
        title: 'Review cycles that finish',
        description: `Build your review process once, then run it on schedule. Automatic reminders keep things moving so you\u2019re not chasing managers two weeks past the deadline.`,
      },
    ],
    trustSignal: 'Teams on the Pro plan complete review cycles 3x faster than with manual processes.',
    ctaLabel: 'Upgrade to Pro',
    ctaReassurance: `Your current data stays exactly as it is. Nothing changes until you\u2019re ready.`,
    ctaSecondary: 'Compare plans',
  },
  compensation: {
    eyebrow: 'Elite Plan',
    headline: 'Pay decisions you can stand behind',
    subheadline: `See where every employee falls within their band, run merit cycles without the spreadsheet, and give your people total rewards statements that actually make sense.`,
    benefits: [
      {
        icon: 'chart-bar',
        title: 'Bands that mean something',
        description: `Define pay levels and salary bands, then see at a glance who\u2019s on track, who\u2019s below range, and where you need to focus next.`,
      },
      {
        icon: 'sliders',
        title: 'Merit cycles, simplified',
        description: `Managers recommend, you review, leadership approves. Budget guardrails keep things on track and the whole process lives in one place.`,
      },
      {
        icon: 'file-lines',
        title: 'Total rewards, visible',
        description: `Give employees a clear picture of everything they earn \u2014 salary, benefits, equity, perks \u2014 so they understand their full compensation, not just the paycheck.`,
      },
    ],
    trustSignal: 'Companies using structured comp planning see 25% fewer pay equity gaps.',
    ctaLabel: 'Upgrade to Elite',
    ctaReassurance: 'Includes everything in Pro, plus compensation tools and benchmarks.',
    ctaSecondary: 'Compare plans',
  },
  culture: {
    eyebrow: 'Pro Plan',
    headline: 'A workplace people want to show up to',
    subheadline: `Recognition, surveys, and wellbeing check-ins that help you understand how your people are really doing \u2014 and do something about it.`,
    benefits: [
      {
        icon: 'heart',
        title: 'Recognition that sticks',
        description: `Peer-to-peer shout-outs and manager recognition, right inside BambooHR. People see they\u2019re valued without waiting for the all-hands meeting.`,
      },
      {
        icon: 'chart-bar',
        title: 'Know before they go',
        description: `Pulse surveys and engagement scores help you spot disengagement early. You\u2019ll have data to act on, not just a gut feeling something\u2019s off.`,
      },
      {
        icon: 'heart',
        title: 'Wellbeing, not just wellness',
        description: `Quick check-ins let employees share how they\u2019re doing on their own terms. You get the signal you need to support your team without being intrusive.`,
      },
    ],
    trustSignal: 'Organizations that measure engagement regularly see 21% lower turnover.',
    ctaLabel: 'Upgrade to Pro',
    ctaReassurance: `Your current data stays exactly as it is. Nothing changes until you\u2019re ready.`,
    ctaSecondary: 'Compare plans',
  },
  timesheets: {
    eyebrow: 'Time Tracking Add-On',
    headline: `Timesheets that don\u2019t feel like homework`,
    subheadline: `Employees log hours, managers approve, and it all flows into payroll. No more chasing people down on Friday afternoon.`,
    benefits: [
      {
        icon: 'clock',
        title: 'Simple time entry',
        description: `Daily or weekly \u2014 employees pick what works. Clock in from their phone, their browser, or a kiosk. It takes seconds, not minutes.`,
      },
      {
        icon: 'user-check',
        title: 'Approvals that move',
        description: `Managers get a clear view of who\u2019s submitted and who hasn\u2019t. One click to approve, automatic reminders for the rest.`,
      },
      {
        icon: 'money-bill-1',
        title: 'Straight into payroll',
        description: `Approved hours flow directly into your pay run. No exporting, no re-entering, no wondering if the numbers match.`,
      },
    ],
    trustSignal: 'Teams using BambooHR Time Tracking cut timesheet collection time by 75%.',
    ctaLabel: 'Add Time Tracking',
    ctaReassurance: 'Works with your existing time-off policies. Set up in minutes.',
    ctaSecondary: 'See pricing details',
  },
  planning: {
    eyebrow: 'Elite Plan',
    headline: 'Merit cycles without the madness',
    subheadline: `Run raises, promotions, and budget allocation in one place. Managers recommend, you set the guardrails, and leadership signs off \u2014 no spreadsheet required.`,
    benefits: [
      {
        icon: 'sliders',
        title: 'Budgets that hold',
        description: `Set a budget, allocate by department, and let managers work within their limits. You\u2019ll see the full picture before anything is finalized.`,
      },
      {
        icon: 'user-check',
        title: 'Manager input, your control',
        description: `Managers submit recommendations. You review, adjust, and route for approval. Everyone has a voice, but you have the final say.`,
      },
      {
        icon: 'check',
        title: 'A clear audit trail',
        description: `Every recommendation, approval, and change is logged. When someone asks "why did we do that?" you\u2019ll have the answer.`,
      },
    ],
    trustSignal: 'Companies using structured comp planning complete merit cycles 50% faster.',
    ctaLabel: 'Upgrade to Elite',
    ctaReassurance: 'Includes everything in Pro, plus compensation tools and benchmarks.',
    ctaSecondary: 'Compare plans',
  },
  benchmarks: {
    eyebrow: 'Elite Plan',
    headline: 'Know where you stand',
    subheadline: `Compare your compensation, turnover, and headcount against companies like yours. Real data, not guesswork.`,
    benefits: [
      {
        icon: 'chart-bar',
        title: 'Market-rate clarity',
        description: `See how your pay compares by role, level, and location. Make offers and adjustments with confidence instead of Googling salary ranges.`,
      },
      {
        icon: 'chart-line',
        title: 'Turnover in context',
        description: `Is 15% turnover bad? Depends on your industry. Benchmarks show you where you fall so you know if it\u2019s a problem or just the landscape.`,
      },
      {
        icon: 'users',
        title: 'Your peer group, defined',
        description: `Filter benchmarks by industry, company size, and region. Compare against the companies you actually compete with for talent.`,
      },
    ],
    trustSignal: '80% of HR leaders say benchmarking data directly improved their retention strategy.',
    ctaLabel: 'Upgrade to Elite',
    ctaReassurance: 'Includes everything in Pro, plus compensation tools and planning.',
    ctaSecondary: 'Compare plans',
  },
};

const DEFAULT_CONFIG: UpsellConfig = {
  eyebrow: 'Upgrade Required',
  headline: `There\u2019s more here for you`,
  subheadline: `This feature isn\u2019t included in your current plan, but it\u2019s easy to add. Take a look at what you\u2019d get.`,
  benefits: [
    { icon: 'check-circle', title: 'Less manual work', description: `Automate the tasks that eat up your week so you can focus on the work that actually matters.` },
    { icon: 'chart-line', title: 'Better visibility', description: `See what\u2019s happening across your organization without pulling data from five different places.` },
    { icon: 'users', title: 'Happier people', description: `Give your employees a better experience \u2014 and give yourself fewer questions to answer.` },
  ],
  trustSignal: 'Thousands of growing companies trust BambooHR to run their HR.',
  ctaLabel: 'Talk to Us',
  ctaReassurance: 'No pressure, no commitment. Just a conversation about what might help.',
  ctaSecondary: 'Compare plans',
};

export default function UpsellPage() {
  const { slug } = useParams<{ slug: string }>();
  const config = UPSELL_DATA[slug || ''] || { ...DEFAULT_CONFIG };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-[580px] w-full">
        {/* Eyebrow + Headline + Subheadline */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-strong)] mb-2">
            {config.eyebrow}
          </p>
          <h1 className="text-[28px] font-bold text-[var(--text-neutral-xx-strong)] leading-tight mb-3">
            {config.headline}
          </h1>
          <p className="text-[15px] text-[var(--text-neutral-medium)] leading-relaxed max-w-[480px] mx-auto">
            {config.subheadline}
          </p>
        </div>

        {/* Benefit tiles */}
        <div className="space-y-3 mb-8">
          {config.benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl border border-[var(--border-neutral-xx-weak)] p-4"
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--surface-neutral-xx-weak)] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name={b.icon} size={16} className="text-[var(--color-primary-strong)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-0.5">
                  {b.title}
                </h3>
                <p className="text-[13px] text-[var(--text-neutral-medium)] leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust signal */}
        <p className="text-center text-[13px] text-[var(--text-neutral-weak)] mb-6 italic">
          {config.trustSignal}
        </p>

        {/* CTA block */}
        <div className="text-center">
          <button className="px-6 py-3 text-sm font-semibold text-white bg-[var(--color-primary-strong)] rounded-lg hover:opacity-90 transition-opacity">
            {config.ctaLabel}
          </button>
          <p className="text-[12px] text-[var(--text-neutral-weak)] mt-2.5">
            {config.ctaReassurance}
          </p>
          {config.ctaSecondary && (
            <button className="mt-2 text-[13px] font-medium text-[var(--color-primary-strong)] hover:underline">
              {config.ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
