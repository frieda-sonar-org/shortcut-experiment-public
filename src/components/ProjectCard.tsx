import { Badge, ButtonIcon, IconCheckCircle, IconDash, IconStar, IconX, RatingBadge } from '@sonarsource/echoes-react';
import { Link } from 'react-router-dom';
import CoverageIndicator from './CoverageIndicator';
import type { Project, QualityGateStatus, RatingMetric } from '../data/orgs';

// ─── Quality Gate badge ───────────────────────────────────────────────────────

function QualityGateBadge({ status }: { status: QualityGateStatus }) {
  if (status === 'passed') {
    return <Badge variety="success" size="medium" IconLeft={IconCheckCircle}>Passed</Badge>;
  }
  if (status === 'not_computed') {
    return <Badge variety="neutral" size="medium" IconLeft={IconDash}>Not computed</Badge>;
  }
  return <Badge variety="danger" size="medium" IconLeft={IconX}>Failed</Badge>;
}

// ─── Single metric column ─────────────────────────────────────────────────────

function MetricCell({ metric, label }: { metric: RatingMetric; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <RatingBadge rating={metric.rating} size="sm" />
        <span style={{
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
        }}>
          {metric.value}
        </span>
      </div>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subdued)' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Dependency Risks column (always shows "—") ───────────────────────────────

function DependencyRisksCell() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <RatingBadge size="sm" /* no rating → renders "—" */ />
      </div>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subdued)' }}>
        Dependency Risks
      </span>
    </div>
  );
}

// ─── Duplications column ──────────────────────────────────────────────────────

function DuplicationsCell({ percentage }: { percentage: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <CoverageIndicator percentage={percentage} inverted />
        <span style={{
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
        }}>
          {percentage}%
        </span>
      </div>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subdued)' }}>
        Duplications
      </span>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

export function ProjectCard({ project }: { project: Project }) {
  const projectUrl = `/project/overview?id=${project.orgId}-${project.id}`;

  const languageDisplay = project.languages
    ? project.languages.slice(0, 2).join(', ') + (project.languages.length > 2 ? ', ...' : '')
    : null;

  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      overflow: 'hidden',
    }}>

      {/* ── Header row ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)' }}>
          <ButtonIcon
            Icon={IconStar}
            ariaLabel={project.starred ? 'Remove from favourites' : 'Add to favourites'}
            size="small"
            variety="default-ghost"
          />
          <Link
            to={projectUrl}
            style={{
              fontWeight: 'var(--echoes-font-weight-semi-bold)',
              color: 'var(--echoes-color-text-accent)',
              textDecoration: 'none',
              fontSize: 'var(--echoes-font-size-40)',
            }}
          >
            {project.name}
          </Link>
          {project.tags?.includes('new') && (
            <Badge variety="info" size="small">New</Badge>
          )}
          <Badge variety="neutral" size="small">
            {project.visibility === 'public' ? 'Public' : 'Private'}
          </Badge>
          {project.tags?.includes('ai_code_detected') && (
            <Badge variety="highlight" size="small">AI code detected</Badge>
          )}
        </div>

        {project.qualityGate && (
          <QualityGateBadge status={project.qualityGate} />
        )}
      </div>

      {/* ── Last analysis sub-header ── */}
      {project.lastAnalysis && (
        <div style={{
          padding: '0 var(--echoes-dimension-space-300) var(--echoes-dimension-space-150)',
          paddingLeft: 'calc(var(--echoes-dimension-space-300) + 2rem)',
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-subdued)',
        }}>
          <strong style={{
            color: 'var(--echoes-color-text-default)',
            fontWeight: 'var(--echoes-font-weight-semi-bold)',
          }}>
            Last analysis:
          </strong>{' '}
          {project.lastAnalysis}
          {project.linesOfCode && ` · ${project.linesOfCode} Lines of Code`}
          {languageDisplay && ` · ${languageDisplay}`}
        </div>
      )}

      {/* ── Metrics row ── */}
      {project.metrics ? (
        <div style={{
          borderTop: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
          display: 'flex',
          gap: 'var(--echoes-dimension-space-400)',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          <MetricCell metric={project.metrics.security}        label="Security" />
          <MetricCell metric={project.metrics.reliability}     label="Reliability" />
          <MetricCell metric={project.metrics.maintainability} label="Maintainability" />
          <MetricCell metric={project.metrics.hotspots}        label="Hotspots Reviewed" />
          {'dependencyRisks' in project.metrics && <DependencyRisksCell />}
          <DuplicationsCell percentage={project.metrics.duplications.percentage} />
        </div>
      ) : (
        /* Not analyzed yet */
        <div style={{
          borderTop: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
          color: 'var(--echoes-color-text-subdued)',
          fontSize: 'var(--echoes-font-size-30)',
        }}>
          Your default branch has not been analyzed yet.
        </div>
      )}

    </div>
  );
}
