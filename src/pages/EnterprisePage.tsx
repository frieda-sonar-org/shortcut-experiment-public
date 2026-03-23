import { useEffect, useState } from 'react';
import { Layout } from '@sonarsource/echoes-react';

// ─── Rating helpers ───────────────────────────────────────────────────────────

type Rating = 'A' | 'B' | 'C' | 'D' | 'E';

// SonarQube domain rating colors — no equivalent Echoes tokens exist for these
const RATING_BG: Record<Rating, string> = {
  A: '#1e6b28',
  B: '#3b7a52',
  C: '#8a6800',
  D: '#9a4c00',
  E: '#8a1e1e',
};

function RatingCircle({ rating }: Readonly<{ rating: Rating }>) {
  return (
    <div style={{
      width: '2.75rem', height: '2.75rem',
      borderRadius: '50%',
      backgroundColor: RATING_BG[rating],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff',
      fontSize: 'var(--echoes-font-size-30)',
      fontWeight: 'var(--echoes-font-weight-bold)',
      flexShrink: 0,
    }}>
      {rating}
    </div>
  );
}

function SmallRatingBadge({ rating }: Readonly<{ rating: Rating }>) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '1.1rem', height: '1.1rem',
      borderRadius: '50%',
      backgroundColor: RATING_BG[rating],
      color: '#fff',
      fontSize: 'var(--echoes-font-size-10)',
      fontWeight: 'var(--echoes-font-weight-bold)',
      flexShrink: 0,
    }}>
      {rating}
    </span>
  );
}

// ─── Portfolio data ───────────────────────────────────────────────────────────

interface PortfolioMetric {
  rating: Rating;
  worstRating?: Rating;
  description: string;
}

interface Portfolio {
  id: string;
  name: string;
  linesOfCode?: string;
  projectCount: number;
  computed: boolean;
  notComputedMessage?: string;
  metrics?: {
    releasability: PortfolioMetric;
    security: PortfolioMetric;
    reliability: PortfolioMetric;
    maintainability: PortfolioMetric;
    securityReview: PortfolioMetric;
  };
}

const PORTFOLIOS: Portfolio[] = [
  {
    id: 'demo-enterprise-all',
    name: 'Demo Enterprise - All Projects (Organization 2)',
    linesOfCode: '5.3M',
    projectCount: 58,
    computed: true,
    metrics: {
      releasability:   { rating: 'B', description: '6 project(s) Failed' },
      security:        { rating: 'C', worstRating: 'E', description: '17 projects in' },
      reliability:     { rating: 'C', worstRating: 'E', description: '2 projects in' },
      maintainability: { rating: 'A', worstRating: 'C', description: 'All projects in' },
      securityReview:  { rating: 'D', worstRating: 'E', description: '24 projects in' },
    },
  },
  {
    id: 'extremely-powerful',
    name: 'Extremely powerful portfolio',
    projectCount: 1,
    computed: false,
    notComputedMessage: 'None of the projects branches in this portfolio have been computed yet. Please make sure that at least one project is computed',
  },
];

// ─── Metric column ────────────────────────────────────────────────────────────

function MetricColumn({ label, rating, worstRating, description }: Readonly<{
  label: string;
  rating: Rating;
  worstRating?: Rating;
  description: string;
}>) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--echoes-dimension-space-150)',
      padding: '0 var(--echoes-dimension-space-200)',
      flex: 1,
    }}>
      <RatingCircle rating={rating} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
        }}>
          {label}
        </span>
        <span style={{
          fontSize: 'var(--echoes-font-size-10)',
          color: 'var(--echoes-color-text-subtle)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--echoes-dimension-space-50)',
        }}>
          {description}
          {worstRating && <SmallRatingBadge rating={worstRating} />}
        </span>
      </div>
    </div>
  );
}

// ─── Portfolio card ───────────────────────────────────────────────────────────

function PortfolioCard({ portfolio }: Readonly<{ portfolio: Portfolio }>) {
  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      background: 'var(--echoes-color-surface-default)',
      padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
    }}>
      {/* Title row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: portfolio.computed ? 'var(--echoes-dimension-space-200)' : 'var(--echoes-dimension-space-150)',
      }}>
        <span style={{
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-accent)',
          cursor: 'pointer',
        }}>
          {portfolio.name}
        </span>
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-subtle)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          marginLeft: 'var(--echoes-dimension-space-200)',
        }}>
          <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)', color: 'var(--echoes-color-text-default)' }}>
            {portfolio.linesOfCode ?? '–'}
          </span>
          {' Lines of Code'}
          <span style={{ margin: '0 var(--echoes-dimension-space-75)' }}>•</span>
          <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)', color: 'var(--echoes-color-text-default)' }}>
            {portfolio.projectCount}
          </span>
          {' projects'}
        </span>
      </div>

      {/* Metrics or not-computed message */}
      {portfolio.computed && portfolio.metrics ? (
        <div style={{
          display: 'flex',
          borderTop: '1px solid var(--echoes-color-border-weak)',
          paddingTop: 'var(--echoes-dimension-space-200)',
        }}>
          <MetricColumn label="Releasability"   {...portfolio.metrics.releasability} />
          <div style={{ width: '1px', background: 'var(--echoes-color-border-weak)', flexShrink: 0 }} />
          <MetricColumn label="Security"        {...portfolio.metrics.security} />
          <div style={{ width: '1px', background: 'var(--echoes-color-border-weak)', flexShrink: 0 }} />
          <MetricColumn label="Reliability"     {...portfolio.metrics.reliability} />
          <div style={{ width: '1px', background: 'var(--echoes-color-border-weak)', flexShrink: 0 }} />
          <MetricColumn label="Maintainability" {...portfolio.metrics.maintainability} />
          <div style={{ width: '1px', background: 'var(--echoes-color-border-weak)', flexShrink: 0 }} />
          <MetricColumn label="Security Review" {...portfolio.metrics.securityReview} />
        </div>
      ) : (
        <p style={{
          margin: 0,
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-subtle)',
        }}>
          {portfolio.notComputedMessage}
        </p>
      )}
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

type Tab = 'live' | 'drafts';

function PortfoliosToolbar({ tab, onTabChange, totalLive, totalDrafts }: Readonly<{
  tab: Tab;
  onTabChange: (t: Tab) => void;
  totalLive: number;
  totalDrafts: number;
}>) {
  const tabBtn = (t: Tab, label: string) => (
    <button
      onClick={() => onTabChange(t)}
      style={{
        padding: 'var(--echoes-dimension-space-100) var(--echoes-dimension-space-200)',
        background: tab === t ? 'var(--echoes-color-surface-inset)' : 'transparent',
        border: '1px solid var(--echoes-color-border-bold)',
        borderRadius: 'var(--echoes-border-radius-100)',
        color: 'var(--echoes-color-text-default)',
        fontSize: 'var(--echoes-font-size-20)',
        fontWeight: tab === t ? 'var(--echoes-font-weight-semi-bold)' : 'var(--echoes-font-weight-regular)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ marginBottom: 'var(--echoes-dimension-space-300)' }}>
      {/* Row 1: search + count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--echoes-dimension-space-150)',
        gap: 'var(--echoes-dimension-space-200)',
      }}>
        <div style={{
          flex: 1,
          maxWidth: '26rem',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--echoes-dimension-space-100)',
          border: '1px solid var(--echoes-color-border-bold)',
          borderRadius: 'var(--echoes-border-radius-200)',
          padding: '0 var(--echoes-dimension-space-150)',
          height: '2.25rem',
          background: 'var(--echoes-color-surface-default)',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--echoes-color-icon-subtle)" aria-hidden="true">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85-.708.707-3.85-3.85a6.5 6.5 0 0 0 1.398-1.397zM6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
          </svg>
          <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-placeholder)' }}>
            Search for live portfolios...
          </span>
        </div>

        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>{totalLive}</span>
          {' portfolios'}
          <span style={{ margin: '0 var(--echoes-dimension-space-75)', color: 'var(--echoes-color-text-subtle)' }}>•</span>
          <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>{totalDrafts}</span>
          {' drafts'}
        </span>
      </div>

      {/* Row 2: tabs */}
      <div style={{ display: 'flex', gap: 'var(--echoes-dimension-space-75)' }}>
        {tabBtn('live', 'Live portfolios')}
        {tabBtn('drafts', 'My drafts')}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface EnterprisePageProps {
  pageTitle?: string;
  pageDescription?: string;
}

export default function EnterprisePage({ pageTitle, pageDescription }: Readonly<EnterprisePageProps> = {}) {
  useEffect(() => { document.title = 'Enterprise Portfolios - SonarQube Cloud'; }, []);

  const [tab, setTab] = useState<Tab>('live');

  const livePortfolios = PORTFOLIOS;
  const draftPortfolios: Portfolio[] = [];
  const displayed = tab === 'live' ? livePortfolios : draftPortfolios;

  return (
    <Layout.ContentGrid>
      <Layout.PageGrid width="fluid">
        <div style={{
          background: 'var(--echoes-color-surface-default)',
          borderBottom: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-300) var(--echoes-dimension-space-400)',
        }}>
          <div style={{ fontSize: 'var(--echoes-font-size-40)', fontWeight: 'var(--echoes-font-weight-semi-bold)', color: 'var(--echoes-color-text-default)' }}>
            {pageTitle ?? 'Enterprise Portfolios'}
          </div>
          <div style={{ fontSize: 'var(--echoes-font-size-20)', fontWeight: 'var(--echoes-font-weight-regular)', color: 'var(--echoes-color-text-subtle)', marginTop: 'var(--echoes-dimension-space-50)' }}>
            {pageDescription ?? 'This is a list of portfolios that were created in this enterprise'}
          </div>
        </div>

        <Layout.PageContent>
          <div style={{ maxWidth: 'var(--echoes-layout-sizes-max-width-default)', marginLeft: 'auto', marginRight: 'auto', paddingTop: 'var(--echoes-dimension-space-300)' }}>
            <PortfoliosToolbar
              tab={tab}
              onTabChange={setTab}
              totalLive={livePortfolios.length}
              totalDrafts={draftPortfolios.length}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-200)' }}>
              {displayed.map(p => (
                <PortfolioCard key={p.id} portfolio={p} />
              ))}
            </div>
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
