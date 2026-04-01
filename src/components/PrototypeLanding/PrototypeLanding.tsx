import bambooLogo from '../../assets/images/bamboo-logo.png';
import daveAvatar from '../../assets/images/dave-avatar.jpeg';
import { Icon } from '../Icon';

const PROTOTYPES = [
  {
    id: 'legacy',
    label: 'Legacy',
    description: 'Reconstruction of the current BambooHR navigation for side-by-side comparison.',
    icon: 'skull' as const,
    color: '#f87171',
  },
  {
    id: 'new',
    label: 'New',
    description: 'Research-driven IA with four-tier hierarchy (T0/T1/T2/T3), 11 domains, unified nav model, and formalized governance rules.',
    icon: 'compass' as const,
    color: '#34d399',
  },
  {
    id: 'space',
    label: 'Space Exploration',
    description: 'Radical reimagining — widget-based home, app-model navigation, AI-first platform concept.',
    icon: 'rocket' as const,
    color: '#60a5fa',
  },
];

const LEGACY_KEY = 'bhr-legacy-nav';

function selectPrototype(id: string) {
  const storageValues: Record<string, string> = {
    legacy: 'true',
    new: 'false',
    new2: 'new2',
    space: 'space',
  };
  localStorage.setItem(LEGACY_KEY, storageValues[id] || 'false');
  window.dispatchEvent(new Event('storage'));
}

function openSlides() {
  window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
}

export default function PrototypeLanding() {
  const totalSlides = 6 + 7 + 7 + 5; // intro + problems + solutions + space
  const totalDocs = 15;
  const totalPrototypes = 3;

  return (
    <div className="flex-1 flex items-center justify-center overflow-y-auto" style={{ backgroundColor: '#141414' }}>
      <div style={{ maxWidth: 640, width: '100%', padding: '48px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
          <img src={bambooLogo} alt="" style={{ width: 48, height: 48, objectFit: 'contain', marginBottom: 16 }} />
          <h1 style={{
            fontFamily: "'Fields', Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.2,
          }}>
            BHR IA Project
          </h1>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 14,
            color: 'rgba(255,255,255,0.35)',
            textAlign: 'center',
            marginTop: 8,
            lineHeight: 1.5,
          }}>
            Goals, vision, and prototypes for BambooHR's information architecture redesign.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <img src={daveAvatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
            <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Dave Lesue</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>|</span>
            <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Last updated March 20, 2026</span>
          </div>
        </div>

        {/* Present button */}
        <button
          onClick={openSlides}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '14px 24px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 150ms',
            marginBottom: 32,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          <Icon name="play" size={12} />
          Present
        </button>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 32,
        }}>
          {[
            { label: 'Prototypes', value: totalPrototypes },
            { label: 'Slides', value: totalSlides },
            { label: 'Docs', value: totalDocs },
          ].map(stat => (
            <div key={stat.label} style={{
              textAlign: 'center',
              padding: '12px 8px',
              borderRadius: 8,
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{stat.value}</div>
              <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Prototypes list */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 9,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: 10,
            paddingLeft: 2,
          }}>
            Prototypes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PROTOTYPES.map(proto => (
              <button
                key={proto.id}
                onClick={() => selectPrototype(proto.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  backgroundColor: `${proto.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  <Icon name={proto.icon} size={12} style={{ color: proto.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>{proto.label}</div>
                  <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{proto.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
