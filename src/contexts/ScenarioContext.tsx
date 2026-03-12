import { createContext, useContext, useState, type ReactNode } from 'react';

export type PersonaType = 'employee' | 'manager' | 'hr-admin' | 'exec';
export type PackageType = 'core' | 'pro' | 'elite';
export type AddonType = 'payroll' | 'benefits' | 'time-tracking';

export interface ScenarioConfig {
  id: string;
  label: string;
  description: string;
  persona: PersonaType;
  package: PackageType;
  addons: AddonType[];
  /** T1 product IDs that appear in the nav (unlocked) */
  visibleProducts: string[];
  /** T1 product IDs that appear in the nav with a lock icon (HR Admin view of upsell items) */
  lockedProducts: string[];
  /** Full T2 paths to hide from the nav entirely */
  hiddenT2Paths: string[];
  /** Full T2 paths to show in the nav with a lock icon */
  lockedT2Paths: string[];
}

export const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'employee',
    label: 'Employee',
    description: 'Core plan — no add-ons',
    persona: 'employee',
    package: 'core',
    addons: [],
    visibleProducts: ['home', 'people', 'benefits', 'training', 'time-and-attendance'],
    lockedProducts: [],
    hiddenT2Paths: [
      // People: employee only sees My Info (absorbed into hub), hide all others
      '/people/my-direct-reports',
      '/people/my-department',
      '/people/my-division',
      '/people/hub',
      '/people/divisions',
      '/people/departments',
      '/people/teams',
      // Benefits: employee sees enrollment only
      '/benefits/carriers',
      // Training: catalog absorbed into hub, no other T2
      '/training/assignments',
      '/training/certifications',
      // Time & Attendance: no timesheets (add-on)
      '/time-and-attendance/timesheets',
    ],
    lockedT2Paths: [],
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Pro plan + Payroll & Benefits',
    persona: 'manager',
    package: 'pro',
    addons: ['payroll', 'benefits'],
    visibleProducts: [
      'home', 'people', 'hiring', 'onboarding',
      'payroll', 'benefits', 'performance', 'training',
      'culture', 'time-and-attendance',
    ],
    lockedProducts: [],
    hiddenT2Paths: [
      // People: manager sees My Info (hub) + My Direct Reports; no dept/division, no admin
      '/people/my-department',
      '/people/my-division',
      '/people/hub',
      '/people/divisions',
      '/people/departments',
      '/people/teams',
      // Time & Attendance: no timesheets (add-on not purchased)
      '/time-and-attendance/timesheets',
    ],
    lockedT2Paths: [],
  },
  {
    id: 'hr-admin-core',
    label: 'HR Admin — Core',
    description: 'Core plan — no add-ons',
    persona: 'hr-admin',
    package: 'core',
    addons: [],
    // HR Admin sees ALL products — locked ones show with lock icon
    visibleProducts: [
      'home', 'people', 'hiring', 'onboarding', 'training',
      'time-and-attendance', 'reports', 'files', 'apps', 'settings',
    ],
    lockedProducts: ['payroll', 'benefits', 'performance', 'compensation', 'culture'],
    hiddenT2Paths: [
      // No conditional People items for HR Admin default (lands on Hub)
      '/people/my-direct-reports',
      '/people/my-department',
      '/people/my-division',
    ],
    lockedT2Paths: [
      '/time-and-attendance/timesheets',
      '/reports/benchmarks',
    ],
  },
  {
    id: 'hr-admin-pro',
    label: 'HR Admin — Pro',
    description: 'Pro plan + Payroll & Benefits',
    persona: 'hr-admin',
    package: 'pro',
    addons: ['payroll', 'benefits'],
    visibleProducts: [
      'home', 'people', 'hiring', 'onboarding',
      'payroll', 'benefits', 'performance', 'training',
      'culture', 'time-and-attendance', 'reports', 'files', 'apps', 'settings',
    ],
    lockedProducts: ['compensation'],
    hiddenT2Paths: [
      '/people/my-direct-reports',
      '/people/my-department',
      '/people/my-division',
    ],
    lockedT2Paths: [
      '/time-and-attendance/timesheets',
      '/reports/benchmarks',
    ],
  },
  {
    id: 'hr-admin-elite',
    label: 'HR Admin — Elite',
    description: 'Elite plan + all add-ons',
    persona: 'hr-admin',
    package: 'elite',
    addons: ['payroll', 'benefits', 'time-tracking'],
    visibleProducts: [
      'home', 'people', 'hiring', 'onboarding',
      'payroll', 'benefits', 'performance', 'training',
      'compensation', 'culture', 'time-and-attendance',
      'reports', 'files', 'apps', 'settings',
    ],
    lockedProducts: [],
    hiddenT2Paths: [
      '/people/my-direct-reports',
      '/people/my-department',
      '/people/my-division',
    ],
    lockedT2Paths: [],
  },
  {
    id: 'exec',
    label: 'Exec',
    description: 'Elite plan + Payroll & Benefits',
    persona: 'exec',
    package: 'elite',
    addons: ['payroll', 'benefits'],
    visibleProducts: [
      'home', 'people', 'hiring', 'onboarding',
      'payroll', 'benefits', 'performance', 'training',
      'compensation', 'culture', 'time-and-attendance', 'reports',
    ],
    lockedProducts: [],
    hiddenT2Paths: [
      // Exec sees My Division (not My Direct Reports or My Department)
      '/people/my-direct-reports',
      '/people/my-department',
      // No timesheets (add-on not in this scenario)
      '/time-and-attendance/timesheets',
    ],
    lockedT2Paths: [],
  },
];

interface ScenarioContextValue {
  scenario: ScenarioConfig;
  setScenarioId: (id: string) => void;
}

const ScenarioContext = createContext<ScenarioContextValue | null>(null);

const SCENARIO_STORAGE_KEY = 'bhr-scenario';

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenarioId, setScenarioIdState] = useState<string>(() => {
    return localStorage.getItem(SCENARIO_STORAGE_KEY) || 'hr-admin-elite';
  });

  const scenario = SCENARIOS.find(s => s.id === scenarioId) ?? SCENARIOS[4];

  const setScenarioId = (id: string) => {
    localStorage.setItem(SCENARIO_STORAGE_KEY, id);
    setScenarioIdState(id);
  };

  return (
    <ScenarioContext.Provider value={{ scenario, setScenarioId }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
