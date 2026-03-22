import type { ComponentType } from 'react';
import specMd from '@project/spec.md?raw';
import charterMd from '@project/docs/specs/project-charter.md?raw';
import switchingPatternsMd from '@project/docs/research/product-switching-patterns.md?raw';
import megaProductNavMd from '@project/docs/research/mega-product-nav-research.md?raw';
import wayfindingMd from '@project/docs/research/wayfinding-patterns.md?raw';
import { IARulesTab, NavStructureTab, ProductsModulesTab, RoleViewsTab, TierComparisonTab } from '../components/IAReviewTabs';
import PersonasAndPackagingDoc from '../components/ProjectDocs/PersonasAndPackagingDoc';

export interface ProjectDoc {
  id: string;
  title: string;
  subtitle?: string;
  category: 'spec' | 'research' | 'ia-review';
  content?: string;
  component?: ComponentType;
  wide?: boolean; // Allow content to break out wider than standard width
}

export const projectDocs: ProjectDoc[] = [
  {
    id: 'charter',
    title: 'Project Charter',
    subtitle: 'Goals, vision, and scope for the BambooHR information architecture initiative.',
    category: 'spec',
    content: charterMd,
  },
  {
    id: 'personas-packaging',
    title: 'Personas & Packaging',
    subtitle: 'Who sees what and why. Source of truth for all persona, package, and visibility behavior.',
    category: 'spec',
    component: PersonasAndPackagingDoc,
  },
  {
    id: 'spec',
    title: 'Product Hub Spec',
    subtitle: 'Full specification for every product hub, module, and feature in the BambooHR navigation.',
    category: 'spec',
    content: specMd,
  },
  {
    id: 'ia-rules',
    title: 'IA Rulebook',
    subtitle: 'Governance rules for vocabulary, tiers, ordering, naming, guardrails, and placement decisions.',
    category: 'ia-review',
    component: IARulesTab,
  },
  {
    id: 'ia-nav-structure',
    title: 'Nav Structure',
    subtitle: 'Interactive explorer — filter by role and tier to see how the navigation adapts.',
    category: 'ia-review',
    component: NavStructureTab,
    wide: true,
  },
  {
    id: 'ia-products-modules',
    title: 'Products & Modules',
    subtitle: 'Filterable data table of every nav item with level, tier, role, and status tracking.',
    category: 'ia-review',
    component: ProductsModulesTab,
    wide: true,
  },
  {
    id: 'ia-role-views',
    title: 'Role Views',
    subtitle: 'Side-by-side comparison of what each persona sees in the navigation.',
    category: 'ia-review',
    component: RoleViewsTab,
    wide: true,
  },
  {
    id: 'ia-tier-comparison',
    title: 'Tier Comparison',
    subtitle: 'Side-by-side comparison of Core, Pro, and Elite navigation structures.',
    category: 'ia-review',
    component: TierComparisonTab,
    wide: true,
  },
  {
    id: 'research-switching-patterns',
    title: 'Product Switching Patterns',
    subtitle: 'How Google, Microsoft, Salesforce, Atlassian, HubSpot, and others handle multi-product navigation.',
    category: 'research',
    content: switchingPatternsMd,
  },
  {
    id: 'research-mega-product-nav',
    title: 'Platform Expansion',
    subtitle: 'Future-proofing the nav — proposed T1/T2/T3 hierarchies for adjacent product domains.',
    category: 'research',
    content: megaProductNavMd,
  },
  {
    id: 'research-wayfinding',
    title: 'Wayfinding Patterns',
    subtitle: 'Back button behavior, breadcrumbs, and contextual navigation in enterprise SaaS.',
    category: 'research',
    content: wayfindingMd,
  },
];
