import { useState } from 'react';
import {
  IconBug,
  IconChevronDown,
  IconChevronRight,
  IconCodeSmell,
  IconSeverityBlocker,
  IconSeverityHigh,
  IconSeverityLow,
  IconSeverityMedium,
  IconVulnerability,
} from '@sonarsource/echoes-react';
import type { Issue } from '../data/issues';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IssueFilterState {
  softwareQuality: string[];  // 'Security' | 'Reliability' | 'Maintainability'
  severity: string[];          // 'Blocker' | 'High' | 'Medium' | 'Low' | 'Info'  (attributeSeverity)
  codeAttribute: string[];     // category values
  type: string[];              // 'bug' | 'vulnerability' | 'code_smell'
  typeSeverity: string[];      // 'blocker' | 'critical' | 'major' | 'minor' | 'info'
  status: string[];            // 'open' | 'confirmed' | 'resolved'
  tag: string[];
  project: string[];           // 'org / project'
  language: string[];
}

export function emptyIssueFilters(): IssueFilterState {
  return {
    softwareQuality: [], severity: [], codeAttribute: [],
    type: [], typeSeverity: [], status: [], tag: [], project: [], language: [],
  };
}

// ─── Language helper ──────────────────────────────────────────────────────────

function getLanguageFromPath(filePath: string): string {
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) return 'GitHub Actions';
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) return 'TypeScript';
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) return 'JavaScript';
  if (filePath.endsWith('.css')) return 'CSS';
  if (filePath.endsWith('.html')) return 'HTML';
  return 'Other';
}

// ─── Count computation ────────────────────────────────────────────────────────

interface IssueCounts {
  softwareQuality: Record<string, number>;
  severity: Record<string, number>;
  codeAttribute: Record<string, number>;
  type: Record<string, number>;
  typeSeverity: Record<string, number>;
  status: Record<string, number>;
  tag: Record<string, number>;
  project: Record<string, number>;
  language: Record<string, number>;
}

function computeIssueCounts(issues: Issue[]): IssueCounts {
  const counts: IssueCounts = {
    softwareQuality: {}, severity: {}, codeAttribute: {},
    type: {}, typeSeverity: {}, status: {}, tag: {}, project: {}, language: {},
  };
  const inc = (obj: Record<string, number>, key: string) => {
    obj[key] = (obj[key] ?? 0) + 1;
  };
  for (const issue of issues) {
    inc(counts.softwareQuality, issue.attribute);
    inc(counts.severity, issue.attributeSeverity);
    inc(counts.codeAttribute, issue.category);
    inc(counts.type, issue.type);
    inc(counts.typeSeverity, issue.severity);
    inc(counts.status, issue.status);
    inc(counts.project, `${issue.org} / ${issue.project}`);
    inc(counts.language, getLanguageFromPath(issue.filePath));
    for (const tag of issue.tags ?? []) {
      inc(counts.tag, tag);
    }
  }
  return counts;
}

// ─── Filter application ───────────────────────────────────────────────────────

function fieldMatches(filter: string[], value: string): boolean {
  return filter.length === 0 || filter.includes(value);
}

function issueMatchesFilters(issue: Issue, filters: IssueFilterState): boolean {
  return (
    fieldMatches(filters.softwareQuality, issue.attribute) &&
    fieldMatches(filters.severity, issue.attributeSeverity) &&
    fieldMatches(filters.codeAttribute, issue.category) &&
    fieldMatches(filters.type, issue.type) &&
    fieldMatches(filters.typeSeverity, issue.severity) &&
    fieldMatches(filters.status, issue.status) &&
    (filters.tag.length === 0 || filters.tag.some(t => issue.tags?.includes(t))) &&
    fieldMatches(filters.project, `${issue.org} / ${issue.project}`) &&
    fieldMatches(filters.language, getLanguageFromPath(issue.filePath))
  );
}

export function applyIssueFilters(issues: Issue[], filters: IssueFilterState): Issue[] {
  return issues.filter(issue => issueMatchesFilters(issue, filters));
}

// ─── Effort helpers ───────────────────────────────────────────────────────────

function parseEffortMinutes(effort: string): number {
  const dayMatch = /(\d+)d/.exec(effort);
  const hourMatch = /(\d+)h/.exec(effort);
  const minMatch = /(\d+)min/.exec(effort);
  let total = 0;
  if (dayMatch) total += Number.parseInt(dayMatch[1]) * 480;
  if (hourMatch) total += Number.parseInt(hourMatch[1]) * 60;
  if (minMatch) total += Number.parseInt(minMatch[1]);
  return total;
}

export function computeTotalEffort(issues: Issue[]): string {
  const total = issues.reduce((sum, issue) => sum + parseEffortMinutes(issue.effort), 0);
  const days = Math.floor(total / 480);
  const hours = Math.floor((total % 480) / 60);
  const mins = total % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}min`);
  return parts.join(' ') || '0min';
}

// ─── Toggle helper ────────────────────────────────────────────────────────────

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
}

// ─── UI primitives ────────────────────────────────────────────────────────────

function FilterSection({ title, isOpen, onToggle, hasHelp, children }: Readonly<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  hasHelp?: boolean;
  children: React.ReactNode;
}>) {
  return (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: 'var(--echoes-dimension-space-150) 0' }} />
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center',
          gap: 'var(--echoes-dimension-space-75)',
          width: '100%',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 'var(--echoes-dimension-space-150) 0',
          color: 'var(--echoes-color-text-default)',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--echoes-color-icon-subtle)', flexShrink: 0, fontSize: '0.875rem' }}>
          {isOpen ? <IconChevronDown /> : <IconChevronRight />}
        </span>
        <span style={{
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          flex: 1,
        }}>
          {title}
        </span>
        {hasHelp && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '1rem', height: '1rem', borderRadius: '50%',
            border: '1px solid var(--echoes-color-border-bold)',
            fontSize: '0.6rem', fontWeight: 'var(--echoes-font-weight-semi-bold)',
            color: 'var(--echoes-color-text-default)', flexShrink: 0,
          }}>
            ?
          </span>
        )}
      </button>
      <div style={{ paddingBottom: 'var(--echoes-dimension-space-150)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {isOpen && children}
      </div>
    </div>
  );
}

function FilterItem({ prefix, label, count, selected, onClick }: Readonly<{
  prefix?: React.ReactNode;
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}>) {
  const isDisabled = count === 0 && !selected;
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      className={`filter-item${selected ? ' filter-item--selected' : ''}`}
      style={{
        display: 'flex', alignItems: 'center',
        gap: 'var(--echoes-dimension-space-100)',
        width: '100%',
        border: 'none',
        cursor: isDisabled ? 'default' : 'pointer',
        padding: 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-100)',
        borderRadius: 'var(--echoes-border-radius-200)',
        opacity: isDisabled ? 0.4 : 1,
        textAlign: 'left',
      }}
    >
      {prefix !== undefined && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, fontSize: '0.875rem' }}>
          {prefix}
        </span>
      )}
      <span style={{
        fontSize: 'var(--echoes-font-size-20)',
        color: selected ? 'var(--echoes-color-text-emphasis)' : 'var(--echoes-color-text-default)',
        flex: 1,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-default)',
        minWidth: '1.5rem', textAlign: 'right',
      }}>
        {count}
      </span>
    </button>
  );
}

function SearchBox({ placeholder }: Readonly<{ placeholder: string }>) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)',
      border: '1px solid var(--echoes-color-border-bold)',
      borderRadius: 'var(--echoes-border-radius-200)',
      padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
      background: 'var(--echoes-color-surface-default)',
      marginBottom: 'var(--echoes-dimension-space-100)',
    }}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--echoes-color-icon-subtle)" aria-hidden="true">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85-.708.707-3.85-3.85a6.5 6.5 0 0 0 1.398-1.397zM6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
      </svg>
      <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-placeholder)' }}>
        {placeholder}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface IssuesFilterProps {
  readonly allIssues: Issue[];
  readonly filters: IssueFilterState;
  readonly onChange: (filters: IssueFilterState) => void;
}

// Section keys
const SECTIONS = ['softwareQuality', 'severity', 'codeAttribute', 'type', 'typeSeverity', 'status', 'securityCategory', 'creationDate', 'language', 'tag', 'project'] as const;
type SectionKey = typeof SECTIONS[number];

const SOFTWARE_QUALITY_ITEMS = ['Security', 'Reliability', 'Maintainability'];

const SEVERITY_ITEMS: { value: string; icon: React.ReactNode }[] = [
  { value: 'Blocker', icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-blocker-icon-default)' }}><IconSeverityBlocker /></span> },
  { value: 'High',    icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-high-icon-default)' }}><IconSeverityHigh /></span> },
  { value: 'Medium',  icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-medium-icon-default)' }}><IconSeverityMedium /></span> },
  { value: 'Low',     icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-low-icon-default)' }}><IconSeverityLow /></span> },
  { value: 'Info',    icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-info-icon-default)' }}><IconSeverityLow /></span> },
];

const CODE_ATTRIBUTE_ITEMS = ['Consistency', 'Intentionality', 'Adaptability', 'Responsibility'];

const TYPE_ITEMS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: 'bug',           label: 'Bug',          icon: <IconBug /> },
  { value: 'vulnerability', label: 'Vulnerability', icon: <IconVulnerability /> },
  { value: 'code_smell',    label: 'Code Smell',   icon: <IconCodeSmell /> },
];

const TYPE_SEVERITY_ITEMS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: 'blocker',  label: 'Blocker',  icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-blocker-icon-default)' }}><IconSeverityBlocker /></span> },
  { value: 'critical', label: 'Critical', icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-high-icon-default)' }}><IconSeverityHigh /></span> },
  { value: 'major',    label: 'Major',    icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-medium-icon-default)' }}><IconSeverityMedium /></span> },
  { value: 'minor',    label: 'Minor',    icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-low-icon-default)' }}><IconSeverityLow /></span> },
  { value: 'info',     label: 'Info',     icon: <span style={{ color: 'var(--echoes-severity-badge-colors-foreground-info-icon-default)' }}><IconSeverityLow /></span> },
];

const STATUS_ITEMS: { value: string; label: string }[] = [
  { value: 'open',           label: 'Open' },
  { value: 'confirmed',      label: 'Confirmed' },
  { value: 'false_positive', label: 'False Positive' },
  { value: 'accepted',       label: 'Accepted' },
  { value: 'resolved',       label: 'Fixed' },
];

const SECURITY_CATEGORY_ITEMS = [
  'SonarSource', 'PCI DSS 4.0', 'PCI DSS 3.2', 'OWASP ASVS 4.0',
  'OWASP Top 10 2021', 'OWASP Top 10 2017', 'OWASP Mobile Top 10 2024',
  'STIG ASD V5R3', 'CASA', 'CWE',
];

const TAGS_VISIBLE_LIMIT = 15;

export function IssuesFilter({ allIssues, filters, onChange }: IssuesFilterProps) {
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['softwareQuality', 'severity'])
  );
  const [showAllTags, setShowAllTags] = useState(false);

  const counts = computeIssueCounts(allIssues);

  const toggleSection = (section: SectionKey) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const toggleFilter = (key: keyof IssueFilterState, value: string) => {
    onChange({ ...filters, [key]: toggle(filters[key], value) });
  };

  const sortedLangs = Object.entries(counts.language).sort((a, b) => b[1] - a[1]);
  const sortedTags = Object.entries(counts.tag).sort((a, b) => b[1] - a[1]);
  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, TAGS_VISIBLE_LIMIT);
  const sortedProjects = Object.entries(counts.project).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{
        fontSize: 'var(--echoes-font-size-40)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-default)',
        padding: 'var(--echoes-dimension-space-200) 0',
        display: 'block',
      }}>
        Filters
      </span>

      {/* Software quality */}
      <FilterSection
        title="Software quality"
        isOpen={openSections.has('softwareQuality')}
        onToggle={() => toggleSection('softwareQuality')}
      >
        {SOFTWARE_QUALITY_ITEMS.map(item => (
          <FilterItem
            key={item}
            label={item}
            count={counts.softwareQuality[item] ?? 0}
            selected={filters.softwareQuality.includes(item)}
            onClick={() => toggleFilter('softwareQuality', item)}
          />
        ))}
      </FilterSection>

      {/* Severity */}
      <FilterSection
        title="Severity"
        isOpen={openSections.has('severity')}
        onToggle={() => toggleSection('severity')}
        hasHelp
      >
        {SEVERITY_ITEMS.map(({ value, icon }) => (
          <FilterItem
            key={value}
            prefix={icon}
            label={value}
            count={counts.severity[value] ?? 0}
            selected={filters.severity.includes(value)}
            onClick={() => toggleFilter('severity', value)}
          />
        ))}
      </FilterSection>

      {/* Code attribute */}
      <FilterSection
        title="Code attribute"
        isOpen={openSections.has('codeAttribute')}
        onToggle={() => toggleSection('codeAttribute')}
      >
        {CODE_ATTRIBUTE_ITEMS.map(item => (
          <FilterItem
            key={item}
            label={item}
            count={counts.codeAttribute[item] ?? 0}
            selected={filters.codeAttribute.includes(item)}
            onClick={() => toggleFilter('codeAttribute', item)}
          />
        ))}
      </FilterSection>

      {/* Type */}
      <FilterSection
        title="Type"
        isOpen={openSections.has('type')}
        onToggle={() => toggleSection('type')}
      >
        {TYPE_ITEMS.map(({ value, label, icon }) => (
          <FilterItem
            key={value}
            prefix={icon}
            label={label}
            count={counts.type[value] ?? 0}
            selected={filters.type.includes(value)}
            onClick={() => toggleFilter('type', value)}
          />
        ))}
      </FilterSection>

      {/* Type Severity */}
      <FilterSection
        title="Type Severity"
        isOpen={openSections.has('typeSeverity')}
        onToggle={() => toggleSection('typeSeverity')}
        hasHelp
      >
        {TYPE_SEVERITY_ITEMS.map(({ value, label, icon }) => (
          <FilterItem
            key={value}
            prefix={icon}
            label={label}
            count={counts.typeSeverity[value] ?? 0}
            selected={filters.typeSeverity.includes(value)}
            onClick={() => toggleFilter('typeSeverity', value)}
          />
        ))}
      </FilterSection>

      {/* Status */}
      <FilterSection
        title="Status"
        isOpen={openSections.has('status')}
        onToggle={() => toggleSection('status')}
      >
        {STATUS_ITEMS.map(({ value, label }) => (
          <FilterItem
            key={value}
            label={label}
            count={counts.status[value] ?? 0}
            selected={filters.status.includes(value)}
            onClick={() => toggleFilter('status', value)}
          />
        ))}
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-default)',
          textAlign: 'center', display: 'block',
          padding: 'var(--echoes-dimension-space-100) 0',
        }}>
          Add to selection ⌘ + click
        </span>
      </FilterSection>

      {/* Security Category */}
      <FilterSection
        title="Security Category"
        isOpen={openSections.has('securityCategory')}
        onToggle={() => toggleSection('securityCategory')}
      >
        {SECURITY_CATEGORY_ITEMS.map(item => (
          <FilterItem
            key={item}
            label={item}
            count={0}
            selected={false}
            onClick={() => {/* static, no data */}}
          />
        ))}
      </FilterSection>

      {/* Creation Date */}
      <FilterSection
        title="Creation Date"
        isOpen={openSections.has('creationDate')}
        onToggle={() => toggleSection('creationDate')}
      >
        <div style={{
          display: 'flex', gap: 'var(--echoes-dimension-space-100)',
          padding: 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-100)',
        }}>
          {(['Start Date', 'End Date'] as const).map(label => (
            <div key={label} style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)',
              border: '1px solid var(--echoes-color-border-bold)',
              borderRadius: 'var(--echoes-border-radius-200)',
              padding: '0 var(--echoes-dimension-space-100)', height: '2rem',
              background: 'var(--echoes-color-surface-default)',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--echoes-color-icon-subtle)" aria-hidden="true">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z" />
              </svg>
              <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-placeholder)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex', gap: 'var(--echoes-dimension-space-100)',
          padding: 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-100)',
          flexWrap: 'wrap',
        }}>
          {(['Overall Code', 'Last week', 'Last month', 'Last year'] as const).map((label, i) => (
            <span key={label} style={{
              fontSize: 'var(--echoes-font-size-20)',
              padding: 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-100)',
              border: '1px solid var(--echoes-color-border-bold)',
              borderRadius: 'var(--echoes-border-radius-200)',
              background: i === 0 ? 'var(--echoes-color-surface-emphasis)' : 'var(--echoes-color-surface-default)',
              color: i === 0 ? 'var(--echoes-color-text-on-color)' : 'var(--echoes-color-text-default)',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
          ))}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection
        title="Language"
        isOpen={openSections.has('language')}
        onToggle={() => toggleSection('language')}
      >
        <SearchBox placeholder="Search for languages..." />
        {sortedLangs.map(([lang, count]) => (
          <FilterItem
            key={lang}
            label={lang}
            count={count}
            selected={filters.language.includes(lang)}
            onClick={() => toggleFilter('language', lang)}
          />
        ))}
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-default)',
          textAlign: 'center', display: 'block',
          padding: 'var(--echoes-dimension-space-50) 0',
        }}>
          {sortedLangs.length} of {sortedLangs.length} shown
        </span>
      </FilterSection>

      {/* Tag */}
      <FilterSection
        title="Tag"
        isOpen={openSections.has('tag')}
        onToggle={() => toggleSection('tag')}
      >
        <SearchBox placeholder="Search for tags..." />
        {visibleTags.map(([tag, count]) => (
          <FilterItem
            key={tag}
            label={tag}
            count={count}
            selected={filters.tag.includes(tag)}
            onClick={() => toggleFilter('tag', tag)}
          />
        ))}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)',
          padding: 'var(--echoes-dimension-space-50) 0', gap: 'var(--echoes-dimension-space-75)',
        }}>
          <span>{visibleTags.length} of {sortedTags.length} shown</span>
          {sortedTags.length > TAGS_VISIBLE_LIMIT && (
            <button
              onClick={() => setShowAllTags(prev => !prev)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--echoes-color-text-accent)',
                fontSize: 'var(--echoes-font-size-20)',
              }}
            >
              {showAllTags ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </FilterSection>

      {/* Project */}
      <FilterSection
        title="Project"
        isOpen={openSections.has('project')}
        onToggle={() => toggleSection('project')}
      >
        <SearchBox placeholder="Search projects" />
        {sortedProjects.map(([project, count]) => (
          <FilterItem
            key={project}
            label={project}
            count={count}
            selected={filters.project.includes(project)}
            onClick={() => toggleFilter('project', project)}
          />
        ))}
        <span style={{
          fontSize: 'var(--echoes-font-size-20)',
          color: 'var(--echoes-color-text-default)',
          textAlign: 'center', display: 'block',
          padding: 'var(--echoes-dimension-space-50) 0',
        }}>
          {sortedProjects.length} of {sortedProjects.length} shown
        </span>
      </FilterSection>
    </div>
  );
}
