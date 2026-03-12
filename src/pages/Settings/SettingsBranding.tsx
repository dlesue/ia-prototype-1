import React, { useState } from 'react';

export default function SettingsBranding() {
  const [primaryColor, setPrimaryColor] = useState("#3d9a21");
  const [companyName, setCompanyName] = useState("Acme Corp");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-4">Branding</h1>
          <p className="text-sm text-[var(--text-neutral-medium)] mt-0.5">Customize how BambooHR looks for your organization</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-xx-small)] text-sm font-medium text-white" style={{ background: "var(--color-primary-strong)" }}>
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5">
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Company Logo</div>
            <div className="border-2 border-dashed border-[var(--border-neutral-x-weak)] rounded-[var(--radius-medium)] p-8 flex flex-col items-center justify-center gap-2 hover:bg-[var(--surface-neutral-xx-weak)] cursor-pointer transition-colors">
              <span className="text-3xl">&#128444;&#65039;</span>
              <div className="text-sm font-medium text-[var(--text-neutral-x-strong)]">Drop logo here or click to upload</div>
              <div className="text-xs text-[var(--text-neutral-medium)]">PNG, SVG or JPG, max 2MB, recommended 200x50px</div>
            </div>
          </div>

          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5">
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Primary Color</div>
            <div className="flex items-center gap-3">
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] cursor-pointer" />
              <div>
                <div className="text-sm font-medium text-[var(--text-neutral-xx-strong)]">{primaryColor.toUpperCase()}</div>
                <div className="text-xs text-[var(--text-neutral-medium)]">Used for buttons, links, and accents</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              {["#3d9a21", "#2563eb", "#7c3aed", "#d97706", "#dc2626", "#0891b2"].map(color => (
                <button key={color} onClick={() => setPrimaryColor(color)} className={`w-7 h-7 rounded-full border-2 transition-all ${primaryColor === color ? "border-[var(--text-neutral-xx-strong)] scale-110" : "border-transparent hover:scale-105"}`} style={{ background: color }} />
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] p-5">
            <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Company Name Display</div>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-3 py-2 text-sm border border-[var(--border-neutral-x-weak)] rounded-[var(--radius-xx-small)] text-[var(--text-neutral-x-strong)] bg-[var(--surface-neutral-white)] outline-none focus:border-[var(--color-primary-medium)] transition-colors" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[var(--text-neutral-xx-strong)] mb-3">Preview</div>
          <div className="bg-[var(--surface-neutral-white)] rounded-[var(--radius-medium)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
            <div className="flex h-64">
              <div className="w-40 flex flex-col py-4 px-3 gap-1" style={{ background: primaryColor }}>
                <div className="text-white text-xs font-bold px-2 mb-3">{companyName}</div>
                {["Home", "People", "Hiring", "Payroll", "Benefits"].map(item => (
                  <div key={item} className="px-2 py-1.5 rounded text-xs text-white/80 hover:bg-white/10 cursor-pointer">{item}</div>
                ))}
              </div>
              <div className="flex-1 p-4 bg-[var(--surface-neutral-xx-weak)]">
                <div className="h-6 w-32 rounded mb-2" style={{ background: primaryColor, opacity: 0.15 }} />
                <div className="flex gap-2 mb-3">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="flex-1 h-12 bg-[var(--surface-neutral-white)] rounded border border-[var(--border-neutral-xx-weak)]" />
                  ))}
                </div>
                <div className="h-24 bg-[var(--surface-neutral-white)] rounded border border-[var(--border-neutral-xx-weak)]" />
              </div>
            </div>
          </div>
          <div className="text-xs text-[var(--text-neutral-medium)] mt-2 text-center">Navigation preview with selected brand color</div>
        </div>
      </div>
    </div>
  );
}
