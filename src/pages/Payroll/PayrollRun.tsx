import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function PayrollRun() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Run Payroll</h1>
      <div className="space-y-4">
        <ContentBlock height={190} />
        <ContentBlock height={300} />
      </div>
    </div>
  );
}
