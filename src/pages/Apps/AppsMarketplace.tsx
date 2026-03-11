import React, { useState } from 'react';
import { HubHeader } from '../../components/HubHeader';

const metrics = [
  { label: "Active", value: "8" },
  { label: "Healthy", value: "7" },
  { label: "Errors", value: "2" },
  { label: "Categories", value: "24" },
];

const insights = [
  { text: "Slack integration sync error needs attention" },
  { text: "2 new integrations available in your category" },
  { text: "API usage up 23% this month" },
];

const apps = [
  { name: "Okta", category: "SSO/Security", description: "Single sign-on and identity management for your workforce.", installed: true, color: "#00297a" },
  { name: "Slack", category: "Communication", description: "Team messaging and collaboration platform.", installed: true, color: "#4a154b" },
  { name: "Greenhouse", category: "Hiring", description: "Applicant tracking system and recruiting workflow.", installed: true, color: "#24a47f" },
  { name: "DocuSign", category: "E-Sign", description: "Electronic signature and agreement management.", installed: true, color: "#2c4bd4" },
  { name: "Checkr", category: "Background Checks", description: "Fast and accurate background check screening.", installed: false, color: "#4354b9" },
  { name: "Zoom", category: "Communication", description: "Video conferencing and online meeting platform.", installed: true, color: "#2d8cff" },
  { name: "ADP", category: "Payroll", description: "Payroll processing and tax filing integration.", installed: false, color: "#d0021b" },
  { name: "GitHub", category: "Dev", description: "Code repository and developer collaboration platform.", installed: true, color: "#24292e" },
  { name: "Salesforce", category: "CRM", description: "Customer relationship management and sales pipeline.", installed: false, color: "#00a1e0" },
];

const tabs = ["All", "SSO/Security", "Payroll", "Background Checks", "Communication", "Collaboration"];

export default function AppsMarketplace() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = apps.filter(a =>
    (activeTab === "All" || a.category === activeTab) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <HubHeader product="Apps" metrics={metrics} insights={insights} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Marketplace</h1>
            <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Browse and install integrations for your HR workflow</p>
          </div>
          <div className="flex items-center gap-2 border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] px-3 py-1.5 bg-[var(--surface-neutral-white)] w-56">
            <span className="text-[var(--text-neutral-medium)] text-xs">&#128269;</span>
            <input type="text" placeholder="Search integrations..." value={search} onChange={e => setSearch(e.target.value)} className="border-none outline-none text-sm bg-transparent text-[var(--text-neutral-x-strong)] w-full placeholder:text-[var(--text-neutral-weak)]" />
          </div>
        </div>

        <div className="flex gap-0 border-b border-[var(--border-neutral-x-weak)] mb-4">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? "border-[var(--color-primary-strong)] text-[var(--color-primary-strong)]" : "border-transparent text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map(app => (
            <div key={app.name} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4 hover:shadow-[var(--shadow-100)] transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-[var(--radius-medium)] flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: app.color }}>
                  {app.name[0]}
                </div>
                {app.installed ? (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary-weak)] text-[var(--color-primary-strong)]">Installed</span>
                ) : (
                  <button className="px-2.5 py-1 rounded-[var(--radius-xx-small)] text-xs font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>Install</button>
                )}
              </div>
              <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-1">{app.name}</div>
              <div className="text-xs text-[var(--text-neutral-medium)] mb-2">{app.category}</div>
              <p className="text-xs text-[var(--text-neutral-x-strong)] leading-relaxed">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
