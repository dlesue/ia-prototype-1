import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function HiringAnalytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Hiring Analytics</h1>
      <div className="space-y-4">
        <ContentBlock height={180} />
        <ContentBlock height={240} />
        <ContentBlock height={200} />
      </div>
    </div>
  );
}
