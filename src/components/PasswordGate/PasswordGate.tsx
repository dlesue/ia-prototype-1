import { useState } from 'react';

const PASSWORD = 'crane-7294';
const STORAGE_KEY = 'ia_prototype_unlocked';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(STORAGE_KEY) === '1');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '40px 48px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        minWidth: 320,
      }}>
        <img src="/favicon.svg" alt="" style={{ width: 40, height: 40 }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#111', marginBottom: 4 }}>BambooHR Prototype</div>
          <div style={{ color: '#666', fontSize: 14 }}>Enter the password to continue</div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 14px',
              border: error ? '1.5px solid #e53e3e' : '1.5px solid #d1d5db',
              borderRadius: 8,
              fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && <div style={{ color: '#e53e3e', fontSize: 13, marginTop: -4 }}>Incorrect password</div>}
          <button
            type="submit"
            style={{
              background: '#00a04b',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
