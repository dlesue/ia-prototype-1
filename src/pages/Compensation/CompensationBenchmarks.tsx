import React from 'react';

interface UpsellPageProps {
  title: string;
  description: string;
  features: string[];
  previewLabel: string;
}

function UpsellPage({ title, description, features, previewLabel }: UpsellPageProps) {
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
            ELITE TIER
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-3">{title}</h1>
        <p className="text-sm text-[var(--text-neutral-medium)] mb-6 leading-relaxed">{description}</p>

        <div className="mb-6">
          <div className="text-xs font-semibold text-[var(--text-neutral-medium)] uppercase tracking-wide mb-3">Key Features</div>
          <ul className="flex flex-col gap-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-neutral-x-strong)]">
                <span className="text-[var(--color-primary-strong)] mt-0.5">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mb-8">
          <button className="px-5 py-2.5 rounded-[var(--radius-xx-small)] text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
            Contact Sales
          </button>
          <button className="px-5 py-2.5 rounded-[var(--radius-xx-small)] text-sm font-semibold border border-[var(--border-neutral-x-weak)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors">
            Learn More
          </button>
        </div>

        <div className="relative rounded-[var(--radius-large)] border border-[var(--border-neutral-xx-weak)] overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/60 z-10 flex flex-col items-center justify-center gap-3">
            <span className="text-2xl">&#128274;</span>
            <span className="text-sm font-medium text-[var(--text-neutral-medium)]">Upgrade to unlock {previewLabel}</span>
          </div>
          <div className="p-6 opacity-30 select-none pointer-events-none">
            <div className="h-48 bg-[var(--surface-neutral-x-weak)] rounded-[var(--radius-medium)] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 w-full px-8">
                <div className="h-3 w-full bg-[var(--border-neutral-x-weak)] rounded-full" />
                <div className="h-3 w-4/5 bg-[var(--border-neutral-x-weak)] rounded-full" />
                <div className="h-3 w-3/5 bg-[var(--border-neutral-x-weak)] rounded-full" />
                <div className="mt-4 w-full h-24 bg-[var(--border-neutral-xx-weak)] rounded-[var(--radius-small)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompensationBenchmarks() {
  return (
    <UpsellPage
      title="Compensation Benchmarks"
      description="Compare your compensation against market data by role, level, and geography. See where your employees fall relative to market percentiles."
      features={[
                "Market pay percentile data by job title and level",
        "Geographic pay adjustments and cost-of-living overlays",
        "Pay equity analysis across gender, ethnicity, and tenure",
        "Salary range recommendations based on market data",
      ]}
      previewLabel="market benchmarks"
    />
  );
}
