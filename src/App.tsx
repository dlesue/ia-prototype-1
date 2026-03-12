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
import PeopleHubPage from './pages/People/PeopleHubPage';
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
import CultureRecognition from './pages/Culture/CultureRecognition';
import CultureSurveys from './pages/Culture/CultureSurveys';

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

// Files
import FilesHub from './pages/Files/FilesHub';
import FilesAll from './pages/Files/FilesAll';
import FilesESignatures from './pages/Files/FilesESignatures';

// Apps
import AppsHub from './pages/Apps/AppsHub';
import AppsMarketplace from './pages/Apps/AppsMarketplace';
import AppsInstalled from './pages/Apps/AppsInstalled';
import AppsApiAccess from './pages/Apps/AppsApiAccess';

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
                  <Route path="/people/hub" element={<PeopleHubPage />} />
                  <Route path="/people/divisions" element={<PeopleDivisions />} />
                  <Route path="/people/departments" element={<PeopleDepartments />} />
                  <Route path="/people/teams" element={<PeopleTeams />} />

                  {/* Hiring */}
                  <Route path="/hiring" element={<HiringHub />} />
                  <Route path="/hiring/job-openings" element={<HiringJobOpenings />} />
                  <Route path="/hiring/candidates" element={<HiringCandidates />} />
                  <Route path="/hiring/talent-pools" element={<HiringTalentPools />} />
                  <Route path="/hiring/careers-site" element={<HiringCareersSite />} />

                  {/* Onboarding */}
                  <Route path="/onboarding" element={<OnboardingHub />} />
                  <Route path="/onboarding/active" element={<OnboardingActive />} />
                  <Route path="/onboarding/offboarding" element={<OnboardingOffboarding />} />
                  <Route path="/onboarding/task-templates" element={<OnboardingTaskTemplates />} />
                  <Route path="/onboarding/new-hire-packets" element={<OnboardingNewHirePackets />} />

                  {/* Payroll */}
                  <Route path="/payroll" element={<PayrollHub />} />
                  <Route path="/payroll/pay-calendar" element={<PayrollPayCalendar />} />
                  <Route path="/payroll/history" element={<PayrollHistory />} />
                  <Route path="/payroll/off-cycle" element={<PayrollOffCycle />} />
                  <Route path="/payroll/reports" element={<PayrollReports />} />

                  {/* Benefits */}
                  <Route path="/benefits" element={<BenefitsHub />} />
                  <Route path="/benefits/plans" element={<BenefitsPlans />} />
                  <Route path="/benefits/enrollment" element={<BenefitsEnrollment />} />
                  <Route path="/benefits/carriers" element={<BenefitsCarriers />} />

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

                  {/* Culture */}
                  <Route path="/culture" element={<CultureHub />} />
                  <Route path="/culture/community" element={<CultureCommunity />} />
                  <Route path="/culture/recognition" element={<CultureRecognition />} />
                  <Route path="/culture/surveys" element={<CultureSurveys />} />

                  {/* Time & Attendance */}
                  <Route path="/time-and-attendance" element={<TimeAttendanceHub />} />
                  <Route path="/time-and-attendance/calendar" element={<TimeAttendanceCalendar />} />
                  <Route path="/time-and-attendance/time-off" element={<TimeAttendanceTimeOff />} />
                  <Route path="/time-and-attendance/timesheets" element={<TimeAttendanceTimesheets />} />

                  {/* Reports */}
                  <Route path="/reports" element={<ReportsHub />} />
                  <Route path="/reports/standard" element={<ReportsStandard />} />
                  <Route path="/reports/custom" element={<ReportsCustom />} />
                  <Route path="/reports/benchmarks" element={<ReportsBenchmarks />} />
                  <Route path="/reports/dashboards" element={<ReportsDashboards />} />

                  {/* Files */}
                  <Route path="/files" element={<FilesHub />} />
                  <Route path="/files/all" element={<FilesAll />} />
                  <Route path="/files/e-signatures" element={<FilesESignatures />} />

                  {/* Apps */}
                  <Route path="/apps" element={<AppsHub />} />
                  <Route path="/apps/marketplace" element={<AppsMarketplace />} />
                  <Route path="/apps/installed" element={<AppsInstalled />} />
                  <Route path="/apps/api-access" element={<AppsApiAccess />} />

                  {/* Settings */}
                  <Route path="/settings" element={<SettingsHub />} />
                  <Route path="/settings/account" element={<SettingsAccount />} />
                  <Route path="/settings/access-levels" element={<SettingsAccessLevels />} />
                  <Route path="/settings/approvals" element={<SettingsApprovals />} />
                  <Route path="/settings/email-alerts" element={<SettingsEmailAlerts />} />
                  <Route path="/settings/branding" element={<SettingsBranding />} />

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
