import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function PeopleCompliance() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Compliance</h1>
      <div className="space-y-4">
        <ContentBlock height={200} />
        <ContentBlock height={280} />
      </div>
    </div>
  );
}
