import React, { useState } from 'react';

const alerts = [
  { type: "New Hire Added", trigger: "Employee record created", recipients: "HR Team", frequency: "Immediate", enabled: true },
  { type: "Termination Processed", trigger: "Employment status set to terminated", recipients: "HR Admin, IT", frequency: "Immediate", enabled: true },
  { type: "Birthday Reminder", trigger: "3 days before employee birthday", recipients: "Direct Manager", frequency: "Daily", enabled: true },
  { type: "Work Anniversary", trigger: "On anniversary date", recipients: "HR Team, Direct Manager", frequency: "Daily", enabled: true },
  { type: "Time Off Request", trigger: "Employee submits time off", recipients: "Direct Manager", frequency: "Immediate", enabled: true },
  { type: "Time Off Approved", trigger: "Manager approves time off", recipients: "Employee", frequency: "Immediate", enabled: true },
  { type: "Payroll Processed", trigger: "Payroll run completed", recipients: "Payroll Team", frequency: "Immediate", enabled: true },
  { type: "Benefits Enrollment Reminder", trigger: "7 days before enrollment deadline", recipients: "All Employees", frequency: "Daily", enabled: true },
  { type: "Performance Review Due", trigger: "5 days before review deadline", recipients: "Employee, Manager", frequency: "Daily", enabled: false },
  { type: "Certification Expiring", trigger: "30 days before cert expiry", recipients: "Employee, Manager", frequency: "Weekly", enabled: true },
  { type: "Document Signature Pending", trigger: "Document sent for signature", recipients: "Employee", frequency: "Immediate", enabled: true },
  { type: "I-9 Compliance Alert", trigger: "I-9 not completed within 3 days", recipients: "HR Admin", frequency: "Immediate", enabled: true },
];

export default function SettingsEmailAlerts() {
  const [alertList, setAlertList] = useState(alerts);

  const toggleAlert = (idx: number) => {
    setAlertList(prev => prev.map((a, i) => i === idx ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Email Alerts</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Configure automated email notifications for HR events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          + Custom Alert
        </button>
      </div>

      <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-neutral-xx-weak)]">
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Alert Type</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Trigger Event</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Recipients</th>
              <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Frequency</th>
              <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Enabled</th>
            </tr>
          </thead>
          <tbody>
            {alertList.map((a, i) => (
              <tr key={a.type} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{a.type}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{a.trigger}</td>
                <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{a.recipients}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">{a.frequency}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => toggleAlert(i)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${a.enabled ? "bg-[var(--color-primary-strong)]" : "bg-[var(--border-neutral-weak)]"}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${a.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
