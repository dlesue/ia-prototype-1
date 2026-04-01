import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

export default function PeopleMyDivision() {
  return (
    <div className="p-6 flex flex-col flex-1">
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">My Division</h1>
      <ContentBlock fillHeight showJtbd />
    </div>
  );
}
