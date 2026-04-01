import type { ComponentType } from 'react';
import specMd from '@project/spec.md?raw';
import charterMd from '@project/docs/specs/project-charter.md?raw';
import switchingPatternsMd from '@project/docs/research/product-switching-patterns.md?raw';
import megaProductNavMd from '@project/docs/research/mega-product-nav-research.md?raw';
import wayfindingMd from '@project/docs/research/wayfinding-patterns.md?raw';
import jtbdMatrixMd from '@project/docs/research/jtbd-matrix-v2.md?raw';
import crossDomainJtbdMd from '@project/docs/research/cross-domain-jobs-to-be-done.md?raw';
import { IARulesTab, NavStructureTab, ProductsModulesTab, RoleViewsTab, TierComparisonTab } from '../components/IAReviewTabs';
import JtbdByPageTab from '../components/IAReviewTabs/JtbdByPageTab';
import PersonasAndPackagingDoc from '../components/ProjectDocs/PersonasAndPackagingDoc';
import PlatformArchitectureDoc from '../components/ProjectDocs/PlatformArchitectureDoc';

export type DocCategory = 'shared' | 'new';

export interface ProjectDoc {
  id: string;
  title: string;
  subtitle?: string;
  category: DocCategory;
  content?: string;
  component?: ComponentType;
  wide?: boolean;
}

export const DOC_CATEGORIES: { key: DocCategory; label: string }[] = [
  { key: 'shared', label: 'Shared' },
  { key: 'new', label: 'New' },
];

export const projectDocs: ProjectDoc[] = [
  // ── Shared (foundation docs that inform all prototypes) ──
  {
    id: 'charter',
    title: 'Project Charter',
    subtitle: 'Goals, vision, and scope for the BambooHR information architecture initiative.',
    category: 'shared',
    content: charterMd,
  },
  {
    id: 'personas-packaging',
    title: 'Personas & Packaging',
    subtitle: 'Who sees what and why. Source of truth for all persona, package, and visibility behavior.',
    category: 'shared',
    component: PersonasAndPackagingDoc,
  },
  {
    id: 'research-jtbd-matrix',
    title: 'JTBD Matrix',
    subtitle: '8 personas across all T0, T1, and T2 nav items — prioritized by frequency, scoped by persona level.',
    category: 'shared',
    content: jtbdMatrixMd,
  },
  {
    id: 'research-cross-domain-jtbd',
    title: 'Cross-Domain JTBD',
    subtitle: 'How jobs cross product boundaries — the case for a unified nav without a product switcher.',
    category: 'shared',
    content: crossDomainJtbdMd,
  },

  // ── v1 — Product Hubs ──
  {
    id: 'spec',
    title: 'Product Hub Spec',
    subtitle: 'Full specification for every product hub, module, and feature in the BambooHR navigation.',
    category: 'new',
    content: specMd,
  },
  {
    id: 'ia-nav-structure',
    title: 'Nav Structure',
    subtitle: 'Interactive explorer — filter by role and tier to see how the navigation adapts.',
    category: 'new',
    component: NavStructureTab,
    wide: true,
  },
  {
    id: 'ia-products-modules',
    title: 'Products & Modules',
    subtitle: 'Filterable data table of every nav item with level, tier, role, and status tracking.',
    category: 'new',
    component: ProductsModulesTab,
    wide: true,
  },
  {
    id: 'ia-role-views',
    title: 'Role Views',
    subtitle: 'Side-by-side comparison of what each persona sees in the navigation.',
    category: 'new',
    component: RoleViewsTab,
    wide: true,
  },
  {
    id: 'ia-tier-comparison',
    title: 'Tier Comparison',
    subtitle: 'Side-by-side comparison of Core, Pro, and Elite navigation structures.',
    category: 'new',
    component: TierComparisonTab,
    wide: true,
  },

  {
    id: 'ia-jtbd-by-page',
    title: 'JTBD by Page',
    subtitle: 'What each persona does on every page — per-page, per-role job descriptions.',
    category: 'new',
    component: JtbdByPageTab,
    wide: true,
  },

  // ── v2 — Research-Driven IA ──
  {
    id: 'ia-rules',
    title: 'IA Rulebook',
    subtitle: 'Governance rules for vocabulary, tiers, ordering, naming, guardrails, and placement decisions.',
    category: 'new',
    component: IARulesTab,
  },
  {
    id: 'platform-architecture',
    title: 'Platform Architecture',
    subtitle: 'Unified nav model: chrome, platform domains, and role-gated domains. No product switcher.',
    category: 'new',
    component: PlatformArchitectureDoc,
  },
  {
    id: 'research-switching-patterns',
    title: 'Product Switching Patterns',
    subtitle: 'How Google, Microsoft, Salesforce, Atlassian, HubSpot, and others handle multi-product navigation.',
    category: 'new',
    content: switchingPatternsMd,
  },
  {
    id: 'research-mega-product-nav',
    title: 'Platform Expansion',
    subtitle: 'Future-proofing the nav — proposed T1/T2/T3 hierarchies for adjacent product domains.',
    category: 'new',
    content: megaProductNavMd,
  },
  {
    id: 'research-wayfinding',
    title: 'Wayfinding Patterns',
    subtitle: 'Back button behavior, breadcrumbs, and contextual navigation in enterprise SaaS.',
    category: 'new',
    content: wayfindingMd,
  },
];
