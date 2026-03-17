import { Placeholder } from '../../components/Placeholder/Placeholder';

export default function HomeInbox() {
  return (
    <div style={{ padding: 24 }}>
      <h1 className="text-2xl font-bold text-[var(--text-neutral-xx-strong)] mb-6">Inbox</h1>
      <Placeholder variant="table" />
    </div>
  );
}
