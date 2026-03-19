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
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Dependency Risks column ──────────────────────────────────────────────────
// Shows "—" when null, or rating + value when an object is provided.

function DependencyRisksCell({ data }: { data: { rating: string; value: string } | null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <RatingBadge rating={data?.rating as RatingMetric['rating'] | undefined} size="sm" />
        {data && (
          <span style={{
            fontSize: 'var(--echoes-font-size-30)',
            fontWeight: 'var(--echoes-font-weight-semi-bold)',
            color: 'var(--echoes-color-text-default)',
          }}>
            {data.value}
          </span>
        )}
      </div>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)' }}>
        Dependency Risks
      </span>
    </div>
  );
}

// ─── Coverage column ──────────────────────────────────────────────────────────

function CoverageCell({ percentage }: { percentage: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-50)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <CoverageIndicator percentage={percentage} />
        <span style={{
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
        }}>
          {percentage}%
        </span>
      </div>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)' }}>
        Coverage
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
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)' }}>
        Duplications
      </span>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  /** When true, shows "OrgId / ProjectName" in the header (used on My Projects page) */
  showOrgContext?: boolean;
  isStarred?: boolean;
  onToggleStar?: () => void;
}

export function ProjectCard({ project, showOrgContext = false, isStarred = false, onToggleStar }: ProjectCardProps) {
  const projectUrl = `/project/overview?id=${project.orgId}-${project.id}`;

  const languageDisplay = project.languages
    ? project.languages.slice(0, 2).join(', ') + (project.languages.length > 2 ? ', ...' : '')
    : null;

  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      overflow: 'hidden',
      background: 'var(--echoes-color-surface-default)',
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
            ariaLabel={isStarred ? 'Remove from favourites' : 'Add to favourites'}
            size="small"
            variety={isStarred ? 'primary-ghost' : 'default-ghost'}
            onClick={onToggleStar}
          />
          {/* Org context: "OrgName / " prefix linking to org page */}
          {showOrgContext && (
            <>
              <Link
                to={`/organizations/${project.orgId}/projects`}
                style={{
                  fontSize: 'var(--echoes-font-size-30)',
                  color: 'var(--echoes-color-text-accent)',
                  fontWeight: 'var(--echoes-font-weight-semi-bold)',
                  textDecoration: 'none',
                }}
              >
                {project.orgId}
              </Link>
              <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-subdued)', fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>&nbsp;/&nbsp;</span>
            </>
          )}
          <Link
            to={projectUrl}
            style={{
              fontWeight: 'var(--echoes-font-weight-semi-bold)',
              color: 'var(--echoes-color-text-accent)',
              textDecoration: 'none',
              fontSize: 'var(--echoes-font-size-30)',
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
          color: 'var(--echoes-color-text-default)',
        }}>
          <strong style={{
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
          {'dependencyRisks' in project.metrics && (
            <DependencyRisksCell data={project.metrics.dependencyRisks ?? null} />
          )}
          {project.metrics.coverage && (
            <CoverageCell percentage={project.metrics.coverage.percentage} />
          )}
          <DuplicationsCell percentage={project.metrics.duplications.percentage} />
        </div>
      ) : (
        <div style={{
          borderTop: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
          color: 'var(--echoes-color-text-default)',
          fontSize: 'var(--echoes-font-size-30)',
        }}>
          Your default branch has not been analyzed yet.
        </div>
      )}

    </div>
  );
}
