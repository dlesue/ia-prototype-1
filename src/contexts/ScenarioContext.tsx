import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import {
  type PersonaType,
  type PackageType,
  type AddonType,
  PACKAGE_GATED,
  ADDON_GATED,
  isPackageUnlocked,
} from '../data/personas-and-packaging';

export type { PersonaType, PackageType, AddonType };

export interface ScenarioConfig {
  id: string;
  label: string;
  description: string;
  persona: PersonaType;
  package: PackageType;
  addons: AddonType[];
  visibleProducts: string[];
  lockedProducts: string[];
  hiddenT2Paths: string[];
  lockedT2Paths: string[];
}

const ALL_PRODUCTS = [
  'home', 'people', 'hiring', 'onboarding',
  'payroll', 'benefits', 'performance', 'training',
  'compensation', 'employee-community', 'rewards-recognition', 'wellbeing', 'time-and-attendance', 'offboarding',
  'reports', 'files', 'apps', 'settings',
];

function deriveScenarioConfig(
  persona: PersonaType,
  pkg: PackageType,
  addons: AddonType[],
): ScenarioConfig {
  const hasAddon = (a: AddonType) => addons.includes(a);
  const hasTimeTracking = hasAddon('time-tracking');

  // --- Derive visible & locked products ---
  let visibleProducts: string[];
  let lockedProducts: string[] = [];

  if (persona === 'hr-admin') {
    // HR Admin always sees all products — package/addons determine locked state
    visibleProducts = [];
    lockedProducts = [];
    for (const p of ALL_PRODUCTS) {
      const addonReq = ADDON_GATED[p];
      const pkgUnlocked = isPackageUnlocked(p, pkg);
      const addonUnlocked = addonReq ? hasAddon(addonReq) : true;

      if (pkgUnlocked && addonUnlocked) {
        visibleProducts.push(p);
      } else {
        // Show as locked in nav
        lockedProducts.push(p);
        visibleProducts.push(p);
      }
    }
    // lockedProducts should only contain the locked ones, visibleProducts the unlocked
    visibleProducts = visibleProducts.filter(p => !lockedProducts.includes(p));
  } else if (persona === 'employee') {
    visibleProducts = ['home', 'people', 'training', 'time-and-attendance', 'files'];
  } else if (persona === 'manager') {
    visibleProducts = [
      'home', 'people', 'hiring', 'onboarding', 'training',
      'time-and-attendance', 'offboarding',
    ];
    if (isPackageUnlocked('performance', pkg)) visibleProducts.push('performance');
    if (isPackageUnlocked('employee-community', pkg)) { visibleProducts.push('employee-community', 'rewards-recognition', 'wellbeing'); }
    if (isPackageUnlocked('compensation', pkg)) visibleProducts.push('compensation');
    if (hasAddon('payroll')) visibleProducts.push('payroll');
    if (hasAddon('benefits')) visibleProducts.push('benefits');
  } else {
    // Exec
    visibleProducts = [
      'home', 'people', 'hiring', 'onboarding', 'training',
      'time-and-attendance', 'offboarding', 'reports',
    ];
    if (isPackageUnlocked('performance', pkg)) visibleProducts.push('performance');
    if (isPackageUnlocked('employee-community', pkg)) { visibleProducts.push('employee-community', 'rewards-recognition', 'wellbeing'); }
    if (isPackageUnlocked('compensation', pkg)) visibleProducts.push('compensation');
    if (hasAddon('payroll')) visibleProducts.push('payroll');
    if (hasAddon('benefits')) visibleProducts.push('benefits');
  }

  // My Info is always visible for all personas
  visibleProducts.push('my-info');
  visibleProducts.push('inbox');

  // --- Derive hidden T2 paths ---
  const hiddenT2Paths: string[] = [];
  const lockedT2Paths: string[] = [];

  // People paths based on persona
  if (persona === 'employee') {
    hiddenT2Paths.push(
      '/people/my-direct-reports', '/people/my-department', '/people/my-division',
      '/people/divisions', '/people/departments', '/people/teams',
    );
  } else if (persona === 'manager') {
    hiddenT2Paths.push(
      '/people/my-department', '/people/my-division',
      '/people/divisions', '/people/departments', '/people/teams',
    );
  } else if (persona === 'hr-admin') {
    hiddenT2Paths.push(
      '/people/my-direct-reports', '/people/my-department', '/people/my-division',
    );
  } else {
    // Exec
    hiddenT2Paths.push(
      '/people/my-direct-reports', '/people/my-department',
    );
  }

  // Employee-specific hidden paths
  if (persona === 'employee') {
    hiddenT2Paths.push('/benefits/carriers');
    hiddenT2Paths.push('/training/assignments', '/training/certifications');
  }

  // Timesheets: hidden for non-time-tracking, locked for HR Admin without addon
  if (!hasTimeTracking) {
    if (persona === 'hr-admin') {
      lockedT2Paths.push('/time-and-attendance/timesheets');
    } else {
      hiddenT2Paths.push('/time-and-attendance/timesheets');
    }
  }

  // Compensation: Planning locked below Elite for all personas
  // Reports: Benchmarks locked below Elite
  if (pkg !== 'elite') {
    lockedT2Paths.push('/compensation/planning');
    lockedT2Paths.push('/compensation/benchmarks');
  }

  const id = `${persona}-${pkg}-${addons.sort().join('-') || 'none'}`;

  return {
    id,
    label: `${persona} / ${pkg}`,
    description: '',
    persona,
    package: pkg,
    addons,
    visibleProducts,
    lockedProducts,
    hiddenT2Paths,
    lockedT2Paths,
  };
}

// Keep legacy SCENARIOS export for any code that references it
export const SCENARIOS: ScenarioConfig[] = [
  deriveScenarioConfig('employee', 'core', []),
  deriveScenarioConfig('manager', 'pro', ['payroll', 'benefits']),
  deriveScenarioConfig('hr-admin', 'core', []),
  deriveScenarioConfig('hr-admin', 'pro', ['payroll', 'benefits']),
  deriveScenarioConfig('hr-admin', 'elite', ['payroll', 'benefits', 'time-tracking']),
  deriveScenarioConfig('exec', 'elite', ['payroll', 'benefits']),
];

interface ScenarioContextValue {
  scenario: ScenarioConfig;
  persona: PersonaType;
  pkg: PackageType;
  addons: AddonType[];
  hiddenProducts: string[];
  setPersona: (p: PersonaType) => void;
  setPkg: (p: PackageType) => void;
  toggleAddon: (a: AddonType) => void;
  toggleProductHidden: (p: string | string[]) => void;
  /** Legacy — sets all three at once from a preset */
  setScenarioId: (id: string) => void;
}

const ScenarioContext = createContext<ScenarioContextValue | null>(null);

const PERSONA_KEY = 'bhr-persona';
const PACKAGE_KEY = 'bhr-package';
const ADDONS_KEY = 'bhr-addons';
const HIDDEN_PRODUCTS_KEY = 'bhr-hidden-products';

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<PersonaType>(
    () => (localStorage.getItem(PERSONA_KEY) as PersonaType) || 'hr-admin',
  );
  const [pkg, setPkgState] = useState<PackageType>(
    () => (localStorage.getItem(PACKAGE_KEY) as PackageType) || 'elite',
  );
  const [addons, setAddonsState] = useState<AddonType[]>(() => {
    const stored = localStorage.getItem(ADDONS_KEY);
    return stored ? JSON.parse(stored) : ['payroll', 'benefits', 'time-tracking'];
  });
  const [hiddenProducts, setHiddenProductsState] = useState<string[]>(() => {
    const stored = localStorage.getItem(HIDDEN_PRODUCTS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const scenario = useMemo(() => {
    const config = deriveScenarioConfig(persona, pkg, addons);
    config.visibleProducts = config.visibleProducts.filter(p => !hiddenProducts.includes(p));
    config.lockedProducts = config.lockedProducts.filter(p => !hiddenProducts.includes(p));
    return config;
  }, [persona, pkg, addons, hiddenProducts]);

  const setPersona = (p: PersonaType) => {
    localStorage.setItem(PERSONA_KEY, p);
    setPersonaState(p);
  };

  const setPkg = (p: PackageType) => {
    localStorage.setItem(PACKAGE_KEY, p);
    setPkgState(p);
  };

  const toggleAddon = (a: AddonType) => {
    const next = addons.includes(a) ? addons.filter(x => x !== a) : [...addons, a];
    localStorage.setItem(ADDONS_KEY, JSON.stringify(next));
    setAddonsState(next);
  };

  const toggleProductHidden = (p: string | string[]) => {
    const ids = Array.isArray(p) ? p : [p];
    // Use the first id to determine direction (show or hide)
    const shouldHide = !hiddenProducts.includes(ids[0]);
    let next = [...hiddenProducts];
    for (const id of ids) {
      if (shouldHide) {
        if (!next.includes(id)) next.push(id);
      } else {
        next = next.filter(x => x !== id);
      }
    }
    localStorage.setItem(HIDDEN_PRODUCTS_KEY, JSON.stringify(next));
    setHiddenProductsState(next);
  };

  // Legacy support: map old scenario IDs to persona/pkg/addon combos
  const setScenarioId = (id: string) => {
    const presets: Record<string, [PersonaType, PackageType, AddonType[]]> = {
      'employee': ['employee', 'core', []],
      'manager': ['manager', 'pro', ['payroll', 'benefits']],
      'hr-admin-core': ['hr-admin', 'core', []],
      'hr-admin-pro': ['hr-admin', 'pro', ['payroll', 'benefits']],
      'hr-admin-elite': ['hr-admin', 'elite', ['payroll', 'benefits', 'time-tracking']],
      'exec': ['exec', 'elite', ['payroll', 'benefits']],
    };
    const preset = presets[id];
    if (preset) {
      setPersona(preset[0]);
      setPkg(preset[1]);
      localStorage.setItem(ADDONS_KEY, JSON.stringify(preset[2]));
      setAddonsState(preset[2]);
    }
  };

  return (
    <ScenarioContext.Provider value={{ scenario, persona, pkg, addons, hiddenProducts, setPersona, setPkg, toggleAddon, toggleProductHidden, setScenarioId }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error('useScenario must be used within ScenarioProvider');
  return ctx;
}
