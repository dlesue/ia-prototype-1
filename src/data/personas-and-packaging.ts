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

export type PersonaType = 'employee' | 'manager' | 'dept-head' | 'executive' | 'hr-admin' | 'it-admin' | 'finance-admin' | 'workplace-admin';

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

// ══════════════════════════════════════════════════════════════════════
// PLATFORM-LEVEL: Unified nav model, personas, and domain architecture
//
// Key decisions:
// - No product switcher. One unified nav driven by JTBD per persona.
// - Search = find/navigate. Ask = take action. Inbox = track everything.
// - Employees access product-specific features via Ask (actions) and
//   Inbox (request tracking), not via nav T1s.
// ══════════════════════════════════════════════════════════════════════

// ── Platform Persona Types ───────────────────────────────────────────

export type PlatformPersonaType =
  | 'employee' | 'manager'
  | 'hr-admin' | 'it-admin' | 'finance-admin' | 'workplace-admin';

export interface PlatformPersonaDefinition {
  id: PlatformPersonaType;
  label: string;
  description: string;
  t0Chrome: string[];
  navT1s: string[];
  askActions: string[];
}

export const PLATFORM_PERSONAS: PlatformPersonaDefinition[] = [
  {
    id: 'employee',
    label: 'Employee',
    description: 'Every person in the company. Uses platform T1 domains for self-service. Accesses product-specific features (IT tickets, expenses, desk booking) through Ask and tracks them in Inbox. No product-specific T1s in nav.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits'],
    askActions: ['Submit IT ticket', 'File expense', 'Book a desk', 'Book a room', 'Invite a visitor', 'Request equipment', 'Book travel', 'Report maintenance issue'],
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'People managers across any department. Sees platform T1s plus hiring and onboarding. Uses Ask for cross-domain actions. Inbox shows team requests and pending approvals across all domains.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits', 'Hiring', 'Analytics'],
    askActions: ['Approve time off', 'Approve expense', 'Approve IT request', 'Start a 1:1', 'Give feedback', 'Create job opening'],
  },
  {
    id: 'hr-admin',
    label: 'HR Admin',
    description: 'Manages HR product domains plus all platform configuration. Sees the most T1s of any persona. The original power user.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits', 'Hiring', 'Onboarding', 'Payroll', 'Compensation', 'Analytics', 'Apps', 'Settings'],
    askActions: ['Run payroll', 'Create onboarding task', 'Generate report', 'Configure policy'],
  },
  {
    id: 'it-admin',
    label: 'IT Admin',
    description: 'Manages IT service delivery. Sees platform T1s plus IT-specific domains. Uses People for employee lookup and Settings for platform security config.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits', 'Helpdesk', 'Incidents', 'Assets', 'Knowledge', 'Changes', 'Devices', 'Security', 'Analytics', 'Apps', 'Settings'],
    askActions: ['Escalate incident', 'Provision device', 'Create change request', 'Update knowledge article'],
  },
  {
    id: 'finance-admin',
    label: 'Finance Admin',
    description: 'Manages corporate spend. Sees platform T1s plus finance-specific domains. Cross-references People for employee lookup and Analytics for spend reporting.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits', 'Expenses', 'Cards', 'Budgets', 'Travel', 'Procurement', 'Invoices', 'Analytics', 'Apps', 'Settings'],
    askActions: ['Process invoice', 'Issue corporate card', 'Adjust budget', 'Review expense report'],
  },
  {
    id: 'workplace-admin',
    label: 'Workplace Admin',
    description: 'Manages the physical workplace. Sees platform T1s plus workplace-specific domains. Cross-references People for employee lookup and Schedules for hybrid planning.',
    t0Chrome: ['Search', 'Ask', 'Help', 'Inbox', 'My Info'],
    navT1s: ['Home', 'People', 'Time', 'Performance', 'Culture', 'Training', 'Benefits', 'Desks', 'Rooms', 'Visitors', 'Spaces', 'Schedules', 'Maintenance', 'Analytics', 'Apps', 'Settings'],
    askActions: ['Configure floor plan', 'Set desk policy', 'Review occupancy', 'Create maintenance order'],
  },
];

// ── Platform Domain Classification ───────────────────────────────────

export type DomainLayer = 'chrome' | 'platform' | 'product';

export interface PlatformDomain {
  id: string;
  label: string;
  layer: DomainLayer;
  product?: string;
  description: string;
  personas: PlatformPersonaType[];
}

export const PLATFORM_DOMAINS: PlatformDomain[] = [
  // Chrome layer — always visible, every persona, every page
  { id: 'search', label: 'Search', layer: 'chrome', description: 'Find and navigate — people, pages, documents, settings. The universal lookup.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'ask', label: 'Ask', layer: 'chrome', description: 'Take action — submit requests, start workflows, get AI answers. Role-aware: surfaces actions relevant to your persona. The universal action entry point.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'help', label: 'Help', layer: 'chrome', description: 'Help center, documentation, support access. Always available.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'inbox', label: 'Inbox', layer: 'chrome', description: 'Unified notification, approval, and request tracking hub. Pending approvals, active requests you\'ve submitted, notifications, and completed history — across all domains.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'my-info', label: 'My Info', layer: 'chrome', description: 'Your employee profile, pay, benefits, documents — regardless of your role.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },

  // Platform layer — shared across all products
  { id: 'home', label: 'Home', layer: 'platform', description: 'Personalized dashboard with tasks, approvals, calendar, and cross-product widgets.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'people', label: 'People', layer: 'platform', description: 'Company directory, org chart, divisions, departments, teams. The employee graph.', personas: ['employee', 'manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'time', label: 'Time', layer: 'platform', description: 'Time off requests, calendar, PTO balances, timesheets. Every employee tracks time.', personas: ['employee', 'manager', 'hr-admin'] },
  { id: 'performance', label: 'Performance', layer: 'platform', description: 'Goals, reviews, feedback, 1:1s. Every employee has performance conversations.', personas: ['employee', 'manager', 'hr-admin'] },
  { id: 'culture', label: 'Culture', layer: 'platform', description: 'Community feed, recognition, surveys, wellbeing. For all employees.', personas: ['employee', 'manager', 'hr-admin'] },
  { id: 'training', label: 'Training', layer: 'platform', description: 'Training catalog, assignments, certifications. Every employee has required trainings.', personas: ['employee', 'manager', 'hr-admin'] },
  { id: 'benefits', label: 'Benefits', layer: 'platform', description: 'Plan enrollment, coverage details, carriers. Every employee enrolls.', personas: ['employee', 'hr-admin'] },
  { id: 'analytics', label: 'Analytics', layer: 'platform', description: 'Cross-product dashboards, reports, data explorer. Platform-level reporting.', personas: ['manager', 'hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'apps', label: 'Apps', layer: 'platform', description: 'Integrations marketplace, installed apps, API access. Every product domain has integrations.', personas: ['hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },
  { id: 'settings', label: 'Settings', layer: 'platform', description: 'Platform administration: account, permissions, workflows, branding. Cross-product config.', personas: ['hr-admin', 'it-admin', 'finance-admin', 'workplace-admin'] },

  // BambooHR product layer
  { id: 'hiring', label: 'Hiring', layer: 'product', product: 'BambooHR', description: 'Job openings, candidates, talent pools, careers site.', personas: ['manager', 'hr-admin'] },
  { id: 'onboarding', label: 'Onboarding', layer: 'product', product: 'BambooHR', description: 'Active onboarding/offboarding, task templates, new hire packets.', personas: ['manager', 'hr-admin'] },
  { id: 'payroll', label: 'Payroll', layer: 'product', product: 'BambooHR', description: 'Pay calendar, history, off-cycle runs, payroll reports.', personas: ['hr-admin'] },
  { id: 'compensation', label: 'Compensation', layer: 'product', product: 'BambooHR', description: 'Benchmarks, levels & bands, planning cycles, total rewards.', personas: ['hr-admin'] },

  // BambooIT product layer
  { id: 'helpdesk', label: 'Helpdesk', layer: 'product', product: 'BambooIT', description: 'Tickets, queues, service catalog, approvals.', personas: ['employee', 'it-admin'] },
  { id: 'incidents', label: 'Incidents', layer: 'product', product: 'BambooIT', description: 'Active incidents, major incidents, on-call schedules.', personas: ['it-admin'] },
  { id: 'assets', label: 'Assets', layer: 'product', product: 'BambooIT', description: 'Hardware, software, contracts, procurement, lifecycle.', personas: ['employee', 'it-admin'] },
  { id: 'knowledge', label: 'Knowledge', layer: 'product', product: 'BambooIT', description: 'Articles, knowledge base, categories.', personas: ['employee', 'it-admin'] },
  { id: 'changes', label: 'Changes', layer: 'product', product: 'BambooIT', description: 'Change requests, change calendar, releases.', personas: ['it-admin', 'manager'] },
  { id: 'devices', label: 'Devices', layer: 'product', product: 'BambooIT', description: 'Endpoints, MDM policies, patches, remote access.', personas: ['it-admin'] },
  { id: 'it-security', label: 'Security', layer: 'product', product: 'BambooIT', description: 'Threats, vulnerabilities, access reviews, compliance.', personas: ['it-admin'] },

  // BambooFinance product layer
  { id: 'expenses', label: 'Expenses', layer: 'product', product: 'BambooFinance', description: 'Expense reports, receipts, mileage, per diems.', personas: ['employee', 'manager', 'finance-admin'] },
  { id: 'cards', label: 'Cards', layer: 'product', product: 'BambooFinance', description: 'Corporate cards, transactions, controls.', personas: ['employee', 'finance-admin'] },
  { id: 'budgets', label: 'Budgets', layer: 'product', product: 'BambooFinance', description: 'Department/project budgets, forecasts, alerts.', personas: ['manager', 'finance-admin'] },
  { id: 'travel', label: 'Travel', layer: 'product', product: 'BambooFinance', description: 'Trip booking, itineraries, travel policies.', personas: ['employee', 'finance-admin'] },
  { id: 'procurement', label: 'Procurement', layer: 'product', product: 'BambooFinance', description: 'Purchase requests, POs, vendors, catalogs.', personas: ['employee', 'finance-admin'] },
  { id: 'invoices', label: 'Invoices', layer: 'product', product: 'BambooFinance', description: 'Invoice processing, three-way match, payments.', personas: ['finance-admin'] },

  // BambooWorkplace product layer
  { id: 'desks', label: 'Desks', layer: 'product', product: 'BambooWorkplace', description: 'Desk booking, neighborhoods, policies.', personas: ['employee', 'workplace-admin'] },
  { id: 'rooms', label: 'Rooms', layer: 'product', product: 'BambooWorkplace', description: 'Room booking, directory, digital signage.', personas: ['employee', 'workplace-admin'] },
  { id: 'visitors', label: 'Visitors', layer: 'product', product: 'BambooWorkplace', description: 'Visitor management, check-in, watchlist.', personas: ['employee', 'workplace-admin'] },
  { id: 'spaces', label: 'Spaces', layer: 'product', product: 'BambooWorkplace', description: 'Floor plans, occupancy, space planning, moves.', personas: ['workplace-admin'] },
  { id: 'schedules', label: 'Schedules', layer: 'product', product: 'BambooWorkplace', description: 'Hybrid work schedules, team schedules, office directory.', personas: ['employee', 'manager', 'workplace-admin'] },
  { id: 'maintenance', label: 'Maintenance', layer: 'product', product: 'BambooWorkplace', description: 'Work orders, preventive maintenance, facility assets.', personas: ['employee', 'workplace-admin'] },
];

// ── Product Definitions ──────────────────────────────────────────────

export interface ProductDefinition {
  id: string;
  label: string;
  description: string;
  adminPersona: PlatformPersonaType;
  domains: string[];
}

export const PRODUCTS: ProductDefinition[] = [
  {
    id: 'bamboo-hr',
    label: 'BambooHR',
    description: 'Human resources — recruiting, onboarding, payroll, and compensation.',
    adminPersona: 'hr-admin',
    domains: ['hiring', 'onboarding', 'payroll', 'compensation'],
  },
  {
    id: 'bamboo-it',
    label: 'BambooIT',
    description: 'IT service management — helpdesk, incidents, assets, devices, and security.',
    adminPersona: 'it-admin',
    domains: ['helpdesk', 'incidents', 'assets', 'knowledge', 'changes', 'devices', 'it-security'],
  },
  {
    id: 'bamboo-finance',
    label: 'BambooFinance',
    description: 'Employee financial management — expenses, cards, budgets, travel, and procurement.',
    adminPersona: 'finance-admin',
    domains: ['expenses', 'cards', 'budgets', 'travel', 'procurement', 'invoices'],
  },
  {
    id: 'bamboo-workplace',
    label: 'BambooWorkplace',
    description: 'Facilities and hybrid work — desks, rooms, visitors, spaces, and maintenance.',
    adminPersona: 'workplace-admin',
    domains: ['desks', 'rooms', 'visitors', 'spaces', 'schedules', 'maintenance'],
  },
];
