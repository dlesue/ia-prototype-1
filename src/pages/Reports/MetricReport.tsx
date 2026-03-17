import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { ContentBlock } from '../../components/ContentBlock';

export default function MetricReport() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const title = decodeURIComponent(name || 'Report');

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-4"
      >
        <Icon name="angle-left" size={12} />
        Back
      </button>
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">{title}</h1>
      <div className="space-y-6">
        <ContentBlock height={320} />
        <div className="flex gap-4">
          <div className="flex-1"><ContentBlock height={200} /></div>
          <div className="flex-1"><ContentBlock height={200} /></div>
        </div>
      </div>
    </div>
  );
}
