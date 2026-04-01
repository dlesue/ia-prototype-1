import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { ChatProvider } from './contexts/ChatContext';
import { ScenarioProvider } from './contexts/ScenarioContext';
import { Chat } from './pages/Chat';
import StyleGuidePage from './pages/StyleGuidePage';

// Legacy pages (keep working)
import { MyInfo } from './pages/MyInfo';
import { Doom } from './pages/Doom';

// Home
import HomeHub from './pages/Home/HomeHub';
import HomeInbox from './pages/Home/HomeInbox';
import HomeCalendar from './pages/Home/HomeCalendar';

// People
import PeopleHub from './pages/People/PeopleHub';
import PeopleMyInfo from './pages/People/PeopleMyInfo';
import PeopleMyDirectReports from './pages/People/PeopleMyDirectReports';
import PeopleMyDepartment from './pages/People/PeopleMyDepartment';
import PeopleMyDivision from './pages/People/PeopleMyDivision';
import PeopleDivisions from './pages/People/PeopleDivisions';
import PeopleDepartments from './pages/People/PeopleDepartments';
import PeopleTeams from './pages/People/PeopleTeams';

// Hiring
import HiringHub from './pages/Hiring/HiringHub';
import HiringJobOpenings from './pages/Hiring/HiringJobOpenings';
import HiringJobOpeningDetail from './pages/Hiring/HiringJobOpeningDetail';
import HiringCandidates from './pages/Hiring/HiringCandidates';
import HiringTalentPools from './pages/Hiring/HiringTalentPools';
import HiringCareersSite from './pages/Hiring/HiringCareersSite';

// Onboarding
import OnboardingHub from './pages/Onboarding/OnboardingHub';
import OnboardingActive from './pages/Onboarding/OnboardingActive';
import OnboardingOffboarding from './pages/Onboarding/OnboardingOffboarding';
import OnboardingTaskTemplates from './pages/Onboarding/OnboardingTaskTemplates';
import OnboardingNewHirePackets from './pages/Onboarding/OnboardingNewHirePackets';

// Payroll
import PayrollHub from './pages/Payroll/PayrollHub';
import PayrollPayCalendar from './pages/Payroll/PayrollPayCalendar';
import PayrollHistory from './pages/Payroll/PayrollHistory';
import PayrollOffCycle from './pages/Payroll/PayrollOffCycle';
import PayrollReports from './pages/Payroll/PayrollReports';

// Benefits
import BenefitsHub from './pages/Benefits/BenefitsHub';
import BenefitsPlans from './pages/Benefits/BenefitsPlans';
import BenefitsEnrollment from './pages/Benefits/BenefitsEnrollment';
import BenefitsCarriers from './pages/Benefits/BenefitsCarriers';

// Performance
import PerformanceHub from './pages/Performance/PerformanceHub';
import PerformanceGoals from './pages/Performance/PerformanceGoals';
import PerformanceReviews from './pages/Performance/PerformanceReviews';
import PerformanceFeedback from './pages/Performance/PerformanceFeedback';
import PerformanceOneOnOnes from './pages/Performance/PerformanceOneOnOnes';

// Training
import TrainingHub from './pages/Training/TrainingHub';
import TrainingCatalog from './pages/Training/TrainingCatalog';
import TrainingAssignments from './pages/Training/TrainingAssignments';
import TrainingCertifications from './pages/Training/TrainingCertifications';

// Compensation
import CompensationHub from './pages/Compensation/CompensationHub';
import CompensationBenchmarks from './pages/Compensation/CompensationBenchmarks';
import CompensationLevelsBands from './pages/Compensation/CompensationLevelsBands';
import CompensationPlanning from './pages/Compensation/CompensationPlanning';
import CompensationTotalRewards from './pages/Compensation/CompensationTotalRewards';

// Culture
import CultureHub from './pages/Culture/CultureHub';
import CultureCommunity from './pages/Culture/CultureCommunity';
import CultureRewards from './pages/Culture/CultureRewards';
import CultureRecognition from './pages/Culture/CultureRecognition';
import CultureWellbeing from './pages/Culture/CultureWellbeing';
import CultureSurveys from './pages/Culture/CultureSurveys';
import EmployeeCommunityHub from './pages/EmployeeCommunity/EmployeeCommunityHub';
import RewardsRecognitionHub from './pages/RewardsRecognition/RewardsRecognitionHub';
import WellbeingHub from './pages/Wellbeing/WellbeingHub';

// Time & Attendance
import TimeAttendanceHub from './pages/TimeAndAttendance/TimeAttendanceHub';
import TimeAttendanceCalendar from './pages/TimeAndAttendance/TimeAttendanceCalendar';
import TimeAttendanceTimeOff from './pages/TimeAndAttendance/TimeAttendanceTimeOff';
import TimeAttendanceTimesheets from './pages/TimeAndAttendance/TimeAttendanceTimesheets';

// Reports
import ReportsHub from './pages/Reports/ReportsHub';
import ReportsStandard from './pages/Reports/ReportsStandard';
import ReportsCustom from './pages/Reports/ReportsCustom';
import ReportsBenchmarks from './pages/Reports/ReportsBenchmarks';
import ReportsDashboards from './pages/Reports/ReportsDashboards';
import MetricReport from './pages/Reports/MetricReport';
import ReportDetail from './pages/Reports/ReportDetail';
import FileDetail from './pages/Files/FileDetail';

// Files
import FilesHub from './pages/Files/FilesHub';
import FilesAll from './pages/Files/FilesAll';
import FilesESignatures from './pages/Files/FilesESignatures';

// Apps
import AppsHub from './pages/Apps/AppsHub';
import AppsMarketplace from './pages/Apps/AppsMarketplace';
import AppsInstalled from './pages/Apps/AppsInstalled';
import AppsApiAccess from './pages/Apps/AppsApiAccess';

// Legacy pages
import LegacyFilesPage from './pages/Files/LegacyFilesPage';
import LegacyReportsPage from './pages/Reports/LegacyReportsPage';
import LegacySettingsPage from './pages/Settings/LegacySettingsPage';

// New 2 — People
import PeopleDirectory from './pages/People/PeopleDirectory';
import PeopleOrgChart from './pages/People/PeopleOrgChart';
import PeopleOnboarding from './pages/People/PeopleOnboarding';
import PeopleOffboarding from './pages/People/PeopleOffboarding';
import PeopleDocuments from './pages/People/PeopleDocuments';
import PeopleCompliance from './pages/People/PeopleCompliance';

// New 2 — Hiring
import HiringJobPostings from './pages/Hiring/HiringJobPostings';
import HiringInterviews from './pages/Hiring/HiringInterviews';
import HiringOffers from './pages/Hiring/HiringOffers';
import HiringAnalytics from './pages/Hiring/HiringAnalytics';

// New 2 — Payroll
import PayrollRun from './pages/Payroll/PayrollRun';
import PayrollTaxFiling from './pages/Payroll/PayrollTaxFiling';
import PayrollDeductions from './pages/Payroll/PayrollDeductions';
import PayrollContractors from './pages/Payroll/PayrollContractors';

// New 2 — Time
import TimeHub from './pages/Time/TimeHub';
import TimeTracking from './pages/Time/TimeTracking';
import TimeTimeOff from './pages/Time/TimeTimeOff';
import TimeScheduling from './pages/Time/TimeScheduling';
import TimeAttendance from './pages/Time/TimeAttendance';

// New 2 — Benefits
import BenefitsCobra from './pages/Benefits/BenefitsCobra';
import BenefitsAca from './pages/Benefits/BenefitsAca';
import BenefitsReports from './pages/Benefits/BenefitsReports';

// New 2 — Talent
import TalentHub from './pages/Talent/TalentHub';
import TalentPerformance from './pages/Talent/TalentPerformance';
import TalentLearning from './pages/Talent/TalentLearning';
import TalentCompensation from './pages/Talent/TalentCompensation';
import TalentSuccession from './pages/Talent/TalentSuccession';
import TalentCareerPathing from './pages/Talent/TalentCareerPathing';

// New 2 — Analytics
import AnalyticsHub from './pages/Analytics/AnalyticsHub';
import AnalyticsDashboards from './pages/Analytics/AnalyticsDashboards';
import AnalyticsReports from './pages/Analytics/AnalyticsReports';
import AnalyticsWorkforcePlanning from './pages/Analytics/AnalyticsWorkforcePlanning';

// New 2 — Settings
import SettingsCompany from './pages/Settings/SettingsCompany';
import SettingsPermissions from './pages/Settings/SettingsPermissions';
import SettingsWorkflows from './pages/Settings/SettingsWorkflows';
import SettingsIntegrations from './pages/Settings/SettingsIntegrations';
import SettingsNotifications from './pages/Settings/SettingsNotifications';
import SettingsBilling from './pages/Settings/SettingsBilling';

// Upsell
import UpsellPage from './pages/Upsell/UpsellPage';

// ── Hub pages for expansion T1s ─────────────────────────────
import ITHub from './pages/IT/ITHub';
import FinanceHub from './pages/Finance/FinanceHub';
import WorkplaceHub from './pages/Workplace/WorkplaceHub';

// ── BambooIT ────────────────────────────────────────────────
import HelpdeskHub from './pages/Helpdesk/HelpdeskHub';
import HelpdeskTickets from './pages/Helpdesk/HelpdeskTickets';
import HelpdeskServiceCatalog from './pages/Helpdesk/HelpdeskServiceCatalog';
import HelpdeskQueues from './pages/Helpdesk/HelpdeskQueues';
import HelpdeskSla from './pages/Helpdesk/HelpdeskSla';

import IncidentsHub from './pages/Incidents/IncidentsHub';
import IncidentsActive from './pages/Incidents/IncidentsActive';
import IncidentsMajor from './pages/Incidents/IncidentsMajor';
import IncidentsOnCall from './pages/Incidents/IncidentsOnCall';
import IncidentsPostmortems from './pages/Incidents/IncidentsPostmortems';

import AssetsHub from './pages/Assets/AssetsHub';
import AssetsHardware from './pages/Assets/AssetsHardware';
import AssetsSoftware from './pages/Assets/AssetsSoftware';
import AssetsContracts from './pages/Assets/AssetsContracts';
import AssetsLifecycle from './pages/Assets/AssetsLifecycle';

import KnowledgeHub from './pages/Knowledge/KnowledgeHub';
import KnowledgeArticles from './pages/Knowledge/KnowledgeArticles';
import KnowledgeCategories from './pages/Knowledge/KnowledgeCategories';
import KnowledgeDrafts from './pages/Knowledge/KnowledgeDrafts';

import ChangesHub from './pages/Changes/ChangesHub';
import ChangesRequests from './pages/Changes/ChangesRequests';
import ChangesCalendar from './pages/Changes/ChangesCalendar';
import ChangesReleases from './pages/Changes/ChangesReleases';

import DevicesHub from './pages/Devices/DevicesHub';
import DevicesEndpoints from './pages/Devices/DevicesEndpoints';
import DevicesMdmPolicies from './pages/Devices/DevicesMdmPolicies';
import DevicesPatches from './pages/Devices/DevicesPatches';
import DevicesRemoteAccess from './pages/Devices/DevicesRemoteAccess';

import SecurityHub from './pages/Security/SecurityHub';
import SecurityThreats from './pages/Security/SecurityThreats';
import SecurityVulnerabilities from './pages/Security/SecurityVulnerabilities';
import SecurityAccessReviews from './pages/Security/SecurityAccessReviews';
import SecurityCompliance from './pages/Security/SecurityCompliance';

// ── BambooFinance ───────────────────────────────────────────
import ExpensesHub from './pages/Expenses/ExpensesHub';
import ExpensesReports from './pages/Expenses/ExpensesReports';
import ExpensesReceipts from './pages/Expenses/ExpensesReceipts';
import ExpensesMileage from './pages/Expenses/ExpensesMileage';
import ExpensesPerDiems from './pages/Expenses/ExpensesPerDiems';

import CardsHub from './pages/Cards/CardsHub';
import CardsTransactions from './pages/Cards/CardsTransactions';
import CardsControls from './pages/Cards/CardsControls';
import CardsRequests from './pages/Cards/CardsRequests';

import BudgetsHub from './pages/Budgets/BudgetsHub';
import BudgetsDepartment from './pages/Budgets/BudgetsDepartment';
import BudgetsProject from './pages/Budgets/BudgetsProject';
import BudgetsForecasts from './pages/Budgets/BudgetsForecasts';
import BudgetsAlerts from './pages/Budgets/BudgetsAlerts';

import TravelHub from './pages/Travel/TravelHub';
import TravelTrips from './pages/Travel/TravelTrips';
import TravelItineraries from './pages/Travel/TravelItineraries';
import TravelPolicies from './pages/Travel/TravelPolicies';

import ProcurementHub from './pages/Procurement/ProcurementHub';
import ProcurementRequests from './pages/Procurement/ProcurementRequests';
import ProcurementOrders from './pages/Procurement/ProcurementOrders';
import ProcurementVendors from './pages/Procurement/ProcurementVendors';
import ProcurementCatalogs from './pages/Procurement/ProcurementCatalogs';

import InvoicesHub from './pages/Invoices/InvoicesHub';
import InvoicesProcessing from './pages/Invoices/InvoicesProcessing';
import InvoicesMatching from './pages/Invoices/InvoicesMatching';
import InvoicesPayments from './pages/Invoices/InvoicesPayments';

// ── BambooWorkplace ─────────────────────────────────────────
import DesksHub from './pages/Desks/DesksHub';
import DesksBooking from './pages/Desks/DesksBooking';
import DesksNeighborhoods from './pages/Desks/DesksNeighborhoods';
import DesksPolicies from './pages/Desks/DesksPolicies';

import RoomsHub from './pages/Rooms/RoomsHub';
import RoomsBooking from './pages/Rooms/RoomsBooking';
import RoomsDirectory from './pages/Rooms/RoomsDirectory';
import RoomsSignage from './pages/Rooms/RoomsSignage';

import VisitorsHub from './pages/Visitors/VisitorsHub';
import VisitorsCheckIn from './pages/Visitors/VisitorsCheckIn';
import VisitorsInvitations from './pages/Visitors/VisitorsInvitations';
import VisitorsWatchlist from './pages/Visitors/VisitorsWatchlist';

import SpacesHub from './pages/Spaces/SpacesHub';
import SpacesFloorPlans from './pages/Spaces/SpacesFloorPlans';
import SpacesOccupancy from './pages/Spaces/SpacesOccupancy';
import SpacesMoves from './pages/Spaces/SpacesMoves';

import SchedulesHub from './pages/Schedules/SchedulesHub';
import SchedulesHybrid from './pages/Schedules/SchedulesHybrid';
import SchedulesTeams from './pages/Schedules/SchedulesTeams';
import SchedulesOfficeDirectory from './pages/Schedules/SchedulesOfficeDirectory';

import MaintenanceHub from './pages/Maintenance/MaintenanceHub';
import MaintenanceWorkOrders from './pages/Maintenance/MaintenanceWorkOrders';
import MaintenancePreventive from './pages/Maintenance/MaintenancePreventive';
import MaintenanceFacilityAssets from './pages/Maintenance/MaintenanceFacilityAssets';

const LEGACY_KEY = 'bhr-legacy-nav';

function LegacySwitch({ legacy, current }: { legacy: React.ReactElement; current: React.ReactElement }) {
  const isLegacy = localStorage.getItem(LEGACY_KEY) === 'true';
  return isLegacy ? legacy : current;
}

// Automations
import AutomationsHub from './pages/Automations/AutomationsHub';
import AutomationDetail from './pages/Automations/AutomationDetail';

// Slides (presentation layer — above project modes)
import { ProblemSlides } from './components/ProblemSlides/ProblemSlides';
import { FeedbackOverlay } from './components/FeedbackOverlay/FeedbackOverlay';

// Settings
import SettingsHub from './pages/Settings/SettingsHub';
import SettingsAccount from './pages/Settings/SettingsAccount';
import SettingsAccessLevels from './pages/Settings/SettingsAccessLevels';
import SettingsApprovals from './pages/Settings/SettingsApprovals';
import SettingsEmailAlerts from './pages/Settings/SettingsEmailAlerts';
import SettingsBranding from './pages/Settings/SettingsBranding';

function App() {
  return (
    <ChatProvider>
      <ScenarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:conversationId" element={<Chat />} />
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />

                  {/* Style Guide */}
                  <Route path="/style-guide" element={<StyleGuidePage />} />

                  {/* Home */}
                  <Route path="/home" element={<HomeHub />} />
                  <Route path="/home/inbox" element={<HomeInbox />} />
                  <Route path="/home/calendar" element={<HomeCalendar />} />

                  {/* People */}
                  <Route path="/people" element={<PeopleHub />} />
                  <Route path="/people/my-info" element={<PeopleMyInfo />} />
                  <Route path="/people/my-direct-reports" element={<PeopleMyDirectReports />} />
                  <Route path="/people/my-department" element={<PeopleMyDepartment />} />
                  <Route path="/people/my-division" element={<PeopleMyDivision />} />
                  <Route path="/people/divisions" element={<PeopleDivisions />} />
                  <Route path="/people/departments" element={<PeopleDepartments />} />
                  <Route path="/people/teams" element={<PeopleTeams />} />
                  <Route path="/people/directory" element={<PeopleDirectory />} />
                  <Route path="/people/org-chart" element={<PeopleOrgChart />} />
                  <Route path="/people/onboarding" element={<PeopleOnboarding />} />
                  <Route path="/people/offboarding" element={<PeopleOffboarding />} />
                  <Route path="/people/documents" element={<PeopleDocuments />} />
                  <Route path="/people/compliance" element={<PeopleCompliance />} />

                  {/* Hiring */}
                  <Route path="/hiring" element={<HiringHub />} />
                  <Route path="/hiring/job-openings" element={<HiringJobOpenings />} />
                  <Route path="/hiring/job-openings/it-security-engineer" element={<HiringJobOpeningDetail />} />
                  <Route path="/hiring/candidates" element={<HiringCandidates />} />
                  <Route path="/hiring/talent-pools" element={<HiringTalentPools />} />
                  <Route path="/hiring/careers-site" element={<HiringCareersSite />} />
                  <Route path="/hiring/job-postings" element={<HiringJobPostings />} />
                  <Route path="/hiring/interviews" element={<HiringInterviews />} />
                  <Route path="/hiring/offers" element={<HiringOffers />} />
                  <Route path="/hiring/analytics" element={<HiringAnalytics />} />

                  {/* Onboarding */}
                  <Route path="/onboarding" element={<OnboardingHub />} />
                  <Route path="/onboarding/active" element={<OnboardingActive />} />
                  <Route path="/onboarding/task-templates" element={<OnboardingTaskTemplates />} />
                  <Route path="/onboarding/new-hire-packets" element={<OnboardingNewHirePackets />} />

                  {/* Offboarding */}
                  <Route path="/offboarding" element={<OnboardingOffboarding />} />

                  {/* Payroll */}
                  <Route path="/payroll" element={<PayrollHub />} />
                  <Route path="/payroll/pay-calendar" element={<PayrollPayCalendar />} />
                  <Route path="/payroll/history" element={<PayrollHistory />} />
                  <Route path="/payroll/off-cycle" element={<PayrollOffCycle />} />
                  <Route path="/payroll/reports" element={<PayrollReports />} />
                  <Route path="/payroll/run" element={<PayrollRun />} />
                  <Route path="/payroll/tax-filing" element={<PayrollTaxFiling />} />
                  <Route path="/payroll/deductions" element={<PayrollDeductions />} />
                  <Route path="/payroll/contractors" element={<PayrollContractors />} />

                  {/* Benefits */}
                  <Route path="/benefits" element={<BenefitsHub />} />
                  <Route path="/benefits/plans" element={<BenefitsPlans />} />
                  <Route path="/benefits/enrollment" element={<BenefitsEnrollment />} />
                  <Route path="/benefits/carriers" element={<BenefitsCarriers />} />
                  <Route path="/benefits/cobra" element={<BenefitsCobra />} />
                  <Route path="/benefits/aca" element={<BenefitsAca />} />
                  <Route path="/benefits/reports" element={<BenefitsReports />} />

                  {/* Performance */}
                  <Route path="/performance" element={<PerformanceHub />} />
                  <Route path="/performance/goals" element={<PerformanceGoals />} />
                  <Route path="/performance/reviews" element={<PerformanceReviews />} />
                  <Route path="/performance/feedback" element={<PerformanceFeedback />} />
                  <Route path="/performance/one-on-ones" element={<PerformanceOneOnOnes />} />

                  {/* Training */}
                  <Route path="/training" element={<TrainingHub />} />
                  <Route path="/training/catalog" element={<TrainingCatalog />} />
                  <Route path="/training/assignments" element={<TrainingAssignments />} />
                  <Route path="/training/certifications" element={<TrainingCertifications />} />

                  {/* Compensation */}
                  <Route path="/compensation" element={<CompensationHub />} />
                  <Route path="/compensation/benchmarks" element={<CompensationBenchmarks />} />
                  <Route path="/compensation/levels-and-bands" element={<CompensationLevelsBands />} />
                  <Route path="/compensation/planning" element={<CompensationPlanning />} />
                  <Route path="/compensation/total-rewards" element={<CompensationTotalRewards />} />

                  {/* Culture (New 2 only) */}
                  <Route path="/culture" element={<CultureHub />} />
                  <Route path="/culture/community" element={<CultureCommunity />} />
                  <Route path="/culture/rewards" element={<CultureRewards />} />
                  <Route path="/culture/recognition" element={<CultureRecognition />} />
                  <Route path="/culture/wellbeing" element={<CultureWellbeing />} />
                  <Route path="/culture/surveys" element={<CultureSurveys />} />

                  {/* Standalone culture T1s (New only) */}
                  <Route path="/employee-community" element={<EmployeeCommunityHub />} />
                  <Route path="/rewards-recognition" element={<RewardsRecognitionHub />} />
                  <Route path="/wellbeing" element={<WellbeingHub />} />

                  {/* Time & Attendance */}
                  <Route path="/time-and-attendance" element={<TimeAttendanceHub />} />
                  <Route path="/time-and-attendance/calendar" element={<TimeAttendanceCalendar />} />
                  <Route path="/time-and-attendance/time-off" element={<TimeAttendanceTimeOff />} />
                  <Route path="/time-and-attendance/timesheets" element={<TimeAttendanceTimesheets />} />

                  {/* Time (New 2) */}
                  <Route path="/time" element={<TimeHub />} />
                  <Route path="/time/tracking" element={<TimeTracking />} />
                  <Route path="/time/time-off" element={<TimeTimeOff />} />
                  <Route path="/time/scheduling" element={<TimeScheduling />} />
                  <Route path="/time/attendance" element={<TimeAttendance />} />

                  {/* Talent (New 2) */}
                  <Route path="/talent" element={<TalentHub />} />
                  <Route path="/talent/performance" element={<TalentPerformance />} />
                  <Route path="/talent/learning" element={<TalentLearning />} />
                  <Route path="/talent/compensation" element={<TalentCompensation />} />
                  <Route path="/talent/succession" element={<TalentSuccession />} />
                  <Route path="/talent/career-pathing" element={<TalentCareerPathing />} />

                  {/* Analytics (New 2) */}
                  <Route path="/analytics" element={<AnalyticsHub />} />
                  <Route path="/analytics/dashboards" element={<AnalyticsDashboards />} />
                  <Route path="/analytics/reports" element={<AnalyticsReports />} />
                  <Route path="/analytics/workforce-planning" element={<AnalyticsWorkforcePlanning />} />

                  {/* Reports */}
                  <Route path="/reports" element={<LegacySwitch legacy={<LegacyReportsPage />} current={<ReportsHub />} />} />
                  <Route path="/reports/standard" element={<ReportsStandard />} />
                  <Route path="/reports/custom" element={<ReportsCustom />} />
                  <Route path="/reports/benchmarks" element={<ReportsBenchmarks />} />
                  <Route path="/reports/dashboards" element={<ReportsDashboards />} />
                  <Route path="/reports/metric/:name" element={<MetricReport />} />
                  <Route path="/reports/view/:name" element={<ReportDetail />} />

                  {/* Files */}
                  <Route path="/files" element={<LegacySwitch legacy={<LegacyFilesPage />} current={<FilesHub />} />} />
                  <Route path="/files/all" element={<FilesAll />} />
                  <Route path="/files/e-signatures" element={<FilesESignatures />} />
                  <Route path="/files/view/:name" element={<FileDetail />} />

                  {/* Apps */}
                  <Route path="/apps" element={<AppsHub />} />
                  <Route path="/apps/marketplace" element={<AppsMarketplace />} />
                  <Route path="/apps/installed" element={<AppsInstalled />} />
                  <Route path="/apps/api-access" element={<AppsApiAccess />} />

                  {/* Automations */}
                  <Route path="/automations" element={<AutomationsHub />} />
                  <Route path="/automations/:id" element={<AutomationDetail />} />

                  {/* Upsell */}
                  <Route path="/upsell/:slug" element={<UpsellPage />} />

                  {/* Settings */}
                  <Route path="/settings" element={<LegacySwitch legacy={<LegacySettingsPage />} current={<SettingsHub />} />} />
                  <Route path="/settings/account" element={<SettingsAccount />} />
                  <Route path="/settings/access-levels" element={<SettingsAccessLevels />} />
                  <Route path="/settings/approvals" element={<SettingsApprovals />} />
                  <Route path="/settings/email-alerts" element={<SettingsEmailAlerts />} />
                  <Route path="/settings/branding" element={<SettingsBranding />} />
                  <Route path="/settings/company" element={<SettingsCompany />} />
                  <Route path="/settings/permissions" element={<SettingsPermissions />} />
                  <Route path="/settings/workflows" element={<SettingsWorkflows />} />
                  <Route path="/settings/integrations" element={<SettingsIntegrations />} />
                  <Route path="/settings/notifications" element={<SettingsNotifications />} />
                  <Route path="/settings/billing" element={<SettingsBilling />} />

                  {/* ── IT (expansion) ─────────────────────── */}
                  <Route path="/it" element={<ITHub />} />
                  <Route path="/it/helpdesk" element={<HelpdeskHub />} />
                  <Route path="/it/helpdesk/tickets" element={<HelpdeskTickets />} />
                  <Route path="/it/helpdesk/service-catalog" element={<HelpdeskServiceCatalog />} />
                  <Route path="/it/helpdesk/queues" element={<HelpdeskQueues />} />
                  <Route path="/it/helpdesk/sla" element={<HelpdeskSla />} />
                  <Route path="/it/incidents" element={<IncidentsHub />} />
                  <Route path="/it/incidents/active" element={<IncidentsActive />} />
                  <Route path="/it/incidents/major" element={<IncidentsMajor />} />
                  <Route path="/it/incidents/on-call" element={<IncidentsOnCall />} />
                  <Route path="/it/incidents/postmortems" element={<IncidentsPostmortems />} />
                  <Route path="/it/assets" element={<AssetsHub />} />
                  <Route path="/it/assets/hardware" element={<AssetsHardware />} />
                  <Route path="/it/assets/software" element={<AssetsSoftware />} />
                  <Route path="/it/assets/contracts" element={<AssetsContracts />} />
                  <Route path="/it/assets/lifecycle" element={<AssetsLifecycle />} />
                  <Route path="/it/knowledge" element={<KnowledgeHub />} />
                  <Route path="/it/knowledge/articles" element={<KnowledgeArticles />} />
                  <Route path="/it/knowledge/categories" element={<KnowledgeCategories />} />
                  <Route path="/it/knowledge/drafts" element={<KnowledgeDrafts />} />
                  <Route path="/it/changes" element={<ChangesHub />} />
                  <Route path="/it/changes/requests" element={<ChangesRequests />} />
                  <Route path="/it/changes/calendar" element={<ChangesCalendar />} />
                  <Route path="/it/changes/releases" element={<ChangesReleases />} />
                  <Route path="/it/devices" element={<DevicesHub />} />
                  <Route path="/it/devices/endpoints" element={<DevicesEndpoints />} />
                  <Route path="/it/devices/mdm-policies" element={<DevicesMdmPolicies />} />
                  <Route path="/it/devices/patches" element={<DevicesPatches />} />
                  <Route path="/it/devices/remote-access" element={<DevicesRemoteAccess />} />
                  <Route path="/it/security" element={<SecurityHub />} />
                  <Route path="/it/security/threats" element={<SecurityThreats />} />
                  <Route path="/it/security/vulnerabilities" element={<SecurityVulnerabilities />} />
                  <Route path="/it/security/access-reviews" element={<SecurityAccessReviews />} />
                  <Route path="/it/security/compliance" element={<SecurityCompliance />} />

                  {/* ── Finance (expansion) ───────────────── */}
                  <Route path="/finance" element={<FinanceHub />} />
                  <Route path="/finance/expenses" element={<ExpensesHub />} />
                  <Route path="/finance/expenses/reports" element={<ExpensesReports />} />
                  <Route path="/finance/expenses/receipts" element={<ExpensesReceipts />} />
                  <Route path="/finance/expenses/mileage" element={<ExpensesMileage />} />
                  <Route path="/finance/expenses/per-diems" element={<ExpensesPerDiems />} />
                  <Route path="/finance/cards" element={<CardsHub />} />
                  <Route path="/finance/cards/transactions" element={<CardsTransactions />} />
                  <Route path="/finance/cards/controls" element={<CardsControls />} />
                  <Route path="/finance/cards/requests" element={<CardsRequests />} />
                  <Route path="/finance/budgets" element={<BudgetsHub />} />
                  <Route path="/finance/budgets/department" element={<BudgetsDepartment />} />
                  <Route path="/finance/budgets/project" element={<BudgetsProject />} />
                  <Route path="/finance/budgets/forecasts" element={<BudgetsForecasts />} />
                  <Route path="/finance/budgets/alerts" element={<BudgetsAlerts />} />
                  <Route path="/finance/travel" element={<TravelHub />} />
                  <Route path="/finance/travel/trips" element={<TravelTrips />} />
                  <Route path="/finance/travel/itineraries" element={<TravelItineraries />} />
                  <Route path="/finance/travel/policies" element={<TravelPolicies />} />
                  <Route path="/finance/procurement" element={<ProcurementHub />} />
                  <Route path="/finance/procurement/requests" element={<ProcurementRequests />} />
                  <Route path="/finance/procurement/orders" element={<ProcurementOrders />} />
                  <Route path="/finance/procurement/vendors" element={<ProcurementVendors />} />
                  <Route path="/finance/procurement/catalogs" element={<ProcurementCatalogs />} />
                  <Route path="/finance/invoices" element={<InvoicesHub />} />
                  <Route path="/finance/invoices/processing" element={<InvoicesProcessing />} />
                  <Route path="/finance/invoices/matching" element={<InvoicesMatching />} />
                  <Route path="/finance/invoices/payments" element={<InvoicesPayments />} />

                  {/* ── Workplace (expansion) ─────────────── */}
                  <Route path="/workplace" element={<WorkplaceHub />} />
                  <Route path="/workplace/desks" element={<DesksHub />} />
                  <Route path="/workplace/desks/booking" element={<DesksBooking />} />
                  <Route path="/workplace/desks/neighborhoods" element={<DesksNeighborhoods />} />
                  <Route path="/workplace/desks/policies" element={<DesksPolicies />} />
                  <Route path="/workplace/rooms" element={<RoomsHub />} />
                  <Route path="/workplace/rooms/booking" element={<RoomsBooking />} />
                  <Route path="/workplace/rooms/directory" element={<RoomsDirectory />} />
                  <Route path="/workplace/rooms/signage" element={<RoomsSignage />} />
                  <Route path="/workplace/visitors" element={<VisitorsHub />} />
                  <Route path="/workplace/visitors/check-in" element={<VisitorsCheckIn />} />
                  <Route path="/workplace/visitors/invitations" element={<VisitorsInvitations />} />
                  <Route path="/workplace/visitors/watchlist" element={<VisitorsWatchlist />} />
                  <Route path="/workplace/spaces" element={<SpacesHub />} />
                  <Route path="/workplace/spaces/floor-plans" element={<SpacesFloorPlans />} />
                  <Route path="/workplace/spaces/occupancy" element={<SpacesOccupancy />} />
                  <Route path="/workplace/spaces/moves" element={<SpacesMoves />} />
                  <Route path="/workplace/schedules" element={<SchedulesHub />} />
                  <Route path="/workplace/schedules/hybrid" element={<SchedulesHybrid />} />
                  <Route path="/workplace/schedules/teams" element={<SchedulesTeams />} />
                  <Route path="/workplace/schedules/office-directory" element={<SchedulesOfficeDirectory />} />
                  <Route path="/workplace/maintenance" element={<MaintenanceHub />} />
                  <Route path="/workplace/maintenance/work-orders" element={<MaintenanceWorkOrders />} />
                  <Route path="/workplace/maintenance/preventive" element={<MaintenancePreventive />} />
                  <Route path="/workplace/maintenance/facility-assets" element={<MaintenanceFacilityAssets />} />

                  {/* Legacy redirects */}
                  <Route path="/my-info" element={<Navigate to="/people/my-info" replace />} />
                  <Route path="/inbox" element={<Navigate to="/home/inbox" replace />} />
                  <Route path="/doom" element={<Doom />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
        <ProblemSlides />
        <FeedbackOverlay />
      </BrowserRouter>
      </ScenarioProvider>
    </ChatProvider>
  );
}

export default App;
