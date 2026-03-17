import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function PayrollTaxFiling() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Tax Filing & Forms</h1>
      <div className="space-y-4">
        <ContentBlock height={160} />
        <ContentBlock height={260} />
        <ContentBlock height={170} />
      </div>
    </div>
  );
}
