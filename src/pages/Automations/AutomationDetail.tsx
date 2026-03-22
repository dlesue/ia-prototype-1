import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';

interface FlowNode {
  type: 'trigger' | 'condition' | 'action' | 'notify';
  label: string;
  value: string;
  options: string[];
}

interface RunEntry {
  date: string;
  status: 'Success' | 'Skipped' | 'Failed';
  detail: string;
}

interface AutomationDef {
  name: string;
  product: string;
  status: 'Active' | 'Paused';
  runs: number;
  lastRun: string;
  nextRun: string;
  createdBy: string;
  summary: string;
  flow: FlowNode[];
  history: RunEntry[];
}

const AUTOMATIONS: Record<string, AutomationDef> = {
  '0': {
    name: 'Auto-approve timesheets under 40 hours',
    product: 'Time & Attendance',
    status: 'Active',
    runs: 142,
    lastRun: 'Mar 15, 6:00 PM',
    nextRun: 'Mar 16, 6:00 PM',
    createdBy: 'Sarah Chen',
    summary: 'Every day at 6 PM, this automation checks all submitted timesheets. If the total hours are under 40, it auto-approves them and notifies the manager. This has saved an average of 11 manual approvals per day.',
    history: [
      { date: 'Mar 15, 6:00 PM', status: 'Success', detail: '12 timesheets auto-approved' },
      { date: 'Mar 14, 6:00 PM', status: 'Success', detail: '9 timesheets auto-approved' },
      { date: 'Mar 13, 6:00 PM', status: 'Skipped', detail: 'No timesheets under threshold' },
      { date: 'Mar 12, 6:00 PM', status: 'Success', detail: '14 timesheets auto-approved' },
      { date: 'Mar 11, 6:00 PM', status: 'Success', detail: '8 timesheets auto-approved' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'Timesheet submitted', options: ['Timesheet submitted', 'End of pay period', 'Daily at 6 PM'] },
      { type: 'condition', label: 'If', value: 'Total hours < 40', options: ['Total hours < 40', 'Total hours < 35', 'Total hours < 45'] },
      { type: 'action', label: 'Then', value: 'Auto-approve timesheet', options: ['Auto-approve timesheet', 'Mark as reviewed', 'Send to payroll'] },
      { type: 'notify', label: 'Notify', value: 'Manager only', options: ['Manager only', 'Manager + Employee', 'No one'] },
    ],
  },
  '1': {
    name: 'Send anniversary recognition automatically',
    product: 'People',
    status: 'Active',
    runs: 87,
    lastRun: 'Mar 15, 8:00 AM',
    nextRun: 'Mar 17, 8:00 AM',
    createdBy: 'Sarah Chen',
    summary: 'On each employee\'s work anniversary, this automation sends a personalized recognition message to the employee and a heads-up to their manager. Covers all employees regardless of tenure.',
    history: [
      { date: 'Mar 15, 8:00 AM', status: 'Success', detail: '2 anniversary messages sent' },
      { date: 'Mar 12, 8:00 AM', status: 'Skipped', detail: 'No anniversaries today' },
      { date: 'Mar 10, 8:00 AM', status: 'Success', detail: '1 anniversary message sent' },
      { date: 'Mar 7, 8:00 AM', status: 'Success', detail: '3 anniversary messages sent' },
      { date: 'Mar 5, 8:00 AM', status: 'Skipped', detail: 'No anniversaries today' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'Work anniversary date', options: ['Work anniversary date', '1 week before anniversary', 'Day after anniversary'] },
      { type: 'condition', label: 'If', value: 'All employees', options: ['All employees', 'Full-time only', '1+ year tenure'] },
      { type: 'action', label: 'Then', value: 'Send recognition message', options: ['Send recognition message', 'Post to community feed', 'Send gift card'] },
      { type: 'notify', label: 'Notify', value: 'Manager + Employee', options: ['Manager + Employee', 'Employee only', 'Whole team'] },
    ],
  },
  '2': {
    name: 'Alert on payroll variance > 5%',
    product: 'Payroll',
    status: 'Active',
    runs: 23,
    lastRun: 'Mar 14, 2:30 PM',
    nextRun: 'Next payroll run',
    createdBy: 'Mike Torres',
    summary: 'After every payroll run, this automation compares the total against the previous period. If the variance exceeds 5%, it flags the run for review and alerts the payroll admin before funds are disbursed.',
    history: [
      { date: 'Mar 14, 2:30 PM', status: 'Success', detail: 'Variance 2.1% — within threshold' },
      { date: 'Mar 1, 2:30 PM', status: 'Failed', detail: 'Variance 6.3% — alert sent to admin' },
      { date: 'Feb 14, 2:30 PM', status: 'Success', detail: 'Variance 1.8% — within threshold' },
      { date: 'Feb 1, 2:30 PM', status: 'Success', detail: 'Variance 3.2% — within threshold' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'Payroll run completed', options: ['Payroll run completed', 'Before payroll approval', 'Daily'] },
      { type: 'condition', label: 'If', value: 'Variance exceeds 5%', options: ['Variance exceeds 5%', 'Variance exceeds 3%', 'Variance exceeds 10%'] },
      { type: 'action', label: 'Then', value: 'Flag payroll for review', options: ['Flag payroll for review', 'Block payroll submission', 'Add note to run'] },
      { type: 'notify', label: 'Notify', value: 'Payroll admin', options: ['Payroll admin', 'Payroll admin + CFO', 'All finance team'] },
    ],
  },
  '3': {
    name: 'Auto-assign onboarding IT tasks',
    product: 'Onboarding',
    status: 'Active',
    runs: 56,
    lastRun: 'Mar 14, 9:15 AM',
    nextRun: 'Next new hire created',
    createdBy: 'Sarah Chen',
    summary: 'Whenever a new hire is created in the system, this automation immediately generates and assigns the standard IT setup tasks — laptop, accounts, badges — and notifies the IT team and hiring manager.',
    history: [
      { date: 'Mar 14, 9:15 AM', status: 'Success', detail: 'IT tasks assigned for Jamie Lee' },
      { date: 'Mar 10, 11:00 AM', status: 'Success', detail: 'IT tasks assigned for Alex Park' },
      { date: 'Mar 3, 2:00 PM', status: 'Success', detail: 'IT tasks assigned for Dana Cruz' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'New hire created', options: ['New hire created', 'Offer accepted', '2 weeks before start date'] },
      { type: 'condition', label: 'If', value: 'All new hires', options: ['All new hires', 'Full-time only', 'Technical roles only'] },
      { type: 'action', label: 'Then', value: 'Create IT setup tasks', options: ['Create IT setup tasks', 'Send IT request form', 'Assign equipment checklist'] },
      { type: 'notify', label: 'Notify', value: 'IT team + Manager', options: ['IT team + Manager', 'IT team only', 'IT team + HR'] },
    ],
  },
  '4': {
    name: 'Remind pending PTO approvals',
    product: 'Time & Attendance',
    status: 'Paused',
    runs: 31,
    lastRun: 'Mar 8, 9:00 AM',
    nextRun: 'Paused',
    createdBy: 'Sarah Chen',
    summary: 'Every morning at 9 AM, this automation checks for PTO requests that have been pending manager approval for more than 48 hours. If any are found, it sends a reminder to the responsible manager. Currently paused.',
    history: [
      { date: 'Mar 8, 9:00 AM', status: 'Success', detail: '3 reminders sent to managers' },
      { date: 'Mar 7, 9:00 AM', status: 'Skipped', detail: 'No pending requests over 48hrs' },
      { date: 'Mar 6, 9:00 AM', status: 'Success', detail: '1 reminder sent to manager' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'PTO request pending 48+ hours', options: ['PTO request pending 48+ hours', 'Pending 24+ hours', 'Pending 72+ hours'] },
      { type: 'condition', label: 'If', value: 'All pending requests', options: ['All pending requests', 'Requests within 2 weeks', 'Requests over 3 days'] },
      { type: 'action', label: 'Then', value: 'Send reminder to manager', options: ['Send reminder to manager', 'Send reminder + escalate', 'Auto-approve'] },
      { type: 'notify', label: 'Notify', value: 'Manager only', options: ['Manager only', 'Manager + HR', 'Manager + Employee'] },
    ],
  },
  '5': {
    name: 'Flag stale at-risk goals',
    product: 'Performance',
    status: 'Active',
    runs: 12,
    lastRun: 'Mar 14, 7:00 AM',
    nextRun: 'Mar 21, 7:00 AM',
    createdBy: 'Mike Torres',
    summary: 'Every week, this automation scans all goals marked as at-risk. If any have been in that state for 14 or more days without an update, it flags them for the manager and sends a notification to both the manager and the employee.',
    history: [
      { date: 'Mar 14, 7:00 AM', status: 'Success', detail: '2 goals flagged for review' },
      { date: 'Mar 7, 7:00 AM', status: 'Skipped', detail: 'No stale at-risk goals found' },
      { date: 'Feb 28, 7:00 AM', status: 'Success', detail: '4 goals flagged for review' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'Weekly check', options: ['Weekly check', 'Daily check', 'Bi-weekly check'] },
      { type: 'condition', label: 'If', value: 'Goal marked at-risk for 14+ days', options: ['At-risk for 14+ days', 'At-risk for 7+ days', 'At-risk for 30+ days'] },
      { type: 'action', label: 'Then', value: 'Flag for manager review', options: ['Flag for manager review', 'Add to 1:1 agenda', 'Request status update'] },
      { type: 'notify', label: 'Notify', value: 'Manager + Employee', options: ['Manager + Employee', 'Manager only', 'HR + Manager'] },
    ],
  },
  '6': {
    name: 'Enrollment deadline reminders',
    product: 'Benefits',
    status: 'Active',
    runs: 44,
    lastRun: 'Mar 13, 8:00 AM',
    nextRun: 'Mar 20, 8:00 AM',
    createdBy: 'Sarah Chen',
    summary: 'Seven days before a benefits enrollment deadline, this automation sends a reminder email to every employee who hasn\'t completed their enrollment yet. It runs weekly until the deadline passes.',
    history: [
      { date: 'Mar 13, 8:00 AM', status: 'Success', detail: '7 reminder emails sent' },
      { date: 'Mar 6, 8:00 AM', status: 'Success', detail: '12 reminder emails sent' },
      { date: 'Feb 27, 8:00 AM', status: 'Success', detail: '3 reminder emails sent' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: '7 days before enrollment deadline', options: ['7 days before', '14 days before', '3 days before'] },
      { type: 'condition', label: 'If', value: 'Employee has not enrolled', options: ['Has not enrolled', 'Has not started enrollment', 'Has incomplete enrollment'] },
      { type: 'action', label: 'Then', value: 'Send reminder email', options: ['Send reminder email', 'Send email + Slack', 'Send email + push notification'] },
      { type: 'notify', label: 'Notify', value: 'Employee only', options: ['Employee only', 'Employee + Manager', 'Employee + HR'] },
    ],
  },
  '7': {
    name: 'Weekly headcount digest',
    product: 'Reports',
    status: 'Active',
    runs: 18,
    lastRun: 'Mar 10, 8:00 AM',
    nextRun: 'Mar 17, 8:00 AM',
    createdBy: 'Mike Torres',
    summary: 'Every Monday at 8 AM, this automation generates a headcount summary — new hires, terminations, and net change — and emails it to HR leadership. It always runs regardless of whether headcount changed.',
    history: [
      { date: 'Mar 10, 8:00 AM', status: 'Success', detail: 'Digest sent to HR leadership' },
      { date: 'Mar 3, 8:00 AM', status: 'Success', detail: 'Digest sent to HR leadership' },
      { date: 'Feb 24, 8:00 AM', status: 'Failed', detail: 'Report generation timed out' },
      { date: 'Feb 17, 8:00 AM', status: 'Success', detail: 'Digest sent to HR leadership' },
    ],
    flow: [
      { type: 'trigger', label: 'When', value: 'Every Monday at 8 AM', options: ['Every Monday at 8 AM', 'Every Friday at 5 PM', 'First of month'] },
      { type: 'condition', label: 'If', value: 'Always', options: ['Always', 'Only if changes occurred', 'Only if headcount changed > 2%'] },
      { type: 'action', label: 'Then', value: 'Generate and send digest', options: ['Generate and send digest', 'Generate and save to files', 'Generate and post to Slack'] },
      { type: 'notify', label: 'Notify', value: 'HR leadership', options: ['HR leadership', 'All HR admins', 'HR + Executives'] },
    ],
  },
};

const NODE_CONFIG: Record<FlowNode['type'], { icon: string; label: string; color: string; iconBg: string }> = {
  trigger: { icon: 'bolt', label: 'Trigger', color: 'text-blue-500', iconBg: 'bg-blue-50' },
  condition: { icon: 'sliders', label: 'Condition', color: 'text-amber-500', iconBg: 'bg-amber-50' },
  action: { icon: 'check', label: 'Action', color: 'text-emerald-500', iconBg: 'bg-emerald-50' },
  notify: { icon: 'bell', label: 'Notification', color: 'text-purple-500', iconBg: 'bg-purple-50' },
};

export default function AutomationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auto = AUTOMATIONS[id || '0'];
  const [status, setStatus] = useState(auto?.status || 'Active');
  const [values, setValues] = useState<string[]>(() => auto?.flow.map(n => n.value) || []);

  if (!auto) {
    return (
      <div className="px-8 pt-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1">
          <Icon name="chevron-left" size={10} />
          Back
        </button>
        <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
          <Link to="/automations" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Automations</Link>
        </div>
        <p className="text-[var(--text-neutral-weak)]">Automation not found.</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Success: 'text-emerald-600',
    Skipped: 'text-[var(--text-neutral-weak)]',
    Failed: 'text-red-500',
  };

  return (
    <div className="px-8 pt-6 pb-24">
      {/* Back link */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1">
        <Icon name="chevron-left" size={10} />
        Back
      </button>
      <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
        <Link to="/automations" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Automations</Link>
        <Icon name="chevron-right" size={8} />
        <span>{auto.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-1">
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">{auto.name}</h1>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-[12px] font-medium ${status === 'Active' ? 'text-[var(--color-primary-strong)]' : 'text-[var(--text-neutral-weak)]'}`}>
            {status}
          </span>
          <button
            onClick={() => setStatus(s => s === 'Active' ? 'Paused' : 'Active')}
            className={`relative w-10 h-[22px] rounded-full transition-colors ${status === 'Active' ? 'bg-[var(--color-primary-medium)]' : 'bg-neutral-300'}`}
          >
            <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${status === 'Active' ? 'left-[22px]' : 'left-[3px]'}`} />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between mb-6 text-[12px] text-[var(--text-neutral-weak)]">
        <div className="flex items-center gap-1.5">
          <span>Created by</span>
          <Icon name="circle-user" size={13} className="text-[var(--text-neutral-weak)]" />
          <span className="text-[var(--text-neutral-medium)]">{auto.createdBy}</span>
          <span className="mx-1">|</span>
          <span>{auto.product}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{auto.runs} runs</span>
          <span className="mx-1">|</span>
          <span>Last: {auto.lastRun}</span>
          <span className="mx-1">|</span>
          <span>Next: {auto.nextRun}</span>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mb-6 px-4 py-3.5 rounded-lg bg-transparent border border-[var(--border-neutral-xx-weak)] flex gap-2.5">
        <Icon name="sparkles" size={13} className="text-[var(--text-neutral-weak)] shrink-0 mt-0.5" />
        <p className="text-[13px] leading-[20px] text-[var(--text-neutral-medium)]">{auto.summary}</p>
      </div>

      {/* Flowchart */}
      <h2 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Automation Steps</h2>
      <div className="bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] overflow-hidden py-2">
        {auto.flow.map((node, i) => {
          const config = NODE_CONFIG[node.type];
          return (
            <div key={i}>
              {i > 0 && (
                <div className="flex items-center px-6">
                  <div className="w-[72px] shrink-0" />
                  <div className="w-8 flex justify-center ml-3">
                    <div className="w-px h-5 border-l-2 border-[var(--border-neutral-xx-weak)]" />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 px-6 py-2.5">
                <p className={`text-[11px] font-semibold uppercase tracking-wide ${config.color} w-[72px] text-right shrink-0`}>{config.label}</p>
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${config.iconBg} shrink-0`}>
                  <Icon name={config.icon as IconName} size={14} className={config.color} />
                </div>
                <select
                  value={values[i]}
                  onChange={e => {
                    const next = [...values];
                    next[i] = e.target.value;
                    setValues(next);
                  }}
                  className="px-3 py-1.5 text-[13px] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-xx-weak)] border border-[var(--border-neutral-xx-weak)] rounded-lg outline-none focus:border-[var(--color-primary-medium)] transition-colors cursor-pointer"
                >
                  {node.options.map((opt, oi) => (
                    <option key={oi}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Run History */}
      <h2 className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)] mt-8 mb-3">Run History</h2>
      <div className="bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <div className="grid grid-cols-[120px_72px_1fr] px-5 py-2.5 border-b border-[var(--border-neutral-xx-weak)] bg-[var(--surface-neutral-xx-weak)]">
          <span className="text-[11px] font-medium text-[var(--text-neutral-weak)] uppercase tracking-wide">Date</span>
          <span className="text-[11px] font-medium text-[var(--text-neutral-weak)] uppercase tracking-wide">Status</span>
          <span className="text-[11px] font-medium text-[var(--text-neutral-weak)] uppercase tracking-wide">Detail</span>
        </div>
        {auto.history.map((run, i) => (
          <div key={i} className={`grid grid-cols-[120px_72px_1fr] px-5 py-2.5 ${i > 0 ? 'border-t border-[var(--border-neutral-xx-weak)]' : ''}`}>
            <span className="text-[12px] text-[var(--text-neutral-medium)]">{run.date}</span>
            <span className={`text-[12px] font-medium ${statusColors[run.status]}`}>{run.status}</span>
            <span className="text-[12px] text-[var(--text-neutral-medium)]">{run.detail}</span>
          </div>
        ))}
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-[var(--nav-w,0px)] right-[calc(var(--chat-w,0px)+var(--demo-w,0px))] z-40 bg-white border-t border-[var(--border-neutral-xx-weak)]">
        <div className="flex items-center gap-3 px-8 py-3">
          <button className="px-4 py-2 rounded-lg bg-[var(--color-primary-medium)] hover:bg-[var(--color-primary-strong)] text-white text-[13px] font-medium transition-colors">
            Save Changes
          </button>
          <button className="px-4 py-2 rounded-lg border border-[var(--border-neutral-weak)] text-[13px] font-medium text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            Duplicate
          </button>
          <button className="px-4 py-2 rounded-lg border border-[var(--border-neutral-weak)] text-[13px] font-medium text-[var(--text-neutral-medium)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            <span className="flex items-center gap-1.5">
              <Icon name="bolt" size={12} />
              Run Once
            </span>
          </button>
          <button className="px-4 py-2 rounded-lg text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors ml-auto">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
