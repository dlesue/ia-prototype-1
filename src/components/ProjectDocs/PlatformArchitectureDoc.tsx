/**
 * Platform Architecture doc — auto-generated from personas-and-packaging.ts.
 * Covers: unified nav model, T0 chrome, platform domains, role-gated domains,
 * Ask as action center, Inbox as request tracker, JTBD-driven visibility.
 */

import {
  PLATFORM_PERSONAS,
  PLATFORM_DOMAINS,
  PRODUCTS,
  type DomainLayer,
} from '../../data/personas-and-packaging';

import {
  FIELDS, INTER, MONO, CHARCOAL, SLATE, BARK, LEAF_GREEN, FOREST, MIST, CLOUD, WHITE,
  BADGE_PRO,
  sectionCard, sectionCardBody, tableHeader, tableCell, bodyText, smallText,
} from '../IAReviewTabs/docStyles';

const h2Style: React.CSSProperties = {
  fontFamily: FIELDS, fontSize: '1.5rem', fontWeight: 700, color: CHARCOAL, lineHeight: 1.2,
  marginTop: 40, marginBottom: 16, paddingBottom: 8, borderBottom: `2px solid ${LEAF_GREEN}`,
};
const h3Style: React.CSSProperties = {
  fontFamily: FIELDS, fontSize: '1.15rem', fontWeight: 700, color: BARK, lineHeight: 1.25,
  marginTop: 28, marginBottom: 12,
};

const layerColors: Record<DomainLayer, { bg: string; text: string; label: string }> = {
  chrome: { bg: '#333', text: WHITE, label: 'Chrome' },
  platform: { bg: FOREST, text: WHITE, label: 'Platform' },
  product: { bg: BADGE_PRO, text: WHITE, label: 'Role-gated' },
};

const productColors: Record<string, string> = {
  'BambooHR': LEAF_GREEN,
  'BambooIT': '#60a5fa',
  'BambooFinance': '#fbbf24',
  'BambooWorkplace': '#c084fc',
};

export default function PlatformArchitectureDoc() {
  const chromeDomains = PLATFORM_DOMAINS.filter(d => d.layer === 'chrome');
  const platformDomains = PLATFORM_DOMAINS.filter(d => d.layer === 'platform');
  const productDomains = PLATFORM_DOMAINS.filter(d => d.layer === 'product');

  return (
    <div style={{ fontFamily: INTER, color: CHARCOAL }}>

      {/* Core model */}
      <h2 style={h2Style}>The unified nav model</h2>
      <p style={{ ...bodyText, marginBottom: 12 }}>
        No product switcher. One nav. What you see is driven by your role and your jobs-to-be-done, not which "product" you're in. An HR admin filing an expense doesn't switch products — they use Ask. An IT admin looking up a coworker doesn't switch products — People is right there in their nav.
      </p>
      <p style={{ ...bodyText, marginBottom: 12 }}>
        The nav has three layers. <strong>Chrome</strong> is always visible on every page for every persona. <strong>Platform domains</strong> are shared across roles — the employee experience that everyone uses. <strong>Role-gated domains</strong> appear based on your job function — only IT admins see Helpdesk, only Finance admins see Invoices.
      </p>

      {/* T0 chrome */}
      <h2 style={h2Style}>T0 chrome — always visible</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        Five items pinned above the domain nav. Cross-cutting utilities that every persona uses in every session.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {chromeDomains.map(d => (
          <div key={d.id} style={{ ...sectionCard, borderLeft: `3px solid #333` }}>
            <div style={{ ...sectionCardBody, padding: '12px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: FIELDS, fontSize: '1rem', fontWeight: 700, color: CHARCOAL }}>{d.label}</span>
                {d.id === 'search' && <span style={{ ...smallText, fontStyle: 'italic' }}>Find and navigate</span>}
                {d.id === 'ask' && <span style={{ ...smallText, fontStyle: 'italic' }}>Take action — the universal do-anything button</span>}
                {d.id === 'inbox' && <span style={{ ...smallText, fontStyle: 'italic' }}>Track everything — approvals, requests, notifications</span>}
              </div>
              <p style={{ ...smallText, marginTop: 4, marginBottom: 0 }}>{d.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Ask model */}
      <h3 style={h3Style}>Search vs. Ask vs. Inbox</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>Item</th>
              <th style={tableHeader}>Purpose</th>
              <th style={tableHeader}>What it does</th>
              <th style={tableHeader}>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tableCell, fontWeight: 600 }}>Search</td>
              <td style={tableCell}>Find and navigate</td>
              <td style={tableCell}>Locates people, pages, documents, settings. Navigates you there.</td>
              <td style={{ ...tableCell, fontSize: 12 }}>"Jane Smith," "payroll settings," "Q1 headcount report"</td>
            </tr>
            <tr style={{ backgroundColor: MIST }}>
              <td style={{ ...tableCell, fontWeight: 600 }}>Ask</td>
              <td style={tableCell}>Take action</td>
              <td style={tableCell}>Role-aware action panel. Surfaces quick actions relevant to your persona. Opens forms, starts workflows, answers questions via AI.</td>
              <td style={{ ...tableCell, fontSize: 12 }}>"Submit IT ticket," "File expense," "Book a desk," "What's my PTO balance?"</td>
            </tr>
            <tr>
              <td style={{ ...tableCell, fontWeight: 600 }}>Inbox</td>
              <td style={tableCell}>Track everything</td>
              <td style={tableCell}>Unified queue: pending approvals (things waiting on you), active requests (things you're waiting on), notifications, and completed history. Cross-domain.</td>
              <td style={{ ...tableCell, fontSize: 12 }}>3 pending time-off approvals, IT ticket #4521 in progress, expense report approved</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Three layers */}
      <h2 style={h2Style}>Three nav layers</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          { layer: 'chrome' as DomainLayer, title: 'Chrome (T0)', subtitle: 'Always visible — every persona, every page', domains: chromeDomains },
          { layer: 'platform' as DomainLayer, title: 'Platform domains', subtitle: 'Shared across all roles — the employee experience everyone uses', domains: platformDomains },
          { layer: 'product' as DomainLayer, title: 'Role-gated domains', subtitle: 'Visible based on job function — admins see their product domains, employees access via Ask', domains: productDomains },
        ].map(section => {
          const lc = layerColors[section.layer];
          return (
            <div key={section.layer} style={sectionCard}>
              <div style={{ ...sectionCardBody, borderLeft: `4px solid ${lc.bg}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: INTER, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100, backgroundColor: lc.bg, color: lc.text, textTransform: 'uppercase' }}>{lc.label}</span>
                  <h3 style={{ fontFamily: FIELDS, fontSize: '1.05rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{section.title}</h3>
                </div>
                <p style={{ ...smallText, marginBottom: 10 }}>{section.subtitle}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {section.domains.map(d => (
                    <span key={d.id} style={{
                      fontFamily: INTER, fontSize: 11, fontWeight: 500,
                      padding: '3px 10px', borderRadius: 6,
                      backgroundColor: d.product ? `${productColors[d.product] || SLATE}15` : `${lc.bg}10`,
                      color: d.product ? productColors[d.product] || SLATE : CHARCOAL,
                      border: `1px solid ${d.product ? `${productColors[d.product] || SLATE}30` : `${lc.bg}20`}`,
                    }}>
                      {d.label}{d.product ? ` (${d.product.replace('Bamboo', '')})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What each persona sees */}
      <h2 style={h2Style}>What each persona sees</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        The nav adapts by adding role-gated domains on top of the shared platform. The employee nav is the leanest (7 T1s). Admin navs are the longest (14-18 T1s) because they see platform domains plus their product-specific domains.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {PLATFORM_PERSONAS.map(p => {
          const isAdmin = p.id.includes('admin');
          const product = PRODUCTS.find(pr => pr.adminPersona === p.id);
          const color = product ? productColors[product.label] || SLATE : FOREST;
          return (
            <div key={p.id} style={{ ...sectionCard, borderLeft: isAdmin ? `3px solid ${color}` : undefined }}>
              <div style={sectionCardBody}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: FIELDS, fontSize: '1.05rem', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{p.label}</h3>
                  <span style={{ ...smallText }}>{p.navT1s.length} T1s + {p.t0Chrome.length} T0s</span>
                </div>
                <p style={{ ...bodyText, marginBottom: 10, fontSize: 13 }}>{p.description}</p>

                <div style={{ fontSize: 10, fontWeight: 600, color: SLATE, textTransform: 'uppercase', marginBottom: 4 }}>Chrome (T0)</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {p.t0Chrome.map(item => (
                    <span key={item} style={{ fontFamily: INTER, fontSize: 10, padding: '2px 8px', borderRadius: 4, backgroundColor: '#33333310', color: CHARCOAL, border: '1px solid #33333315' }}>{item}</span>
                  ))}
                </div>

                <div style={{ fontSize: 10, fontWeight: 600, color: SLATE, textTransform: 'uppercase', marginBottom: 4 }}>Nav (T1s)</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {p.navT1s.map(item => {
                    const domain = PLATFORM_DOMAINS.find(d => d.label === item);
                    const isProduct = domain?.layer === 'product';
                    const pc = domain?.product ? productColors[domain.product] || SLATE : FOREST;
                    return (
                      <span key={item} style={{
                        fontFamily: INTER, fontSize: 10, padding: '2px 8px', borderRadius: 4,
                        backgroundColor: isProduct ? `${pc}15` : `${FOREST}10`,
                        color: isProduct ? pc : CHARCOAL,
                        border: `1px solid ${isProduct ? `${pc}30` : `${FOREST}15`}`,
                      }}>{item}</span>
                    );
                  })}
                </div>

                {p.askActions.length > 0 && (
                  <>
                    <div style={{ fontSize: 10, fontWeight: 600, color: SLATE, textTransform: 'uppercase', marginBottom: 4 }}>Ask actions (sample)</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.askActions.map(action => (
                        <span key={action} style={{ fontFamily: INTER, fontSize: 10, padding: '2px 8px', borderRadius: 4, backgroundColor: MIST, color: SLATE, border: `1px solid ${CLOUD}` }}>{action}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* The employee model */}
      <h2 style={h2Style}>The employee experience</h2>
      <p style={{ ...bodyText, marginBottom: 12 }}>
        Employees don't see Helpdesk, Expenses, Desks, or any other product-specific T1 in their nav. Their nav is the platform: Home, People, Time, Performance, Culture, Training, Benefits. Seven T1s.
      </p>
      <p style={{ ...bodyText, marginBottom: 12 }}>
        Product-specific features reach employees through two paths:
      </p>
      <ul style={{ listStyleType: 'disc', marginLeft: 20, marginBottom: 16 }}>
        <li style={{ ...bodyText, marginBottom: 6 }}><strong>Ask</strong> — "Submit IT ticket," "File expense," "Book a desk." The Ask panel surfaces actions relevant to features the company has purchased. One button, role-aware.</li>
        <li style={{ ...bodyText, marginBottom: 6 }}><strong>Inbox</strong> — once submitted, requests are tracked in Inbox alongside approvals and notifications. Active requests, pending items, completed history — all in one place, cross-domain.</li>
        <li style={{ ...bodyText, marginBottom: 6 }}><strong>Home widgets</strong> — the Home dashboard can surface contextual cards: "Book a desk for tomorrow," "You have an open IT ticket," "Expense report due."</li>
      </ul>
      <p style={bodyText}>
        This means if a company purchases BambooIT, employees don't get a new T1 in their nav. They get new actions in Ask, new request types in Inbox, and new widgets on Home. The nav stays lean.
      </p>

      {/* Products */}
      <h2 style={h2Style}>Product domains</h2>
      <p style={{ ...bodyText, marginBottom: 16 }}>
        Products are what the company purchases. They add role-gated T1 domains to admin navs and new actions to Ask for employees. The platform domains are always included — products add to them, not replace them.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {PRODUCTS.map(product => {
          const color = productColors[product.label] || SLATE;
          const domains = PLATFORM_DOMAINS.filter(d => d.product === product.label);
          const admin = PLATFORM_PERSONAS.find(p => p.id === product.adminPersona);
          return (
            <div key={product.id} style={sectionCard}>
              <div style={sectionCardBody}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: FIELDS, fontSize: '1.05rem', fontWeight: 700, color, margin: 0 }}>{product.label}</h3>
                  <span style={{ ...smallText }}>Admin: {admin?.label} | {domains.length} domains</span>
                </div>
                <p style={{ ...bodyText, marginBottom: 10, fontSize: 13 }}>{product.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {domains.map(d => (
                    <span key={d.id} style={{
                      fontFamily: INTER, fontSize: 11, fontWeight: 500,
                      padding: '3px 10px', borderRadius: 6,
                      backgroundColor: `${color}15`, color,
                      border: `1px solid ${color}30`,
                    }}>
                      {d.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key insight */}
      <h2 style={h2Style}>Why no product switcher</h2>
      <ul style={{ listStyleType: 'disc', marginLeft: 20 }}>
        <li style={{ ...bodyText, marginBottom: 8 }}><strong>Employees work across all domains weekly.</strong> Time off, pay, expenses, IT help, desk booking, training — interleaved, not sequential.</li>
        <li style={{ ...bodyText, marginBottom: 8 }}><strong>Managers work across all domains daily.</strong> Their approval queue spans HR, Finance, IT, and Workplace.</li>
        <li style={{ ...bodyText, marginBottom: 8 }}><strong>Onboarding touches every domain simultaneously.</strong> A product switcher adds friction to the most critical workflow.</li>
        <li style={{ ...bodyText, marginBottom: 8 }}><strong>The employee record is the shared object.</strong> Every domain's data attaches to the same person. The nav should reflect that.</li>
        <li style={{ ...bodyText, marginBottom: 8 }}><strong>The industry is converging.</strong> Rippling, Workday, ServiceNow all moved to unified platforms for the same reasons.</li>
      </ul>

      {/* Open questions */}
      <h2 style={h2Style}>Open questions</h2>
      <ul style={{ listStyleType: 'disc', marginLeft: 20 }}>
        <li style={{ ...bodyText, marginBottom: 8 }}>Admin navs (IT, Finance, Workplace) hit 17-18 T1s. Should platform domains collapse into clusters for admins, or is the length acceptable since they're power users?</li>
        <li style={{ ...bodyText, marginBottom: 8 }}>Does each product domain have its own Core/Pro/Elite tier, or is tiering platform-level?</li>
        <li style={{ ...bodyText, marginBottom: 8 }}>How does Inbox distinguish between "things waiting on me" (approvals) and "things I'm waiting on" (my requests)? Tabs? Sections? Filters?</li>
        <li style={{ ...bodyText, marginBottom: 8 }}>Should Ask be AI-powered (conversational) or structured (action catalog with forms)? Or both?</li>
        <li style={{ ...bodyText, marginBottom: 8 }}>How do Home widgets know which product features to surface? Is it based on what the company purchased, what the employee has used, or both?</li>
        <li style={{ ...bodyText, marginBottom: 8 }}>Where does Files live? HR has employee documents, IT has knowledge articles, Finance has receipts — is it platform-level or per-domain?</li>
      </ul>
    </div>
  );
}
