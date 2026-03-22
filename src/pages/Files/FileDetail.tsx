import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { ContentBlock } from '../../components/ContentBlock';

export default function FileDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const title = decodeURIComponent(name || 'File');

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-[13px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors mb-1"
      >
        <Icon name="chevron-left" size={10} />
        Back
      </button>
      <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-neutral-weak)] mb-2">
        <Link to="/files" className="text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)] transition-colors">Files</Link>
        <Icon name="chevron-right" size={8} />
        <span>{title}</span>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">{title}</h1>
      <ContentBlock height={400} />
    </div>
  );
}
