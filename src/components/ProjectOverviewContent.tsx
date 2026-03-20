import { useState } from 'react';
import { Badge, IconDash } from '@sonarsource/echoes-react';

// ─── Card shell ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
}

function MetricCard({ title, badge = 'Overall code', children }: Readonly<MetricCardProps>) {
  return (
    <div style={{
      background: 'var(--echoes-color-surface-default)',
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      padding: 'var(--echoes-dimension-space-200)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-200)',
      minHeight: '140px',
    }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--echoes-dimension-space-100)' }}>
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
          lineHeight: 1.3,
        }}>
          {title}
        </span>
        <Badge variety="neutral" size="small" style={{ flexShrink: 0 }}>{badge}</Badge>
      </div>
      {/* Metric content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Collapsible section container ───────────────────────────────────────────

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

function CollapsibleSection({ title, children }: Readonly<CollapsibleSectionProps>) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      overflow: 'hidden',
    }}>
      {/* Section header */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
          background: 'var(--echoes-color-surface-default)',
          border: 'none',
          borderBottom: expanded ? '1px solid var(--echoes-color-border-weak)' : 'none',
          cursor: 'pointer',
          color: 'var(--echoes-color-text-default)',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'var(--echoes-font-size-30)', fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>
          {title}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
          style={{ transition: 'transform 0.2s', transform: expanded ? 'none' : 'rotate(-90deg)', flexShrink: 0, color: 'var(--echoes-color-icon-subtle)' }}
        >
          <path d="M4 6l4 4 4-4H4z" />
        </svg>
      </button>

      {/* Section body */}
      {expanded && (
        <div style={{
          background: 'var(--echoes-color-surface-default)',
          padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300) var(--echoes-dimension-space-300)',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Metric content helpers ───────────────────────────────────────────────────

function BigValue({ value }: Readonly<{ value: string }>) {
  return (
    <span style={{
      fontSize: '2.5rem',
      fontWeight: 'var(--echoes-font-weight-bold)',
      color: 'var(--echoes-color-text-default)',
      lineHeight: 1,
    }}>
      {value}
    </span>
  );
}

const TREND_COLORS = { good: '#4caf50', bad: '#e53935', neutral: 'var(--echoes-color-text-subtle)' };

function Trend({ text, variant }: Readonly<{ text: string; variant: 'good' | 'bad' | 'neutral' }>) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)', marginTop: 'var(--echoes-dimension-space-100)' }}>
      <span style={{ color: 'var(--echoes-color-text-subtle)' }}>—</span>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: TREND_COLORS[variant] }}>{text}</span>
    </div>
  );
}

const GRADE_COLORS: Record<string, string> = {
  A: '#4caf50', B: '#8bc34a', C: '#ff9800', D: '#ff5722', E: '#e53935',
};

function GradeBadge({ grade }: Readonly<{ grade: 'A' | 'B' | 'C' | 'D' | 'E' }>) {
  return (
    <div style={{
      width: '48px', height: '48px',
      borderRadius: '50%',
      background: GRADE_COLORS[grade],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 'var(--echoes-font-size-50)',
      fontWeight: 'var(--echoes-font-weight-bold)',
      color: '#fff',
    }}>
      {grade}
    </div>
  );
}

function NotComputed() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-150)' }}>
      <div style={{
        width: '48px', height: '48px',
        borderRadius: 'var(--echoes-border-radius-100)',
        background: 'var(--echoes-color-surface-inset)',
        border: '1px solid var(--echoes-color-border-weak)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--echoes-color-icon-subtle)',
        flexShrink: 0,
      }}>
        <IconDash />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', fontWeight: 'var(--echoes-font-weight-semi-bold)', color: 'var(--echoes-color-text-default)' }}>
          Not computed
        </span>
        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subtle)' }}>
          Run analysis to generate status
        </span>
      </div>
    </div>
  );
}

function NoData() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subtle)' }}>
        No data available to display
      </span>
    </div>
  );
}

function DonutChart({ toReviewPct }: Readonly<{ toReviewPct: number }>) {
  const r = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * (toReviewPct / 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-200)' }}>
      <svg width="100" height="100" viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--echoes-color-border-weak)" strokeWidth="20" />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="#e8826e" strokeWidth="20"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)', fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subtle)' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#e8826e', flexShrink: 0 }} />
        To Review {toReviewPct}%
      </div>
    </div>
  );
}

// ─── Card grids ───────────────────────────────────────────────────────────────

function Grid4({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--echoes-dimension-space-200)' }}>
      {children}
    </div>
  );
}

function Grid3({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--echoes-dimension-space-200)' }}>
      {children}
    </div>
  );
}

// ─── Overview Content ─────────────────────────────────────────────────────────
// Template: replace the static values below with real data per project.

export function ProjectOverviewContent() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-400)' }}>

      {/* Info Banner */}
      {showBanner && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-150)',
          background: 'rgba(77,157,224,0.08)',
          border: '1px solid rgba(77,157,224,0.3)',
          borderRadius: 'var(--echoes-border-radius-200)',
          padding: 'var(--echoes-dimension-space-150) var(--echoes-dimension-space-200)',
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-subtle)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: '#4d9de0' }}>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1 }}>
            The Overview page has a new look, putting your metrics front and center.{' '}
            <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#4d9de0', fontSize: 'inherit' }}>
              Share your feedback ↗
            </button>
          </span>
          <button
            onClick={() => setShowBanner(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--echoes-color-icon-subtle)', padding: '2px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Top metrics (4-column grid) ── */}
      <Grid4>
        <MetricCard title="Quality Gate Status" badge="Overall co...">
          <NotComputed />
        </MetricCard>

        <MetricCard title="Open Issues">
          <BigValue value="0" />
        </MetricCard>

        <MetricCard title="Duplications">
          <BigValue value="0.0%" />
          <Trend text="No change (last 30 days)" variant="neutral" />
        </MetricCard>

        <MetricCard title="Coverage">
          <NoData />
        </MetricCard>
      </Grid4>

      {/* ── Security snapshot ── */}
      <CollapsibleSection title="Security snapshot">
        <Grid3>
          <MetricCard title="Security Rating" badge="Overall c...">
            <GradeBadge grade="A" />
          </MetricCard>

          <MetricCard title="Security Issues">
            <BigValue value="0" />
            <Trend text="No change (last 30 days)" variant="neutral" />
          </MetricCard>

          <MetricCard title="Open Security Issues by Severity">
            <NoData />
          </MetricCard>
        </Grid3>
      </CollapsibleSection>

      {/* ── Security Hotspot snapshot ── */}
      <CollapsibleSection title="Security Hotspot snapshot">
        <Grid3>
          <MetricCard title="Security Review Rating" badge="Overall c...">
            <GradeBadge grade="A" />
          </MetricCard>

          <MetricCard title="Security Hotspots">
            <BigValue value="0" />
            <Trend text="No change (last 30 days)" variant="neutral" />
          </MetricCard>

          <MetricCard title="Security Hotspots by Review Status">
            <DonutChart toReviewPct={100} />
          </MetricCard>
        </Grid3>
      </CollapsibleSection>

      {/* ── Reliability snapshot ── */}
      <CollapsibleSection title="Reliability snapshot">
        <Grid3>
          <MetricCard title="Reliability Rating" badge="Overall c...">
            <GradeBadge grade="A" />
          </MetricCard>

          <MetricCard title="Reliability Issues">
            <BigValue value="0" />
            <Trend text="No change (last 30 days)" variant="neutral" />
          </MetricCard>

          <MetricCard title="Open Reliability Issues by Severity">
            <NoData />
          </MetricCard>
        </Grid3>
      </CollapsibleSection>

      {/* ── Maintainability snapshot ── */}
      <CollapsibleSection title="Maintainability snapshot">
        <Grid3>
          <MetricCard title="Maintainability Rating" badge="Overall co...">
            <GradeBadge grade="A" />
          </MetricCard>

          <MetricCard title="Maintainability Issues">
            <BigValue value="0" />
            <Trend text="No change (last 30 days)" variant="neutral" />
          </MetricCard>

          <MetricCard title="Maintainability Issues">
            <NoData />
          </MetricCard>
        </Grid3>
      </CollapsibleSection>

    </div>
  );
}
