export interface DemoNote {
  competitors: string;
  jtbd: {
    employee: string;
    manager: string;
    hrAdmin: string;
    exec: string;
  };
}

/**
 * Demo notes keyed by route prefix.
 * Matched by longest prefix — e.g. "/people/my-info" matches before "/people".
 * Content is markdown.
 */
export const demoNotes: Record<string, DemoNote> = {
  '/home': {
    competitors: 'Competitor intel for **Home** coming soon.',
    jtbd: {
      employee: 'As an employee, I want a single place to see what needs my attention today so I can stay on top of tasks without digging through multiple tools.',
      manager: 'As a manager, I want a quick snapshot of my team\'s status — time off, pending approvals, headcount — so I can plan my day effectively.',
      hrAdmin: 'As an HR admin, I want to see org-wide alerts, pending items, and key metrics at a glance so I can prioritize my workload.',
      exec: 'As an exec, I want high-level workforce health indicators so I can spot trends and make strategic decisions quickly.',
    },
  },
  '/people': {
    competitors: 'Competitor intel for **People** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to find and connect with coworkers across the org so I can collaborate effectively.',
      manager: 'As a manager, I want to see my team roster with key details so I can manage my direct reports.',
      hrAdmin: 'As an HR admin, I want a comprehensive employee directory with filtering and bulk actions so I can manage the workforce efficiently.',
      exec: 'As an exec, I want to understand org structure and headcount distribution so I can make informed decisions about team investments.',
    },
  },
  '/hiring': {
    competitors: 'Competitor intel for **Hiring** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to refer candidates and track my referrals so I can help grow the team.',
      manager: 'As a manager, I want to track open roles on my team and see candidate pipelines so I can fill positions quickly.',
      hrAdmin: 'As an HR admin, I want to manage the full recruiting lifecycle — postings, candidates, offers — so I can hire efficiently.',
      exec: 'As an exec, I want to see hiring velocity and pipeline health so I can ensure we\'re meeting growth targets.',
    },
  },
  '/onboarding': {
    competitors: 'Competitor intel for **Onboarding** coming soon.',
    jtbd: {
      employee: 'As a new employee, I want a clear checklist of what I need to complete so I can get set up and productive quickly.',
      manager: 'As a manager, I want to see my new hire\'s onboarding progress so I can support them and ensure nothing falls through the cracks.',
      hrAdmin: 'As an HR admin, I want to create and manage onboarding workflows so every new hire has a consistent, complete experience.',
      exec: 'As an exec, I want to know onboarding completion rates and time-to-productivity so I can evaluate our new hire experience.',
    },
  },
  '/payroll': {
    competitors: 'Competitor intel for **Payroll** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to view my pay stubs and tax documents so I can understand my compensation and file taxes.',
      manager: 'As a manager, I want to approve timesheets and see payroll summaries for my team so I can ensure accurate pay.',
      hrAdmin: 'As an HR admin, I want to run payroll accurately and on time so employees are paid correctly every cycle.',
      exec: 'As an exec, I want to see payroll costs and trends so I can manage labor budgets.',
    },
  },
  '/benefits': {
    competitors: 'Competitor intel for **Benefits** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to understand and enroll in my benefits so I can make the best choices for me and my family.',
      manager: 'As a manager, I want to understand the benefits my team members have access to so I can answer basic questions.',
      hrAdmin: 'As an HR admin, I want to configure and manage benefits plans and enrollment windows so employees have access to the right coverage.',
      exec: 'As an exec, I want to see benefits costs and utilization so I can evaluate our total rewards strategy.',
    },
  },
  '/performance': {
    competitors: 'Competitor intel for **Performance** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to set goals, track progress, and receive feedback so I can grow in my role.',
      manager: 'As a manager, I want to run reviews, give feedback, and track my team\'s goals so I can develop my people.',
      hrAdmin: 'As an HR admin, I want to configure review cycles and monitor completion so the org runs a consistent performance process.',
      exec: 'As an exec, I want to see performance distribution and talent trends so I can make decisions about promotions and development investment.',
    },
  },
  '/training': {
    competitors: 'Competitor intel for **Training** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to find and complete training courses so I can build skills and meet compliance requirements.',
      manager: 'As a manager, I want to assign training and track my team\'s completion so I can ensure they\'re developing and staying compliant.',
      hrAdmin: 'As an HR admin, I want to manage the training catalog, assign courses, and track org-wide completion so I can ensure compliance and development.',
      exec: 'As an exec, I want to see training investment and completion rates so I can evaluate our L&D program\'s effectiveness.',
    },
  },
  '/compensation': {
    competitors: 'Competitor intel for **Compensation** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to understand my total compensation so I can see the full value of my package.',
      manager: 'As a manager, I want to see my team\'s compensation data and make raise/bonus recommendations so I can retain and motivate my people.',
      hrAdmin: 'As an HR admin, I want to manage comp structures, run planning cycles, and ensure pay equity so the org compensates fairly and competitively.',
      exec: 'As an exec, I want to see compensation benchmarks and budget impact so I can make strategic pay decisions.',
    },
  },
  '/culture': {
    competitors: 'Competitor intel for **Culture** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to participate in recognition, community posts, and surveys so I feel connected to the company culture.',
      manager: 'As a manager, I want to recognize my team and see engagement signals so I can foster a positive team culture.',
      hrAdmin: 'As an HR admin, I want to run surveys, manage recognition programs, and monitor engagement so I can nurture company culture.',
      exec: 'As an exec, I want to see engagement scores and culture trends so I can understand workforce sentiment.',
    },
  },
  '/time-and-attendance': {
    competitors: 'Competitor intel for **Time & Attendance** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to request time off and log my hours so I can manage my time and get paid accurately.',
      manager: 'As a manager, I want to approve time-off requests and review timesheets so my team\'s time is tracked correctly.',
      hrAdmin: 'As an HR admin, I want to configure time-off policies and manage attendance so the org tracks time consistently.',
      exec: 'As an exec, I want to see PTO utilization and overtime trends so I can manage workforce capacity.',
    },
  },
  '/reports': {
    competitors: 'Competitor intel for **Reports** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to access reports relevant to me so I can find information I need.',
      manager: 'As a manager, I want to run team-level reports so I can make data-driven decisions about my people.',
      hrAdmin: 'As an HR admin, I want to build, schedule, and share reports so I can provide data to stakeholders across the org.',
      exec: 'As an exec, I want executive dashboards and strategic reports so I can track workforce KPIs.',
    },
  },
  '/files': {
    competitors: 'Competitor intel for **Files** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to access my documents (tax forms, handbook, etc.) so I can find what I need without asking HR.',
      manager: 'As a manager, I want to access team-related documents so I can reference policies and share resources.',
      hrAdmin: 'As an HR admin, I want to manage company documents, track signatures, and organize files so everything is accessible and compliant.',
      exec: 'As an exec, I want to know document compliance status so I can ensure the org meets regulatory requirements.',
    },
  },
  '/apps': {
    competitors: 'Competitor intel for **Apps** coming soon.',
    jtbd: {
      employee: 'As an employee, I want to access connected apps from one place so I don\'t have to juggle multiple tools.',
      manager: 'As a manager, I want integrations that sync data across tools so I don\'t have to enter information twice.',
      hrAdmin: 'As an HR admin, I want to manage integrations and API access so our HR tech stack works together seamlessly.',
      exec: 'As an exec, I want to understand our HR tech ecosystem so I can evaluate consolidation and investment opportunities.',
    },
  },
  '/settings': {
    competitors: 'Competitor intel for **Settings** coming soon.',
    jtbd: {
      employee: 'N/A — employees typically don\'t access settings.',
      manager: 'N/A — managers typically don\'t access settings.',
      hrAdmin: 'As an HR admin, I want to configure system settings, access levels, and workflows so the platform works the way our org needs it to.',
      exec: 'N/A — execs typically don\'t access settings directly.',
    },
  },
};

/**
 * Find the best-matching demo note for a given pathname.
 * Matches by longest route prefix.
 */
export function getDemoNote(pathname: string): DemoNote | null {
  const keys = Object.keys(demoNotes).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (pathname.startsWith(key)) {
      return demoNotes[key];
    }
  }
  return null;
}
