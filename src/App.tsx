import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { ChatProvider } from './contexts/ChatContext';
import { ScenarioProvider } from './contexts/ScenarioContext';
import { Chat } from './pages/Chat';

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

const LEGACY_KEY = 'bhr-legacy-nav';

function LegacySwitch({ legacy, current }: { legacy: React.ReactElement; current: React.ReactElement }) {
  const isLegacy = localStorage.getItem(LEGACY_KEY) === 'true';
  return isLegacy ? legacy : current;
}

// Automations
import AutomationsHub from './pages/Automations/AutomationsHub';
import AutomationDetail from './pages/Automations/AutomationDetail';

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

                  {/* Legacy redirects */}
                  <Route path="/my-info" element={<Navigate to="/people/my-info" replace />} />
                  <Route path="/inbox" element={<Navigate to="/home/inbox" replace />} />
                  <Route path="/doom" element={<Doom />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      </ScenarioProvider>
    </ChatProvider>
  );
}

export default App;
