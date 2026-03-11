import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { ChatProvider } from './contexts/ChatContext';
import { Chat } from './pages/Chat';

// Existing pages
import { MyInfo } from './pages/MyInfo';
import { Doom } from './pages/Doom';

// New pages - created and available
import HomeInbox from './pages/Home/HomeInbox';
import HomeCalendar from './pages/Home/HomeCalendar';
import PeopleHub from './pages/People/PeopleHub';
import PeopleHubPage from './pages/People/PeopleHubPage';
import PeopleMyInfo from './pages/People/PeopleMyInfo';
import PeopleMyDirectReports from './pages/People/PeopleMyDirectReports';
import PeopleMyDepartment from './pages/People/PeopleMyDepartment';
import PeopleMyDivision from './pages/People/PeopleMyDivision';
import PeopleDivisions from './pages/People/PeopleDivisions';
import PeopleDepartments from './pages/People/PeopleDepartments';
import PeopleTeams from './pages/People/PeopleTeams';
import HiringHub from './pages/Hiring/HiringHub';
import HiringJobOpenings from './pages/Hiring/HiringJobOpenings';
import HiringCandidates from './pages/Hiring/HiringCandidates';

// Placeholder for pages still being built
function ComingSoon({ name }: { name: string }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl"
        style={{ background: "var(--color-primary-weak)" }}>
        🚧
      </div>
      <h2 className="text-xl font-semibold text-[var(--text-neutral-xx-strong)] mb-2">{name}</h2>
      <p className="text-sm text-[var(--text-neutral-medium)]">This page is coming soon.</p>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:conversationId" element={<Chat />} />
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home/inbox" replace />} />

                  {/* Home */}
                  <Route path="/home" element={<Navigate to="/home/inbox" replace />} />
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
                  <Route path="/hiring/talent-pools" element={<ComingSoon name="Talent Pools" />} />
                  <Route path="/hiring/careers-site" element={<ComingSoon name="Careers Site" />} />

                  {/* Onboarding */}
                  <Route path="/onboarding" element={<Navigate to="/onboarding/active" replace />} />
                  <Route path="/onboarding/active" element={<ComingSoon name="Active Onboarding" />} />
                  <Route path="/onboarding/offboarding" element={<ComingSoon name="Active Offboarding" />} />
                  <Route path="/onboarding/task-templates" element={<ComingSoon name="Task Templates" />} />
                  <Route path="/onboarding/new-hire-packets" element={<ComingSoon name="New Hire Packets" />} />

                  {/* Payroll */}
                  <Route path="/payroll" element={<Navigate to="/payroll/pay-calendar" replace />} />
                  <Route path="/payroll/pay-calendar" element={<ComingSoon name="Pay Calendar" />} />
                  <Route path="/payroll/history" element={<ComingSoon name="Payroll History" />} />
                  <Route path="/payroll/off-cycle" element={<ComingSoon name="Off-Cycle Payroll" />} />
                  <Route path="/payroll/reports" element={<ComingSoon name="Payroll Reports" />} />

                  {/* Benefits */}
                  <Route path="/benefits" element={<Navigate to="/benefits/plans" replace />} />
                  <Route path="/benefits/plans" element={<ComingSoon name="Benefits Plans" />} />
                  <Route path="/benefits/enrollment" element={<ComingSoon name="Enrollment" />} />
                  <Route path="/benefits/carriers" element={<ComingSoon name="Carriers" />} />

                  {/* Performance */}
                  <Route path="/performance" element={<Navigate to="/performance/goals" replace />} />
                  <Route path="/performance/goals" element={<ComingSoon name="Goals & OKRs" />} />
                  <Route path="/performance/reviews" element={<ComingSoon name="Reviews" />} />
                  <Route path="/performance/feedback" element={<ComingSoon name="Feedback" />} />
                  <Route path="/performance/one-on-ones" element={<ComingSoon name="1:1s" />} />

                  {/* Training */}
                  <Route path="/training" element={<Navigate to="/training/catalog" replace />} />
                  <Route path="/training/catalog" element={<ComingSoon name="Training Catalog" />} />
                  <Route path="/training/assignments" element={<ComingSoon name="Assignments" />} />
                  <Route path="/training/certifications" element={<ComingSoon name="Certifications" />} />

                  {/* Compensation */}
                  <Route path="/compensation" element={<Navigate to="/compensation/benchmarks" replace />} />
                  <Route path="/compensation/benchmarks" element={<ComingSoon name="Benchmarks" />} />
                  <Route path="/compensation/levels-and-bands" element={<ComingSoon name="Levels & Bands" />} />
                  <Route path="/compensation/planning" element={<ComingSoon name="Compensation Planning" />} />
                  <Route path="/compensation/total-rewards" element={<ComingSoon name="Total Rewards" />} />

                  {/* Culture */}
                  <Route path="/culture" element={<Navigate to="/culture/community" replace />} />
                  <Route path="/culture/community" element={<ComingSoon name="Community" />} />
                  <Route path="/culture/recognition" element={<ComingSoon name="Recognition" />} />
                  <Route path="/culture/surveys" element={<ComingSoon name="Surveys & Wellbeing" />} />

                  {/* Time & Attendance */}
                  <Route path="/time-and-attendance" element={<Navigate to="/time-and-attendance/calendar" replace />} />
                  <Route path="/time-and-attendance/calendar" element={<ComingSoon name="Calendar" />} />
                  <Route path="/time-and-attendance/time-off" element={<ComingSoon name="Time Off" />} />
                  <Route path="/time-and-attendance/timesheets" element={<ComingSoon name="Timesheets" />} />

                  {/* Reports */}
                  <Route path="/reports" element={<Navigate to="/reports/standard" replace />} />
                  <Route path="/reports/standard" element={<ComingSoon name="Standard Reports" />} />
                  <Route path="/reports/custom" element={<ComingSoon name="Custom Reports" />} />
                  <Route path="/reports/benchmarks" element={<ComingSoon name="Benchmarks" />} />
                  <Route path="/reports/dashboards" element={<ComingSoon name="Dashboards" />} />

                  {/* Files */}
                  <Route path="/files" element={<Navigate to="/files/all" replace />} />
                  <Route path="/files/all" element={<ComingSoon name="All Files" />} />
                  <Route path="/files/e-signatures" element={<ComingSoon name="E-Signatures" />} />

                  {/* Apps */}
                  <Route path="/apps" element={<Navigate to="/apps/marketplace" replace />} />
                  <Route path="/apps/marketplace" element={<ComingSoon name="Marketplace" />} />
                  <Route path="/apps/installed" element={<ComingSoon name="Installed Apps" />} />
                  <Route path="/apps/api-access" element={<ComingSoon name="API Access" />} />

                  {/* Settings */}
                  <Route path="/settings" element={<Navigate to="/settings/account" replace />} />
                  <Route path="/settings/account" element={<ComingSoon name="Account" />} />
                  <Route path="/settings/access-levels" element={<ComingSoon name="Access Levels" />} />
                  <Route path="/settings/approvals" element={<ComingSoon name="Approvals" />} />
                  <Route path="/settings/email-alerts" element={<ComingSoon name="Email Alerts" />} />
                  <Route path="/settings/branding" element={<ComingSoon name="Branding" />} />

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
    </ChatProvider>
  );
}

export default App;
