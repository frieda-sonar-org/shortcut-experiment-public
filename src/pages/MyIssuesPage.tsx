import { useEffect } from 'react';
import {
  Badge,
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
  IconTriangleLeft,
  IconTriangleRight,
  IconVulnerability,
  Layout,
} from '@sonarsource/echoes-react';
import type { Issue, IssueGroup, IssueSeverity, IssueType } from '../data/issues';
import { groupIssuesByFile, ISSUES, TOTAL_EFFORT, TOTAL_ISSUES } from '../data/issues';
import { IssuesFilter } from '../components/IssuesFilter';

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
  const letter = username.charAt(0).toUpperCase();
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '1.25rem', height: '1.25rem', borderRadius: '50%',
        backgroundColor: 'var(--echoes-color-surface-invert)',
        color: 'var(--echoes-color-text-on-color)',
        fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
      }}>
        {letter}
      </span>
      <span style={{ color: 'var(--echoes-color-text-default)' }}>{username}</span>
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
      border: '1px solid var(--echoes-color-border-bold)',
      borderRadius: 'var(--echoes-border-radius-200)',
      padding: '0 var(--echoes-dimension-space-100)',
      height: '1.5rem',
      fontSize: 'var(--echoes-font-size-20)',
      color: 'var(--echoes-color-text-default)',
    }}>
      <IconStatusOpen />
      {label}
      <IconChevronDown />
    </span>
  );
}

// ─── Attribute / category tags ────────────────────────────────────────────────

function CategoryTag({ label }: Readonly<{ label: string }>) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0 var(--echoes-dimension-space-100)',
      height: '1.375rem',
      borderRadius: 'var(--echoes-border-radius-200)',
      background: 'var(--echoes-color-surface-emphasis-weak)',
      color: 'var(--echoes-color-text-emphasis)',
      fontSize: 'var(--echoes-font-size-20)',
      fontWeight: 'var(--echoes-font-weight-semi-bold)',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function AttributeTag({ label }: Readonly<{ label: string }>) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0 var(--echoes-dimension-space-100)',
      height: '1.375rem',
      borderRadius: 'var(--echoes-border-radius-200)',
      background: 'var(--echoes-color-surface-default)',
      border: '1px solid var(--echoes-color-border-bold)',
      color: 'var(--echoes-color-text-default)',
      fontSize: 'var(--echoes-font-size-20)',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// ─── Issue row ────────────────────────────────────────────────────────────────

const dot = (
  <span style={{ color: 'var(--echoes-color-text-subdued)', margin: '0 var(--echoes-dimension-space-75)' }}>•</span>
);

function IssueRow({ issue }: Readonly<{ issue: Issue }>) {
  return (
    <div style={{
      padding: 'var(--echoes-dimension-space-200)',
      borderBottom: '1px solid var(--echoes-color-border-weak)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-100)',
    }}>
      {/* Title */}
      <span style={{
        fontSize: 'var(--echoes-font-size-30)',
        fontWeight: 'var(--echoes-font-weight-semi-bold)',
        color: 'var(--echoes-color-text-accent)',
        cursor: 'pointer',
      }}>
        {issue.title}
      </span>

      {/* Category + attribute tags */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)', flexWrap: 'wrap' }}>
        <CategoryTag label={issue.category} />
        <AttributeTag label={issue.attribute} />
        <AttributeTag label={issue.attributeSeverity} />

        <span style={{
          color: 'var(--echoes-color-text-subdued)',
          fontSize: 'var(--echoes-font-size-20)',
          marginLeft: 'var(--echoes-dimension-space-100)',
        }}>
          {issue.tags && issue.tags.length > 0 ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
              {issue.tags.map(tag => (
                <Badge key={tag} variety="neutral" size="small">{tag}</Badge>
              ))}
              <Badge variety="neutral" size="small">+</Badge>
            </span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
              No tags
              <Badge variety="neutral" size="small">+</Badge>
            </span>
          )}
        </span>
      </div>

      {/* Metadata row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 0,
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-subdued)',
      }}>
        <StatusChip status={issue.status} />
        <span style={{ marginLeft: 'var(--echoes-dimension-space-150)' }}>
          <Assignee username={issue.assignee} />
        </span>
        {dot}
        <span style={{ color: 'var(--echoes-color-text-default)' }}>{issue.line}</span>
        {dot}
        <span>{issue.effort} effort</span>
        {dot}
        <span>{issue.age}</span>
        {dot}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)', color: 'var(--echoes-color-text-default)' }}>
          <IssueTypeIcon type={issue.type} />
          <IssueTypeLabel type={issue.type} />
        </span>
        {dot}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)', color: 'var(--echoes-color-text-default)' }}>
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
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      overflow: 'hidden',
      marginBottom: 'var(--echoes-dimension-space-200)',
    }}>
      {/* File path header */}
      <div style={{
        padding: 'var(--echoes-dimension-space-100) var(--echoes-dimension-space-200)',
        background: 'var(--echoes-color-surface-subtle)',
        borderBottom: '1px solid var(--echoes-color-border-weak)',
        fontSize: 'var(--echoes-font-size-20)',
        color: 'var(--echoes-color-text-subdued)',
      }}>
        <span style={{ color: 'var(--echoes-color-text-default)', fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>
          {group.org}
        </span>
        <span style={{ margin: '0 var(--echoes-dimension-space-75)' }}>/</span>
        <span style={{ color: 'var(--echoes-color-text-default)', fontWeight: 'var(--echoes-font-weight-semi-bold)' }}>
          {group.project}
        </span>
        <span style={{ margin: '0 var(--echoes-dimension-space-75)' }}>/</span>
        <span>{group.filePath}</span>
      </div>

      {/* Issues */}
      {group.issues.map(issue => (
        <IssueRow key={issue.id} issue={issue} />
      ))}
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function IssuesToolbar({ count, totalEffort }: Readonly<{ count: number; totalEffort: string }>) {
  const chipStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)',
    border: '1px solid var(--echoes-color-border-bold)',
    borderRadius: 'var(--echoes-border-radius-200)',
    padding: '0 var(--echoes-dimension-space-150)',
    height: '2rem',
    fontSize: 'var(--echoes-font-size-20)',
    color: 'var(--echoes-color-text-default)',
    background: 'var(--echoes-color-surface-default)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

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
        <span style={chipStyle}>
          Select issues
          <IconChevronDown />
        </span>
        <ButtonIcon Icon={IconTriangleLeft}  ariaLabel="Previous" size="small" variety="default-ghost" />
        <ButtonIcon Icon={IconTriangleRight} ariaLabel="Next"     size="small" variety="default-ghost" />
      </div>

      {/* Navigate to issue */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-20)', color: 'var(--echoes-color-text-subdued)', whiteSpace: 'nowrap' }}>
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
        <span style={{ color: 'var(--echoes-color-text-subdued)', margin: '0 var(--echoes-dimension-space-75)' }}>•</span>
        {totalEffort} effort
      </span>

      {/* Home / view toggle */}
      <ButtonIcon Icon={IconHome} ariaLabel="Back to project" size="small" variety="default-ghost" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyIssuesPage() {
  useEffect(() => { document.title = 'My Issues - My Account - SonarQube Cloud'; }, []);

  const groups = groupIssuesByFile(ISSUES);

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft size="medium">
        <IssuesFilter />
      </Layout.AsideLeft>

      <Layout.PageGrid>
        <Layout.PageContent>
          <IssuesToolbar count={TOTAL_ISSUES} totalEffort={TOTAL_EFFORT} />
          <div>
            {groups.map(group => (
              <IssueFileGroup
                key={`${group.org}/${group.project}/${group.filePath}`}
                group={group}
              />
            ))}
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
