/**
 * SOURCE OF TRUTH: Personas & Packaging
 *
 * This file defines BambooHR's personas, packaging tiers, add-ons,
 * and visibility rules. All prototype components should derive their
 * persona/package behavior from this file.
 *
 * When updating personas, packages, or visibility rules, update THIS FILE.
 * The Project Docs viewer auto-generates a readable doc from this data.
 */

// ── Persona Types ────────────────────────────────────────────────────

export type PersonaType = 'employee' | 'manager' | 'hr-admin' | 'exec';

export interface PersonaDefinition {
  id: PersonaType;
  label: string;
  description: string;
  hubRelationship: string;
  jobsPerHub: string;
}

export const PERSONAS: PersonaDefinition[] = [
  {
    id: 'employee',
    label: 'Employee',
    description: 'Primarily interacts with the employee profile, not the hub. Needs hub access for self-service features that aren\'t individual-record-based: browsing training catalogs, enrolling in benefits, viewing the time off calendar.',
    hubRelationship: 'Self-service access to product features not tied to a single person\'s record.',
    jobsPerHub: '2–4',
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Uses hubs through a "my team" lens. Wants to see their direct reports\' data, approve requests, and take action on team-level tasks. Hub pages should offer filtered views scoped to the manager\'s team.',
    hubRelationship: 'Team-scoped views — direct reports\' data, approvals, team-level actions.',
    jobsPerHub: '2–3',
  },
  {
    id: 'hr-admin',
    label: 'HR Admin',
    description: 'The power user. Uses hubs for program management, configuration, compliance monitoring, and org-wide data. Has the most jobs-to-be-done in every product. Hubs should be designed around their workflows first.',
    hubRelationship: 'Program management, configuration, compliance, and org-wide data.',
    jobsPerHub: '4–5',
  },
  {
    id: 'exec',
    label: 'Executive',
    description: 'Uses hubs for dashboards and analytics. Rarely drills into individual records. Wants org-wide metrics, trends, and benchmarks. The Hub Header\'s metrics strip and AI insights serve this persona on every hub page.',
    hubRelationship: 'Dashboards, org-wide metrics, trends, and benchmarks.',
    jobsPerHub: '2–4',
  },
];

// ── Package Types ────────────────────────────────────────────────────

export type PackageType = 'core' | 'pro' | 'elite';

export interface PackageDefinition {
  id: PackageType;
  label: string;
  tier: number; // 0=core, 1=pro, 2=elite — used for comparison
  products: string[];
  notes: string;
}

export const PACKAGES: PackageDefinition[] = [
  {
    id: 'core',
    label: 'Core',
    tier: 0,
    products: [
      'Home', 'People', 'Hiring', 'Onboarding', 'Training',
      'Time & Attendance (Calendar + Time Off only)',
      'Reports (Standard + Custom + Dashboards)',
      'Files', 'Apps', 'Settings',
    ],
    notes: 'The base package. Includes foundational HR tools.',
  },
  {
    id: 'pro',
    label: 'Pro',
    tier: 1,
    products: ['Everything in Core', 'Performance', 'Culture'],
    notes: 'Adds performance management and employee engagement.',
  },
  {
    id: 'elite',
    label: 'Elite',
    tier: 2,
    products: ['Everything in Pro', 'Compensation', 'Reports Benchmarks'],
    notes: 'Adds strategic compensation tools and industry benchmarking.',
  },
];

// ── Add-on Types ─────────────────────────────────────────────────────

export type AddonType = 'payroll' | 'benefits' | 'time-tracking';

export interface AddonDefinition {
  id: AddonType;
  label: string;
  description: string;
}

export const ADDONS: AddonDefinition[] = [
  {
    id: 'payroll',
    label: 'Payroll',
    description: 'Adds Payroll T1 with Pay Calendar, History, Off-Cycle, and Reports.',
  },
  {
    id: 'benefits',
    label: 'Benefits',
    description: 'Adds Benefits T1 with Plans, Enrollment, and Carriers.',
  },
  {
    id: 'time-tracking',
    label: 'Time Tracking',
    description: 'Adds Timesheets page within Time & Attendance.',
  },
];

// ── Product Visibility Rules ─────────────────────────────────────────

/** Which package tier is required to unlock each product (if gated) */
export const PACKAGE_GATED: Record<string, PackageType> = {
  hiring: 'core',
  onboarding: 'core',
  offboarding: 'core',
  training: 'core',
  'time-and-attendance': 'core',
  performance: 'pro',
  'employee-community': 'pro',
  'rewards-recognition': 'pro',
  'wellbeing': 'pro',
  compensation: 'core',
};

/** Which add-on is required to unlock each product (if gated) */
export const ADDON_GATED: Record<string, AddonType> = {
  payroll: 'payroll',
  benefits: 'benefits',
};

// ── Nav Visibility Matrix ────────────────────────────────────────────

export interface NavVisibilityRule {
  product: string;
  employee: string;
  manager: string;
  hrAdmin: string;
  exec: string;
}

export const NAV_VISIBILITY_MATRIX: NavVisibilityRule[] = [
  { product: 'Home',              employee: '✓', manager: '✓',         hrAdmin: '✓',              exec: '✓' },
  { product: 'People',            employee: '✓ (My Info only)', manager: '✓ (+ My Direct Reports)', hrAdmin: '✓ (full)', exec: '✓ (full)' },
  { product: 'Hiring',            employee: '—', manager: '✓',         hrAdmin: '✓',              exec: '✓' },
  { product: 'Onboarding',        employee: '—', manager: '✓',         hrAdmin: '✓',              exec: '✓' },
  { product: 'Payroll',           employee: '—', manager: 'Add-on',    hrAdmin: 'Add-on',         exec: 'Add-on' },
  { product: 'Benefits',          employee: '✓ (enrollment only)', manager: 'Add-on', hrAdmin: 'Add-on', exec: 'Add-on' },
  { product: 'Performance',       employee: '—', manager: 'Pro',       hrAdmin: 'Pro',            exec: 'Pro' },
  { product: 'Training',          employee: '✓ (Catalog only)', manager: '✓', hrAdmin: '✓',      exec: '✓' },
  { product: 'Compensation',      employee: '—', manager: '—',         hrAdmin: 'Elite (🔒 on Core/Pro)', exec: 'Elite' },
  { product: 'Culture',           employee: '—', manager: 'Pro',       hrAdmin: 'Pro',            exec: 'Pro' },
  { product: 'Time & Attendance', employee: '✓ (Calendar, Time Off)', manager: '✓ + Timesheets add-on', hrAdmin: '✓ + Timesheets add-on', exec: '✓' },
  { product: 'Reports',           employee: '—', manager: '—',         hrAdmin: '✓ (Benchmarks 🔒 on Core/Pro)', exec: '✓' },
  { product: 'Files',             employee: '—', manager: '—',         hrAdmin: '✓',              exec: '—' },
  { product: 'Apps',              employee: '—', manager: '—',         hrAdmin: '✓',              exec: '—' },
  { product: 'Settings',          employee: '—', manager: '—',         hrAdmin: '✓',              exec: '—' },
];

// ── Demo Scenarios ───────────────────────────────────────────────────

export interface ScenarioPreset {
  id: string;
  label: string;
  persona: PersonaType;
  package: PackageType;
  addons: AddonType[];
  keyDifferences: string;
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'employee',
    label: 'Employee',
    persona: 'employee',
    package: 'core',
    addons: [],
    keyDifferences: 'Minimal nav: Home, People (My Info only), Training (Catalog only), Time & Attendance (Calendar, Time Off), Files. No Settings, no Benefits, no admin products.',
  },
  {
    id: 'manager',
    label: 'Manager',
    persona: 'manager',
    package: 'pro',
    addons: ['payroll', 'benefits'],
    keyDifferences: 'Core nav + Performance + Culture + Payroll + Benefits. People nav shows My Info + My Direct Reports. No Settings.',
  },
  {
    id: 'hr-admin-core',
    label: 'HR Admin — Core',
    persona: 'hr-admin',
    package: 'core',
    addons: [],
    keyDifferences: 'Full nav with all 15 T1 items. Pro/Elite/Add-on items shown with lock icon. No conditional People items — admin default lands on People hub.',
  },
  {
    id: 'hr-admin-pro',
    label: 'HR Admin — Pro + Add-ons',
    persona: 'hr-admin',
    package: 'pro',
    addons: ['payroll', 'benefits'],
    keyDifferences: 'Full nav. Compensation and Reports Benchmarks locked (Elite). Timesheets locked (Time Tracking add-on).',
  },
  {
    id: 'hr-admin-elite',
    label: 'HR Admin — Elite + All',
    persona: 'hr-admin',
    package: 'elite',
    addons: ['payroll', 'benefits', 'time-tracking'],
    keyDifferences: 'Full nav, nothing locked. Every product and module accessible.',
  },
  {
    id: 'exec',
    label: 'Executive',
    persona: 'exec',
    package: 'elite',
    addons: ['payroll', 'benefits'],
    keyDifferences: 'Full nav access. Home shows executive dashboard widgets. Hub content emphasizes metrics and trends over admin workflows.',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

export function getPackageTierValue(pkg: PackageType): number {
  const def = PACKAGES.find(p => p.id === pkg);
  return def ? def.tier : 0;
}

export function isPackageUnlocked(product: string, pkg: PackageType): boolean {
  const required = PACKAGE_GATED[product];
  if (!required) return true;
  return getPackageTierValue(pkg) >= getPackageTierValue(required);
}

export function getPersona(id: PersonaType): PersonaDefinition | undefined {
  return PERSONAS.find(p => p.id === id);
}

export function getPackage(id: PackageType): PackageDefinition | undefined {
  return PACKAGES.find(p => p.id === id);
}

export function getScenarioPreset(id: string): ScenarioPreset | undefined {
  return SCENARIO_PRESETS.find(s => s.id === id);
}
