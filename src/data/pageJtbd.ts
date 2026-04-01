import type { PersonaType } from './personas-and-packaging';

export const PAGE_JTBD: Record<string, Partial<Record<PersonaType, string | string[]>>> = {

  // ── Home Hub ────────────────────────────────────────────────────────

  '/home': {
    employee: [
      'Get a personalized snapshot of my most urgent to-dos (overdue training, expiring time-off balance, unsigned document) so I know what to act on today.',
      'See relevant company announcements and culture highlights so I stay connected to what is happening across the org.',
      'Navigate quickly to my most-used features (Time Off, Pay Stubs, Goals) from a single launchpad.',
    ],
    manager: [
      'Scan for team-level items that need my attention today — pending approvals, upcoming review deadlines, scheduled absences.',
      'See a quick summary of my team\'s health indicators (open goals, overdue reviews, upcoming 1:1s) to prioritize the week.',
      'Navigate directly to the most time-sensitive action in my queue without searching through the sidebar.',
    ],
    'dept-head': [
      'Get a department-level overview of key metrics (open headcount, training compliance rate, performance distribution) to orient my week.',
      'Identify department-level deadlines or escalations that need my attention before my next leadership meeting.',
      'Navigate to the sub-module with the most open items requiring action this week.',
    ],
    executive: [
      'Review a high-level snapshot of division health (headcount, attrition, open roles, performance summary) in a single glance.',
      'Identify any escalations or board-level metrics that have changed meaningfully since my last login.',
      'Navigate directly to the specific dashboard or report I need before an upcoming meeting.',
    ],
    'hr-admin': [
      'Prioritize the day\'s most urgent HR operational tasks (payroll run due, I-9 expirations, onboarding tasks overdue).',
      'Monitor platform health indicators (integration sync errors, open approval queues, compliance flags) at a glance.',
      'Navigate quickly to the module or workflow that needs immediate attention.',
    ],
    'it-admin': [
      'Check the status of open helpdesk tickets and active incidents to set today\'s work priorities.',
      'Identify security alerts or provisioning tasks that require immediate action.',
    ],
    'finance-admin': [
      'Review the status of open expense approvals and outstanding invoices before starting the day.',
      'Check budget utilization alerts and flag overages requiring action before the accounting close.',
    ],
    'workplace-admin': [
      'Check today\'s visitor schedule and desk utilization at a glance to prepare the facility.',
      'Review open maintenance and facilities tickets that need action today.',
    ],
  },

  '/home/inbox': {
    employee: [
      'Review and respond to pending approvals or signature requests (time-off confirmation, document e-sign).',
      'Complete onboarding tasks or urgent deadlines (finish benefits enrollment, sign the employee handbook).',
      'Read notifications about upcoming changes that affect me (open enrollment opening, pay cycle update).',
    ],
    manager: [
      'Review and approve or deny pending time-off requests from direct reports so the team schedule stays accurate.',
      'Act on assigned tasks with deadlines (complete a performance review, sign off on a compensation change).',
      'Read notifications about team events (work anniversaries, upcoming review cycle deadlines).',
    ],
    'dept-head': [
      'Act on escalated approval requests that have surfaced from sub-managers (extended leave, comp exceptions).',
      'Review reminders for department-level process deadlines (calibration due, headcount submission).',
      'Triage a mixed queue of notifications spanning People, Talent, and Compliance for my department.',
    ],
    executive: [
      'Act on high-priority escalations requiring executive approval (above-band comp change, critical headcount request).',
      'Review deadline reminders for strategic initiatives (annual review cycle launch, board deck input due).',
    ],
    'hr-admin': [
      'Process a queue of pending approvals and lifecycle action items across all active employees.',
      'Act on compliance-driven task alerts and filing deadlines (I-9 expiry, ACA filing window).',
      'Review system error notifications (payroll sync failure, integration error) and route for resolution.',
    ],
    'it-admin': [
      'Review new helpdesk ticket alerts and act on high-priority items.',
      'Respond to security alerts or access change requests that require manual approval.',
      'Process provisioning or deprovisioning tasks triggered by onboarding and offboarding events.',
    ],
    'finance-admin': [
      'Review and approve pending expense reports and reimbursement requests.',
      'Act on invoice approval requests within procurement workflows.',
      'Review and respond to budget overage alerts.',
    ],
    'workplace-admin': [
      'Review and confirm visitor pre-registration requests before the arrival date.',
      'Act on desk reservation conflicts or room booking issues flagged by the system.',
      'Review incoming maintenance requests and assign them to the appropriate team member.',
    ],
  },

  '/home/calendar': {
    employee: [
      'View the company holiday calendar alongside my approved time-off dates to plan upcoming work and personal commitments.',
      'Check whether a public holiday affects my next time-off request or pay cycle.',
    ],
    manager: [
      'View a team-level absence calendar showing all approved and pending time off to plan coverage for upcoming sprints or projects.',
      'Reference the company holiday schedule when setting team deadlines or planning a work cycle.',
    ],
    'dept-head': [
      'View the department-wide absence calendar to identify periods where multiple teams are simultaneously short-staffed.',
      'Brief sub-managers on coverage requirements ahead of a high-demand business period using the calendar view.',
    ],
    'hr-admin': [
      'Configure the company holiday calendar for the upcoming year, with location-specific variations where applicable.',
      'Reference approved absence patterns to verify payroll compliance for employees with non-standard schedules.',
    ],
    'finance-admin': [
      'Plan finance close and cycle work around absences so deadlines aren\'t missed.',
    ],
    'workplace-admin': [
      'Combine who\'s-out data with in-office schedules so space and staffing match actual demand.',
    ],
  },

  // ── People Hub + T2s ────────────────────────────────────────────────

  '/people': {
    employee: [
      'Find a colleague\'s contact details or role quickly without navigating to the full directory module.',
      'Browse the company org structure to understand how departments and teams are organized.',
      'Find a specific colleague\'s email, phone number, or Slack handle to get in touch.',
      'Browse the directory filtered by department or office location to understand who does what across the company.',
    ],
    manager: [
      'Get a quick summary of my team\'s current status (headcount, upcoming absences, open actions) before taking a specific action in a sub-module.',
      'Navigate to a direct report\'s profile to kick off a workflow (approve a change, review, schedule a 1:1).',
      'Look up a direct report\'s or colleague\'s contact and role information before reaching out.',
      'Search by skill, department, or title to identify who to involve in a project or escalation.',
    ],
    'dept-head': [
      'Review department-wide people metrics (headcount, recent hires, recent departures, open roles) to monitor department health.',
      'Identify which sub-teams have open compliance or onboarding tasks that need follow-up.',
      'Search directory records across my department to verify that roles, titles, and reporting relationships are accurate.',
      'Search by skill or competency to identify experience gaps across the department.',
    ],
    executive: [
      'Scan division-level org health indicators (headcount vs. plan, recent attrition, open leadership roles) before a leadership review.',
      'Navigate to the org chart to understand team structure and span of control for a specific area.',
      'Look up a specific leader\'s role and reporting relationship quickly without navigating the org chart.',
      'Browse to identify structural gaps in the org (e.g., no head of a key function) during planning.',
    ],
    'hr-admin': [
      'Triage open employee lifecycle tasks — onboarding, offboarding, compliance, documentation — from a single hub.',
      'Navigate quickly to the People sub-module (Onboarding, Compliance, Documents) with the most open items.',
      'Find and open an employee record to make a correction, add a note, or initiate a lifecycle action.',
      'Verify that employee data (titles, departments, cost centers) is accurate across the directory.',
      'Filter the directory by employment status to identify employees in a specific state (e.g., on leave, in probation).',
    ],
    'it-admin': [
      'Get a quick overview of employee headcount and the new-hire pipeline to anticipate provisioning demand.',
      'Find an employee record to look up their assigned devices, access groups, or IT provisioning status.',
      'Identify recently onboarded or departing employees to trigger provisioning or deprovisioning workflows.',
    ],
    'finance-admin': [
      'Check headcount and org structure data to reconcile against budget and cost center assignments.',
      'Look up an employee to verify their cost center, department, or approval authority.',
      'Identify employees with pending expense or reimbursement issues by cross-referencing their profile.',
    ],
    'workplace-admin': [
      'Review people headcount data to plan space allocation and desk capacity.',
      'Find an employee to verify or update their desk assignment and office location.',
      'Browse employees by office location to plan space utilization.',
    ],
  },

  '/people/my-info': {
    employee: [
      'View my most recent pay stub and verify that deductions and net pay are correct.',
      'Update my personal contact information, emergency contacts, or mailing address after a life event.',
      'Review my current benefits elections and confirm coverage details during or after an enrollment window.',
    ],
    manager: [
      'View my own pay stub and verify my personal compensation details.',
      'Update my personal profile information (address, tax withholding, direct deposit) after a change.',
      'Review my own benefits coverage and plan elections.',
    ],
    'dept-head': [
      'Verify my own compensation, benefits, and employment details as part of personal financial planning.',
      'Update my emergency contacts or personal profile information after a life event.',
    ],
    executive: [
      'View my compensation details, equity vesting schedule, or executive benefits summary.',
      'Update personal information or verify tax withholding details.',
    ],
    'hr-admin': [
      'Review my own employee record to confirm it is accurate — especially before demonstrating HR workflows to others.',
      'Validate what employees can see and do in My Info so self-service flows work as designed.',
    ],
    'it-admin': [
      'View my own pay stub and personal HR information like any other employee.',
      'Update personal contact or emergency information.',
    ],
    'finance-admin': [
      'View my pay stub and confirm that my own expense reimbursements have processed correctly.',
      'Update personal banking or tax withholding details.',
    ],
    'workplace-admin': [
      'View my own pay and benefits information.',
      'Update personal profile details and confirm workplace access information is current.',
    ],
  },

  '/people/my-direct-reports': {
    manager: [
      'Get a consolidated view of my direct reports\' current status — today\'s absences, overdue tasks, recent profile changes — before starting the week.',
      'Quickly access a specific direct report\'s profile to kick off an action (approve a request, check goal progress, schedule a 1:1).',
      'Identify which direct reports have outstanding compliance, review, or onboarding tasks so I can follow up proactively.',
    ],
    'dept-head': [
      'Review my own direct reports (sub-managers) and their individual performance status and open tasks.',
      'Identify sub-managers who may need coaching or additional support based on their team\'s health metrics.',
    ],
    'hr-admin': [
      'Audit manager-to-employee assignments and identify any active employees without an assigned manager.',
    ],
  },

  '/people/my-department': {
    'dept-head': [
      'See a complete, up-to-date roster of everyone in my department — total headcount, open roles, recent changes — to stay oriented.',
      'Identify compliance or onboarding gaps across the entire department without waiting for sub-manager reports.',
      'Monitor headcount trends (new hires, attrition) against my approved headcount plan.',
    ],
    executive: [
      'Review the full roster and headcount of a specific department in my division during an org review or planning cycle.',
    ],
    'hr-admin': [
      'Filter employee records by department to run a targeted compliance audit or data accuracy check.',
    ],
  },

  '/people/my-division': {
    executive: [
      'Review all divisions in the company and the headcount, performance, and budget summary associated with each.',
      'Verify that a division restructure or renaming has been accurately reflected across the platform.',
    ],
    'hr-admin': [
      'Create or modify division definitions as part of a company-wide restructure or legal entity change.',
      'Audit division-level headcount data to ensure it is accurate for board or investor reporting materials.',
    ],
  },

  '/people/divisions': {
    executive: [
      'Review all divisions in the company and the headcount, performance, and budget summary associated with each.',
      'Verify that a division restructure or renaming has been accurately reflected across the platform.',
    ],
    'hr-admin': [
      'Create or modify division definitions as part of a company-wide restructure or legal entity change.',
      'Audit division-level headcount data to ensure it is accurate for board or investor reporting materials.',
    ],
  },

  '/people/departments': {
    'dept-head': [
      'Verify that my department\'s structure, name, and headcount allocation are correctly reflected in the system.',
      'Initiate a configuration update (adding a new sub-team, updating a department name) ahead of a planned reorganization.',
    ],
    executive: [
      'Review all departments in my division to assess structure, staffing levels, and alignment with strategic goals.',
    ],
    'hr-admin': [
      'Create, rename, or reconfigure department definitions as part of a company-wide organizational restructure.',
      'Audit department assignments across all employees to identify miscategorized records.',
      'Set department-level approval chains, compliance requirements, and reporting relationships.',
    ],
  },

  '/people/teams': {
    manager: [
      'View the cross-functional or project teams my direct reports belong to alongside their formal reporting relationship.',
      'Add or update team memberships when project assignments change to keep data current.',
    ],
    'dept-head': [
      'Review cross-functional teams within my department to understand informal collaboration structures alongside the formal org.',
      'Audit team memberships to ensure they reflect current project assignments and are not stale.',
    ],
    'hr-admin': [
      'Create and manage team structures that don\'t map to formal reporting lines (project teams, working groups, ERGs).',
      'Audit team membership data to ensure it reflects current project and committee assignments.',
    ],
  },

  '/people/directory': {
    employee: [
      'Find a specific colleague\'s email, phone number, or Slack handle to get in touch.',
      'Browse the directory filtered by department or office location to understand who does what across the company.',
    ],
    manager: [
      'Look up a direct report\'s or colleague\'s contact and role information before reaching out.',
      'Search by skill, department, or title to identify who to involve in a project or escalation.',
    ],
    'dept-head': [
      'Search directory records across my department to verify that roles, titles, and reporting relationships are accurate.',
      'Search by skill or competency to identify experience gaps across the department.',
    ],
    executive: [
      'Look up a specific leader\'s role and reporting relationship quickly without navigating the org chart.',
      'Browse to identify structural gaps in the org (e.g., no head of a key function) during planning.',
    ],
    'hr-admin': [
      'Find and open an employee record to make a correction, add a note, or initiate a lifecycle action.',
      'Verify that employee data (titles, departments, cost centers) is accurate across the directory.',
      'Filter the directory by employment status to identify employees in a specific state (e.g., on leave, in probation).',
    ],
    'it-admin': [
      'Find an employee record to look up their assigned devices, access groups, or IT provisioning status.',
      'Identify recently onboarded or departing employees to trigger provisioning or deprovisioning workflows.',
    ],
    'finance-admin': [
      'Look up an employee to verify their cost center, department, or approval authority.',
      'Identify employees with pending expense or reimbursement issues by cross-referencing their profile.',
    ],
    'workplace-admin': [
      'Find an employee to verify or update their desk assignment and office location.',
      'Browse employees by office location to plan space utilization.',
    ],
  },

  '/people/org-chart': {
    employee: [
      'Understand the company\'s reporting hierarchy and find where a colleague sits in the structure.',
      'Identify who to escalate to or loop in on a project by tracing the reporting chain.',
    ],
    manager: [
      'Review the reporting structure of my team and confirm the hierarchy reflects current assignments.',
      'Trace the chain of command above me or among my peer group for organizational context.',
    ],
    'dept-head': [
      'Review the full reporting structure of my department — sub-managers, team leads, and spans of control — and confirm it reflects current reality.',
      'Identify structural gaps or imbalances (e.g., a sub-manager with too many direct reports) during org planning.',
      'Visualize how my department sits within the broader division for an executive presentation.',
    ],
    executive: [
      'Review division-level org structure to assess spans of control, leadership gaps, and org design during planning cycles.',
      'Verify that a recently announced org change or reorganization has been accurately reflected in the system.',
    ],
    'hr-admin': [
      'Audit the org chart for data accuracy (orphaned employees, incorrect manager assignments) and correct errors.',
      'Use the chart to model reporting structure changes ahead of a reorganization.',
      'Export or share the org chart with leadership for a workforce planning discussion.',
    ],
    'it-admin': [
      'Trace reporting relationships to determine appropriate access group membership or IT permissions for a role.',
    ],
    'finance-admin': [
      'Review org structure to verify the cost center hierarchy and approval chain for budget submissions.',
    ],
    'workplace-admin': [
      'Use the org chart to understand team structures and plan physical space allocation by department.',
    ],
  },

  '/people/onboarding': {
    employee: [
      'Complete my new-hire onboarding tasks (documents, setup steps, policy acknowledgments) from a structured checklist so nothing gets missed.',
      'Access onboarding resources (team introduction, benefits explainer, company handbook) to get up to speed quickly.',
    ],
    manager: [
      'Monitor my new hire\'s onboarding task completion to catch anything they\'ve missed and follow up before it creates a delay.',
      'Complete my own manager-side onboarding tasks for a new direct report (set initial goals, introduce team norms, schedule first 1:1).',
    ],
    'dept-head': [
      'Track onboarding completion rates across all active new hires in my department to ensure a consistent, quality experience.',
      'Identify new hires who are falling behind on onboarding milestones so the relevant sub-manager can intervene.',
    ],
    'hr-admin': [
      'Configure onboarding task templates by role, department, or location so that new-hire flows are automated and consistent.',
      'Monitor onboarding completion across all active new hires and intervene when tasks are blocked or overdue.',
      'Update onboarding content (task descriptions, welcome documents, policy links) after a process or policy change.',
    ],
    'it-admin': [
      'Receive and complete provisioning tasks (accounts, devices, access) so the new hire can work on day one.',
      'Standardize onboarding device and access requests so IT work is predictable and secure.',
    ],
    'finance-admin': [
      'Set up finance-related onboarding needs (card access, reimbursements setup) so the employee can operate immediately.',
      'Confirm pay-related setup prerequisites are met before the first payroll run.',
    ],
    'workplace-admin': [
      'Prepare workplace logistics (desk assignment, badge, space access) so the new hire\'s first day is smooth.',
      'Coordinate facilities setup tasks triggered by onboarding workflows.',
    ],
  },

  '/people/offboarding': {
    employee: [
      'Complete required exit steps (return items, confirm addresses, final documents) so my departure is clean.',
      'Access final documents (pay history, tax forms, benefits info) so I\'m prepared after separation.',
    ],
    manager: [
      'Complete my manager-side offboarding tasks for a departing direct report (knowledge transfer, documentation handoff, final performance note).',
      'Verify that the departing employee\'s tasks are on track and the team transition is being handled without gaps.',
    ],
    'dept-head': [
      'Monitor departures from my department and confirm offboarding processes are on track and no critical knowledge is being lost.',
    ],
    'hr-admin': [
      'Initiate the offboarding checklist for a departing employee and ensure all tasks (access revocation, equipment return, final pay, exit survey) are tracked and completed on time.',
      'Monitor offboarding task completion across all active departures to prevent compliance or security gaps.',
      'Run a post-offboarding audit to confirm that all system access was revoked and required documents were signed.',
    ],
    'it-admin': [
      'Track and complete IT-specific offboarding tasks (device return, access deprovisioning, account closure) and confirm completion before the last day.',
      'Receive and act on offboarding triggers to revoke system access promptly across all integrated platforms.',
    ],
    'finance-admin': [
      'Ensure final pay, reimbursements, and deductions are handled correctly for departing employees.',
      'Coordinate invoice and spend closure for the departing employee (cards, pending expense reports).',
    ],
    'workplace-admin': [
      'Coordinate space, badge, keys, and facilities tasks so access is removed and space is reclaimed promptly.',
      'Track physical asset returns and handoffs.',
    ],
  },

  '/people/documents': {
    employee: [
      'Find and download my personal employment documents (offer letter, promotion letter, signed agreements) for my own records.',
      'Review and e-sign a document that HR has sent me (updated policy, new agreement).',
    ],
    manager: [
      'Access HR document templates I need to complete a workflow (a PIP template or updated job description).',
      'Verify that a specific direct report has signed a required compliance document.',
    ],
    'dept-head': [
      'Confirm that all employees in my department have completed document signing for a critical policy update.',
      'Access department-level HR documents (org charts, headcount summaries) for planning or reporting purposes.',
    ],
    'hr-admin': [
      'Upload, configure, and track e-signature completion for company-wide document distributions (handbooks, NDAs, policy updates).',
      'Audit employee document records to confirm that all required documents are present, signed, and filed correctly.',
      'Organize the document library with templates and folder structures for each lifecycle stage.',
    ],
    'it-admin': [
      'Confirm that departing employees have signed data security and acceptable use agreements before offboarding is finalized.',
    ],
  },

  '/people/compliance': {
    employee: [
      'Complete mandatory regulatory training or acknowledge updated company policies before the deadline.',
      'Confirm I\'ve submitted required documents when prompted by HR or a workflow notification.',
    ],
    manager: [
      'See which of my direct reports have overdue compliance items (unsigned handbook, incomplete training) so I can follow up directly.',
      'Confirm onboarding compliance steps are completed for new hires so they can start safely and legally.',
    ],
    'dept-head': [
      'Monitor compliance completion rates across my entire department and identify teams that are falling behind.',
      'Escalate specific compliance gaps to the relevant sub-manager and track their resolution.',
    ],
    executive: [
      'Review division-level compliance completion rates to confirm the org is within acceptable thresholds before a board or audit meeting.',
    ],
    'hr-admin': [
      'Identify employees with expiring or missing compliance items (I-9 verification, signed policies, required certifications) and take action before deadlines.',
      'Run a company-wide compliance audit to prepare for an internal review or external regulatory inspection.',
      'Configure compliance requirements, deadlines, and notification rules by employee type, location, or department.',
    ],
    'it-admin': [
      'Monitor identity and security-related compliance tasks (access reviews, provisioning rules) tied to people changes.',
    ],
    'finance-admin': [
      'Support compliance evidence tied to payroll and benefits when audits request it.',
    ],
    'workplace-admin': [
      'Ensure safety and facility compliance tasks are completed (training, acknowledgements) for in-office work.',
    ],
  },

  // ── Hiring Hub + T2s ────────────────────────────────────────────────

  '/hiring': {
    manager: [
      'Check the status of all open roles on my team and see at a glance where candidates are in the pipeline.',
      'Get a quick summary of which interviews are scheduled this week and which candidates I owe feedback on.',
      'Review all open requisitions on my team and confirm that job descriptions and hiring criteria are accurate before sourcing begins.',
      'Submit a headcount request or open a requisition for a backfill or net-new role on my team.',
    ],
    'dept-head': [
      'Review the hiring pipeline for all open roles in my department and assess whether we are on track to fill approved headcount.',
      'Identify pipeline bottlenecks (roles stuck in offer stage, slow interview feedback) and intervene.',
      'Review all open requisitions across my department and prioritize which roles to fill first based on business impact.',
      'Approve or submit headcount requests for new roles and confirm they are aligned with the department budget.',
      'Identify open roles that have been unfilled longer than expected and escalate to HR or recruiting.',
    ],
    executive: [
      'Review the hiring pipeline for my division to assess headcount plan execution and time-to-fill trends.',
      'Check the status of critical senior or executive hires that require my visibility or involvement.',
      'Review open headcount across my division and confirm alignment with the approved headcount plan.',
      'Identify critical roles at director level or above that need executive visibility or direct involvement.',
    ],
    'hr-admin': [
      'Triage the full hiring operation — open requisitions, pipeline health, pending offers, interview scheduling gaps — from a single hub.',
      'Identify open roles that are at risk due to an aging pipeline or lack of recent activity and take corrective action.',
      'Open, configure, and publish new job requisitions with the correct details (approvals, hiring team, job description, compensation band).',
      'Audit open requisitions for completeness and accuracy across all departments.',
      'Archive or close roles that have been filled, cancelled, or put on hold.',
    ],
  },

  '/hiring/job-openings': {
    manager: [
      'Review all open requisitions on my team and confirm that job descriptions and hiring criteria are accurate before sourcing begins.',
      'Submit a headcount request or open a requisition for a backfill or net-new role on my team.',
    ],
    'dept-head': [
      'Review all open requisitions across my department and prioritize which roles to fill first based on business impact.',
      'Approve or submit headcount requests for new roles and confirm they are aligned with the department budget.',
      'Identify open roles that have been unfilled longer than expected and escalate to HR or recruiting.',
    ],
    executive: [
      'Review open headcount across my division and confirm alignment with the approved headcount plan.',
      'Identify critical roles at director level or above that need executive visibility or direct involvement.',
    ],
    'hr-admin': [
      'Open, configure, and publish new job requisitions with the correct details (approvals, hiring team, job description, compensation band).',
      'Audit open requisitions for completeness and accuracy across all departments.',
      'Archive or close roles that have been filled, cancelled, or put on hold.',
    ],
  },

  '/hiring/candidates': {
    manager: [
      'Review candidates in my team\'s pipeline — their application, background, and current stage — and decide who to advance or decline.',
      'Leave structured evaluation notes after a candidate conversation so the hiring team has timely, consistent context.',
    ],
    'dept-head': [
      'Review the candidate pool for key roles in my department and confirm the quality bar is being met.',
      'Provide substantive input on senior role candidates before an offer decision is made.',
    ],
    executive: [
      'Review a shortlist of finalists for a senior or executive role and provide sign-off before an offer is extended.',
    ],
    'hr-admin': [
      'Manage all candidates across every open role — advance stages, update statuses, and ensure no candidate falls through the cracks.',
      'Identify duplicate candidate records or data quality issues in the pipeline that need cleanup.',
    ],
  },

  '/hiring/talent-pools': {
    manager: [
      'Check whether there are pre-qualified candidates in a talent pool before approving an external posting for a new role on my team.',
    ],
    'dept-head': [
      'Review the talent pool for critical recurring roles in my department (e.g., an engineering lead pipeline) as part of succession planning.',
    ],
    'hr-admin': [
      'Add strong candidates who were not selected for a current role to a talent pool for future consideration.',
      'Search talent pools when a new requisition opens to quickly surface pre-qualified candidates before going to market.',
      'Manage and curate talent pools by role type, department, or skill to keep them fresh and actionable.',
    ],
  },

  '/hiring/careers-site': {
    'hr-admin': [
      'Review the careers site to confirm that active job postings are displaying correctly and all content is up to date.',
      'Update careers site copy, culture content, or featured role highlights to reflect current company priorities.',
      'Align careers site branding with the company\'s current employer brand guidelines after a refresh.',
    ],
    executive: [
      'Validate employer brand presence and messaging for strategic hiring moments (growth phases, new initiatives).',
    ],
  },

  '/hiring/job-postings': {
    'hr-admin': [
      'Publish a new job posting to the careers site and selected external job boards (LinkedIn, Indeed, etc.) in a single action.',
      'Update or take down a posting when a role is filled, put on hold, or cancelled.',
      'Audit all active postings to confirm they are current, accurate, and appearing on the intended channels.',
    ],
  },

  '/hiring/interviews': {
    manager: [
      'View my interview schedule for the week, including the candidate, role, and competency I am assessing.',
      'Submit structured scorecard feedback immediately after an interview so the hiring team can make timely decisions.',
    ],
    'dept-head': [
      'Review interview feedback summaries for senior roles in my department and confirm evaluations are consistent across interviewers.',
    ],
    'hr-admin': [
      'Configure interview templates, scorecards, and feedback forms for each role to ensure structured, consistent evaluations.',
      'Monitor scorecard completion rates and follow up with interviewers who have not submitted feedback.',
      'Review the interview schedule across all active roles to identify scheduling bottlenecks.',
    ],
  },

  '/hiring/offers': {
    manager: [
      'Review and approve a draft offer for a candidate on my team, confirming the title, compensation, and start date before it is sent.',
    ],
    'dept-head': [
      'Review and approve offers for roles in my department, confirming compensation is within band and aligned with budget.',
      'Track which offers are outstanding and intervene if there is a risk of a declined offer impacting a critical fill.',
    ],
    executive: [
      'Review and approve senior-level offers that exceed a compensation threshold or require division-head sign-off.',
    ],
    'hr-admin': [
      'Generate, customize, and send offer letters with the correct compensation, title, start date, and legal language.',
      'Track offer statuses and follow up on outstanding or expiring offers to prevent candidate drop-off.',
      'Record an offer acceptance or decline and trigger the correct downstream workflow (onboarding checklist or pipeline reactivation).',
    ],
  },

  '/hiring/analytics': {
    'dept-head': [
      'Review time-to-fill and pipeline conversion rates for my department to identify where the hiring process is losing candidates.',
      'Compare hiring velocity across different roles or sub-teams within my department.',
    ],
    executive: [
      'Monitor division-level recruiting metrics (time-to-fill, offer acceptance rate, source quality, diversity pipeline) to assess hiring health.',
      'Identify which departments are struggling to fill roles and may need additional recruiting resources.',
    ],
    'hr-admin': [
      'Analyze hiring funnel data to identify where candidates are dropping off and optimize sourcing or interview stage design.',
      'Report on recruiting activity and outcomes for a leadership review (roles filled, time-to-hire, source mix, diversity data).',
      'Track recruiter workload and requisition distribution across the recruiting team.',
    ],
  },

  // ── Onboarding Hub + T2s ──────────────────────────────────────────

  '/onboarding': {
    employee: [
      'Complete my new-hire onboarding tasks (documents, setup steps, policy acknowledgments) from a structured checklist so nothing gets missed.',
      'Access onboarding resources (team introduction, benefits explainer, company handbook) to get up to speed quickly.',
    ],
    manager: [
      'Monitor my new hire\'s onboarding task completion to catch anything they\'ve missed and follow up before it creates a delay.',
      'Complete my own manager-side onboarding tasks for a new direct report (set initial goals, introduce team norms, schedule first 1:1).',
    ],
    'dept-head': [
      'Track onboarding completion rates across all active new hires in my department to ensure a consistent, quality experience.',
      'Identify new hires who are falling behind on onboarding milestones so the relevant sub-manager can intervene.',
    ],
    'hr-admin': [
      'Configure onboarding task templates by role, department, or location so that new-hire flows are automated and consistent.',
      'Monitor onboarding completion across all active new hires and intervene when tasks are blocked or overdue.',
      'Update onboarding content (task descriptions, welcome documents, policy links) after a process or policy change.',
    ],
    'it-admin': [
      'Receive and complete provisioning tasks (accounts, devices, access) so the new hire can work on day one.',
      'Standardize onboarding device and access requests so IT work is predictable and secure.',
    ],
    'finance-admin': [
      'Set up finance-related onboarding needs (card access, reimbursements setup) so the employee can operate immediately.',
      'Confirm pay-related setup prerequisites are met before the first payroll run.',
    ],
    'workplace-admin': [
      'Prepare workplace logistics (desk assignment, badge, space access) so the new hire\'s first day is smooth.',
      'Coordinate facilities setup tasks triggered by onboarding workflows.',
    ],
  },

  '/onboarding/active': {
    employee: [
      'Complete my new-hire onboarding tasks (documents, setup steps, policy acknowledgments) from a structured checklist so nothing gets missed.',
      'Access onboarding resources (team introduction, benefits explainer, company handbook) to get up to speed quickly.',
    ],
    manager: [
      'Monitor my new hire\'s onboarding task completion to catch anything they\'ve missed and follow up before it creates a delay.',
      'Complete my own manager-side onboarding tasks for a new direct report (set initial goals, introduce team norms, schedule first 1:1).',
    ],
    'dept-head': [
      'Track onboarding completion rates across all active new hires in my department to ensure a consistent, quality experience.',
      'Identify new hires who are falling behind on onboarding milestones so the relevant sub-manager can intervene.',
    ],
    'hr-admin': [
      'Monitor onboarding completion across all active new hires and intervene when tasks are blocked or overdue.',
    ],
  },

  '/onboarding/task-templates': {
    'hr-admin': [
      'Configure onboarding task templates by role, department, or location so that new-hire flows are automated and consistent.',
      'Update onboarding content (task descriptions, welcome documents, policy links) after a process or policy change.',
    ],
  },

  '/onboarding/new-hire-packets': {
    'hr-admin': [
      'Configure onboarding task templates by role, department, or location so that new-hire flows are automated and consistent.',
      'Update onboarding content (task descriptions, welcome documents, policy links) after a process or policy change.',
    ],
  },

  '/offboarding': {
    employee: [
      'Complete required exit steps (return items, confirm addresses, final documents) so my departure is clean.',
      'Access final documents (pay history, tax forms, benefits info) so I\'m prepared after separation.',
    ],
    manager: [
      'Complete my manager-side offboarding tasks for a departing direct report (knowledge transfer, documentation handoff, final performance note).',
      'Verify that the departing employee\'s tasks are on track and the team transition is being handled without gaps.',
    ],
    'dept-head': [
      'Monitor departures from my department and confirm offboarding processes are on track and no critical knowledge is being lost.',
    ],
    'hr-admin': [
      'Initiate the offboarding checklist for a departing employee and ensure all tasks (access revocation, equipment return, final pay, exit survey) are tracked and completed on time.',
      'Monitor offboarding task completion across all active departures to prevent compliance or security gaps.',
      'Run a post-offboarding audit to confirm that all system access was revoked and required documents were signed.',
    ],
    'it-admin': [
      'Track and complete IT-specific offboarding tasks (device return, access deprovisioning, account closure) and confirm completion before the last day.',
      'Receive and act on offboarding triggers to revoke system access promptly across all integrated platforms.',
    ],
    'finance-admin': [
      'Ensure final pay, reimbursements, and deductions are handled correctly for departing employees.',
      'Coordinate invoice and spend closure for the departing employee (cards, pending expense reports).',
    ],
    'workplace-admin': [
      'Coordinate space, badge, keys, and facilities tasks so access is removed and space is reclaimed promptly.',
      'Track physical asset returns and handoffs.',
    ],
  },

  // ── Payroll Hub + T2s ───────────────────────────────────────────────

  '/payroll': {
    'hr-admin': [
      'Check the status of the upcoming payroll run — flags, pending approvals, and data exceptions — before processing.',
      'Identify payroll exceptions (new hires missing bank info, terminated employees, hours discrepancies) and resolve them before the run closes.',
      'Monitor compliance deadlines (quarterly tax filings, garnishment processing) so nothing is missed between pay cycles.',
      'Process the regular payroll run for all active employees — review exceptions, confirm totals, and submit for funding.',
      'Resolve flagged exceptions (missing hours, incorrect deductions, new-hire setup errors) before finalizing the run.',
      'Re-run or issue a correction after identifying an error in a recently completed payroll.',
    ],
    'finance-admin': [
      'Review payroll cost summaries and compare against budget to identify variances before the run is finalized.',
      'Confirm that payroll expense data has synced correctly to the general ledger after a run completes.',
      'Review payroll totals and anomalies before completion so financial controls hold.',
      'Coordinate funding and accounting entries tied to the payroll run.',
    ],
    executive: [
      'View total payroll cost for my division by period and flag unexpected variances from plan.',
    ],
  },

  '/payroll/run': {
    'hr-admin': [
      'Process the regular payroll run for all active employees — review exceptions, confirm totals, and submit for funding.',
      'Resolve flagged exceptions (missing hours, incorrect deductions, new-hire setup errors) before finalizing the run.',
      'Re-run or issue a correction after identifying an error in a recently completed payroll.',
    ],
    'finance-admin': [
      'Review payroll totals and anomalies before completion so financial controls hold.',
      'Coordinate funding and accounting entries tied to the payroll run.',
    ],
  },

  '/payroll/pay-calendar': {
    employee: [
      'Check when my next paycheck is scheduled to deposit so I can plan personal finances.',
      'Confirm the cutoff date for a time-sensitive payroll change (updated direct deposit, new address).',
    ],
    manager: [
      'Reference the pay calendar to know when the timesheet approval deadline falls so I can remind my team to submit on time.',
    ],
    'hr-admin': [
      'Review upcoming pay dates and processing deadlines to plan the payroll execution schedule.',
      'Update the pay calendar for a new fiscal year or to account for a holiday-adjusted pay date.',
    ],
    'finance-admin': [
      'Reference the pay calendar to align payroll expense accruals with the accounting close schedule.',
    ],
  },

  '/payroll/history': {
    employee: [
      'Download a specific past pay stub for a mortgage application, rental verification, or personal tax records.',
    ],
    manager: [
      'Verify a direct report\'s historical pay record when preparing for a compensation conversation or investigating a reported discrepancy.',
    ],
    'hr-admin': [
      'Pull a historical payroll record to investigate a discrepancy reported by an employee or surfaced in an audit.',
      'Export historical payroll data for an internal audit or external compliance review.',
    ],
    'finance-admin': [
      'Pull payroll history to reconcile against GL entries and identify any unrecorded adjustments.',
      'Export payroll history for a year-end tax or audit process.',
    ],
  },

  '/payroll/off-cycle': {
    'hr-admin': [
      'Run an off-cycle payroll for a terminated employee to ensure their final paycheck is issued on time and in compliance with state law.',
      'Process an off-cycle payment for a bonus, commission, or payroll correction that cannot wait for the next regular run.',
    ],
    'finance-admin': [
      'Approve or reconcile off-cycle runs so accounting remains accurate.',
    ],
  },

  '/payroll/tax-filing': {
    'hr-admin': [
      'Review and submit quarterly payroll tax filings (Form 941, state equivalents) to ensure they are accurate and on time.',
      'Distribute W-2s to all employees at year-end and verify data accuracy before distribution.',
      'Investigate and resolve a tax notice or discrepancy from a taxing authority.',
    ],
    'finance-admin': [
      'Verify that payroll tax liabilities are accurately reflected in the GL before the quarterly financial close.',
    ],
  },

  '/payroll/deductions': {
    'hr-admin': [
      'Configure or update recurring deductions for a specific employee (benefits premium change, 401k adjustment, garnishment).',
      'Add or remove a one-time deduction for a specific pay period (loan repayment, benefit correction, overpayment recovery).',
      'Audit deduction assignments across all employees after an open enrollment cycle to confirm accuracy.',
    ],
    'finance-admin': [
      'Review deduction summaries to reconcile benefits costs against carrier invoices and general ledger entries.',
    ],
  },

  '/payroll/contractors': {
    'hr-admin': [
      'Add a new contractor to the payment system and confirm their W-9 and payment details are on file before processing.',
      'Process contractor payments for the correct amounts in the correct pay period.',
      'Generate and distribute 1099s to all contractors at year-end.',
    ],
    'finance-admin': [
      'Review contractor payment history and reconcile it against AP records and the department budget.',
    ],
  },

  '/payroll/reports': {
    'hr-admin': [
      'Run a payroll summary report to share total compensation costs with Finance for the monthly close.',
      'Pull a detailed payroll register to audit specific line items after a run completes.',
      'Generate a payroll report for a defined period to support an audit or regulatory inquiry.',
    ],
    'finance-admin': [
      'Run payroll cost reports segmented by department or cost center for budget variance analysis.',
      'Export payroll data to map into the financial model or GL reconciliation.',
    ],
    executive: [
      'Review total compensation cost by department or division for a quarterly business review.',
    ],
  },

  // ── Benefits Hub + T2s ──────────────────────────────────────────────

  '/benefits': {
    employee: [
      'Check my current benefits enrollment status and confirm which plans are active before a medical appointment or life event.',
      'Navigate to open enrollment to make or update my benefit elections during the active window.',
      'Complete my benefit elections during open enrollment — selecting health, dental, vision, and supplemental plans — before the deadline.',
      'Make a qualifying life event change to my benefits (adding a dependent after a birth or marriage) within the QLE window.',
      'Review and save a summary of my confirmed benefit elections for my personal records.',
    ],
    manager: [
      'Quickly verify whether a direct report\'s benefits enrollment is complete, especially during their first 30 days.',
      'Navigate to open enrollment for my own self-service benefit elections.',
      'Complete my own benefit elections during open enrollment.',
      'Confirm that a new direct report has completed initial benefits enrollment within their eligibility window.',
    ],
    'dept-head': [
      'Review benefits enrollment completion rates across my department to ensure no employees miss coverage during open enrollment.',
    ],
    'hr-admin': [
      'Monitor enrollment progress during open enrollment in real time and identify employees who have not yet started.',
      'Triage outstanding carrier, ACA, or COBRA issues and navigate to the relevant module for resolution.',
      'Navigate quickly to the specific benefits sub-module (Enrollment, ACA, COBRA) that has the highest number of open items.',
      'Monitor enrollment completion in real time during open enrollment and send targeted reminders to employees who have not yet started.',
      'Process a qualifying life event change for an employee who has submitted supporting documentation outside of open enrollment.',
      'Close the enrollment window and submit final election data to carriers.',
    ],
    'finance-admin': [
      'Review the benefits cost summary and identify any variances from expected plan spend.',
    ],
  },

  '/benefits/plans': {
    'hr-admin': [
      'Configure or update benefit plan details (plan names, coverage tiers, eligibility rules, employee contribution rates) before open enrollment opens.',
      'Add a new benefit plan after a carrier negotiation or to meet a new regulatory requirement.',
      'Audit active benefit plan configurations to confirm all eligible employees are in the correct tiers.',
    ],
    'finance-admin': [
      'Review benefit plan cost structures and employer vs. employee contribution splits to update the compensation model.',
      'Confirm that plan costs match carrier invoices for monthly benefits expense reconciliation.',
    ],
  },

  '/benefits/enrollment': {
    employee: [
      'Complete my benefit elections during open enrollment — selecting health, dental, vision, and supplemental plans — before the deadline.',
      'Make a qualifying life event change to my benefits (adding a dependent after a birth or marriage) within the QLE window.',
      'Review and save a summary of my confirmed benefit elections for my personal records.',
    ],
    manager: [
      'Complete my own benefit elections during open enrollment.',
      'Confirm that a new direct report has completed initial benefits enrollment within their eligibility window.',
    ],
    'hr-admin': [
      'Monitor enrollment completion in real time during open enrollment and send targeted reminders to employees who have not yet started.',
      'Process a qualifying life event change for an employee who has submitted supporting documentation outside of open enrollment.',
      'Close the enrollment window and submit final election data to carriers.',
    ],
  },

  '/benefits/carriers': {
    'hr-admin': [
      'Review and reconcile the carrier invoice against active enrollment records to identify discrepancies before authorizing payment.',
      'Update carrier connection settings and EDI file configurations after a plan year renewal or carrier change.',
      'Investigate and resolve a data sync error between the platform and a carrier\'s EDI feed.',
    ],
    'finance-admin': [
      'Review carrier invoice amounts and compare against budgeted benefits costs before approving payment.',
    ],
  },

  '/benefits/cobra': {
    'hr-admin': [
      'Initiate the required COBRA notification for a terminated employee within the federally mandated timeframe.',
      'Track COBRA enrollment status and premium payments for all former employees currently on continuation coverage.',
      'Audit COBRA records to confirm all required notices have been sent and no deadlines have been missed.',
    ],
  },

  '/benefits/aca': {
    'hr-admin': [
      'Run an ACA eligibility audit to identify employees approaching the full-time threshold who may need a coverage offer.',
      'Generate and review 1095-C forms for all eligible employees before the IRS filing deadline.',
      'Correct ACA coding errors identified during review before submitting to the IRS to avoid penalties.',
    ],
  },

  '/benefits/reports': {
    'hr-admin': [
      'Run a benefits cost report by plan type and department to share with Finance for budgeting and accrual purposes.',
      'Pull an enrollment summary to verify that all eligible employees are enrolled in the correct plans before a carrier submission.',
      'Generate an ACA measurement period report to determine full-time equivalent status for compliance purposes.',
    ],
    'finance-admin': [
      'Pull a benefits cost report segmented by department or cost center for budget variance analysis.',
      'Export benefits data to reconcile against carrier invoices and general ledger accounts.',
    ],
  },

  // ── Performance Hub + T2s ─────────────────────────────────────────

  '/performance': {
    employee: [
      'View my current performance ratings and historical review outcomes to understand how I am being assessed over time.',
      'Update my self-assessment or add performance notes ahead of a review cycle deadline.',
    ],
    manager: [
      'Review my direct reports\' current performance ratings and identify who is an outlier — high or low — before the calibration discussion.',
      'Complete written performance assessments for each of my direct reports before the review cycle submission deadline.',
      'Identify patterns in my team\'s performance data that suggest a coaching opportunity or systemic team issue.',
    ],
    'dept-head': [
      'Review the performance rating distribution across my department and confirm it is aligned with calibration guidelines before the discussion.',
      'Compare performance trends across sub-teams to identify which managers are driving the strongest or weakest results.',
    ],
    executive: [
      'View the performance rating distribution across my division and confirm it falls within company calibration parameters.',
      'Identify the highest-performing individuals in my division for recognition, accelerated development, or promotion consideration.',
    ],
    'hr-admin': [
      'Configure the performance framework (rating scales, competencies, weighting, visibility rules) for a new review cycle.',
      'Monitor performance assessment completion rates and escalate to managers who are significantly overdue.',
      'Export final performance data for use in compensation planning and talent review discussions.',
    ],
  },

  '/performance/goals': {
    employee: [
      'Review my active goals and update milestone progress to reflect current status before a check-in or review.',
      'Create or revise goals at the start of a planning cycle based on my manager\'s guidance and team OKRs.',
      'Verify that my goals are correctly cascaded from the team or department objectives.',
    ],
    manager: [
      'Review my direct reports\' goal progress and identify who is at risk of missing a target before the cycle ends.',
      'Approve or provide feedback on a new direct report\'s goal submission to confirm alignment with team priorities.',
      'Update my own team-level goals to reflect a strategy change and trigger cascading updates for my reports.',
    ],
    'dept-head': [
      'Review goal completion rates and alignment scores across my department before an OKR review meeting.',
      'Identify employees or teams with goals that are not cascaded from department priorities and follow up.',
      'Update department-level goals after a strategy shift and confirm cascading has propagated correctly.',
    ],
    executive: [
      'Review division-level OKR progress before a quarterly business review to prepare my update for the leadership team.',
      'Confirm that department-level goals across my division are properly cascaded from company strategy.',
    ],
    'hr-admin': [
      'Configure goal cycle settings (timelines, cascading rules, visibility permissions, check-in frequency) for the upcoming planning cycle.',
      'Monitor goal adoption rates across the company and identify departments where participation is low.',
    ],
  },

  '/performance/reviews': {
    employee: [
      'Complete my self-review form ahead of the submission deadline so my perspective is included in the formal record.',
      'Read my completed and published performance review after my manager has shared it.',
    ],
    manager: [
      'Write and submit performance reviews for each of my direct reports before the cycle deadline.',
      'Calibrate and finalize ratings for my team after receiving guidance from my department head.',
      'Deliver a completed review to a direct report in a documented conversation.',
    ],
    'dept-head': [
      'Review all written reviews across my department for quality and consistency before they are published to employees.',
      'Facilitate rating calibration by reviewing the distribution across my sub-managers and adjusting outliers.',
      'Approve final ratings for all employees in my department before they are shared.',
    ],
    executive: [
      'Review the final rating distribution across my division to confirm it is consistent with company calibration guidelines.',
      'Approve exceptional review outcomes (top ratings, PIPs, out-of-cycle promotions) that require division-head sign-off.',
    ],
    'hr-admin': [
      'Launch a new review cycle — configure the template, timeline, participant rules, rating scale, and visibility settings.',
      'Monitor cycle completion rates across managers and send reminders to those who are overdue.',
      'Export final review data for use in compensation planning, calibration sessions, and talent discussions.',
    ],
  },

  '/performance/feedback': {
    employee: [
      'Write and submit feedback for a colleague when I receive a peer feedback request during a review cycle.',
      'Request peer feedback from selected colleagues before an upcoming review to build a well-rounded picture.',
      'Review feedback I have received from peers and my manager to identify development themes.',
    ],
    manager: [
      'Give real-time recognition or constructive developmental feedback to a direct report outside of a formal review.',
      'Review the peer feedback my direct reports have received to supplement my own observations before writing reviews.',
      'Send targeted feedback requests to key stakeholders for a direct report who needs broader input.',
    ],
    'dept-head': [
      'Review aggregate feedback themes across my department to identify recurring strengths and development needs at scale.',
      'Verify that peer feedback participation rates are high enough across my department for review data to be meaningful.',
    ],
    'hr-admin': [
      'Configure feedback templates, request rules, and visibility settings (anonymous vs. attributed) for a new feedback cycle.',
      'Monitor feedback request and response rates to ensure the data quality is sufficient for the review cycle.',
    ],
  },

  '/performance/one-on-ones': {
    employee: [
      'Add talking points and status updates to my upcoming 1:1 agenda so my manager and I have a focused, efficient conversation.',
      'Review past 1:1 notes to track action items and follow through on commitments from previous meetings.',
    ],
    manager: [
      'Prepare for an upcoming 1:1 by reviewing the shared agenda, past notes, recent feedback, and goal updates before the meeting.',
      'Document key discussion points, decisions, and action items during or immediately after the 1:1 so they are tracked and visible.',
      'Review 1:1 activity across my whole team to ensure no direct report is being neglected or going without regular check-ins.',
    ],
    'dept-head': [
      'Use my own 1:1 notes with sub-managers to track commitments and follow up consistently.',
      'Review 1:1 meeting frequency and quality data across my sub-managers to confirm they are meeting regularly with their teams.',
    ],
    'hr-admin': [
      'Monitor 1:1 participation rates across the company and identify managers who are not using the tool with their teams.',
      'Configure 1:1 agenda templates and suggested questions as part of a manager effectiveness or new-manager development initiative.',
    ],
  },

  // ── Training Hub + T2s ────────────────────────────────────────────

  '/training': {
    employee: [
      'Complete an assigned training course before the deadline to satisfy a compliance requirement or onboarding milestone.',
      'Browse the learning catalog for courses aligned to skills I am developing based on recent feedback or career path goals.',
      'Review my completed training history to confirm I am current on all required certifications and compliance courses.',
    ],
    manager: [
      'Assign a specific course to a direct report following a development conversation or as a follow-up to a performance review.',
      'Monitor training completion rates across my team to ensure compliance-required courses are on track before a deadline.',
      'Search the catalog for content to recommend to a direct report working on a specific technical or behavioral skill.',
    ],
    'dept-head': [
      'Review learning completion rates across my department with a focus on mandatory compliance training.',
      'Identify sub-teams with low completion rates on required training and escalate to the relevant manager.',
    ],
    executive: [
      'Review division-level compliance training completion rates ahead of an audit or board report.',
    ],
    'hr-admin': [
      'Configure and launch a mandatory training campaign (harassment prevention, security awareness) with assigned employee groups, deadlines, and reminder schedules.',
      'Monitor training completion across the company and send targeted reminders to managers whose teams are behind.',
      'Add new courses to the learning catalog and assign them to the relevant employee groups.',
    ],
  },

  '/training/catalog': {
    employee: [
      'Browse the learning catalog for courses aligned to skills I am developing based on recent feedback or career path goals.',
    ],
    manager: [
      'Search the catalog for content to recommend to a direct report working on a specific technical or behavioral skill.',
    ],
    'hr-admin': [
      'Add new courses to the learning catalog and assign them to the relevant employee groups.',
    ],
  },

  '/training/assignments': {
    employee: [
      'Complete an assigned training course before the deadline to satisfy a compliance requirement or onboarding milestone.',
    ],
    manager: [
      'Assign a specific course to a direct report following a development conversation or as a follow-up to a performance review.',
      'Monitor training completion rates across my team to ensure compliance-required courses are on track before a deadline.',
    ],
    'dept-head': [
      'Review learning completion rates across my department with a focus on mandatory compliance training.',
      'Identify sub-teams with low completion rates on required training and escalate to the relevant manager.',
    ],
    'hr-admin': [
      'Configure and launch a mandatory training campaign (harassment prevention, security awareness) with assigned employee groups, deadlines, and reminder schedules.',
      'Monitor training completion across the company and send targeted reminders to managers whose teams are behind.',
    ],
  },

  '/training/certifications': {
    employee: [
      'Review my completed training history to confirm I am current on all required certifications and compliance courses.',
    ],
    manager: [
      'Monitor training completion rates across my team to ensure compliance-required courses are on track before a deadline.',
    ],
    'hr-admin': [
      'Monitor training completion across the company and send targeted reminders to managers whose teams are behind.',
    ],
  },

  // ── Compensation Hub + T2s ────────────────────────────────────────

  '/compensation': {
    employee: [
      'Understand my total rewards and compensation communications so I know the full value of my package.',
      'Review compensation-related updates when they occur so I can ask informed questions.',
    ],
    manager: [
      'Review my direct reports\' current compensation and flag anyone below the market midpoint or at risk of compression ahead of a merit cycle.',
      'Submit merit increase and promotion recommendations for my direct reports during the comp review cycle with supporting rationale.',
    ],
    'dept-head': [
      'Review the compensation distribution across my department and identify equity gaps, compression issues, or outliers before the cycle begins.',
      'Approve manager-submitted compensation change requests for my department within the allocated budget parameters.',
      'Monitor merit budget utilization for my department in real time during the allocation window.',
    ],
    executive: [
      'Review division-level compensation distribution against external market benchmarks to identify systemic equity or competitive issues.',
      'Approve executive-level or above-band compensation changes that require division-head authorization.',
    ],
    'hr-admin': [
      'Configure and launch the compensation review cycle — set merit budgets, define eligibility rules, configure merit matrices and proration logic.',
      'Monitor compensation change submissions during the cycle and flag anomalies or budget overages for review.',
      'Finalize and publish approved compensation changes after calibration is complete and leadership has signed off.',
    ],
    'finance-admin': [
      'Pull the approved workforce plan data to calculate labor cost projections and incorporate them into the financial model.',
      'Review headcount plan vs. actuals to update the labor cost forecast during a quarterly reforecast.',
    ],
  },

  '/compensation/benchmarks': {
    manager: [
      'Review my direct reports\' current compensation and flag anyone below the market midpoint or at risk of compression ahead of a merit cycle.',
    ],
    'dept-head': [
      'Review the compensation distribution across my department and identify equity gaps, compression issues, or outliers before the cycle begins.',
    ],
    executive: [
      'Review division-level compensation distribution against external market benchmarks to identify systemic equity or competitive issues.',
    ],
    'hr-admin': [
      'Monitor compensation change submissions during the cycle and flag anomalies or budget overages for review.',
    ],
  },

  '/compensation/levels-and-bands': {
    'hr-admin': [
      'Configure and launch the compensation review cycle — set merit budgets, define eligibility rules, configure merit matrices and proration logic.',
    ],
    'dept-head': [
      'Review the compensation distribution across my department and identify equity gaps, compression issues, or outliers before the cycle begins.',
    ],
  },

  '/compensation/planning': {
    manager: [
      'Submit merit increase and promotion recommendations for my direct reports during the comp review cycle with supporting rationale.',
    ],
    'dept-head': [
      'Approve manager-submitted compensation change requests for my department within the allocated budget parameters.',
      'Monitor merit budget utilization for my department in real time during the allocation window.',
    ],
    executive: [
      'Approve executive-level or above-band compensation changes that require division-head authorization.',
    ],
    'hr-admin': [
      'Configure and launch the compensation review cycle — set merit budgets, define eligibility rules, configure merit matrices and proration logic.',
      'Monitor compensation change submissions during the cycle and flag anomalies or budget overages for review.',
      'Finalize and publish approved compensation changes after calibration is complete and leadership has signed off.',
    ],
    'finance-admin': [
      'Pull the approved workforce plan data to calculate labor cost projections and incorporate them into the financial model.',
      'Review headcount plan vs. actuals to update the labor cost forecast during a quarterly reforecast.',
    ],
  },

  '/compensation/total-rewards': {
    employee: [
      'Understand my total rewards and compensation communications so I know the full value of my package.',
      'Review compensation-related updates when they occur so I can ask informed questions.',
    ],
  },

  // ── Culture Hub + T2s ───────────────────────────────────────────────

  '/culture': {
    employee: [
      'Check for recognition activity, community posts, or company announcements from my team or the broader org.',
      'Navigate to a specific Culture sub-module (Recognition, Surveys, Wellbeing) to act on a pending item.',
      'Read company announcements, team shout-outs, and culture content to stay connected to what is happening across the org.',
      'Post a personal milestone or team update in the community feed (work anniversary, project completion, new team member welcome).',
    ],
    manager: [
      'Scan for team engagement signals (recent recognitions given and received, survey response rate, wellbeing check-ins) to understand how the team is doing.',
      'Navigate to Surveys or Recognition to take action on a pending team engagement task.',
      'Post a team recognition or update for broader company visibility — acknowledging a win or a milestone.',
      'Check community activity from my team to gauge whether they are participating in company culture and feeling connected.',
    ],
    'dept-head': [
      'Review department-level culture health metrics (engagement survey scores, recognition participation rate, wellbeing indicators) before a people discussion.',
      'Navigate to a specific module to respond to a culture-related issue or recognize a department milestone.',
    ],
    executive: [
      'Review division-level engagement and culture metrics to inform a leadership team discussion on organizational health.',
      'Identify departments with significantly lower engagement scores that may need targeted intervention.',
    ],
    'hr-admin': [
      'Monitor company-wide culture program activity (survey completion rates, recognition volume, wellbeing participation) and identify programs losing traction.',
      'Navigate to a specific Culture sub-module to launch a new program or troubleshoot a configuration issue.',
      'Post a company-wide announcement or cultural moment (values highlight, charity campaign, all-hands recap).',
      'Moderate community content to maintain an inclusive and appropriate environment.',
      'Review post and reaction volume to assess platform adoption and community health over time.',
    ],
  },

  '/culture/community': {
    employee: [
      'Read company announcements, team shout-outs, and culture content to stay connected to what is happening across the org.',
      'Post a personal milestone or team update in the community feed (work anniversary, project completion, new team member welcome).',
    ],
    manager: [
      'Post a team recognition or update for broader company visibility — acknowledging a win or a milestone.',
      'Check community activity from my team to gauge whether they are participating in company culture and feeling connected.',
    ],
    executive: [
      'Communicate strategic priorities and recognize org-wide wins to drive alignment and reinforce values at scale.',
    ],
    'hr-admin': [
      'Post a company-wide announcement or cultural moment (values highlight, charity campaign, all-hands recap).',
      'Moderate community content to maintain an inclusive and appropriate environment.',
      'Review post and reaction volume to assess platform adoption and community health over time.',
    ],
  },

  '/culture/recognition': {
    employee: [
      'Send a recognition to a colleague for a specific contribution or behavior that reflects company values.',
      'View recognitions I have received to read the notes and feel connected to positive feedback from peers.',
    ],
    manager: [
      'Send a public recognition to a direct report highlighting a specific achievement for the team and broader org to see.',
      'Review recognitions received by my direct reports to stay aware of standout contributions and reinforce the behavior.',
      'Check whether I have recognized each direct report recently to ensure my recognition practice is equitable.',
    ],
    'dept-head': [
      'Review recognition activity across my department to identify highly engaged sub-teams and those with low participation.',
      'Post a department-wide recognition for a milestone, delivery, or exceptional team effort.',
    ],
    'hr-admin': [
      'Configure recognition templates, values-alignment tags, and category definitions to keep recognitions tied to company culture goals.',
      'Review recognition data to identify employees or departments with very low engagement in the program.',
    ],
  },

  '/culture/rewards': {
    employee: [
      'Redeem accumulated recognition points for a reward from the catalog.',
      'Check my current points balance and confirm whether any points are expiring soon.',
    ],
    manager: [
      'Nominate a direct report for a spot reward or bonus points allocation for exceptional performance or a one-time achievement.',
    ],
    'hr-admin': [
      'Configure and manage the rewards catalog — adding, updating, or removing reward options (gift cards, experiences, merchandise).',
      'Review rewards redemption activity to assess program budget utilization and ROI.',
      'Process a bulk reward distribution for a company-wide milestone or incentive campaign.',
    ],
    'finance-admin': [
      'Monitor rewards spend and policy compliance so program costs stay within budget.',
    ],
  },

  '/culture/wellbeing': {
    employee: [
      'Access or enroll in a wellbeing benefit or program (EAP, mental health resource, fitness stipend).',
      'Complete a wellbeing check-in or reflection prompt to track how I am feeling and identify relevant support resources.',
    ],
    manager: [
      'Review aggregate wellbeing check-in data for my team to identify whether stress or burnout indicators are elevated.',
      'Share a specific wellbeing resource or program with a direct report who may benefit from additional support.',
    ],
    'dept-head': [
      'Review department-level wellbeing trends and flag teams with elevated stress indicators to HR for proactive intervention.',
    ],
    'hr-admin': [
      'Configure wellbeing programs, benefit links, and resource content available to employees through the platform.',
      'Monitor wellbeing check-in completion rates and sentiment trends to identify emerging burnout risks before they escalate.',
      'Review EAP utilization data to assess whether the current wellbeing offering is meeting employee needs.',
    ],
  },

  '/culture/surveys': {
    employee: [
      'Complete an active survey (engagement pulse, manager effectiveness, onboarding check-in) before the response deadline.',
      'Review published survey results that my manager or HR has shared back with the team.',
    ],
    manager: [
      'Review survey results for my team, identify the key themes, and develop a concrete action plan.',
      'Share survey results and my action plan with my direct reports to close the feedback loop.',
      'Encourage survey participation so data is representative and useful for culture decisions.',
    ],
    'dept-head': [
      'Review engagement survey scores across my department broken down by sub-team to identify which areas have the lowest scores.',
      'Follow up with sub-managers whose teams have notably low or declining survey results.',
    ],
    executive: [
      'Review division-level engagement survey results and compare them against company benchmarks.',
      'Identify systemic themes (manager quality, workload, work-life balance) that appear across multiple teams in my division.',
    ],
    'hr-admin': [
      'Design, configure, and launch an engagement or pulse survey — set the question set, audience, frequency, and anonymity rules.',
      'Analyze survey results at a company level, segment by department and demographic, and prepare a summary for leadership.',
      'Follow up proactively with managers whose teams have actionably low scores and provide support resources.',
    ],
  },

  // ── Standalone culture T1s ────────────────────────────────────────

  '/employee-community': {
    employee: [
      'Read company announcements, team shout-outs, and culture content to stay connected to what is happening across the org.',
      'Post a personal milestone or team update in the community feed (work anniversary, project completion, new team member welcome).',
    ],
    manager: [
      'Post a team recognition or update for broader company visibility — acknowledging a win or a milestone.',
      'Check community activity from my team to gauge whether they are participating in company culture and feeling connected.',
    ],
    'hr-admin': [
      'Post a company-wide announcement or cultural moment (values highlight, charity campaign, all-hands recap).',
      'Moderate community content to maintain an inclusive and appropriate environment.',
      'Review post and reaction volume to assess platform adoption and community health over time.',
    ],
  },

  '/rewards-recognition': {
    employee: [
      'Send a recognition to a colleague for a specific contribution or behavior that reflects company values.',
      'View recognitions I have received to read the notes and feel connected to positive feedback from peers.',
      'Redeem accumulated recognition points for a reward from the catalog.',
      'Check my current points balance and confirm whether any points are expiring soon.',
    ],
    manager: [
      'Send a public recognition to a direct report highlighting a specific achievement for the team and broader org to see.',
      'Review recognitions received by my direct reports to stay aware of standout contributions and reinforce the behavior.',
      'Nominate a direct report for a spot reward or bonus points allocation for exceptional performance or a one-time achievement.',
    ],
    'hr-admin': [
      'Configure recognition templates, values-alignment tags, and category definitions to keep recognitions tied to company culture goals.',
      'Review recognition data to identify employees or departments with very low engagement in the program.',
      'Configure and manage the rewards catalog — adding, updating, or removing reward options (gift cards, experiences, merchandise).',
      'Review rewards redemption activity to assess program budget utilization and ROI.',
    ],
  },

  '/wellbeing': {
    employee: [
      'Access or enroll in a wellbeing benefit or program (EAP, mental health resource, fitness stipend).',
      'Complete a wellbeing check-in or reflection prompt to track how I am feeling and identify relevant support resources.',
    ],
    manager: [
      'Review aggregate wellbeing check-in data for my team to identify whether stress or burnout indicators are elevated.',
      'Share a specific wellbeing resource or program with a direct report who may benefit from additional support.',
    ],
    'hr-admin': [
      'Configure wellbeing programs, benefit links, and resource content available to employees through the platform.',
      'Monitor wellbeing check-in completion rates and sentiment trends to identify emerging burnout risks before they escalate.',
      'Review EAP utilization data to assess whether the current wellbeing offering is meeting employee needs.',
    ],
  },

  // ── Time & Attendance (legacy routes) ─────────────────────────────

  '/time-and-attendance': {
    employee: [
      'Check my current time-off balances (PTO, sick, other leave) to plan an upcoming vacation or personal day.',
      'Submit a time-off request and confirm it is pending manager approval.',
      'Navigate to submit my timesheet if my role requires time tracking.',
    ],
    manager: [
      'See a real-time summary of my team\'s time-off requests, approved absences, and upcoming coverage gaps.',
      'Identify open time-off approval requests that need my action before my team\'s schedule is affected.',
      'Check timesheet submission status across my team before the approval deadline.',
    ],
    'hr-admin': [
      'Monitor time-off policy compliance and identify accrual anomalies or balance errors requiring correction.',
      'Review timesheet submission and approval rates across the company to confirm readiness for payroll processing.',
      'Navigate to specific Time sub-modules to configure a policy change or resolve an employee dispute.',
    ],
  },

  '/time-and-attendance/calendar': {
    employee: [
      'View the company holiday calendar alongside my approved time-off dates to plan upcoming work and personal commitments.',
      'Check whether a public holiday affects my next time-off request or pay cycle.',
    ],
    manager: [
      'View a team-level absence calendar showing all approved and pending time off to plan coverage for upcoming sprints or projects.',
      'Reference the company holiday schedule when setting team deadlines or planning a work cycle.',
    ],
    'hr-admin': [
      'Configure the company holiday calendar for the upcoming year, with location-specific variations where applicable.',
      'Reference approved absence patterns to verify payroll compliance for employees with non-standard schedules.',
    ],
  },

  '/time-and-attendance/time-off': {
    employee: [
      'Submit a time-off request for a specific date range and track its status until it is approved.',
      'Check my PTO, sick, and other leave balances to confirm I have enough coverage before booking a trip.',
      'View my full time-off history (approved, pending, taken) in one place.',
    ],
    manager: [
      'Review and approve or deny a direct report\'s time-off request with full context (current team coverage, other approved absences on that date).',
      'View upcoming team absences proactively to identify coverage gaps and adjust project plans.',
      'Modify or cancel an approved time-off entry on behalf of a direct report after a plan change.',
    ],
    'hr-admin': [
      'Configure time-off policies — accrual rules, carry-over caps, blackout dates, waiting periods — by employee group or location.',
      'Process a manual time-off balance adjustment (add or deduct) for a specific employee.',
      'Run a year-end time-off balance report to calculate carry-over entitlements and payout liabilities.',
    ],
  },

  '/time-and-attendance/timesheets': {
    employee: [
      'Log my hours for the current pay period across relevant projects or cost centers before the submission deadline.',
      'Review and correct missed or inaccurate time entries before the approval cutoff.',
    ],
    manager: [
      'Review and approve my direct reports\' submitted timesheets before the payroll cutoff to confirm hours are accurate.',
      'Identify direct reports who have not yet submitted their timesheet and send a reminder before the deadline.',
      'Correct or reject a timesheet with an error and request that the employee resubmit with accurate hours.',
    ],
    'hr-admin': [
      'Monitor timesheet completion and approval status across the company before closing the pay period.',
      'Manually adjust or override a timesheet on behalf of an employee or manager when a correction is needed.',
      'Configure timesheet policies (overtime rules, rounding, project codes, exempt/non-exempt classifications) for different employee groups.',
    ],
  },

  // ── Time (New 2) Hub + T2s ────────────────────────────────────────

  '/time': {
    employee: [
      'Check my current time-off balances (PTO, sick, other leave) to plan an upcoming vacation or personal day.',
      'Submit a time-off request and confirm it is pending manager approval.',
      'Navigate to submit my timesheet if my role requires time tracking.',
      'Log my hours for the current pay period across relevant projects or cost centers before the submission deadline.',
      'Review and correct missed or inaccurate time entries before the approval cutoff.',
    ],
    manager: [
      'See a real-time summary of my team\'s time-off requests, approved absences, and upcoming coverage gaps.',
      'Identify open time-off approval requests that need my action before my team\'s schedule is affected.',
      'Check timesheet submission status across my team before the approval deadline.',
      'Review and approve my direct reports\' submitted timesheets before the payroll cutoff to confirm hours are accurate.',
      'Identify direct reports who have not yet submitted their timesheet and send a reminder before the deadline.',
      'Correct or reject a timesheet with an error and request that the employee resubmit with accurate hours.',
    ],
    'dept-head': [
      'Review department-wide time-off trends and scheduled absences to assess coverage risk for critical initiatives.',
      'Identify sub-teams or individuals with unusually high or low PTO utilization for coaching or policy review.',
      'Review timesheet completion and approval rates across all teams in my department before the pay period closes.',
      'Identify sub-managers who consistently have late or incorrect timesheet approvals as a coaching signal.',
    ],
    executive: [
      'View division-level absence and utilization trends to identify departments with potential burnout or coverage risk.',
    ],
    'hr-admin': [
      'Monitor time-off policy compliance and identify accrual anomalies or balance errors requiring correction.',
      'Review timesheet submission and approval rates across the company to confirm readiness for payroll processing.',
      'Navigate to specific Time sub-modules to configure a policy change or resolve an employee dispute.',
      'Monitor timesheet completion and approval status across the company before closing the pay period.',
      'Manually adjust or override a timesheet on behalf of an employee or manager when a correction is needed.',
      'Configure timesheet policies (overtime rules, rounding, project codes, exempt/non-exempt classifications) for different employee groups.',
    ],
    'finance-admin': [
      'Review aggregate time-off and hours data for labor cost reporting and PTO liability accruals.',
    ],
    'workplace-admin': [
      'Review expected in-office attendance trends to plan staffing and space readiness.',
    ],
  },

  '/time/tracking': {
    employee: [
      'Log my hours for the current pay period across relevant projects or cost centers before the submission deadline.',
      'Review and correct missed or inaccurate time entries before the approval cutoff.',
    ],
    manager: [
      'Review and approve my direct reports\' submitted timesheets before the payroll cutoff to confirm hours are accurate.',
      'Identify direct reports who have not yet submitted their timesheet and send a reminder before the deadline.',
      'Correct or reject a timesheet with an error and request that the employee resubmit with accurate hours.',
    ],
    'dept-head': [
      'Review timesheet completion and approval rates across all teams in my department before the pay period closes.',
      'Identify sub-managers who consistently have late or incorrect timesheet approvals as a coaching signal.',
    ],
    'hr-admin': [
      'Monitor timesheet completion and approval status across the company before closing the pay period.',
      'Manually adjust or override a timesheet on behalf of an employee or manager when a correction is needed.',
      'Configure timesheet policies (overtime rules, rounding, project codes, exempt/non-exempt classifications) for different employee groups.',
    ],
  },

  '/time/time-off': {
    employee: [
      'Submit a time-off request for a specific date range and track its status until it is approved.',
      'Check my PTO, sick, and other leave balances to confirm I have enough coverage before booking a trip.',
      'View my full time-off history (approved, pending, taken) in one place.',
    ],
    manager: [
      'Review and approve or deny a direct report\'s time-off request with full context (current team coverage, other approved absences on that date).',
      'View upcoming team absences proactively to identify coverage gaps and adjust project plans.',
      'Modify or cancel an approved time-off entry on behalf of a direct report after a plan change.',
    ],
    'dept-head': [
      'Monitor time-off utilization rates across my department and flag employees who have not taken leave in an extended period as a potential burnout risk.',
      'Review and approve extended leave requests escalated by sub-managers (parental leave, medical leave).',
    ],
    'hr-admin': [
      'Configure time-off policies — accrual rules, carry-over caps, blackout dates, waiting periods — by employee group or location.',
      'Process a manual time-off balance adjustment (add or deduct) for a specific employee.',
      'Run a year-end time-off balance report to calculate carry-over entitlements and payout liabilities.',
    ],
    'finance-admin': [
      'Review PTO liability data by department for inclusion in the monthly financial close accruals.',
    ],
  },

  '/time/scheduling': {
    manager: [
      'See a real-time summary of my team\'s time-off requests, approved absences, and upcoming coverage gaps.',
    ],
    'dept-head': [
      'Review department-wide time-off trends and scheduled absences to assess coverage risk for critical initiatives.',
    ],
    'hr-admin': [
      'Navigate to specific Time sub-modules to configure a policy change or resolve an employee dispute.',
    ],
  },

  '/time/attendance': {
    'hr-admin': [
      'Monitor time-off policy compliance and identify accrual anomalies or balance errors requiring correction.',
      'Review timesheet submission and approval rates across the company to confirm readiness for payroll processing.',
    ],
  },

  // ── Talent (New 2) Hub + T2s ──────────────────────────────────────

  '/talent': {
    employee: [
      'Check the status of my active goals, most recent feedback, and next review so I know where I stand and what to act on.',
      'Navigate to the specific Talent sub-module (Goals, 1:1s, Learning) with a pending deadline or action item.',
      'View my current performance ratings and historical review outcomes to understand how I am being assessed over time.',
      'Update my self-assessment or add performance notes ahead of a review cycle deadline.',
    ],
    manager: [
      'Get a quick view of my team\'s performance health — goal progress, overdue reviews, pending feedback requests — to prioritize coaching follow-up.',
      'Identify direct reports who need an intervention or development conversation based on current data signals.',
      'Navigate to the sub-module (Reviews, 1:1s, Goals) with the most open actions this week.',
      'Review my direct reports\' current performance ratings and identify who is an outlier — high or low — before the calibration discussion.',
      'Complete written performance assessments for each of my direct reports before the review cycle submission deadline.',
      'Identify patterns in my team\'s performance data that suggest a coaching opportunity or systemic team issue.',
    ],
    'dept-head': [
      'Review department-level talent health metrics (performance distribution, goal completion rate, review cycle status) ahead of a calibration session or people discussion.',
      'Identify sub-teams or managers with the lowest engagement in goal-setting or feedback to follow up.',
      'Navigate to Succession or Compensation when preparing for a department-level people decision.',
      'Review the performance rating distribution across my department and confirm it is aligned with calibration guidelines before the discussion.',
      'Compare performance trends across sub-teams to identify which managers are driving the strongest or weakest results.',
    ],
    executive: [
      'Review division-level talent metrics (performance distribution, high-potential identification, retention risk flags) for a strategic people discussion.',
      'Identify departments with critical succession gaps or compensation equity issues requiring executive attention.',
      'View the performance rating distribution across my division and confirm it falls within company calibration parameters.',
      'Identify the highest-performing individuals in my division for recognition, accelerated development, or promotion consideration.',
    ],
    'hr-admin': [
      'Monitor the status of active talent programs (current review cycle, goal cycle, learning campaigns) and confirm they are on track.',
      'Identify employees or managers who are stalled on critical talent cycle actions and send targeted reminders.',
      'Navigate to the specific Talent sub-module that requires configuration, troubleshooting, or escalation resolution.',
      'Configure the performance framework (rating scales, competencies, weighting, visibility rules) for a new review cycle.',
      'Monitor performance assessment completion rates and escalate to managers who are significantly overdue.',
      'Export final performance data for use in compensation planning and talent review discussions.',
    ],
  },

  '/talent/performance': {
    employee: [
      'View my current performance ratings and historical review outcomes to understand how I am being assessed over time.',
      'Update my self-assessment or add performance notes ahead of a review cycle deadline.',
    ],
    manager: [
      'Review my direct reports\' current performance ratings and identify who is an outlier — high or low — before the calibration discussion.',
      'Complete written performance assessments for each of my direct reports before the review cycle submission deadline.',
      'Identify patterns in my team\'s performance data that suggest a coaching opportunity or systemic team issue.',
    ],
    'dept-head': [
      'Review the performance rating distribution across my department and confirm it is aligned with calibration guidelines before the discussion.',
      'Compare performance trends across sub-teams to identify which managers are driving the strongest or weakest results.',
    ],
    executive: [
      'View the performance rating distribution across my division and confirm it falls within company calibration parameters.',
      'Identify the highest-performing individuals in my division for recognition, accelerated development, or promotion consideration.',
    ],
    'hr-admin': [
      'Configure the performance framework (rating scales, competencies, weighting, visibility rules) for a new review cycle.',
      'Monitor performance assessment completion rates and escalate to managers who are significantly overdue.',
      'Export final performance data for use in compensation planning and talent review discussions.',
    ],
  },

  '/talent/learning': {
    employee: [
      'Complete an assigned training course before the deadline to satisfy a compliance requirement or onboarding milestone.',
      'Browse the learning catalog for courses aligned to skills I am developing based on recent feedback or career path goals.',
      'Review my completed training history to confirm I am current on all required certifications and compliance courses.',
    ],
    manager: [
      'Assign a specific course to a direct report following a development conversation or as a follow-up to a performance review.',
      'Monitor training completion rates across my team to ensure compliance-required courses are on track before a deadline.',
      'Search the catalog for content to recommend to a direct report working on a specific technical or behavioral skill.',
    ],
    'dept-head': [
      'Review learning completion rates across my department with a focus on mandatory compliance training.',
      'Identify sub-teams with low completion rates on required training and escalate to the relevant manager.',
    ],
    executive: [
      'Review division-level compliance training completion rates ahead of an audit or board report.',
    ],
    'hr-admin': [
      'Configure and launch a mandatory training campaign (harassment prevention, security awareness) with assigned employee groups, deadlines, and reminder schedules.',
      'Monitor training completion across the company and send targeted reminders to managers whose teams are behind.',
      'Add new courses to the learning catalog and assign them to the relevant employee groups.',
    ],
  },

  '/talent/compensation': {
    employee: [
      'Understand my total rewards and compensation communications so I know the full value of my package.',
      'Review compensation-related updates when they occur so I can ask informed questions.',
    ],
    manager: [
      'Review my direct reports\' current compensation and flag anyone below the market midpoint or at risk of compression ahead of a merit cycle.',
      'Submit merit increase and promotion recommendations for my direct reports during the comp review cycle with supporting rationale.',
    ],
    'dept-head': [
      'Review the compensation distribution across my department and identify equity gaps, compression issues, or outliers before the cycle begins.',
      'Approve manager-submitted compensation change requests for my department within the allocated budget parameters.',
      'Monitor merit budget utilization for my department in real time during the allocation window.',
    ],
    executive: [
      'Review division-level compensation distribution against external market benchmarks to identify systemic equity or competitive issues.',
      'Approve executive-level or above-band compensation changes that require division-head authorization.',
    ],
    'hr-admin': [
      'Configure and launch the compensation review cycle — set merit budgets, define eligibility rules, configure merit matrices and proration logic.',
      'Monitor compensation change submissions during the cycle and flag anomalies or budget overages for review.',
      'Finalize and publish approved compensation changes after calibration is complete and leadership has signed off.',
    ],
    'finance-admin': [
      'Pull the approved workforce plan data to calculate labor cost projections and incorporate them into the financial model.',
      'Review headcount plan vs. actuals to update the labor cost forecast during a quarterly reforecast.',
    ],
  },

  '/talent/succession': {
    manager: [
      'Identify direct reports who are ready-now or ready-in-12-months successors for my own role or peer manager roles.',
    ],
    'dept-head': [
      'Review the succession readiness of key roles in my department and identify single-point-of-failure positions.',
      'Nominate high-potential employees as successors for critical leadership positions within my area.',
    ],
    executive: [
      'Review succession coverage for all director-level and above roles in my division and identify critical gaps posing retention or continuity risk.',
      'Discuss succession candidates for a specific leadership vacancy during a formal talent review.',
    ],
    'hr-admin': [
      'Configure succession planning cycles — define critical roles, readiness criteria, and talent pool parameters.',
      'Facilitate talent review discussions by preparing succession reports for each department ahead of the session.',
      'Update succession plans after a promotion, departure, or reorganization changes the critical role landscape.',
    ],
  },

  '/talent/career-pathing': {
    employee: [
      'Explore the defined career paths from my current role to understand what skills and experiences I need to progress.',
      'Reference the career path framework during my development discussion with my manager to make growth plans concrete.',
    ],
    manager: [
      'Use career path data to have a structured, specific development conversation with a direct report about their next role.',
      'Identify skill gaps for a direct report who wants to progress and co-create a development plan based on defined competencies.',
    ],
    'dept-head': [
      'Review career path definitions for all roles in my department to ensure progression tracks are well-defined and up to date.',
      'Identify employees across my department who are ready for promotion and confirm there are roles or opportunities available.',
    ],
    'hr-admin': [
      'Define and configure career paths, role leveling, and competency frameworks for each job family in the company.',
      'Update career path definitions following a company-wide job architecture review or leveling refresh.',
      'Review career path engagement metrics to understand which roles have active, well-utilized development plans.',
    ],
  },

  // ── Analytics (New 2) Hub + T2s ───────────────────────────────────

  '/analytics': {
    manager: [
      'Quickly check a summary of team-level metrics (goal progress, recent absences, headcount) without building a custom report.',
      'View a pre-built team dashboard showing goal completion, absence patterns, and review status to quickly assess team health.',
    ],
    'dept-head': [
      'Get an overview of key department metrics across people, performance, and engagement to prepare for a leadership meeting.',
      'Scan top-level trend indicators to identify which areas of the department need attention this week.',
      'View the department leadership dashboard — headcount, performance distribution, open roles, training compliance — before a leadership meeting.',
      'Drill down from a dashboard summary metric to the underlying employee-level data when a trend needs explanation.',
    ],
    executive: [
      'Review division-level strategic metrics (headcount, attrition, performance, hiring pipeline) in one place before a business review.',
      'Identify emerging trends or anomalies in my division that have changed since my last login and require investigation.',
      'Review the division leadership dashboard — headcount vs. plan, attrition trend, performance distribution, hiring pipeline — before a QBR.',
      'Check whether key metrics have moved materially since my last login and identify what is driving the change.',
      'Share a dashboard view with an external stakeholder (board member, CFO) to support a strategic discussion.',
    ],
    'hr-admin': [
      'Monitor key HR operational metrics (headcount, attrition, time-to-hire, compliance completion) at a company-wide level.',
      'Navigate to a specific report or dashboard to investigate a metric that has changed unexpectedly.',
      'Monitor key HR operational dashboards (attrition, headcount, enrollment status, compliance rates) for early-warning signals.',
      'Configure or customize a dashboard for a specific leadership audience or reporting cadence.',
    ],
    'finance-admin': [
      'Review consolidated labor cost, headcount, and budget metrics to prepare a finance summary report.',
      'View the labor cost dashboard and compare headcount and payroll costs against budget by department.',
    ],
    'it-admin': [
      'Review IT operations metrics (ticket volume, SLA performance, asset utilization) to assess team performance.',
      'Review the IT operations dashboard (open tickets, SLA performance, device compliance) to prioritize the team\'s work.',
    ],
    'workplace-admin': [
      'Review space utilization, visitor traffic, and maintenance ticket trends to plan upcoming resource allocation.',
      'Review the facilities utilization dashboard (desk occupancy, room booking rate, open maintenance tickets) to plan the week.',
    ],
  },

  '/analytics/dashboards': {
    manager: [
      'View a pre-built team dashboard showing goal completion, absence patterns, and review status to quickly assess team health.',
    ],
    'dept-head': [
      'View the department leadership dashboard — headcount, performance distribution, open roles, training compliance — before a leadership meeting.',
      'Drill down from a dashboard summary metric to the underlying employee-level data when a trend needs explanation.',
    ],
    executive: [
      'Review the division leadership dashboard — headcount vs. plan, attrition trend, performance distribution, hiring pipeline — before a QBR.',
      'Check whether key metrics have moved materially since my last login and identify what is driving the change.',
      'Share a dashboard view with an external stakeholder (board member, CFO) to support a strategic discussion.',
    ],
    'hr-admin': [
      'Monitor key HR operational dashboards (attrition, headcount, enrollment status, compliance rates) for early-warning signals.',
      'Configure or customize a dashboard for a specific leadership audience or reporting cadence.',
    ],
    'finance-admin': [
      'View the labor cost dashboard and compare headcount and payroll costs against budget by department.',
    ],
    'it-admin': [
      'Review the IT operations dashboard (open tickets, SLA performance, device compliance) to prioritize the team\'s work.',
    ],
    'workplace-admin': [
      'Review the facilities utilization dashboard (desk occupancy, room booking rate, open maintenance tickets) to plan the week.',
    ],
  },

  '/analytics/reports': {
    manager: [
      'Pull a time-off or headcount report for my team to prepare for a staffing or capacity discussion.',
    ],
    'dept-head': [
      'Build or run a department headcount or attrition report to support a business case for new or backfill headcount.',
      'Export performance or training compliance data for my department to bring into a talent review discussion.',
    ],
    executive: [
      'Run a division-level attrition or headcount variance report to support a board or investor discussion.',
      'Pull a custom report combining compensation, performance, and attrition data for a strategic talent review.',
    ],
    'hr-admin': [
      'Build and schedule standard HR reports (headcount, attrition, time-to-hire, compensation equity) on a recurring reporting cadence.',
      'Build a custom ad-hoc report combining multiple data fields to answer a specific business question.',
      'Export a compliance or regulatory report for a filing deadline or external audit.',
    ],
    'finance-admin': [
      'Run a labor cost report by department and period for the monthly finance close.',
      'Export payroll and headcount data to reconcile with the financial model.',
    ],
    'it-admin': [
      'Pull an asset utilization or helpdesk volume report to present at a technology leadership review.',
    ],
    'workplace-admin': [
      'Run a space utilization or visitor traffic report to inform an upcoming facilities planning or lease decision.',
    ],
  },

  '/analytics/workforce-planning': {
    'dept-head': [
      'Model headcount scenarios for the next planning cycle (e.g., adding an IC vs. a team lead) and estimate the cost impact.',
      'Submit a formal headcount plan for my department with supporting rationale and cost modeling attached.',
    ],
    executive: [
      'Review the division\'s proposed headcount plan and stress-test the assumptions before presenting to the CEO or board.',
      'Compare current headcount run-rate against the approved plan and flag departments that are over-pacing their budget.',
    ],
    'hr-admin': [
      'Consolidate department-level headcount plans into a unified company-wide workforce plan for leadership and board review.',
      'Model attrition scenarios to forecast future headcount gaps and calibrate the hiring pipeline accordingly.',
      'Track headcount plan vs. actuals on a monthly basis and flag material deviations before they create budget or resourcing problems.',
    ],
    'finance-admin': [
      'Pull the approved workforce plan data to calculate labor cost projections and incorporate them into the financial model.',
      'Review headcount plan vs. actuals to update the labor cost forecast during a quarterly reforecast.',
    ],
  },

  // ── Reports (legacy) Hub + T2s ────────────────────────────────────

  '/reports': {
    manager: [
      'Pull a time-off or headcount report for my team to prepare for a staffing or capacity discussion.',
    ],
    'hr-admin': [
      'Build and schedule standard HR reports (headcount, attrition, time-to-hire, compensation equity) on a recurring reporting cadence.',
      'Build a custom ad-hoc report combining multiple data fields to answer a specific business question.',
      'Export a compliance or regulatory report for a filing deadline or external audit.',
    ],
    'finance-admin': [
      'Run a labor cost report by department and period for the monthly finance close.',
      'Export payroll and headcount data to reconcile with the financial model.',
    ],
  },

  '/reports/standard': {
    'hr-admin': [
      'Build and schedule standard HR reports (headcount, attrition, time-to-hire, compensation equity) on a recurring reporting cadence.',
    ],
    'finance-admin': [
      'Run a labor cost report by department and period for the monthly finance close.',
    ],
  },

  '/reports/custom': {
    'hr-admin': [
      'Build a custom ad-hoc report combining multiple data fields to answer a specific business question.',
    ],
  },

  '/reports/benchmarks': {
    'hr-admin': [
      'Monitor key HR operational metrics (headcount, attrition, time-to-hire, compliance completion) at a company-wide level.',
    ],
  },

  '/reports/dashboards': {
    manager: [
      'View a pre-built team dashboard showing goal completion, absence patterns, and review status to quickly assess team health.',
    ],
    'hr-admin': [
      'Monitor key HR operational dashboards (attrition, headcount, enrollment status, compliance rates) for early-warning signals.',
      'Configure or customize a dashboard for a specific leadership audience or reporting cadence.',
    ],
  },

  // ── Files Hub + T2s ───────────────────────────────────────────────

  '/files': {
    employee: [
      'Find and download my personal employment documents (offer letter, promotion letter, signed agreements) for my own records.',
      'Review and e-sign a document that HR has sent me (updated policy, new agreement).',
    ],
    manager: [
      'Access HR document templates I need to complete a workflow (a PIP template or updated job description).',
      'Verify that a specific direct report has signed a required compliance document.',
    ],
    'hr-admin': [
      'Upload, configure, and track e-signature completion for company-wide document distributions (handbooks, NDAs, policy updates).',
      'Audit employee document records to confirm that all required documents are present, signed, and filed correctly.',
      'Organize the document library with templates and folder structures for each lifecycle stage.',
    ],
  },

  '/files/all': {
    employee: [
      'Find and download my personal employment documents (offer letter, promotion letter, signed agreements) for my own records.',
    ],
    'hr-admin': [
      'Audit employee document records to confirm that all required documents are present, signed, and filed correctly.',
      'Organize the document library with templates and folder structures for each lifecycle stage.',
    ],
  },

  '/files/e-signatures': {
    employee: [
      'Review and e-sign a document that HR has sent me (updated policy, new agreement).',
    ],
    'hr-admin': [
      'Upload, configure, and track e-signature completion for company-wide document distributions (handbooks, NDAs, policy updates).',
    ],
  },

  // ── Apps Hub + T2s ────────────────────────────────────────────────

  '/apps': {
    'hr-admin': [
      'Review the full list of installed integrations and confirm they are active and syncing without errors.',
      'Browse the marketplace to identify new integrations or tools that could streamline a current HR workflow.',
      'Navigate to the appropriate Ecosystem sub-module to configure an integration or manage API access.',
      'Review all currently installed integrations and confirm their sync status and field mappings are correct.',
      'Disable or remove an integration that is no longer in use to reduce the platform\'s security surface area.',
      'Troubleshoot a failing integration by reviewing error logs and restarting the connection.',
    ],
    'it-admin': [
      'Review all active integrations to assess the security posture and confirm no sensitive data is exposed unnecessarily.',
      'Browse the marketplace to evaluate new tools before approving company-wide adoption or procurement.',
      'Audit installed integrations to confirm they meet IT security and data governance standards.',
      'Review access permissions for each installed integration to enforce least-privilege data access.',
    ],
  },

  '/apps/marketplace': {
    'hr-admin': [
      'Browse available integrations to find a best-of-breed tool (LMS, engagement platform, ATS add-on) that connects with BambooHR.',
      'Research marketplace integrations in a specific category (payroll, HRIS, recruiting) during a vendor evaluation.',
    ],
    'it-admin': [
      'Evaluate marketplace integration listings for security compliance and data handling practices before approving a new tool.',
    ],
  },

  '/apps/installed': {
    'hr-admin': [
      'Review all currently installed integrations and confirm their sync status and field mappings are correct.',
      'Disable or remove an integration that is no longer in use to reduce the platform\'s security surface area.',
      'Troubleshoot a failing integration by reviewing error logs and restarting the connection.',
    ],
    'it-admin': [
      'Audit installed integrations to confirm they meet IT security and data governance standards.',
      'Review access permissions for each installed integration to enforce least-privilege data access.',
    ],
  },

  '/apps/api-access': {
    'hr-admin': [
      'Generate or rotate an API key for an internal tool or vendor integration that needs access to BambooHR data.',
      'Review which third-party services have active API access and revoke keys that are no longer authorized.',
    ],
    'it-admin': [
      'Audit API key usage and access logs to identify unusual activity or potential unauthorized access.',
      'Rotate API credentials as part of a scheduled security credential rotation policy.',
    ],
  },

  // ── Settings Hub + T2s ────────────────────────────────────────────

  '/settings': {
    'hr-admin': [
      'Navigate to a specific settings module (Permissions, Approvals, Workflows) to configure or troubleshoot a platform process.',
      'Audit the current platform configuration — permissions, approval chains, workflows — to confirm it reflects the current org structure.',
      'Prepare for a platform feature rollout by reviewing and updating relevant settings before the launch.',
      'Update company-wide platform settings (fiscal year, work week definition, default time zone, pay frequency) when policies change or a new plan year begins.',
      'Configure company org settings (legal entities, office locations, employment types) after a merger, acquisition, or geographic expansion.',
      'Verify company settings are accurate before launching a first payroll run or a major new-hire class.',
    ],
    'it-admin': [
      'Review and update security and access control settings to maintain the platform\'s security posture.',
      'Navigate to Integrations or API settings to configure or troubleshoot a system connection.',
      'Confirm global settings support identity and security expectations (domains, authentication requirements).',
    ],
    'finance-admin': [
      'Navigate to approval workflow settings to configure or update finance-specific approval chains.',
    ],
    'workplace-admin': [
      'Navigate to Approvals or Workflow settings to configure facilities-specific process automation.',
    ],
  },

  '/settings/company': {
    'hr-admin': [
      'Update company-wide platform settings (fiscal year, work week definition, default time zone, pay frequency) when policies change or a new plan year begins.',
      'Configure company org settings (legal entities, office locations, employment types) after a merger, acquisition, or geographic expansion.',
      'Verify company settings are accurate before launching a first payroll run or a major new-hire class.',
    ],
    'it-admin': [
      'Confirm global settings support identity and security expectations (domains, authentication requirements).',
    ],
  },

  '/settings/account': {
    'hr-admin': [
      'Update platform account settings (primary admin email, login policies, SSO configuration) when an admin changes or security requirements are updated.',
      'Review account-level security settings (MFA enforcement, session timeout rules) to confirm compliance with IT policies.',
    ],
    'it-admin': [
      'Configure and maintain SSO and MFA settings to ensure platform access meets the company\'s security standards.',
      'Review login and session policies to align with the broader identity and access management framework.',
    ],
  },

  '/settings/access-levels': {
    'hr-admin': [
      'Configure role-based access levels that define what data and actions each persona can see and perform across the platform.',
      'Update access level definitions after a reorg or when a new job function is added that requires a distinct access profile.',
    ],
    'it-admin': [
      'Review access level configurations to confirm that sensitive HR, payroll, and employee data is accessible only by authorized roles.',
    ],
  },

  '/settings/permissions': {
    'hr-admin': [
      'Review and update permission group assignments after a role change, reorg, or policy revision.',
      'Configure a new permission group for a new role type or business unit being onboarded to the platform.',
      'Audit all permission assignments across the platform to identify over-provisioned access and reduce security risk.',
    ],
    'it-admin': [
      'Review permission groups to confirm they align with the company\'s least-privilege access policy.',
      'Audit permission assignments after a significant org change to catch inherited access that should have been removed.',
    ],
  },

  '/settings/approvals': {
    'hr-admin': [
      'Configure or update approval chains for HR workflows (time-off requests, headcount approvals, compensation changes) after a reorg changes reporting structures.',
      'Review all active approval workflows to confirm they reflect the correct approvers and escalation paths.',
      'Investigate and resolve a stuck approval by identifying exactly where it is blocked and taking corrective action.',
    ],
    'finance-admin': [
      'Configure approval chains for finance workflows (expense approvals, purchase orders, budget variance requests).',
      'Update the expense approval hierarchy after a manager change or org restructure.',
    ],
    'workplace-admin': [
      'Configure approval workflows for desk reservations, room bookings, or visitor access requests that require authorization.',
    ],
  },

  '/settings/email-alerts': {
    'hr-admin': [
      'Configure email alert rules so that managers and employees are notified at the right moment for the right actions (time-off request submitted, review deadline approaching).',
      'Update alert recipients after a role change or reorg to ensure notifications reach the correct people.',
      'Audit current email alerts to reduce notification fatigue for over-alerted users and close gaps for under-alerted roles.',
    ],
    'it-admin': [
      'Ensure alert configurations align to security and reliability requirements (deliverability, escalation paths).',
    ],
  },

  '/settings/branding': {
    'hr-admin': [
      'Update the platform\'s visual branding (logo, colors, company name) after a rebrand to ensure consistency across all employee-facing surfaces.',
      'Customize onboarding messages, email templates, and notification copy to reflect the company\'s brand voice and tone.',
    ],
  },

  '/settings/workflows': {
    'hr-admin': [
      'Create or modify an automated workflow (e.g., send a welcome email when a new hire is added, trigger an offboarding checklist on a termination) to reduce manual HR effort.',
      'Review and test all active workflows after a platform update or process change to confirm they are still firing correctly.',
      'Troubleshoot a workflow that is not triggering as expected and identify the root cause.',
    ],
    'it-admin': [
      'Ensure workflow-triggered automations don\'t break identity controls or compliance requirements.',
    ],
  },

  '/settings/integrations': {
    'hr-admin': [
      'Configure a new third-party integration (Slack, LinkedIn, background check provider) and validate the initial data sync.',
      'Troubleshoot an integration that has stopped syncing and restore the connection without data loss.',
      'Review all active integrations for operational accuracy and disable unused connections.',
    ],
    'it-admin': [
      'Review and approve new integration requests to confirm they meet security and data governance requirements.',
      'Audit integration credentials and access tokens and rotate any that are outdated or no longer authorized.',
    ],
  },

  '/settings/notifications': {
    'hr-admin': [
      'Configure email alert rules so that managers and employees are notified at the right moment for the right actions (time-off request submitted, review deadline approaching).',
      'Update alert recipients after a role change or reorg to ensure notifications reach the correct people.',
      'Audit current email alerts to reduce notification fatigue for over-alerted users and close gaps for under-alerted roles.',
    ],
    'it-admin': [
      'Ensure alert configurations align to security and reliability requirements (deliverability, escalation paths).',
    ],
  },

  '/settings/billing': {
    'hr-admin': [
      'Review the current subscription plan and confirm the active seat count is accurate before the contract renewal date.',
      'Update the payment method or billing contact after an administrative or finance team change.',
    ],
    'finance-admin': [
      'Review billing details and confirm payment method accuracy as part of SaaS spend governance.',
    ],
  },

  // ── IT Hub + T2s ──────────────────────────────────────────────────

  '/it': {
    'it-admin': [
      'Triage open helpdesk tickets, active incidents, and pending provisioning tasks from a single prioritized view.',
      'Check for security alerts or access anomalies that require immediate investigation.',
      'Review asset and device inventory status to stay aware of procurement gaps or unassigned equipment.',
      'Process the open ticket queue — triage new requests, assign to the correct team member, update statuses, and close resolved items.',
      'Review SLA performance on open tickets to ensure no high-priority requests are breached.',
      'Identify recurring issues in the queue to propose a knowledge base article or process automation.',
    ],
  },

  '/it/helpdesk': {
    'it-admin': [
      'Process the open ticket queue — triage new requests, assign to the correct team member, update statuses, and close resolved items.',
      'Review SLA performance on open tickets to ensure no high-priority requests are breached.',
      'Identify recurring issues in the queue to propose a knowledge base article or process automation.',
    ],
  },

  '/it/helpdesk/tickets': {
    'it-admin': [
      'Process the open ticket queue — triage new requests, assign to the correct team member, update statuses, and close resolved items.',
      'Review SLA performance on open tickets to ensure no high-priority requests are breached.',
    ],
  },

  '/it/helpdesk/service-catalog': {
    'it-admin': [
      'Identify recurring issues in the queue to propose a knowledge base article or process automation.',
    ],
  },

  '/it/helpdesk/queues': {
    'it-admin': [
      'Process the open ticket queue — triage new requests, assign to the correct team member, update statuses, and close resolved items.',
    ],
  },

  '/it/helpdesk/sla': {
    'it-admin': [
      'Review SLA performance on open tickets to ensure no high-priority requests are breached.',
    ],
  },

  '/it/incidents': {
    'it-admin': [
      'Log and track an active incident (outage, security breach, service degradation) with all context needed for the response team.',
      'Review the incident history to identify patterns and inform future prevention and resilience improvements.',
      'Conduct and document a post-incident review including root cause and resolution steps for future reference.',
    ],
  },

  '/it/incidents/active': {
    'it-admin': [
      'Log and track an active incident (outage, security breach, service degradation) with all context needed for the response team.',
    ],
  },

  '/it/incidents/major': {
    'it-admin': [
      'Log and track an active incident (outage, security breach, service degradation) with all context needed for the response team.',
    ],
  },

  '/it/incidents/on-call': {
    'it-admin': [
      'Log and track an active incident (outage, security breach, service degradation) with all context needed for the response team.',
    ],
  },

  '/it/incidents/postmortems': {
    'it-admin': [
      'Conduct and document a post-incident review including root cause and resolution steps for future reference.',
      'Review the incident history to identify patterns and inform future prevention and resilience improvements.',
    ],
  },

  '/it/assets': {
    'it-admin': [
      'Look up the assets assigned to a specific employee (laptop, monitor, peripherals) to prepare for a device refresh or offboarding.',
      'Record a new device procurement or asset transfer and update the asset register to keep it current.',
      'Audit the asset inventory to identify unassigned, aging, or missing equipment requiring action.',
    ],
  },

  '/it/assets/hardware': {
    'it-admin': [
      'Look up the assets assigned to a specific employee (laptop, monitor, peripherals) to prepare for a device refresh or offboarding.',
      'Record a new device procurement or asset transfer and update the asset register to keep it current.',
    ],
  },

  '/it/assets/software': {
    'it-admin': [
      'Audit the asset inventory to identify unassigned, aging, or missing equipment requiring action.',
    ],
  },

  '/it/assets/contracts': {
    'it-admin': [
      'Audit the asset inventory to identify unassigned, aging, or missing equipment requiring action.',
    ],
  },

  '/it/assets/lifecycle': {
    'it-admin': [
      'Record a new device procurement or asset transfer and update the asset register to keep it current.',
      'Audit the asset inventory to identify unassigned, aging, or missing equipment requiring action.',
    ],
  },

  '/it/knowledge': {
    'it-admin': [
      'Search for an existing solution or runbook before escalating a complex or unfamiliar ticket.',
      'Create or update a knowledge base article to document a recurring issue and reduce future ticket volume on that topic.',
      'Review knowledge base usage and search data to identify articles that are outdated or not being found.',
    ],
  },

  '/it/knowledge/articles': {
    'it-admin': [
      'Create or update a knowledge base article to document a recurring issue and reduce future ticket volume on that topic.',
      'Search for an existing solution or runbook before escalating a complex or unfamiliar ticket.',
    ],
  },

  '/it/knowledge/categories': {
    'it-admin': [
      'Review knowledge base usage and search data to identify articles that are outdated or not being found.',
    ],
  },

  '/it/knowledge/drafts': {
    'it-admin': [
      'Create or update a knowledge base article to document a recurring issue and reduce future ticket volume on that topic.',
    ],
  },

  '/it/changes': {
    'it-admin': [
      'Submit and document a planned change request (system update, infrastructure change, configuration change) for proper review and approval.',
      'Review the change calendar to identify upcoming changes that could conflict with other initiatives.',
      'Conduct and document a post-change review including the outcome and any issues encountered.',
    ],
  },

  '/it/changes/requests': {
    'it-admin': [
      'Submit and document a planned change request (system update, infrastructure change, configuration change) for proper review and approval.',
    ],
  },

  '/it/changes/calendar': {
    'it-admin': [
      'Review the change calendar to identify upcoming changes that could conflict with other initiatives.',
    ],
  },

  '/it/changes/releases': {
    'it-admin': [
      'Conduct and document a post-change review including the outcome and any issues encountered.',
    ],
  },

  '/it/devices': {
    'it-admin': [
      'View the full device inventory filtered by status (assigned, unassigned, in repair) and identify gaps in device availability.',
      'Update the status of a specific device after a repair, reassignment, refresh, or write-off.',
      'Run a device compliance report to confirm that all company devices meet current security and software requirements.',
    ],
  },

  '/it/devices/endpoints': {
    'it-admin': [
      'View the full device inventory filtered by status (assigned, unassigned, in repair) and identify gaps in device availability.',
      'Update the status of a specific device after a repair, reassignment, refresh, or write-off.',
    ],
  },

  '/it/devices/mdm-policies': {
    'it-admin': [
      'Run a device compliance report to confirm that all company devices meet current security and software requirements.',
    ],
  },

  '/it/devices/patches': {
    'it-admin': [
      'Run a device compliance report to confirm that all company devices meet current security and software requirements.',
    ],
  },

  '/it/devices/remote-access': {
    'it-admin': [
      'View the full device inventory filtered by status (assigned, unassigned, in repair) and identify gaps in device availability.',
    ],
  },

  '/it/security': {
    'it-admin': [
      'Review the security dashboard for active threats, policy violations, or anomalous access patterns that require investigation.',
      'Investigate and respond to a specific security alert — reviewing logs, isolating affected accounts, and documenting the response.',
      'Audit user access permissions across the company to confirm least-privilege compliance.',
    ],
  },

  '/it/security/threats': {
    'it-admin': [
      'Review the security dashboard for active threats, policy violations, or anomalous access patterns that require investigation.',
    ],
  },

  '/it/security/vulnerabilities': {
    'it-admin': [
      'Investigate and respond to a specific security alert — reviewing logs, isolating affected accounts, and documenting the response.',
    ],
  },

  '/it/security/access-reviews': {
    'it-admin': [
      'Audit user access permissions across the company to confirm least-privilege compliance.',
    ],
  },

  '/it/security/compliance': {
    'it-admin': [
      'Audit user access permissions across the company to confirm least-privilege compliance.',
    ],
  },

  // ── Finance Hub + T2s ─────────────────────────────────────────────

  '/finance': {
    'finance-admin': [
      'Triage the day\'s most urgent finance operations — pending expense approvals, outstanding invoices, budget alerts — from a single view.',
      'Review the status of the current spend cycle and identify items that need action before the accounting close.',
      'Monitor budget utilization across departments and flag any teams approaching or over their limits.',
      'Review and approve or reject submitted expense reports, verifying receipts against policy limits and category rules.',
      'Identify out-of-policy expense submissions and return them to the employee with a clear explanation.',
      'Run a monthly expense report for the accounting close, segmented by department, cost center, and category.',
    ],
  },

  '/finance/expenses': {
    'finance-admin': [
      'Review and approve or reject submitted expense reports, verifying receipts against policy limits and category rules.',
      'Identify out-of-policy expense submissions and return them to the employee with a clear explanation.',
      'Run a monthly expense report for the accounting close, segmented by department, cost center, and category.',
    ],
  },

  '/finance/expenses/reports': {
    'finance-admin': [
      'Run a monthly expense report for the accounting close, segmented by department, cost center, and category.',
    ],
  },

  '/finance/expenses/receipts': {
    'finance-admin': [
      'Review and approve or reject submitted expense reports, verifying receipts against policy limits and category rules.',
      'Identify out-of-policy expense submissions and return them to the employee with a clear explanation.',
    ],
  },

  '/finance/expenses/mileage': {
    'finance-admin': [
      'Review and approve or reject submitted expense reports, verifying receipts against policy limits and category rules.',
    ],
  },

  '/finance/expenses/per-diems': {
    'finance-admin': [
      'Identify out-of-policy expense submissions and return them to the employee with a clear explanation.',
    ],
  },

  '/finance/cards': {
    'finance-admin': [
      'Review corporate card transactions in real time to flag out-of-policy spend or unusual activity before it compounds.',
      'Issue, suspend, or cancel a corporate card for an employee after a role change or policy violation.',
      'Set or update spend limits and category restrictions on a specific card or card program.',
    ],
  },

  '/finance/cards/transactions': {
    'finance-admin': [
      'Review corporate card transactions in real time to flag out-of-policy spend or unusual activity before it compounds.',
    ],
  },

  '/finance/cards/controls': {
    'finance-admin': [
      'Set or update spend limits and category restrictions on a specific card or card program.',
    ],
  },

  '/finance/cards/requests': {
    'finance-admin': [
      'Issue, suspend, or cancel a corporate card for an employee after a role change or policy violation.',
    ],
  },

  '/finance/budgets': {
    'finance-admin': [
      'Review current budget utilization by department or cost center and identify items tracking materially over or under plan.',
      'Update budget allocations after a mid-year reforecast or approved headcount change.',
      'Build and publish the annual budget framework for department heads to review and submit their plans.',
    ],
    'dept-head': [
      'View my department\'s current budget utilization and confirm I am within plan before approving new spend.',
      'Submit a budget variance request when a project or initiative requires spend outside the original approved plan.',
    ],
    executive: [
      'Review division-level budget utilization against plan and identify departments with significant overages requiring attention.',
      'Drill into a budget variance that has been escalated to me to understand the cause and decide on a course of action.',
    ],
  },

  '/finance/budgets/department': {
    'finance-admin': [
      'Review current budget utilization by department or cost center and identify items tracking materially over or under plan.',
    ],
    'dept-head': [
      'View my department\'s current budget utilization and confirm I am within plan before approving new spend.',
    ],
  },

  '/finance/budgets/project': {
    'finance-admin': [
      'Review current budget utilization by department or cost center and identify items tracking materially over or under plan.',
    ],
  },

  '/finance/budgets/forecasts': {
    'finance-admin': [
      'Update budget allocations after a mid-year reforecast or approved headcount change.',
      'Build and publish the annual budget framework for department heads to review and submit their plans.',
    ],
    executive: [
      'Review division-level budget utilization against plan and identify departments with significant overages requiring attention.',
    ],
  },

  '/finance/budgets/alerts': {
    'finance-admin': [
      'Review current budget utilization by department or cost center and identify items tracking materially over or under plan.',
    ],
  },

  '/finance/travel': {
    'finance-admin': [
      'Review travel bookings and expenses to confirm they comply with the company\'s travel policy.',
      'Update travel policy limits (airfare class rules, hotel per diem, ground transport thresholds) following an annual policy review.',
      'Run a travel spend report by department or trip category for quarterly cost analysis.',
    ],
  },

  '/finance/travel/trips': {
    'finance-admin': [
      'Review travel bookings and expenses to confirm they comply with the company\'s travel policy.',
    ],
  },

  '/finance/travel/itineraries': {
    'finance-admin': [
      'Review travel bookings and expenses to confirm they comply with the company\'s travel policy.',
    ],
  },

  '/finance/travel/policies': {
    'finance-admin': [
      'Update travel policy limits (airfare class rules, hotel per diem, ground transport thresholds) following an annual policy review.',
    ],
  },

  '/finance/procurement': {
    'finance-admin': [
      'Review and approve purchase requisitions before issuing a purchase order to a vendor.',
      'Manage the vendor registry — add new vendors, update payment terms, verify required compliance documentation.',
      'Track open purchase orders against budget and flag any approaching or exceeding approval thresholds.',
    ],
  },

  '/finance/procurement/requests': {
    'finance-admin': [
      'Review and approve purchase requisitions before issuing a purchase order to a vendor.',
    ],
  },

  '/finance/procurement/orders': {
    'finance-admin': [
      'Track open purchase orders against budget and flag any approaching or exceeding approval thresholds.',
    ],
  },

  '/finance/procurement/vendors': {
    'finance-admin': [
      'Manage the vendor registry — add new vendors, update payment terms, verify required compliance documentation.',
    ],
  },

  '/finance/procurement/catalogs': {
    'finance-admin': [
      'Manage the vendor registry — add new vendors, update payment terms, verify required compliance documentation.',
    ],
  },

  '/finance/invoices': {
    'finance-admin': [
      'Review and code incoming vendor invoices, match them to purchase orders, and route them for payment approval.',
      'Investigate and resolve a disputed invoice or duplicate payment with a vendor.',
      'Run an accounts payable aging report to identify overdue invoices before the accounting close.',
    ],
  },

  '/finance/invoices/processing': {
    'finance-admin': [
      'Review and code incoming vendor invoices, match them to purchase orders, and route them for payment approval.',
    ],
  },

  '/finance/invoices/matching': {
    'finance-admin': [
      'Review and code incoming vendor invoices, match them to purchase orders, and route them for payment approval.',
    ],
  },

  '/finance/invoices/payments': {
    'finance-admin': [
      'Investigate and resolve a disputed invoice or duplicate payment with a vendor.',
      'Run an accounts payable aging report to identify overdue invoices before the accounting close.',
    ],
  },

  // ── Workplace Hub + T2s ───────────────────────────────────────────

  '/workplace': {
    'workplace-admin': [
      'Get an at-a-glance overview of today\'s office occupancy, visitor schedule, and open facilities issues.',
      'Identify maintenance and facilities requests that are open and prioritize them for the day.',
      'Monitor desk and room utilization trends to inform capacity planning and space allocation.',
      'View the current desk assignment map and identify unassigned, reserved, or overbooking conflicts.',
      'Assign a permanent or hot desk to a new employee before their start date so they have a spot from day one.',
      'Audit desk utilization data to identify underused floors or zones and optimize the space allocation model.',
    ],
  },

  '/workplace/desks': {
    'workplace-admin': [
      'View the current desk assignment map and identify unassigned, reserved, or overbooking conflicts.',
      'Assign a permanent or hot desk to a new employee before their start date so they have a spot from day one.',
      'Audit desk utilization data to identify underused floors or zones and optimize the space allocation model.',
    ],
  },

  '/workplace/desks/booking': {
    'workplace-admin': [
      'View the current desk assignment map and identify unassigned, reserved, or overbooking conflicts.',
    ],
  },

  '/workplace/desks/neighborhoods': {
    'workplace-admin': [
      'Audit desk utilization data to identify underused floors or zones and optimize the space allocation model.',
    ],
  },

  '/workplace/desks/policies': {
    'workplace-admin': [
      'Audit desk utilization data to identify underused floors or zones and optimize the space allocation model.',
    ],
  },

  '/workplace/rooms': {
    'workplace-admin': [
      'View all room bookings for the day and resolve any double-booking or over-capacity conflicts.',
      'Configure a room\'s capacity, available equipment, and booking availability after a renovation or policy change.',
      'Review room utilization reports to identify chronically underused rooms and adjust booking policies.',
    ],
  },

  '/workplace/rooms/booking': {
    'workplace-admin': [
      'View all room bookings for the day and resolve any double-booking or over-capacity conflicts.',
    ],
  },

  '/workplace/rooms/directory': {
    'workplace-admin': [
      'Configure a room\'s capacity, available equipment, and booking availability after a renovation or policy change.',
    ],
  },

  '/workplace/rooms/signage': {
    'workplace-admin': [
      'Configure a room\'s capacity, available equipment, and booking availability after a renovation or policy change.',
    ],
  },

  '/workplace/visitors': {
    'workplace-admin': [
      'Review today\'s pre-registered visitor list and confirm reception is prepared for all expected arrivals.',
      'Check in an unregistered walk-in visitor and issue a visitor badge in real time.',
      'Pull visitor logs for a security audit or to investigate an unauthorized access incident.',
    ],
  },

  '/workplace/visitors/check-in': {
    'workplace-admin': [
      'Check in an unregistered walk-in visitor and issue a visitor badge in real time.',
    ],
  },

  '/workplace/visitors/invitations': {
    'workplace-admin': [
      'Review today\'s pre-registered visitor list and confirm reception is prepared for all expected arrivals.',
    ],
  },

  '/workplace/visitors/watchlist': {
    'workplace-admin': [
      'Pull visitor logs for a security audit or to investigate an unauthorized access incident.',
    ],
  },

  '/workplace/spaces': {
    'workplace-admin': [
      'Update the office floor plan or space configuration after a renovation, seating rearrangement, or new buildout.',
      'Set capacity limits and booking rules for different space types (collaboration zones, phone booths, event spaces).',
      'Review space utilization metrics across all zones to inform future office design and real estate decisions.',
    ],
  },

  '/workplace/spaces/floor-plans': {
    'workplace-admin': [
      'Update the office floor plan or space configuration after a renovation, seating rearrangement, or new buildout.',
    ],
  },

  '/workplace/spaces/occupancy': {
    'workplace-admin': [
      'Review space utilization metrics across all zones to inform future office design and real estate decisions.',
    ],
  },

  '/workplace/spaces/moves': {
    'workplace-admin': [
      'Update the office floor plan or space configuration after a renovation, seating rearrangement, or new buildout.',
    ],
  },

  '/workplace/schedules': {
    'workplace-admin': [
      'Review the weekly in-office schedule to anticipate peak occupancy days and prepare the facility and staffing accordingly.',
      'Update facility team shift schedules to ensure coverage aligns with expected office attendance patterns.',
      'Confirm that hybrid work schedule data (who is on-site on which days) is synced and accurate across the platform.',
    ],
  },

  '/workplace/schedules/hybrid': {
    'workplace-admin': [
      'Confirm that hybrid work schedule data (who is on-site on which days) is synced and accurate across the platform.',
    ],
  },

  '/workplace/schedules/teams': {
    'workplace-admin': [
      'Update facility team shift schedules to ensure coverage aligns with expected office attendance patterns.',
    ],
  },

  '/workplace/schedules/office-directory': {
    'workplace-admin': [
      'Review the weekly in-office schedule to anticipate peak occupancy days and prepare the facility and staffing accordingly.',
    ],
  },

  '/workplace/maintenance': {
    'workplace-admin': [
      'Review the open maintenance ticket queue and assign each item to the appropriate facilities team member.',
      'Log a new maintenance issue reported by an employee and set a priority level and expected resolution date.',
      'Track recurring maintenance needs (HVAC servicing, cleaning schedules, equipment checks) and confirm they are on schedule.',
    ],
  },

  '/workplace/maintenance/work-orders': {
    'workplace-admin': [
      'Review the open maintenance ticket queue and assign each item to the appropriate facilities team member.',
      'Log a new maintenance issue reported by an employee and set a priority level and expected resolution date.',
    ],
  },

  '/workplace/maintenance/preventive': {
    'workplace-admin': [
      'Track recurring maintenance needs (HVAC servicing, cleaning schedules, equipment checks) and confirm they are on schedule.',
    ],
  },

  '/workplace/maintenance/facility-assets': {
    'workplace-admin': [
      'Track recurring maintenance needs (HVAC servicing, cleaning schedules, equipment checks) and confirm they are on schedule.',
    ],
  },
};
