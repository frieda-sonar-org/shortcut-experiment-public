import { Button, ButtonIcon, IconArrowDown, IconCheckCircle, IconHome, IconX, Layout, RatingBadge } from '@sonarsource/echoes-react';
import { useFavourites } from '../context/FavouritesContext';
import { getAllProjects } from '../data/orgs';
import type { Project, Rating } from '../data/orgs';
import { ProjectCard } from '../components/ProjectCard';
import CoverageIndicator from '../components/CoverageIndicator';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseLoc(loc: string): number {
  const s = loc.trim().toLowerCase();
  if (s.endsWith('k')) return parseFloat(s) * 1000;
  return parseFloat(s);
}

function computeCounts(projects: Project[]) {
  const qg = { passed: 0, failed: 0 };
  const reliability:     Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const security:        Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const secReview:       Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const maintainability: Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const coverage  = { gte80: 0, r7080: 0, r5070: 0, r3050: 0, lt30: 0, noData: 0 };
  const duplication = { lt3: 0, r35: 0, r510: 0, r1020: 0, gt20: 0, noData: 0 };
  const size = { xs: 0, s: 0, m: 0, l: 0, xl: 0, noData: 0 };
  const languages: Record<string, number> = {};
  const tags: Record<string, number> = {};

  for (const p of projects) {
    if (p.qualityGate === 'passed') qg.passed++;
    if (p.qualityGate === 'failed') qg.failed++;

    if (p.metrics) {
      reliability[p.metrics.reliability.rating]++;
      security[p.metrics.security.rating]++;
      secReview[p.metrics.hotspots.rating]++;
      maintainability[p.metrics.maintainability.rating]++;

      if (p.metrics.coverage) {
        const pct = p.metrics.coverage.percentage;
        if      (pct >= 80) coverage.gte80++;
        else if (pct >= 70) coverage.r7080++;
        else if (pct >= 50) coverage.r5070++;
        else if (pct >= 30) coverage.r3050++;
        else                coverage.lt30++;
      } else {
        coverage.noData++;
      }

      const dup = p.metrics.duplications.percentage;
      if      (dup < 3)  duplication.lt3++;
      else if (dup < 5)  duplication.r35++;
      else if (dup < 10) duplication.r510++;
      else if (dup < 20) duplication.r1020++;
      else               duplication.gt20++;
    } else {
      coverage.noData++;
      duplication.noData++;
    }

    if (p.linesOfCode) {
      const loc = parseLoc(p.linesOfCode);
      if      (loc < 1_000)   size.xs++;
      else if (loc < 10_000)  size.s++;
      else if (loc < 100_000) size.m++;
      else if (loc < 500_000) size.l++;
      else                    size.xl++;
    } else {
      size.noData++;
    }

    for (const lang of p.languages ?? []) {
      languages[lang] = (languages[lang] ?? 0) + 1;
    }
    for (const tag of p.tags ?? []) {
      tags[tag] = (tags[tag] ?? 0) + 1;
    }
  }

  return { qg, reliability, security, secReview, maintainability, coverage, duplication, size, languages, tags };
}

// ─── Filter primitives ────────────────────────────────────────────────────────

function FilterSectionTitle({ children }: { children: string }) {
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: '0' }} />
      <span style={{
        fontSize: 'var(--echoes-font-size-30)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-default)',
      }}>
        {children}
      </span>
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

// ─── Size badge ───────────────────────────────────────────────────────────────

const SIZE_COLORS: Record<string, string> = {
  XS: '#4b9fd5', S: '#5ba85b', M: '#d4a017', L: '#c06a1a', XL: '#b03a2e',
};

function SizeBadge({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '1.125rem', height: '1.125rem', borderRadius: '50%',
      background: SIZE_COLORS[label] ?? 'var(--echoes-color-border-bold)',
      fontSize: '0.6rem', fontWeight: 'var(--echoes-font-weight-semi-bold)',
      color: '#fff', flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

// ─── Filters panel ────────────────────────────────────────────────────────────

function Filters({ projects }: { projects: Project[] }) {
  const { qg, reliability, security, secReview, maintainability, coverage, duplication, size, languages, tags } = computeCounts(projects);
  const ratings: Rating[] = ['A', 'B', 'C', 'D', 'E'];

  const maxRel    = Math.max(...ratings.map(r => reliability[r]));
  const maxSec    = Math.max(...ratings.map(r => security[r]));
  const maxReview = Math.max(...ratings.map(r => secReview[r]));
  const maxMaint  = Math.max(...ratings.map(r => maintainability[r]));
  const maxQg     = Math.max(qg.passed, qg.failed);

  const coverageRows = [
    { label: '≥ 80%',      count: coverage.gte80,  pct: 90 },
    { label: '70% - 80%',  count: coverage.r7080,  pct: 75 },
    { label: '50% - 70%',  count: coverage.r5070,  pct: 60 },
    { label: '30% - 50%',  count: coverage.r3050,  pct: 40 },
    { label: '< 30%',      count: coverage.lt30,   pct: 15 },
    { label: 'No data',    count: coverage.noData,  pct: null },
  ];
  const maxCoverage = Math.max(...coverageRows.map(r => r.count));

  const dupRows = [
    { label: '< 3%',       count: duplication.lt3,   pct: 1  },
    { label: '3% - 5%',    count: duplication.r35,   pct: 4  },
    { label: '5% - 10%',   count: duplication.r510,  pct: 7  },
    { label: '10% - 20%',  count: duplication.r1020, pct: 15 },
    { label: '> 20%',      count: duplication.gt20,  pct: 25 },
    { label: 'No data',    count: duplication.noData, pct: null },
  ];
  const maxDup = Math.max(...dupRows.map(r => r.count));

  const sizeRows = [
    { label: 'XS', sublabel: '< 1k',         count: size.xs },
    { label: 'S',  sublabel: '1k - 10k',      count: size.s  },
    { label: 'M',  sublabel: '10k - 100k',    count: size.m  },
    { label: 'L',  sublabel: '100k - 500k',   count: size.l  },
    { label: 'XL', sublabel: '> 500k',        count: size.xl },
  ];
  const maxSize = Math.max(...sizeRows.map(r => r.count));

  const sortedLangs = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const maxLang = sortedLangs[0]?.[1] ?? 0;

  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);
  const maxTag = sortedTags[0]?.[1] ?? 0;

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

      {/* Quality Gate */}
      <FilterSectionTitle>Quality Gate</FilterSectionTitle>
      <FilterRow prefix={<span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-success)', flexShrink: 0 }}><IconCheckCircle /></span>} label="Passed" count={qg.passed} max={maxQg} />
      <FilterRow prefix={<span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-danger)', flexShrink: 0 }}><IconX /></span>} label="Failed" count={qg.failed} max={maxQg} />

      {/* Reliability */}
      <FilterSectionTitle>Reliability</FilterSectionTitle>
      {ratings.map(r => <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r} count={reliability[r]} max={maxRel} />)}

      {/* Security */}
      <FilterSectionTitle>Security</FilterSectionTitle>
      {ratings.map(r => <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r} count={security[r]} max={maxSec} />)}

      {/* Security Review */}
      <FilterSectionTitle>Security Review</FilterSectionTitle>
      {ratings.map(r => <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={secReviewLabels[r]} count={secReview[r]} max={maxReview} />)}

      {/* Maintainability */}
      <FilterSectionTitle>Maintainability</FilterSectionTitle>
      {ratings.map(r => <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r} count={maintainability[r]} max={maxMaint} />)}

      {/* Coverage */}
      <FilterSectionTitle>Coverage</FilterSectionTitle>
      {coverageRows.map(({ label, count, pct }) => (
        <FilterRow
          key={label}
          prefix={pct !== null ? <CoverageIndicator percentage={pct} /> : null}
          label={label}
          count={count}
          max={maxCoverage}
        />
      ))}

      {/* Duplications */}
      <FilterSectionTitle>Duplications</FilterSectionTitle>
      {dupRows.map(({ label, count, pct }) => (
        <FilterRow
          key={label}
          prefix={pct !== null ? <CoverageIndicator percentage={pct} inverted /> : null}
          label={label}
          count={count}
          max={maxDup}
        />
      ))}

      {/* Size */}
      <FilterSectionTitle>Size</FilterSectionTitle>
      {sizeRows.map(({ label, sublabel, count }) => (
        <FilterRow key={label} prefix={<SizeBadge label={label} />} label={sublabel} count={count} max={maxSize} />
      ))}

      {/* Languages */}
      <FilterSectionTitle>Languages</FilterSectionTitle>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)',
        border: '1px solid var(--echoes-color-border-bold)', borderRadius: 'var(--echoes-border-radius-200)',
        padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
        background: 'var(--echoes-color-surface-default)',
      }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--echoes-color-icon-subtle)" aria-hidden="true">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85-.708.707-3.85-3.85a6.5 6.5 0 0 0 1.398-1.397zM6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
        </svg>
        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-placeholder)' }}>
          Search for languages...
        </span>
      </div>
      {sortedLangs.map(([lang, count]) => (
        <FilterRow key={lang} prefix={null} label={lang} count={count} max={maxLang} />
      ))}

      {/* Tags */}
      <FilterSectionTitle>Tags</FilterSectionTitle>
      {sortedTags.map(([tag, count]) => (
        <FilterRow key={tag} prefix={null} label={tag} count={count} max={maxTag} />
      ))}
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', textAlign: 'center' }}>
        {sortedTags.length} of {sortedTags.length} shown
      </span>

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
  const { isStarred, toggleStar } = useFavourites();

  const favourites = projects.filter(p => isStarred(projectKey(p)));

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
            <div style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', textAlign: 'center' }}>
              {favourites.length} of {favourites.length} shown
            </div>
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
