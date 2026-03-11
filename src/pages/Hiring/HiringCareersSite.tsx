import React, { useState } from 'react';

const publishedJobs = [
  { title: "Senior Product Designer", dept: "Product Design", location: "Remote", applicants: 14, published: "Jan 15, 2026", active: true },
  { title: "Staff Software Engineer", dept: "Platform Engineering", location: "San Francisco, CA", applicants: 22, published: "Jan 8, 2026", active: true },
  { title: "Sales Development Rep", dept: "Revenue", location: "New York, NY", applicants: 34, published: "Dec 12, 2025", active: true },
  { title: "HR Business Partner", dept: "People Ops", location: "Remote", applicants: 8, published: "Feb 1, 2026", active: true },
  { title: "Data Engineer", dept: "Data", location: "Austin, TX", applicants: 12, published: "Jan 22, 2026", active: true },
  { title: "Product Manager", dept: "Product", location: "Remote", applicants: 19, published: "Feb 10, 2026", active: true },
  { title: "Marketing Manager", dept: "Marketing", location: "San Francisco, CA", applicants: 9, published: "Feb 20, 2026", active: false },
  { title: "Finance Analyst", dept: "Finance", location: "Remote", applicants: 5, published: "Nov 5, 2025", active: false },
];

export default function HiringCareersSite() {
  const [activeTab, setActiveTab] = useState("Published Jobs");
  const [jobs, setJobs] = useState(publishedJobs);
  const tabs = ["Published Jobs", "Branding", "Embed"];

  const toggleJob = (idx: number) => {
    setJobs(prev => prev.map((j, i) => i === idx ? { ...j, active: !j.active } : j));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)]">Careers Site</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Manage your public job listings and branding</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          View Live Site
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Published Jobs", value: "18" },
          { label: "Site Views / Month", value: "2,847" },
          { label: "Applications This Month", value: "234" },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-4">
            <div className="text-xs text-[var(--text-neutral-medium)] uppercase tracking-wide font-medium mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--text-neutral-xx-strong)]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-0 border-b border-[var(--border-neutral-x-weak)] mb-4">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? "border-[var(--color-primary-strong)] text-[var(--color-primary-strong)]" : "border-transparent text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]"}`}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Published Jobs" && (
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-neutral-xx-weak)]">
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Job Title</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Department</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Location</th>
                <th className="text-right py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Applicants</th>
                <th className="text-left py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Published</th>
                <th className="text-center py-2 px-4 text-xs font-medium text-[var(--text-neutral-medium)] uppercase tracking-wide">Active</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j, i) => (
                <tr key={j.title} className="border-b border-[var(--border-neutral-xx-weak)] hover:bg-[var(--surface-neutral-xx-weak)]">
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text-neutral-xx-strong)]">{j.title}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)]">{j.dept}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{j.location}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-x-strong)] text-right">{j.applicants}</td>
                  <td className="py-3 px-4 text-sm text-[var(--text-neutral-medium)]">{j.published}</td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={() => toggleJob(i)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${j.active ? "bg-[var(--color-primary-strong)]" : "bg-[var(--border-neutral-weak)]"}`}>
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${j.active ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Branding" && (
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-6">
          <p className="text-sm text-[var(--text-neutral-medium)]">Customize your careers site branding, logo, colors, and company description.</p>
        </div>
      )}

      {activeTab === "Embed" && (
        <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-6">
          <p className="text-sm text-[var(--text-neutral-medium)] mb-3">Embed your careers page on your website using the snippet below.</p>
          <pre className="bg-[var(--surface-neutral-xx-weak)] rounded-[var(--radius-small)] p-4 text-xs text-[var(--text-neutral-x-strong)] overflow-auto">{'<script src="https://careers.bamboohr.com/embed.js" data-company="your-company"></script>'}</pre>
        </div>
      )}
    </div>
  );
}
