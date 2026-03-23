import { useEffect, useState } from 'react';
import {
  Badge,
  BadgeSeverity,
  ButtonIcon,
  IconBug,
  IconChevronDown,
  IconCodeSmell,
  IconHome,
  IconSeverityBlocker,
  IconSeverityHigh,
  IconSeverityLow,
  IconSeverityMedium,
  IconStatusOpen,
  IconTriangleDown,
  IconTriangleLeft,
  IconTriangleRight,
  IconTriangleUp,
  IconVulnerability,
  Layout,
} from '@sonarsource/echoes-react';
import type { Issue, IssueGroup, IssueSeverity, IssueType } from '../data/issues';
import { groupIssuesByFile, ISSUES } from '../data/issues';
import { CURRENT_USER } from '../data/currentUser';
import {
  applyIssueFilters,
  computeTotalEffort,
  emptyIssueFilters,
  IssueFilterState,
  IssuesFilter,
} from '../components/IssuesFilter';

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function IssueTypeIcon({ type }: Readonly<{ type: IssueType }>) {
  const style: React.CSSProperties = { display: 'inline-flex', verticalAlign: 'middle' };
  if (type === 'vulnerability') return <span style={style}><IconVulnerability /></span>;
  if (type === 'code_smell')    return <span style={style}><IconCodeSmell /></span>;
  return <span style={style}><IconBug /></span>;
}

function IssueTypeLabel({ type }: Readonly<{ type: IssueType }>) {
  if (type === 'vulnerability') return 'Vulnerability';
  if (type === 'code_smell')    return 'Code Smell';
  return 'Bug';
}

function SeverityIcon({ severity }: Readonly<{ severity: IssueSeverity }>) {
  const style: React.CSSProperties = { display: 'inline-flex', verticalAlign: 'middle' };
  if (severity === 'blocker')  return <span style={style}><IconSeverityBlocker /></span>;
  if (severity === 'critical') return <span style={style}><IconSeverityHigh /></span>;
  if (severity === 'major')    return <span style={style}><IconSeverityMedium /></span>;
  return <span style={style}><IconSeverityLow /></span>;
}

function SeverityLabel({ severity }: Readonly<{ severity: IssueSeverity }>) {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

// ─── Assignee avatar ──────────────────────────────────────────────────────────

function Assignee({ username }: Readonly<{ username: string }>) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
      <img
        src={CURRENT_USER.avatarUrl}
        alt={username}
        style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
      <span style={{ color: 'var(--echoes-color-text-default)', fontSize: 'var(--echoes-font-size-20)' }}>{username}</span>
      <IconChevronDown />
    </span>
  );
}

// ─── Status chip ──────────────────────────────────────────────────────────────

function StatusChip({ status }: Readonly<{ status: Issue['status'] }>) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)',
      fontSize: 'var(--echoes-font-size-20)',
      color: 'var(--echoes-color-text-default)',
    }}>
      <IconStatusOpen />
      {label}
      <IconChevronDown />
    </span>
  );
}


// ─── Issue card ───────────────────────────────────────────────────────────────

const dot = (
  <span style={{ color: 'var(--echoes-color-text-subtle)', margin: '0 var(--echoes-dimension-space-75)' }}>•</span>
);

function IssueRow({ issue }: Readonly<{ issue: Issue }>) {
  const severityLevel = issue.attributeSeverity.toLowerCase() as 'blocker' | 'high' | 'medium' | 'low' | 'info';

  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      background: 'var(--echoes-color-surface-default)',
      padding: 'var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-150)',
    }}>
      {/* Row 1: Title (left) + Code attribute badge (right) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--echoes-dimension-space-200)' }}>
        <span style={{
          flex: 1,
          fontSize: 'var(--echoes-font-size-30)',
          fontWeight: 'var(--echoes-font-weight-semi-bold)',
          color: 'var(--echoes-color-text-accent)',
          cursor: 'pointer',
        }}>
          {issue.title}
        </span>
        <Badge variety="info" size="small">{issue.category}</Badge>
      </div>

      {/* Row 2: Software quality BadgeSeverity (left) + tags (right) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--echoes-dimension-space-100)' }}>
        <BadgeSeverity
          quality={issue.attribute}
          severity={severityLevel}
          variety="static"
          ariaLabel={`${issue.attribute}: ${issue.attributeSeverity}`}
        />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)', flexShrink: 0 }}>
          {issue.tags && issue.tags.length > 0 ? (
            issue.tags.map(tag => (
              <Badge key={tag} variety="neutral" size="small">{tag}</Badge>
            ))
          ) : (
            <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subtle)' }}>
              No tags
            </span>
          )}
          <Badge variety="neutral" size="small">+</Badge>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--echoes-color-border-weak)', margin: 0 }} />

      {/* Row 3: Properties — left: status + assignee | right: line · effort · age · type · severity */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--echoes-dimension-space-150)',
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-default)',
      }}>
        <StatusChip status={issue.status} />
        <Assignee username={issue.assignee} />
        <div style={{ flex: 1 }} />
        <span>{issue.line}</span>
        {dot}
        <span>{issue.effort} effort</span>
        {dot}
        <span>{issue.age}</span>
        {dot}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
          <IssueTypeIcon type={issue.type} />
          <IssueTypeLabel type={issue.type} />
        </span>
        {dot}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
          <SeverityIcon severity={issue.severity} />
          <SeverityLabel severity={issue.severity} />
        </span>
      </div>
    </div>
  );
}

// ─── Issue group (by file) ────────────────────────────────────────────────────

function IssueFileGroup({ group }: Readonly<{ group: IssueGroup }>) {
  return (
    <div style={{ marginBottom: 'var(--echoes-dimension-space-400)' }}>
      {/* File path — outside cards */}
      <div style={{
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-default)',
        marginBottom: 'var(--echoes-dimension-space-150)',
        padding: 'var(--echoes-dimension-space-50) 0',
      }}>
        <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>{group.org}</span>
        <span style={{ margin: '0 var(--echoes-dimension-space-75)', color: 'var(--echoes-color-text-subtle)' }}>/</span>
        <span style={{ fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>{group.project}</span>
        <span style={{ margin: '0 var(--echoes-dimension-space-75)', color: 'var(--echoes-color-text-subtle)' }}>/</span>
        <span>{group.filePath}</span>
      </div>

      {/* Individual issue cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-150)' }}>
        {group.issues.map(issue => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function IssuesToolbar({ count, totalEffort }: Readonly<{ count: number; totalEffort: string }>) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--echoes-dimension-space-150)',
      marginBottom: 'var(--echoes-dimension-space-300)',
      flexWrap: 'wrap',
    }}>
      {/* Select issues */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Select issues
        </span>
        <ButtonIcon Icon={IconTriangleUp}   ariaLabel="Previous" size="small" variety="default-ghost" />
        <ButtonIcon Icon={IconTriangleDown} ariaLabel="Next"     size="small" variety="default-ghost" />
      </div>

      {/* Navigate to issue */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Navigate to issue
        </span>
        <ButtonIcon Icon={IconTriangleLeft}  ariaLabel="Previous issue" size="small" variety="default-ghost" />
        <ButtonIcon Icon={IconTriangleRight} ariaLabel="Next issue"     size="small" variety="default-ghost" />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Count + effort */}
      <span style={{
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-default)',
        whiteSpace: 'nowrap',
      }}>
        {count} issues
        <span style={{ color: 'var(--echoes-color-text-subtle)', margin: '0 var(--echoes-dimension-space-75)' }}>•</span>
        {totalEffort} effort
      </span>

      {/* Home / view toggle */}
      <ButtonIcon Icon={IconHome} ariaLabel="Back to project" size="small" variety="default-ghost" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface MyIssuesPageProps {
  pageTitle?: string;
  pageDescription?: string;
}

export default function MyIssuesPage({ pageTitle, pageDescription }: Readonly<MyIssuesPageProps> = {}) {
  useEffect(() => { document.title = 'My Issues - My Account - SonarQube Cloud'; }, []);

  const [filters, setFilters] = useState<IssueFilterState>(emptyIssueFilters);

  const filteredIssues = applyIssueFilters(ISSUES, filters);
  const groups = groupIssuesByFile(filteredIssues);

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft size="medium">
        <IssuesFilter allIssues={ISSUES} filters={filters} onChange={setFilters} />
      </Layout.AsideLeft>

      <Layout.PageGrid width="fluid">
        <div style={{
          background: 'var(--echoes-color-surface-default)',
          borderBottom: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-300) var(--echoes-dimension-space-400)',
        }}>
          <div style={{ fontSize: 'var(--echoes-font-size-50)', fontWeight: 'var(--echoes-font-weight-bold)', color: 'var(--echoes-color-text-default)' }}>
            {pageTitle ?? 'Assigned Issues'}
          </div>
          {pageDescription && (
            <div style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-subtle)', marginTop: 'var(--echoes-dimension-space-50)' }}>
              {pageDescription}
            </div>
          )}
        </div>
        <Layout.PageContent>
          <div style={{ maxWidth: 'var(--echoes-layout-sizes-max-width-default)', marginLeft: 'auto', marginRight: 'auto' }}>
          <IssuesToolbar count={filteredIssues.length} totalEffort={computeTotalEffort(filteredIssues)} />
          <div>
            {groups.map(group => (
              <IssueFileGroup
                key={`${group.org}/${group.project}/${group.filePath}`}
                group={group}
              />
            ))}
          </div>
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
