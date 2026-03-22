import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '../../components';
import { JobWizardSidebar } from '../../components/JobWizardSidebar';
import { JobInformationForm } from '../../components/JobInformationForm';

export function CreateJobOpening() {
  const navigate = useNavigate();

  const steps = [
    { id: 'job-information', label: 'Job Information', completed: false, active: true },
    { id: 'application-questions', label: 'Application Questions', completed: false, active: false },
    { id: 'job-pipeline', label: 'Job Pipeline', completed: false, active: false },
    { id: 'automated-emails', label: 'Automated Emails', completed: false, active: false },
    { id: 'job-boards', label: 'Job Boards', completed: false, active: false },
  ];

  const handleNextStep = () => {
    // Navigate to next step logic
    console.log('Next step');
  };

  const handleSaveAndFinishLater = () => {
    // Save and return to hiring page
    navigate('/hiring');
  };

  const handleCancel = () => {
    // Return to hiring page without saving
    navigate('/hiring');
  };

  const handleBackToJobOpenings = () => {
    navigate('/hiring');
  };

  return (
    <div className="flex flex-col p-10 min-h-screen">
      {/* Back + Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1"
      >
        <Icon name="chevron-left" size={10} />
        Back
      </button>
      <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
        <Link to="/hiring" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Hiring</Link>
        <Icon name="chevron-right" size={8} />
        <span>Create Job Opening</span>
      </div>

      {/* Page title */}
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="font-['Fields'] text-[52px] font-bold leading-[62px] text-[var(--color-primary-strong)]">
          Create Job Opening
        </h1>
      </div>

      {/* Main content: Sidebar + Form */}
      <div className="flex gap-10">
        {/* Left Sidebar */}
        <JobWizardSidebar
          steps={steps}
          onNextStep={handleNextStep}
          onSaveAndFinishLater={handleSaveAndFinishLater}
          onCancel={handleCancel}
        />

        {/* Right Content */}
        <div className="flex-1 bg-[var(--surface-neutral-white)] rounded-[var(--radius-small)] border border-[var(--border-neutral-x-weak)] overflow-hidden"
          style={{ boxShadow: '2px 2px 0px 2px rgba(56, 49, 47, 0.05)' }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 px-8 pt-5 pb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-x-small)] bg-[var(--surface-neutral-x-weak)]">
              <Icon name="circle-info" size={16} className="text-[var(--color-primary-strong)]" style={{ fontWeight: 900 }} />
            </div>
            <h2 className="font-['Fields'] text-[26px] font-semibold leading-[34px] text-[var(--color-primary-strong)]">
              Job Information
            </h2>
          </div>

          {/* Form Content */}
          <div className="px-8 pb-8">
            <JobInformationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJobOpening;
