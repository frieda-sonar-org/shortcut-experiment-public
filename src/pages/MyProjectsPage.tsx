import { Button, ButtonIcon, IconArrowDown, IconCheckCircle, IconHome, IconX, Layout, RatingBadge } from '@sonarsource/echoes-react';
import { useState } from 'react';
import { getAllProjects } from '../data/orgs';
import type { Project, Rating } from '../data/orgs';
import { ProjectCard } from '../components/ProjectCard';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeCounts(projects: Project[]) {
  const qg = { passed: 0, failed: 0 };
  const reliability: Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const security:    Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const secReview:   Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (const p of projects) {
    if (p.qualityGate === 'passed') qg.passed++;
    if (p.qualityGate === 'failed') qg.failed++;
    if (p.metrics) {
      reliability[p.metrics.reliability.rating]++;
      security[p.metrics.security.rating]++;
      secReview[p.metrics.hotspots.rating]++;
    }
  }
  return { qg, reliability, security, secReview };
}

// ─── Filter primitives ────────────────────────────────────────────────────────

function FilterSectionTitle({ children }: { children: string }) {
  return (
    <>
      <span style={{
        fontSize: 'var(--echoes-font-size-30)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-default)',
      }}>
        {children}
      </span>
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: '0' }} />
    </>
  );
}

function FilterBar({ count, max }: { count: number; max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div style={{ flex: 1, height: '4px', background: 'var(--echoes-color-border-weaker)', borderRadius: '2px' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--echoes-color-border-bold)', borderRadius: '2px' }} />
    </div>
  );
}

function FilterRow({ prefix, label, count, max }: { prefix: React.ReactNode; label: string; count: number; max: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)', minHeight: '1.5rem' }}>
      {prefix}
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', flex: 1 }}>
        {label}
      </span>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', minWidth: '1rem', textAlign: 'right' }}>
        {count}
      </span>
      <div style={{ width: '3rem' }}>
        <FilterBar count={count} max={max} />
      </div>
    </div>
  );
}

// ─── Filters panel ────────────────────────────────────────────────────────────

function Filters({ projects }: { projects: Project[] }) {
  const { qg, reliability, security, secReview } = computeCounts(projects);
  const ratings: Rating[] = ['A', 'B', 'C', 'D', 'E'];

  const maxRel    = Math.max(...ratings.map(r => reliability[r]));
  const maxSec    = Math.max(...ratings.map(r => security[r]));
  const maxReview = Math.max(...ratings.map(r => secReview[r]));
  const maxQg     = Math.max(qg.passed, qg.failed);

  const secReviewLabels: Record<Rating, string> = {
    A: '≥ 80%', B: '70% - 80%', C: '50% - 70%', D: '30% - 50%', E: '< 30%',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-200)' }}>

      <span style={{
        fontSize: 'var(--echoes-font-size-40)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-default)',
        padding: 'var(--echoes-dimension-space-200) 0',
        display: 'block',
      }}>
        Filters
      </span>
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: '0' }} />

      {/* Quality Gate */}
      <FilterSectionTitle>Quality Gate</FilterSectionTitle>
      <FilterRow
        prefix={
          <span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-success)', flexShrink: 0 }}>
            <IconCheckCircle />
          </span>
        }
        label="Passed" count={qg.passed} max={maxQg}
      />
      <FilterRow
        prefix={
          <span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-danger)', flexShrink: 0 }}>
            <IconX />
          </span>
        }
        label="Failed" count={qg.failed} max={maxQg}
      />

      {/* Reliability */}
      <FilterSectionTitle>Reliability</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r} count={reliability[r]} max={maxRel} />
      ))}

      {/* Security */}
      <FilterSectionTitle>Security</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r} count={security[r]} max={maxSec} />
      ))}

      {/* Security Review */}
      <FilterSectionTitle>Security Review</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={secReviewLabels[r]} count={secReview[r]} max={maxReview} />
      ))}

    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ count }: { count: number }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--echoes-dimension-space-200)',
      marginBottom: 'var(--echoes-dimension-space-200)',
      flexWrap: 'wrap',
    }}>
      {/* Search */}
      <div style={{
        flex: 1,
        minWidth: '16rem',
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
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-placeholder)' }}>
          Search projects (minimum 2 characters)
        </span>
      </div>

      {/* Perspective */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Perspective
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)',
          border: '1px solid var(--echoes-color-border-bold)', borderRadius: 'var(--echoes-border-radius-200)',
          padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
          fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)',
          background: 'var(--echoes-color-surface-default)',
        }}>
          Overall Status
          <svg width="10" height="6" viewBox="0 0 10 6" fill="var(--echoes-color-icon-default)" aria-hidden="true">
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </div>
      </div>

      {/* Sort by */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Sort by
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)',
          border: '1px solid var(--echoes-color-border-bold)', borderRadius: 'var(--echoes-border-radius-200)',
          padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
          fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)',
          background: 'var(--echoes-color-surface-default)',
        }}>
          Last analysis
          <svg width="10" height="6" viewBox="0 0 10 6" fill="var(--echoes-color-icon-default)" aria-hidden="true">
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </div>
      </div>

      <ButtonIcon Icon={IconArrowDown} ariaLabel="Toggle sort direction" size="medium" variety="default-ghost" />

      <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
        {count} {count === 1 ? 'project' : 'projects'}
      </span>

      <ButtonIcon Icon={IconHome} ariaLabel="Toggle view" size="medium" variety="default-ghost" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyProjectsPage() {
  const projects = getAllProjects();
  const projectKey = (p: Project) => `${p.orgId}-${p.id}`;

  const [starredIds, setStarredIds] = useState<Set<string>>(() => new Set());

  const toggleStar = (key: string) => {
    setStarredIds(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const favourites = projects.filter(p => starredIds.has(projectKey(p)));

  if (favourites.length === 0) {
    return (
      <Layout.ContentGrid>
        <Layout.PageGrid>
          <Layout.PageContent>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--echoes-dimension-space-200)',
              padding: 'var(--echoes-dimension-space-800) var(--echoes-dimension-space-400)',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 'var(--echoes-font-size-40)',
                fontWeight: 'var(--echoes-font-weight-semi-bold)',
                color: 'var(--echoes-color-text-default)',
              }}>
                You don't have any favorite projects yet.
              </span>
              <span style={{
                fontSize: 'var(--echoes-font-size-30)',
                color: 'var(--echoes-color-text-default)',
              }}>
                Here is how to add projects to this page
              </span>
              <div style={{ display: 'flex', gap: 'var(--echoes-dimension-space-200)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--echoes-dimension-space-200)' }}>
                <Button variety="default">Analyze new project</Button>
                <Button variety="default" suffix={<IconArrowDown />}>Favorite projects from your orgs</Button>
                <Button variety="default">Favorite public projects</Button>
              </div>
            </div>
          </Layout.PageContent>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    );
  }

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft size="medium">
        <Filters projects={favourites} />
      </Layout.AsideLeft>

      <Layout.PageGrid>
        <Layout.PageContent>
          <Toolbar count={favourites.length} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-200)' }}>
            {favourites.map(p => (
              <ProjectCard
                key={projectKey(p)}
                project={p}
                showOrgContext
                isStarred
                onToggleStar={() => toggleStar(projectKey(p))}
              />
            ))}
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
