import { Button, IconCheckCircle, IconX, RatingBadge } from '@sonarsource/echoes-react';
import type { Project, Rating } from '../data/orgs';
import CoverageIndicator from './CoverageIndicator';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectFilterState {
  qualityGate: string[];
  reliability: string[];
  security: string[];
  securityReview: string[];
  maintainability: string[];
  coverage: string[];
  duplication: string[];
  size: string[];
  language: string[];
  tag: string[];
}

export function emptyProjectFilters(): ProjectFilterState {
  return {
    qualityGate: [], reliability: [], security: [], securityReview: [],
    maintainability: [], coverage: [], duplication: [], size: [], language: [], tag: [],
  };
}

// ─── Filter logic ─────────────────────────────────────────────────────────────

function fieldMatches(filter: string[], value: string): boolean {
  return filter.length === 0 || filter.includes(value);
}

function getCoverageBucket(p: Project): string {
  if (!p.metrics?.coverage) return 'No data';
  const pct = p.metrics.coverage.percentage;
  if (pct >= 80) return '≥ 80%';
  if (pct >= 70) return '70% - 80%';
  if (pct >= 50) return '50% - 70%';
  if (pct >= 30) return '30% - 50%';
  return '< 30%';
}

function getDupBucket(p: Project): string {
  if (!p.metrics) return 'No data';
  const dup = p.metrics.duplications.percentage;
  if (dup < 3) return '< 3%';
  if (dup < 5) return '3% - 5%';
  if (dup < 10) return '5% - 10%';
  if (dup < 20) return '10% - 20%';
  return '> 20%';
}

function getSizeBucket(p: Project): string | null {
  if (!p.linesOfCode) return null;
  const loc = parseLoc(p.linesOfCode);
  if (loc < 1_000)   return 'XS';
  if (loc < 10_000)  return 'S';
  if (loc < 100_000) return 'M';
  if (loc < 500_000) return 'L';
  return 'XL';
}

function metricsMatch(p: Project, filters: ProjectFilterState): boolean {
  if (!p.metrics) return true;
  return (
    fieldMatches(filters.reliability,     p.metrics.reliability.rating) &&
    fieldMatches(filters.security,        p.metrics.security.rating) &&
    fieldMatches(filters.securityReview,  p.metrics.hotspots.rating) &&
    fieldMatches(filters.maintainability, p.metrics.maintainability.rating)
  );
}

function projectMatchesFilters(p: Project, filters: ProjectFilterState): boolean {
  if (!fieldMatches(filters.qualityGate, p.qualityGate ?? '')) return false;
  if (!metricsMatch(p, filters)) return false;
  if (filters.coverage.length > 0    && !filters.coverage.includes(getCoverageBucket(p)))    return false;
  if (filters.duplication.length > 0 && !filters.duplication.includes(getDupBucket(p)))      return false;
  if (filters.size.length > 0) {
    const bucket = getSizeBucket(p);
    if (!bucket || !filters.size.includes(bucket)) return false;
  }
  if (filters.language.length > 0 && !filters.language.some(l => p.languages?.includes(l))) return false;
  if (filters.tag.length > 0      && !filters.tag.some(t => p.tags?.includes(t)))            return false;
  return true;
}

export function applyProjectFilters(projects: Project[], filters: ProjectFilterState): Project[] {
  return projects.filter(p => projectMatchesFilters(p, filters));
}

function toggleArr(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function parseLoc(loc: string): number {
  const s = loc.trim().toLowerCase();
  if (s.endsWith('k')) return Number.parseFloat(s) * 1000;
  return Number.parseFloat(s);
}

type CoverageCounts    = { gte80: number; r7080: number; r5070: number; r3050: number; lt30: number; noData: number };
type DuplicationCounts = { lt3: number; r35: number; r510: number; r1020: number; gt20: number; noData: number };
type SizeCounts        = { xs: number; s: number; m: number; l: number; xl: number; noData: number };

function accumulateCoverage(coverage: CoverageCounts, pct: number | undefined): void {
  if (pct === undefined) { coverage.noData++; return; }
  if      (pct >= 80) coverage.gte80++;
  else if (pct >= 70) coverage.r7080++;
  else if (pct >= 50) coverage.r5070++;
  else if (pct >= 30) coverage.r3050++;
  else                coverage.lt30++;
}

function accumulateDuplication(duplication: DuplicationCounts, dup: number): void {
  if      (dup < 3)  duplication.lt3++;
  else if (dup < 5)  duplication.r35++;
  else if (dup < 10) duplication.r510++;
  else if (dup < 20) duplication.r1020++;
  else               duplication.gt20++;
}

function accumulateSize(size: SizeCounts, linesOfCode: string | undefined): void {
  if (!linesOfCode) { size.noData++; return; }
  const loc = parseLoc(linesOfCode);
  if      (loc < 1_000)   size.xs++;
  else if (loc < 10_000)  size.s++;
  else if (loc < 100_000) size.m++;
  else if (loc < 500_000) size.l++;
  else                    size.xl++;
}

export function computeCounts(projects: Project[]) {
  const qg = { passed: 0, failed: 0 };
  const reliability:     Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const security:        Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const secReview:       Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const maintainability: Record<Rating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const coverage:     CoverageCounts    = { gte80: 0, r7080: 0, r5070: 0, r3050: 0, lt30: 0, noData: 0 };
  const duplication:  DuplicationCounts = { lt3: 0, r35: 0, r510: 0, r1020: 0, gt20: 0, noData: 0 };
  const size:         SizeCounts        = { xs: 0, s: 0, m: 0, l: 0, xl: 0, noData: 0 };
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
      accumulateCoverage(coverage, p.metrics.coverage?.percentage);
      accumulateDuplication(duplication, p.metrics.duplications.percentage);
    } else {
      coverage.noData++;
      duplication.noData++;
    }

    accumulateSize(size, p.linesOfCode);

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

function FilterSectionTitle({ children }: Readonly<{ children: string }>) {
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: 'var(--echoes-dimension-space-150) 0' }} />
      <span style={{
        fontSize: 'var(--echoes-font-size-30)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-default)',
        padding: 'var(--echoes-dimension-space-50) 0',
        display: 'block',
      }}>
        {children}
      </span>
    </>
  );
}

function FilterBar({ count, max }: Readonly<{ count: number; max: number }>) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div style={{ flex: 1, height: '4px', background: 'var(--echoes-color-border-weaker)', borderRadius: '2px' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--echoes-color-border-bold)', borderRadius: '2px' }} />
    </div>
  );
}

function FilterRow({ prefix, label, count, max, selected, onClick }: Readonly<{
  prefix: React.ReactNode;
  label: string;
  count: number;
  max: number;
  selected: boolean;
  onClick: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      className={`filter-item${selected ? ' filter-item--selected' : ''}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)',
        padding: 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-100)',
        minHeight: '1.5rem',
        width: '100%', border: 'none', cursor: 'pointer',
        borderRadius: 'var(--echoes-border-radius-200)',
        textAlign: 'left',
      }}
    >
      {prefix}
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: selected ? 'var(--echoes-color-text-emphasis)' : 'var(--echoes-color-text-default)', flex: 1 }}>
        {label}
      </span>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', minWidth: '1rem', textAlign: 'right' }}>
        {count}
      </span>
      <div style={{ width: '3rem' }}>
        <FilterBar count={count} max={max} />
      </div>
    </button>
  );
}

// ─── Size badge ───────────────────────────────────────────────────────────────

const SIZE_COLORS: Record<string, string> = {
  XS: '#4b9fd5', S: '#5ba85b', M: '#d4a017', L: '#c06a1a', XL: '#b03a2e',
};

function SizeBadge({ label }: Readonly<{ label: string }>) {
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

interface ProjectFiltersProps {
  readonly allProjects: Project[];
  readonly filters: ProjectFilterState;
  readonly onChange: (filters: ProjectFilterState) => void;
}

export function ProjectFilters({ allProjects, filters, onChange }: ProjectFiltersProps) {
  const { qg, reliability, security, secReview, maintainability, coverage, duplication, size, languages, tags } = computeCounts(allProjects);
  const ratings: Rating[] = ['A', 'B', 'C', 'D', 'E'];

  const maxRel    = Math.max(...ratings.map(r => reliability[r]));
  const maxSec    = Math.max(...ratings.map(r => security[r]));
  const maxReview = Math.max(...ratings.map(r => secReview[r]));
  const maxMaint  = Math.max(...ratings.map(r => maintainability[r]));
  const maxQg     = Math.max(qg.passed, qg.failed);

  const coverageRows = [
    { label: '≥ 80%',     count: coverage.gte80,  pct: 90 },
    { label: '70% - 80%', count: coverage.r7080,  pct: 75 },
    { label: '50% - 70%', count: coverage.r5070,  pct: 60 },
    { label: '30% - 50%', count: coverage.r3050,  pct: 40 },
    { label: '< 30%',     count: coverage.lt30,   pct: 15 },
    { label: 'No data',   count: coverage.noData, pct: null },
  ];
  const maxCoverage = Math.max(...coverageRows.map(r => r.count));

  const dupRows = [
    { label: '< 3%',      count: duplication.lt3,   pct: 1  },
    { label: '3% - 5%',   count: duplication.r35,   pct: 4  },
    { label: '5% - 10%',  count: duplication.r510,  pct: 7  },
    { label: '10% - 20%', count: duplication.r1020, pct: 15 },
    { label: '> 20%',     count: duplication.gt20,  pct: 25 },
    { label: 'No data',   count: duplication.noData, pct: null },
  ];
  const maxDup = Math.max(...dupRows.map(r => r.count));

  const sizeRows = [
    { label: 'XS', sublabel: '< 1k',        count: size.xs },
    { label: 'S',  sublabel: '1k - 10k',    count: size.s  },
    { label: 'M',  sublabel: '10k - 100k',  count: size.m  },
    { label: 'L',  sublabel: '100k - 500k', count: size.l  },
    { label: 'XL', sublabel: '> 500k',      count: size.xl },
  ];
  const maxSize = Math.max(...sizeRows.map(r => r.count));

  const sortedLangs = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const maxLang = sortedLangs[0]?.[1] ?? 0;

  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);
  const maxTag = sortedTags[0]?.[1] ?? 0;

  const secReviewLabels: Record<Rating, string> = {
    A: '≥ 80%', B: '70% - 80%', C: '50% - 70%', D: '30% - 50%', E: '< 30%',
  };

  const tog = (key: keyof ProjectFilterState, value: string) =>
    onChange({ ...filters, [key]: toggleArr(filters[key], value) });

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'var(--echoes-dimension-space-200) 0',
      }}>
        <span style={{
          fontSize: 'var(--echoes-font-size-40)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-default)',
        }}>
          Filters
        </span>
        {hasActiveFilters && (
          <Button variety="default" size="small" onClick={() => onChange(emptyProjectFilters())}>
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Quality Gate */}
      <FilterSectionTitle>Quality Gate</FilterSectionTitle>
      <FilterRow
        prefix={<span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-success)', flexShrink: 0 }}><IconCheckCircle /></span>}
        label="Passed" count={qg.passed} max={maxQg}
        selected={filters.qualityGate.includes('passed')}
        onClick={() => tog('qualityGate', 'passed')}
      />
      <FilterRow
        prefix={<span style={{ width: '1rem', height: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--echoes-color-icon-danger)', flexShrink: 0 }}><IconX /></span>}
        label="Failed" count={qg.failed} max={maxQg}
        selected={filters.qualityGate.includes('failed')}
        onClick={() => tog('qualityGate', 'failed')}
      />

      {/* Reliability */}
      <FilterSectionTitle>Reliability</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r}
          count={reliability[r]} max={maxRel}
          selected={filters.reliability.includes(r)}
          onClick={() => tog('reliability', r)}
        />
      ))}

      {/* Security */}
      <FilterSectionTitle>Security</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r}
          count={security[r]} max={maxSec}
          selected={filters.security.includes(r)}
          onClick={() => tog('security', r)}
        />
      ))}

      {/* Security Review */}
      <FilterSectionTitle>Security Review</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={secReviewLabels[r]}
          count={secReview[r]} max={maxReview}
          selected={filters.securityReview.includes(r)}
          onClick={() => tog('securityReview', r)}
        />
      ))}

      {/* Maintainability */}
      <FilterSectionTitle>Maintainability</FilterSectionTitle>
      {ratings.map(r => (
        <FilterRow key={r} prefix={<RatingBadge rating={r} size="xs" />} label={r}
          count={maintainability[r]} max={maxMaint}
          selected={filters.maintainability.includes(r)}
          onClick={() => tog('maintainability', r)}
        />
      ))}

      {/* Coverage */}
      <FilterSectionTitle>Coverage</FilterSectionTitle>
      {coverageRows.map(({ label, count, pct }) => (
        <FilterRow
          key={label}
          prefix={pct === null ? null : <CoverageIndicator percentage={pct} />}
          label={label} count={count} max={maxCoverage}
          selected={filters.coverage.includes(label)}
          onClick={() => tog('coverage', label)}
        />
      ))}

      {/* Duplications */}
      <FilterSectionTitle>Duplications</FilterSectionTitle>
      {dupRows.map(({ label, count, pct }) => (
        <FilterRow
          key={label}
          prefix={pct === null ? null : <CoverageIndicator percentage={pct} inverted />}
          label={label} count={count} max={maxDup}
          selected={filters.duplication.includes(label)}
          onClick={() => tog('duplication', label)}
        />
      ))}

      {/* Size */}
      <FilterSectionTitle>Size</FilterSectionTitle>
      {sizeRows.map(({ label, sublabel, count }) => (
        <FilterRow key={label} prefix={<SizeBadge label={label} />} label={sublabel}
          count={count} max={maxSize}
          selected={filters.size.includes(label)}
          onClick={() => tog('size', label)}
        />
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
        <FilterRow key={lang} prefix={null} label={lang} count={count} max={maxLang}
          selected={filters.language.includes(lang)}
          onClick={() => tog('language', lang)}
        />
      ))}

      {/* Tags */}
      <FilterSectionTitle>Tags</FilterSectionTitle>
      {sortedTags.map(([tag, count]) => (
        <FilterRow key={tag} prefix={null} label={tag} count={count} max={maxTag}
          selected={filters.tag.includes(tag)}
          onClick={() => tog('tag', tag)}
        />
      ))}
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', textAlign: 'center' }}>
        {sortedTags.length} of {sortedTags.length} shown
      </span>

    </div>
  );
}
