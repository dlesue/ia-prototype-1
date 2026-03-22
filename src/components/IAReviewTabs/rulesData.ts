export interface RuleContent {
  type: 'text' | 'list' | 'table' | 'code' | 'heading'
  value?: string
  items?: string[]
  headers?: string[]
  rows?: string[][]
}

export interface RuleSection {
  id: string
  title: string
  subtitle: string
  content: RuleContent[]
}

export const IA_RULES: RuleSection[] = [
  // ─────────────────────────────────────────────
  // Section 1: Vocabulary
  // ─────────────────────────────────────────────
  {
    id: 'vocabulary',
    title: 'Vocabulary: Products, Modules, Features \u2192 T0, T1, T2, T3',
    subtitle: 'How business concepts map to navigation tiers',
    content: [
      {
        type: 'text',
        value:
          'BambooHR uses four business concepts to describe its offering. Each concept maps to a navigation tier, but the mapping is intentional \u2014 not mechanical. The nav is organized by how users think about their work, not by how the business organizes its products.',
      },
      {
        type: 'heading',
        value: 'Definitions',
      },
      {
        type: 'table',
        headers: ['Business Concept', 'Definition', 'Nav Tier', 'Example'],
        rows: [
          [
            'Product',
            'A marketable domain that solves a broad job \u2014 typically sold as a SKU or bundle.',
            'T1 (sidebar item)',
            'Hiring, Payroll, Time Tracking',
          ],
          [
            'Module',
            'A distinct workflow area within a product \u2014 usually has its own list/detail views and its own user mental model.',
            'T2 (sub-menu item)',
            'Job Openings, Candidates, Talent Pools',
          ],
          [
            'Feature',
            'A capability within a module \u2014 accessed via tabs, panels, or in-page sections. Not independently navigable from the sidebar.',
            'T3 (in-page nav)',
            'Candidate Scorecard, Interview Schedule, Offer Letter',
          ],
          [
            'Capability Layer',
            'A cross-cutting technology that enhances multiple products but is not a destination of its own.',
            'No dedicated tier \u2014 surfaces contextually',
            'AI Assistant, Workflows Engine, Permissions',
          ],
        ],
      },
      {
        type: 'heading',
        value: 'The mapping is not always 1:1',
      },
      {
        type: 'text',
        value:
          'Business packaging and navigation architecture serve different goals. Several important exceptions demonstrate this principle:',
      },
      {
        type: 'list',
        items: [
          'One product may span multiple T1s. Example: "Payroll" the product includes both the Payroll T1 and parts of the Time T1 (time data feeds payroll runs). The nav separates them because users think of time tracking and payroll processing as distinct jobs.',
          'Multiple products may merge into one T1. Example: "Performance Management" and "Employee Development" are separate SKUs but share the Talent T1 because users perceive goal-setting, reviews, and growth plans as one continuous workflow.',
          'A product may not get a T1 at all. Example: "Workflows" is a product but surfaces as a capability layer woven into other T1s (onboarding workflows in People, approval workflows in Time, etc.) rather than owning a sidebar slot.',
          'A feature may be promoted to T2 if it represents a distinct enough job. Example: "Org Chart" started as a feature within People but earned its own T2 because users navigate to it directly and frequently.',
        ],
      },
      {
        type: 'heading',
        value: 'Core Rule',
      },
      {
        type: 'text',
        value:
          'The nav is organized by how users think about their work, not by how the business organizes its products. When business structure and user mental models conflict, the user mental model wins in the nav. Product packaging is a sales concern; navigation architecture is a usability concern.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 2: T0 Rules
  // ─────────────────────────────────────────────
  {
    id: 't0-rules',
    title: 'T0 Rules: The Chrome Layer',
    subtitle: 'Cross-cutting utilities pinned above the domain nav',
    content: [
      {
        type: 'text',
        value:
          'T0 is the chrome layer \u2014 a small set of utilities that live above the sidebar\u2019s domain navigation. These items are globally accessible, persona-universal, and used in nearly every session. T0 is not a product area; it is infrastructure.',
      },
      {
        type: 'heading',
        value: 'Qualifying Criteria (all four must be true)',
      },
      {
        type: 'list',
        items: [
          'Cross-cutting: The item serves every product domain, not just one. It is not "owned" by a single T1.',
          'Every-session usage: The average user interacts with this item in the majority of their sessions. It is not a weekly or monthly destination.',
          'Persona-universal: Every persona (Employee, Manager, HR Admin, Executive) uses this item, even if they see different content within it.',
          'Not a domain: The item does not have its own deep workflow hierarchy. It is a utility, not a product area. If it needs 3+ T2-level sections, it belongs at T1.',
        ],
      },
      {
        type: 'heading',
        value: 'Current T0 Inventory',
      },
      {
        type: 'table',
        headers: ['T0 Item', 'Purpose', 'Key Behavior'],
        rows: [
          [
            'Search',
            'Global search across all domains \u2014 people, documents, settings, help.',
            'Opens a command-palette overlay. No sub-menu in the sidebar.',
          ],
          [
            'Inbox',
            'Unified notification and task center \u2014 approvals, reminders, system messages.',
            'Navigates to a full-page inbox. Badge count shows unread items.',
          ],
          [
            'My Info',
            'The logged-in user\u2019s own employee profile, pay stubs, documents, time-off balances.',
            'Navigates to the user\u2019s own profile. This is the personal mirror of People (T1).',
          ],
        ],
      },
      {
        type: 'heading',
        value: 'Constraints',
      },
      {
        type: 'list',
        items: [
          'Maximum 4 T0 items. The chrome layer must stay small. If it grows beyond 4, users lose the benefit of a stable, glanceable utility bar.',
          'T0 items have sub-pages, not sub-menus. A T0 item may navigate to a page with its own internal structure (e.g., My Info has tabs for Personal, Pay, Documents), but it does not expand a sub-menu in the sidebar.',
        ],
      },
      {
        type: 'heading',
        value: 'T0 Ordering',
      },
      {
        type: 'text',
        value:
          'The T0 order is fixed: Search \u2192 Inbox \u2192 My Info. The logic:',
      },
      {
        type: 'list',
        items: [
          'Search is first because it is the fastest path to anything \u2014 it is the universal accelerator.',
          'Inbox is second because it is the primary action driver \u2014 it contains tasks that need attention.',
          'My Info is third because it is personal but less urgent \u2014 it is a reference destination, not a task queue.',
        ],
      },
      {
        type: 'heading',
        value: 'Relationship Between T0 and T1',
      },
      {
        type: 'text',
        value:
          'T0 and T1 are complementary, not redundant. The principle: "T1 is where you manage it. T0 is where you see your own stuff." Examples:',
      },
      {
        type: 'list',
        items: [
          'People (T1) is where HR manages employee records. My Info (T0) is where an employee views their own record.',
          'Time (T1) is where managers approve timesheets. My Info \u2192 Time Off (T0 sub-page) is where an employee checks their own PTO balance.',
          'Inbox (T0) surfaces approval tasks. The approval workflow itself lives in the relevant T1 (e.g., approving a time-off request takes you into Time).',
        ],
      },
      {
        type: 'heading',
        value: 'How to Propose a New T0 Item',
      },
      {
        type: 'text',
        value: 'Answer all four questions affirmatively before proposing:',
      },
      {
        type: 'list',
        items: [
          'Does it serve every T1 domain equally? If it primarily serves one domain (e.g., "Hiring Dashboard"), it belongs inside that T1.',
          'Would every persona use it in the majority of their sessions? If only HR Admins use it, it is not persona-universal.',
          'Is it a utility (shallow) rather than a domain (deep)? If it needs its own T2 sub-menu with 3+ items, it should be a T1.',
          'Can you add it without exceeding 4 T0 items? If the slot is full, you must argue that the new item displaces an existing one.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 3: T1 Rules
  // ─────────────────────────────────────────────
  {
    id: 't1-rules',
    title: 'T1 Rules: The Sidebar',
    subtitle: 'Primary navigation \u2014 the product\u2019s table of contents',
    content: [
      {
        type: 'text',
        value:
          'T1 items form the sidebar \u2014 the primary navigation that is always visible. Each T1 represents a distinct domain of work. The sidebar is the product\u2019s table of contents: it tells users what BambooHR can do and gives them a stable, predictable way to navigate between domains.',
      },
      {
        type: 'heading',
        value: 'Qualifying Criteria (all five must be true)',
      },
      {
        type: 'list',
        items: [
          'Distinct domain: The item represents a clearly differentiated area of work that users think of as its own "thing." Users would describe it as a separate job or responsibility.',
          'Multiple personas: At least two personas interact with this domain (e.g., employees and managers, or managers and HR admins). Single-persona tools belong inside an existing T1.',
          '3+ T2s: The domain has enough depth to warrant at least three sub-sections (T2 items). If it only has 1\u20132 sections, it should be a T2 inside another T1.',
          'Weekly+ usage: The average user in the primary persona visits this domain at least weekly. Monthly-or-less destinations do not justify a permanent sidebar slot.',
          'Won\u2019t push past 12: Adding this item does not push the total T1 count above 12. Beyond 12, the sidebar loses its scannability benefit.',
        ],
      },
      {
        type: 'heading',
        value: 'Current T1 Inventory',
      },
      {
        type: 'table',
        headers: ['#', 'T1 Item', 'Domain'],
        rows: [
          ['1', 'Home', 'Dashboard and personalized starting point'],
          ['2', 'People', 'Employee directory, org chart, employee records'],
          ['3', 'Hiring', 'Applicant tracking, job openings, candidates, careers site'],
          ['4', 'Payroll', 'Pay runs, pay schedules, tax filings, deductions'],
          ['5', 'Time', 'Time tracking, time off, scheduling, approvals'],
          ['6', 'Benefits', 'Benefits administration, enrollment, plans, carriers'],
          ['7', 'Talent', 'Performance reviews, goals, development plans, succession'],
          ['8', 'Culture', 'Surveys, recognition, community, announcements'],
          ['9', 'Apps', 'Integrations marketplace, installed apps, API access'],
          ['10', 'Analytics', 'Reports, dashboards, data explorer, insights'],
          ['11', 'Settings', 'Account configuration, permissions, workflows, audit log'],
        ],
      },
      {
        type: 'heading',
        value: 'What T1 Items Look Like',
      },
      {
        type: 'list',
        items: [
          'Labels are nouns. T1 labels name a domain, not an action. "Hiring" not "Hire People." "Payroll" not "Run Payroll."',
          'Each T1 has an icon. Icons provide visual anchoring and help users scan the sidebar quickly. Icons should be distinct from each other.',
          'T1 items are always visible. They do not appear/disappear based on context (though they may show lock icons for upsell or be visibility-controlled by persona/permissions).',
          'T1 labels are not branded. Never use a product brand name as a T1 label. "Hiring" not "BambooHR ATS." "Talent" not "TRAXPayroll."',
        ],
      },
      {
        type: 'heading',
        value: 'How to Propose a New T1',
      },
      {
        type: 'text',
        value: 'Answer all five questions before submitting a proposal:',
      },
      {
        type: 'list',
        items: [
          'What is the distinct domain? Describe the job-to-be-done in one sentence. If you can\u2019t, the domain may not be distinct enough.',
          'Which personas use it? List at least two. If only one persona uses it, it likely belongs as a T2 inside an existing T1.',
          'What are the T2s? List at least three. If you can only name 1\u20132, the domain lacks the depth for a T1.',
          'What is the usage frequency? Provide evidence that the primary persona visits weekly or more. If it\u2019s monthly, it should be a T2.',
          'What is the current T1 count after addition? If it exceeds 12, explain which existing T1 absorbs the new domain or propose the collapsible clusters model.',
        ],
      },
      {
        type: 'heading',
        value: 'Reserved Future Candidates',
      },
      {
        type: 'text',
        value:
          'The following domains are expected to become T1s as the product expands into non-HCM territory. They are not T1s today because the product does not yet offer enough depth in these areas:',
      },
      {
        type: 'list',
        items: [
          'IT / Equipment: Device management, software provisioning, IT requests. Currently a thin integration \u2014 would need 3+ T2s to qualify.',
          'Finance: Expense management, budgeting, financial planning. Currently not in-product \u2014 would enter as an integration-tier T1 first.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 4: T2 Rules
  // ─────────────────────────────────────────────
  {
    id: 't2-rules',
    title: 'T2 Rules: The Sub-Menu',
    subtitle: 'Sections within a domain \u2014 where most new features land',
    content: [
      {
        type: 'text',
        value:
          'T2 items are the sub-menu within a T1 domain. They represent distinct workflows or sections that users navigate to directly. Most new features should land at T2 \u2014 this is the workhorse tier of the navigation.',
      },
      {
        type: 'heading',
        value: 'Qualifying Criteria (all four must be true)',
      },
      {
        type: 'list',
        items: [
          'Distinct workflow: The item represents a workflow that is meaningfully different from other T2s in the same T1. Users would describe it as a separate task or activity.',
          'Users navigate directly: Users go to this section intentionally \u2014 it is a destination, not a step in another workflow. If users only reach it through another T2, it should be a T3.',
          'Has T3 depth: The section has enough internal complexity to warrant tabs, panels, or sub-views (T3 items). If it\u2019s a single flat page, it may be too thin for T2.',
          'Recognizable job-to-be-done: The label maps to a job that users would recognize and name themselves. "Job Openings" is a job-to-be-done. "Misc Settings" is not.',
        ],
      },
      {
        type: 'heading',
        value: 'Constraints',
      },
      {
        type: 'list',
        items: [
          'Maximum 7 T2 items per T1. Beyond 7, the sub-menu becomes unwieldy and users can\u2019t scan it quickly. If a T1 needs more than 7 T2s, consider whether some T2s should be T3s inside another T2, or whether the T1 should split.',
          'Labels can be noun or verb phrases. Unlike T1 (nouns only), T2 labels may use verb phrases when the section represents an action-oriented workflow. "Run Payroll" is acceptable at T2. "Job Openings" (noun) and "Request Time Off" (verb) are both valid.',
          'Order by frequency. The most-used T2 should be first. See Ordering Rules for the complete framework.',
        ],
      },
      {
        type: 'heading',
        value: 'Placement Decision Tiebreakers',
      },
      {
        type: 'text',
        value:
          'When a new feature could reasonably live in more than one T1, use these four tiebreaker rules in order:',
      },
      {
        type: 'list',
        items: [
          'Rule 1 \u2014 Where does the user start the workflow? Place the feature in the T1 where the user initiates the task. If a manager starts a compensation change from an employee\u2019s profile, it belongs in People, not Payroll.',
          'Rule 2 \u2014 Where would the user expect to find it? Ask 5 users. If 4 out of 5 say the same T1, that\u2019s where it goes. User expectation trumps logical taxonomy.',
          'Rule 3 \u2014 Where do competitors put it? Check the top 3 competitors. If there\u2019s consensus, follow it. Users carry mental models from other products.',
          'Rule 4 \u2014 Where does the primary data live? If the feature primarily reads/writes data from one domain, place it there. A "compensation benchmarking" feature that reads payroll data belongs in Payroll, even if HR admins use it.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 5: T3 Rules
  // ─────────────────────────────────────────────
  {
    id: 't3-rules',
    title: 'T3 Rules: In-Page Navigation',
    subtitle: 'Tabs, sub-sections, and panels within a module page',
    content: [
      {
        type: 'text',
        value:
          'T3 items are the in-page navigation within a T2 module. They appear as tabs, sub-sections, panels, or workflow steps \u2014 never in the sidebar. T3 is where most feature-level UI lives.',
      },
      {
        type: 'heading',
        value: 'What Qualifies as T3',
      },
      {
        type: 'list',
        items: [
          'Sub-views: Different perspectives on the same data. Example: a Candidates T2 might have T3 tabs for "All Candidates," "By Stage," "By Source."',
          'Workflow steps: Sequential stages in a process. Example: a Benefits Enrollment T2 might have T3 steps for "Select Plans," "Add Dependents," "Review & Confirm."',
          'Configuration sections: Settings or setup areas within a module. Example: a Careers Site T2 might have T3 tabs for "Design," "Content," "SEO Settings."',
          'Detail panels: Contextual information shown alongside a primary view. Example: an employee profile T2 might have T3 panels for "Personal," "Job," "Pay," "Documents."',
        ],
      },
      {
        type: 'heading',
        value: 'Constraints',
      },
      {
        type: 'list',
        items: [
          'Maximum 6 T3 items per T2. Beyond 6, the in-page nav becomes cluttered. If a T2 needs more than 6 T3s, consider whether the T2 should split into two T2s.',
          'T3 items do not appear in the sidebar. They are rendered within the page content area as tabs, segmented controls, or step indicators. The sidebar stops at T2.',
          'Labels should be 1\u20132 words. T3 labels must be extremely concise because they appear in constrained UI elements (tabs, chips, breadcrumbs). "Overview" not "Candidate Overview Summary."',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 6: Ordering Rules
  // ─────────────────────────────────────────────
  {
    id: 'ordering-rules',
    title: 'Ordering Rules',
    subtitle: 'Position is prioritization \u2014 every ordering decision matters',
    content: [
      {
        type: 'text',
        value:
          'The order of items in the navigation communicates importance, frequency, and workflow sequence. Ordering is not arbitrary \u2014 every position is a decision.',
      },
      {
        type: 'heading',
        value: 'T1 Ordering: The Sidebar Sequence',
      },
      {
        type: 'text',
        value:
          'The sidebar follows a cluster model. Items are grouped into conceptual clusters, and within each cluster, items are ordered by frequency of use.',
      },
      {
        type: 'table',
        headers: ['Cluster', 'T1 Items', 'Rationale'],
        rows: [
          [
            'Anchor',
            'Home',
            'The starting point. Always first. Provides orientation and personalized dashboard.',
          ],
          [
            'Identity & Acquisition',
            'People, Hiring',
            'Core HR: who\u2019s in the org and how they got here. People is the most-visited T1 for HR admins.',
          ],
          [
            'Operational',
            'Payroll, Time, Benefits',
            'Recurring operational workflows. Payroll leads because it\u2019s the highest-stakes operational task.',
          ],
          [
            'Development & Engagement',
            'Talent, Culture',
            'Growth and engagement. Talent (performance, goals) before Culture (surveys, recognition) because reviews are more frequent.',
          ],
          [
            'Platform',
            'Apps, Analytics',
            'Extensibility and intelligence. Used by admins and power users. Apps before Analytics because integrations are configured first.',
          ],
          [
            'Configuration Anchor',
            'Settings',
            'Always last. The "back of the book" \u2014 configuration and administration.',
          ],
        ],
      },
      {
        type: 'heading',
        value: 'The 8 Codified T1 Ordering Rules',
      },
      {
        type: 'list',
        items: [
          'Rule 1: Home is always first. It is the anchor and orientation point.',
          'Rule 2: Settings is always last. It is the configuration destination, not a daily workflow.',
          'Rule 3: Group by cluster. Items within the same conceptual cluster stay adjacent.',
          'Rule 4: Within a cluster, order by frequency. The most-used item in the cluster comes first.',
          'Rule 5: Identity before operations. People/Hiring (who) comes before Payroll/Time/Benefits (what they do).',
          'Rule 6: Operational items follow payroll cycle logic. Payroll \u2192 Time \u2192 Benefits mirrors the data flow (time feeds payroll, benefits deduct from payroll).',
          'Rule 7: Development before platform. Talent/Culture are used by more personas than Apps/Analytics.',
          'Rule 8: Never reorder without VP Product approval. T1 order changes affect every user. They require sign-off from VP Product or above.',
        ],
      },
      {
        type: 'heading',
        value: 'T2 Ordering: Within Each T1',
      },
      {
        type: 'text',
        value:
          'T2 ordering follows a frequency-first principle: the most-used module appears first. The first T2 is special \u2014 it is the "default" content shown on the hub page when a user clicks a T1.',
      },
      {
        type: 'heading',
        value: 'The 5 Codified T2 Ordering Rules',
      },
      {
        type: 'list',
        items: [
          'Rule 1 \u2014 Frequency-first: The most frequently visited T2 is first. This becomes the hub page\u2019s default content.',
          'Rule 2 \u2014 Actions before data: Workflow-oriented T2s ("Run Payroll") come before data-oriented T2s ("Pay History").',
          'Rule 3 \u2014 Setup last: Configuration or setup T2s go at the end of the list. Users set things up once and then rarely return.',
          'Rule 4 \u2014 Don\u2019t alphabetize: Alphabetical ordering is a cop-out. It communicates that you haven\u2019t thought about priority.',
          'Rule 5 \u2014 Revisit with usage data: T2 order should be validated with actual usage analytics at least annually. Initial ordering is hypothesis-driven; mature ordering is data-driven.',
        ],
      },
      {
        type: 'heading',
        value: 'T2 Order by T1',
      },
      {
        type: 'table',
        headers: ['T1', 'T2 Order (first = hub default)'],
        rows: [
          ['People', 'Employee Directory, Org Chart, Onboarding, Offboarding, Documents'],
          ['Hiring', 'Job Openings, Candidates, Talent Pools, Careers Site'],
          ['Payroll', 'Run Payroll, Pay History, Tax Filings, Deductions, Pay Schedules'],
          ['Time', 'Time Tracking, Time Off, Scheduling, Approvals, Holidays'],
          ['Benefits', 'Overview, Enrollment, Plans, Carriers, Billing'],
          ['Talent', 'Performance, Goals, Development Plans, Succession, Compensation'],
          ['Culture', 'Surveys, Recognition, Community, Announcements'],
          ['Apps', 'Marketplace, Installed Apps, API Access'],
          ['Analytics', 'Dashboards, Reports, Data Explorer, Insights'],
          ['Settings', 'Account, Permissions, Workflows, Audit Log, Data Management'],
        ],
      },
      {
        type: 'heading',
        value: 'T3 Ordering Rules',
      },
      {
        type: 'list',
        items: [
          'Rule 1 \u2014 Sequential follows workflow: If T3 items represent steps in a process (e.g., enrollment wizard), order them by workflow sequence.',
          'Rule 2 \u2014 Parallel follows frequency: If T3 items are independent views (e.g., tabs on a profile), order by frequency of use.',
          'Rule 3 \u2014 Default T3 is most useful: The first T3 (default tab/view) should be the most useful starting point for the majority of users.',
          'Rule 4 \u2014 Max 6: If you have more than 6, the T2 is doing too much. Split it.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 7: Decision Tree
  // ─────────────────────────────────────────────
  {
    id: 'decision-tree',
    title: 'Decision Tree',
    subtitle: 'Where does a new feature go?',
    content: [
      {
        type: 'text',
        value:
          'When a new feature, product, or capability needs a place in the navigation, walk through this decision tree from top to bottom. Each question gates the next.',
      },
      {
        type: 'code',
        value: `Q0: Is it a cross-cutting utility (not a domain)?
 \u251c\u2500 YES \u2192 Does it meet all 4 T0 criteria?
 \u2502    \u251c\u2500 YES \u2192 Propose as T0 (max 4 total)
 \u2502    \u2514\u2500 NO  \u2192 It\u2019s not T0. Surface it contextually within relevant T1s.
 \u2514\u2500 NO  \u2192 Continue to Q1

Q1: Is it a new domain (distinct job, multiple personas, 3+ modules)?
 \u251c\u2500 YES \u2192 Does adding it keep T1 count \u2264 12?
 \u2502    \u251c\u2500 YES \u2192 Propose as new T1. Define its T2s.
 \u2502    \u2514\u2500 NO  \u2192 Use the 12+ T1 strategy (clusters, switcher, or role-defaults).
 \u2514\u2500 NO  \u2192 Continue to Q2

Q2: Does it belong in an existing T1?
 \u251c\u2500 YES \u2192 Is it a distinct workflow that users navigate to directly?
 \u2502    \u251c\u2500 YES \u2192 Does the T1 have room (< 7 T2s)?
 \u2502    \u2502    \u251c\u2500 YES \u2192 Add as new T2. Place using ordering rules.
 \u2502    \u2502    \u2514\u2500 NO  \u2192 Can you merge it with an existing T2?
 \u2502    \u2502         \u251c\u2500 YES \u2192 Merge and add as T3 within existing T2.
 \u2502    \u2502         \u2514\u2500 NO  \u2192 Reconsider: does the T1 need to split?
 \u2502    \u2514\u2500 NO  \u2192 Continue to Q3
 \u2514\u2500 NO  \u2192 Re-examine: every feature belongs somewhere. Use tiebreakers.

Q3: Is it a sub-view, tab, or step within an existing T2?
 \u251c\u2500 YES \u2192 Does the T2 have room (< 6 T3s)?
 \u2502    \u251c\u2500 YES \u2192 Add as T3. Place using ordering rules.
 \u2502    \u2514\u2500 NO  \u2192 The T2 is overloaded. Split into two T2s.
 \u2514\u2500 NO  \u2192 Continue to Q4

Q4: Is it a contextual capability (AI, automation, integration)?
 \u251c\u2500 YES \u2192 Surface it within the relevant T1/T2/T3 context.
 \u2502         Do not give it a dedicated nav slot.
 \u2502         Examples: AI suggestions in a candidate profile,
 \u2502         automation triggers in a workflow builder.
 \u2514\u2500 NO  \u2192 Escalate to IA governance review.
            The feature may not fit the current model.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 8: Naming Rules
  // ─────────────────────────────────────────────
  {
    id: 'naming-rules',
    title: 'Naming Rules',
    subtitle: 'Labels are promises \u2014 choose them carefully',
    content: [
      {
        type: 'text',
        value:
          'Navigation labels set user expectations. A label is a promise about what the user will find when they click. Misleading or ambiguous labels erode trust and increase time-to-task.',
      },
      {
        type: 'heading',
        value: 'Naming Rules by Level',
      },
      {
        type: 'table',
        headers: ['Level', 'Rule', 'Examples', 'Anti-Examples'],
        rows: [
          [
            'T0',
            'Single noun. Maximum 2 words. Universally understood.',
            'Search, Inbox, My Info',
            'Global Search Center, Notification Hub, My Employee Profile',
          ],
          [
            'T1',
            'Noun only. 1 word preferred. Names a domain, not an action.',
            'People, Hiring, Payroll, Time, Talent',
            'Manage People, Hire Candidates, Run Payroll, Track Time',
          ],
          [
            'T2',
            'Noun or verb phrase. 1\u20133 words. Names a workflow or section.',
            'Job Openings, Run Payroll, Time Off, Org Chart',
            'ATS Job Board Management, Payroll Processing Center',
          ],
          [
            'T3',
            '1\u20132 words. Ultra-concise. Appears in tabs or breadcrumbs.',
            'Overview, Details, History, Settings',
            'Detailed Candidate Overview, Complete History Log',
          ],
        ],
      },
      {
        type: 'heading',
        value: 'The 5 Naming Tiebreaker Rules',
      },
      {
        type: 'text',
        value:
          'When you\u2019re choosing between two valid label options, apply these tiebreakers in order:',
      },
      {
        type: 'list',
        items: [
          'Rule 1 \u2014 Use competitor labels: If the top 3 competitors all call it "Job Openings," call it "Job Openings." Users carry mental models from other products, and matching reduces learning cost.',
          'Rule 2 \u2014 Shorter wins: Between two equally clear labels, the shorter one wins. "Time Off" beats "Time Off Management." "Goals" beats "Goal Setting."',
          'Rule 3 \u2014 Nouns over verbs at T1: T1 labels must be nouns because T1 names a domain, not an action. "Hiring" (noun/gerund = domain) is correct. "Hire People" (verb phrase = action) is wrong.',
          'Rule 4 \u2014 Plain language over jargon: "Employee Directory" beats "People Index." "Pay History" beats "Compensation Ledger." If a non-HR person wouldn\u2019t understand the label, simplify it.',
          'Rule 5 \u2014 Never brand a nav label: Navigation labels are functional, not marketing. "Hiring" not "BambooHR ATS." "Analytics" not "BambooHR Insights\u2122." Brand names in the nav confuse users and age poorly.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 9: Structural Guardrails
  // ─────────────────────────────────────────────
  {
    id: 'structural-guardrails',
    title: 'Structural Guardrails',
    subtitle: 'The "never do" list',
    content: [
      {
        type: 'text',
        value:
          'These are hard constraints. Violating any of these guardrails requires VP Product approval and a documented exception rationale.',
      },
      {
        type: 'heading',
        value: 'The 6 Guardrails',
      },
      {
        type: 'list',
        items: [
          'Guardrail 1 \u2014 No T1 with only 1 T2. If a domain has only one section, it is not a domain \u2014 it is a module inside another domain. A T1 must have at least 3 T2s. If it has 2, it is borderline and must justify its independence. If it has 1, it must be absorbed into the nearest related T1.',
          'Guardrail 2 \u2014 No same feature in two nav locations. A feature appears in exactly one place in the nav hierarchy. If users need to access it from multiple contexts, use cross-links (contextual links within pages), not duplicate nav entries. Duplicate entries create maintenance debt, confuse users about the canonical location, and fragment analytics.',
          'Guardrail 3 \u2014 No more than 12 T1 items. The sidebar must remain scannable. Beyond 12 items, users cannot hold the full list in working memory. If the product genuinely needs more than 12 T1-level domains, use the 12+ strategy (collapsible clusters, product switcher, or role-based defaults).',
          'Guardrail 4 \u2014 No T2 behind another T2. The nav hierarchy is strictly T1 \u2192 T2 \u2192 T3. There is no T2.1 or nested sub-menu. If a T2 needs sub-sections, those are T3s (in-page tabs), not nested T2s in the sidebar. Nested sub-menus create interaction cost and disorientation.',
          'Guardrail 5 \u2014 Settings is not a dumping ground. Settings (T1) is for account-level configuration: permissions, workflows, integrations, audit. It is not a catch-all for features that don\u2019t fit elsewhere. If a feature is being placed in Settings because "it doesn\u2019t fit anywhere else," that\u2019s a signal that the IA needs rethinking, not that Settings should absorb it.',
          'Guardrail 6 \u2014 No nav items that appear/disappear without indication. If a T1 or T2 is hidden because the user lacks permissions or the feature is not purchased, show the item in a locked/disabled state with a clear indicator (lock icon, "upgrade" badge). Removing the item entirely makes the nav unpredictable and prevents users from discovering features they could unlock.',
        ],
      },
      {
        type: 'heading',
        value: 'The "More" Menu Escape Hatch',
      },
      {
        type: 'text',
        value:
          'If a feature legitimately does not fit the existing nav structure and cannot be placed without violating a guardrail, it may temporarily live in a "More" overflow menu at the bottom of the sidebar. This is an explicit pressure valve, not a permanent solution. Items in "More" must be reviewed quarterly and either promoted to a proper nav position or removed. The "More" menu should never contain more than 3 items. If it exceeds 3, the IA needs structural revision.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 10: Expansion Framework
  // ─────────────────────────────────────────────
  {
    id: 'expansion-framework',
    title: 'Expansion Framework: Non-HCM Domains',
    subtitle: 'How new product domains enter the navigation',
    content: [
      {
        type: 'text',
        value:
          'As BambooHR expands beyond core HCM into adjacent domains (IT, Finance, etc.), new product areas need a structured path into the navigation. The expansion framework ensures new domains enter the nav in a way that is consistent, scalable, and user-centered.',
      },
      {
        type: 'heading',
        value: 'Core Principle',
      },
      {
        type: 'text',
        value:
          'Non-HCM domains start as T1s. They do not start as T2s inside an existing HCM domain. Reason: users think of IT and Finance as separate jobs from HR. Burying IT inside People or Finance inside Payroll violates the "organized by how users think" principle.',
      },
      {
        type: 'heading',
        value: 'The 3 Phases',
      },
      {
        type: 'table',
        headers: ['Phase', 'Name', 'Nav Treatment', 'Criteria to Enter', 'Example'],
        rows: [
          [
            '1',
            'Integration',
            'T1 with 1\u20132 T2s. Light integration. Mostly links to external tools.',
            'Business decision to enter the domain. At least one integration partner.',
            'IT appears as a T1 with "Devices" and "Software" T2s that link to an MDM partner.',
          ],
          [
            '2',
            'Native Lite',
            'T1 with 3\u20135 T2s. Mix of native features and integrations.',
            'At least 3 native T2-depth workflows. Weekly usage by primary persona.',
            'IT now has native "Requests," "Devices," "Software," and "Provisioning" T2s.',
          ],
          [
            '3',
            'Domain Promotion',
            'Full T1 with 5\u20137 T2s. Fully native. Comparable depth to core HCM domains.',
            'All T1 qualifying criteria met. Standalone value without integrations.',
            'IT is now equivalent to People or Time in depth and usage.',
          ],
        ],
      },
      {
        type: 'heading',
        value: 'Where Would IT/Equipment and Finance Sit?',
      },
      {
        type: 'list',
        items: [
          'IT / Equipment: Would sit between the Operational cluster (Payroll, Time, Benefits) and the Development cluster (Talent, Culture). Rationale: IT operations are adjacent to employee operations but distinct from people development.',
          'Finance: Would sit after the Operational cluster, near IT. Rationale: Finance (expenses, budgets) is operationally adjacent to Payroll but distinct enough to warrant its own T1.',
        ],
      },
      {
        type: 'heading',
        value: 'The 5 Guardrails for Domain Expansion',
      },
      {
        type: 'list',
        items: [
          'Guardrail 1 \u2014 New domains start at Phase 1. No domain skips straight to Phase 3. Even if the product team builds a full-featured module, the nav treatment should start light and expand as user adoption validates the investment.',
          'Guardrail 2 \u2014 Phase promotion requires usage evidence. Moving from Phase 1 to Phase 2 (or Phase 2 to Phase 3) requires data showing that users are actually visiting the domain weekly and using its T2s. No promotion on roadmap intent alone.',
          'Guardrail 3 \u2014 Integration-phase T1s must add value immediately. A Phase 1 T1 with just "Coming Soon" placeholders damages user trust. Even at Phase 1, the T1 must provide at least one useful workflow (even if it\u2019s a link to an external tool).',
          'Guardrail 4 \u2014 New T1s do not displace existing T1s. Adding IT does not mean removing Culture. The sidebar grows to accommodate (up to 12). If 12 is reached, use the overflow strategy.',
          'Guardrail 5 \u2014 Non-HCM domains follow all standard IA rules. T0/T1/T2/T3 criteria, naming rules, ordering rules, and structural guardrails apply equally to non-HCM domains. No special exceptions for "new" domains.',
        ],
      },
      {
        type: 'heading',
        value: 'The 12+ T1 Scenario',
      },
      {
        type: 'text',
        value:
          'If the product expands to more than 12 T1-level domains, three strategies are available (in order of preference):',
      },
      {
        type: 'list',
        items: [
          'Option 1 \u2014 Collapsible clusters: Group T1 items into named clusters (e.g., "People & Hiring," "Operations," "Platform") that can collapse/expand. The sidebar shows cluster headers with expand arrows. This preserves the single sidebar but reduces visible items. Preferred because it maintains spatial consistency.',
          'Option 2 \u2014 Product switcher: Add a top-level switcher (like Atlassian\u2019s product switcher) that toggles between "HR," "IT," "Finance" contexts. Each context shows its own T1 sidebar. This is more disruptive but scales to many domains. Use only if clusters become unwieldy (>16 T1s).',
          'Option 3 \u2014 Role-based defaults: Show different default T1 sets based on the user\u2019s primary role. An IT admin sees IT-focused T1s by default; an HR admin sees HR-focused T1s. Other T1s are available via a "More" or search mechanism. This personalizes the experience but risks hiding features users don\u2019t know they have.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Section 11: Worked Examples
  // ─────────────────────────────────────────────
  {
    id: 'worked-examples',
    title: 'Worked Examples',
    subtitle: 'Applying the rules to real scenarios',
    content: [
      {
        type: 'text',
        value:
          'These examples demonstrate how to apply the governance rules to real product decisions. Each walks through the decision tree and applies the relevant rules to reach a placement decision.',
      },
      {
        type: 'heading',
        value: 'Example 1: AI Assistant',
      },
      {
        type: 'text',
        value:
          'Scenario: The product team wants to add an AI assistant that can answer HR policy questions, draft job descriptions, summarize employee feedback, and generate reports. Where does it go?',
      },
      {
        type: 'text',
        value:
          'Decision tree walkthrough: Q0 \u2014 Is it a cross-cutting utility? Yes, it serves every domain. Does it meet all 4 T0 criteria? Cross-cutting: yes. Every-session: potentially, but unproven. Persona-universal: yes. Not a domain: yes, it\u2019s a utility. Verdict: It could qualify for T0, but "every-session usage" is unproven for a new feature.',
      },
      {
        type: 'text',
        value:
          'Decision: Do not allocate a T0 slot. Instead, surface the AI assistant contextually within each T1/T2 where it adds value (e.g., "Draft with AI" button in Job Openings, "Summarize" button in Performance Reviews, "Ask" input in Analytics). If usage data later shows every-session engagement across all personas, revisit for T0 promotion. This follows the capability layer pattern \u2014 the AI is a technology that enhances the product, not a destination of its own.',
      },
      {
        type: 'heading',
        value: 'Example 2: Compensation Benchmarking',
      },
      {
        type: 'text',
        value:
          'Scenario: The product team is building a compensation benchmarking tool that lets HR compare internal pay data against market data. It includes salary bands, equity analysis, and comp recommendations. Where does it go?',
      },
      {
        type: 'text',
        value:
          'Decision tree walkthrough: Q0 \u2014 Cross-cutting utility? No, it\u2019s domain-specific. Q1 \u2014 New domain? No, compensation is not a separate domain from Payroll or Talent. Q2 \u2014 Existing T1? Yes, but which one? Apply tiebreakers: (1) Where does the user start? HR starts from employee pay data \u2192 Payroll. (2) Where would users expect it? Most would say Payroll or Compensation. (3) Competitors? Most put it in a Compensation section. (4) Primary data? Pay data lives in Payroll.',
      },
      {
        type: 'text',
        value:
          'Decision: Add as a T2 ("Benchmarking") inside the Talent T1, adjacent to the existing Compensation T2. Rationale: while the data originates in Payroll, the workflow is strategic (comp planning, equity analysis) and aligns with the Talent domain\u2019s focus on people development and compensation strategy. Payroll is for operational pay processing; Talent \u2192 Compensation is for strategic pay decisions. Benchmarking extends the strategic workflow.',
      },
      {
        type: 'heading',
        value: 'Example 3: Device Management',
      },
      {
        type: 'text',
        value:
          'Scenario: BambooHR wants to add device management \u2014 tracking which laptops, phones, and monitors are assigned to employees. It starts as a partnership with an MDM vendor. Where does it go?',
      },
      {
        type: 'text',
        value:
          'Decision tree walkthrough: Q0 \u2014 Cross-cutting utility? No, it\u2019s a domain. Q1 \u2014 New domain? Potentially. IT/Equipment is a distinct job, multiple personas (IT admin, manager, employee), but does it have 3+ T2s? At Phase 1, it has only 1\u20132 (Devices, Software). It doesn\u2019t yet meet the "3+ T2s" criterion for a full T1.',
      },
      {
        type: 'text',
        value:
          'Decision: Add as a Phase 1 T1 ("IT") with limited T2s. Even though it has fewer than 3 T2s, the expansion framework explicitly allows Phase 1 T1s to start with 1\u20132 T2s. This is an exception to the normal "3+ T2s" rule because non-HCM domains need a T1 entry point to establish the domain in users\u2019 mental model. Do not bury it inside People or Settings. As the IT product matures and adds native workflows (Requests, Provisioning, Inventory), it will progress to Phase 2 and eventually Phase 3.',
      },
      {
        type: 'heading',
        value: 'Example 4: Pulse Surveys',
      },
      {
        type: 'text',
        value:
          'Scenario: The product team is adding quick "pulse surveys" \u2014 lightweight, recurring check-in surveys for employee sentiment. Where does it go?',
      },
      {
        type: 'text',
        value:
          'Decision tree walkthrough: Q0 \u2014 Cross-cutting utility? No. Q1 \u2014 New domain? No, surveys already exist in the Culture T1. Q2 \u2014 Existing T1? Yes, Culture. Is it a distinct workflow? Pulse surveys are a variant of surveys, not a fundamentally different workflow. Users think of "surveys" as one job, whether it\u2019s a full engagement survey or a quick pulse check.',
      },
      {
        type: 'text',
        value:
          'Decision: Add as a T3 within the existing Surveys T2 in Culture. Surveys T2 gets T3 tabs: "All Surveys," "Pulse," "Engagement," "Templates." Pulse is a type of survey, not a separate workflow. Giving it its own T2 would create a misleadingly thin section and violate the "distinct workflow" criterion for T2.',
      },
      {
        type: 'heading',
        value: 'Example 5: Compliance Center',
      },
      {
        type: 'text',
        value:
          'Scenario: The product team wants to build a "Compliance Center" that aggregates compliance status across HR, payroll, benefits, and hiring (e.g., I-9 status, EEO reporting, ACA compliance, OSHA logs). Where does it go?',
      },
      {
        type: 'text',
        value:
          'Decision tree walkthrough: Q0 \u2014 Cross-cutting utility? It spans domains, but it\u2019s not a utility \u2014 it has deep workflow (reports, filings, audit trails). It\u2019s not persona-universal (primarily HR admins). Fails T0 criteria. Q1 \u2014 New domain? It\u2019s cross-domain (touches People, Payroll, Benefits, Hiring). Does it have a distinct job? "Ensuring legal compliance" is a recognizable job. Multiple personas? Primarily HR admin, but also managers (OSHA) and finance (ACA). 3+ T2s? Yes: Regulatory Filings, Audit Trail, I-9 Management, EEO Reporting, ACA Compliance. Weekly usage? For an HR admin at a mid-size company, yes.',
      },
      {
        type: 'text',
        value:
          'Decision: This is a borderline case. Two valid options: (A) Add as a new T1 "Compliance" if the product investment is substantial and the domain will grow. Place it in the Operational cluster after Benefits. (B) Add as a T2 "Compliance" inside the Analytics T1 if the initial version is primarily reporting/dashboards. The key factor: does the user think of compliance as a separate job or as a type of reporting? If user research shows it\u2019s a separate job, go with (A). If it\u2019s perceived as "compliance reports," go with (B). Start with (B) and promote to (A) when the domain has proven depth and independent usage patterns.',
      },
    ],
  },
]
