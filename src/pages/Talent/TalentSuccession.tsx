import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function TalentSuccession() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Succession Planning</h1>
      <div className="space-y-4">
        <ContentBlock height={200} />
        <ContentBlock height={270} />
      </div>
    </div>
  );
}
