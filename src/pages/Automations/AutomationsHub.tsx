import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const AUTOMATIONS = [
  { name: 'Auto-approve timesheets under 40 hours', product: 'Time & Attendance', status: 'Active', runs: 142 },
  { name: 'Send anniversary recognition automatically', product: 'People', status: 'Active', runs: 87 },
  { name: 'Alert on payroll variance > 5%', product: 'Payroll', status: 'Active', runs: 23 },
  { name: 'Auto-assign onboarding IT tasks', product: 'Onboarding', status: 'Active', runs: 56 },
  { name: 'Remind pending PTO approvals', product: 'Time & Attendance', status: 'Paused', runs: 31 },
  { name: 'Flag stale at-risk goals', product: 'Performance', status: 'Active', runs: 12 },
  { name: 'Enrollment deadline reminders', product: 'Benefits', status: 'Active', runs: 44 },
  { name: 'Weekly headcount digest', product: 'Reports', status: 'Active', runs: 18 },
];

export default function AutomationsHub() {
  const navigate = useNavigate();
  return (
    <div className="px-8 pt-6 pb-12">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Automations</h1>

      <div className="flex flex-col gap-2">
        {AUTOMATIONS.map((auto, i) => (
          <div
            key={i}
            onClick={() => navigate(`/automations/${i}`)}
            className="flex items-center gap-4 px-4 py-3.5 bg-white rounded-lg border border-[var(--border-neutral-xx-weak)] hover:border-[var(--border-neutral-weak)] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-primary-medium)] text-white shrink-0">
              <Icon name="bolt" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[var(--text-neutral-x-strong)]">{auto.name}</p>
              <p className="text-[12px] text-[var(--text-neutral-weak)]">{auto.product}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[12px] text-[var(--text-neutral-weak)]">{auto.runs} runs</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                auto.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-neutral-100 text-neutral-500'
              }`}>
                {auto.status}
              </span>
              <Icon name="chevron-right" size={12} className="text-[var(--text-neutral-weak)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
