import React from 'react';

export default function SettingsAccount() {
  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Account</h1>
        <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage your BambooHR subscription and company settings</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] p-5">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Subscription</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #3d9a21, #2e7918)" }}>PRO</span>
            <span className="text-sm text-[var(--text-neutral-x-strong)]">BambooHR Pro Plan</span>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between py-2 border-b border-[var(--border-neutral-xx-weak)]">
              <span className="text-[var(--text-neutral-medium)]">Add-ons</span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">Payroll</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">Benefits</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]">Time Tracking</span>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-[var(--border-neutral-xx-weak)]">
              <span className="text-[var(--text-neutral-medium)]">Next billing date</span>
              <span className="text-[var(--text-neutral-x-strong)]">April 1, 2026</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[var(--text-neutral-medium)]">Billing contact</span>
              <span className="text-[var(--text-neutral-x-strong)]">finance@acmecorp.com</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] p-5">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Company Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Company Name", "Acme Corp"],
              ["Industry", "Technology"],
              ["Founded", "2014"],
              ["Employee Count", "847"],
              ["Data Center", "US-West"],
              ["Account ID", "acme-corp-001"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[var(--text-neutral-medium)]">{label}</label>
                <input type="text" defaultValue={value} className="px-3 py-2 text-sm border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)]" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] p-5">
          <h2 className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-4">Login & Security</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-neutral-xx-weak)]">
              <div>
                <div className="text-sm font-medium text-[var(--text-neutral-x-strong)]">Single Sign-On (SSO)</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">Configure SAML 2.0 or OIDC authentication</div>
              </div>
              <div className="w-10 h-5 bg-[var(--surface-neutral-x-weak)] rounded-full relative cursor-pointer border border-[var(--border-neutral-weak)]">
                <div className="w-4 h-4 rounded-full bg-[var(--text-neutral-medium)] absolute top-0.5 left-0.5 transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--border-neutral-xx-weak)]">
              <div>
                <div className="text-sm font-medium text-[var(--text-neutral-x-strong)]">Two-Factor Authentication</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">Require 2FA for all admin users</div>
              </div>
              <div className="w-10 h-5 rounded-full relative cursor-pointer" style={{ background: "var(--color-primary-strong)" }}>
                <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 right-0.5 transition-all" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-[var(--text-neutral-x-strong)]">Session Timeout</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">Automatically log out after inactivity</div>
              </div>
              <select className="px-3 py-1.5 text-sm border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-x-strong)]">
                <option>8 hours</option>
                <option>4 hours</option>
                <option>1 hour</option>
                <option>30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-5 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
