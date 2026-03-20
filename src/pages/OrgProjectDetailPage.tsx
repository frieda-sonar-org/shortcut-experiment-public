import { useEffect } from 'react';
import { Badge, IconInfo, Layout } from '@sonarsource/echoes-react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAllProjects } from '../data/orgs';
import { ProjectPageHeader, slugToLabel } from '../components/ProjectPageHeader';
import { ProjectOverviewContent } from '../components/ProjectOverviewContent';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const dot = (
  <span style={{ margin: '0 var(--echoes-dimension-space-75)', color: 'var(--echoes-color-text-subtle)' }}>•</span>
);

function relativeTime(dateStr: string): string {
  // Parses "DD/MM/YYYY, HH:MM"
  const [datePart] = dateStr.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const diffDays = Math.floor((Date.now() - new Date(year, month - 1, day).getTime()) / 86_400_000);
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

// ─── Content slot ─────────────────────────────────────────────────────────────
// Placeholder used for project pages that don't have dedicated content yet.
function ContentPlaceholder() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      color: 'var(--echoes-color-text-subtle)',
      border: '1px dashed var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
    }}>
      Content goes here
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OrgProjectDetailPage() {
  const { '*': subPath } = useParams<{ '*': string }>();
  const [searchParams] = useSearchParams();

  const projectKey = searchParams.get('id') ?? '';
  const pageSlug   = subPath?.split('/')[0] || 'overview';
  const pageTitle  = slugToLabel(pageSlug);

  const allProjects = getAllProjects();
  const project = allProjects.find(p => `${p.orgId}-${p.id}` === projectKey);
  const projectName = project?.name ?? projectKey;

  useEffect(() => {
    document.title = `${pageTitle} - ${projectName} - SonarQube Cloud`;
  }, [pageTitle, projectName]);

  const headerMetadata = project ? (
    <>
      <Badge variety="neutral" size="small">
        {project.visibility === 'public' ? 'Public' : 'Private'}
      </Badge>
      {dot}
      <span>No tags</span>
      {dot}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-50)' }}>
        {project.linesOfCode ?? '—'} Lines of Code
        <IconInfo />
      </span>
      {project.lastAnalysis && (
        <>
          {dot}
          <span>Last analysis <strong>{relativeTime(project.lastAnalysis)}</strong></span>
        </>
      )}
    </>
  ) : undefined;

  return (
    <Layout.ContentGrid>
      <ProjectPageHeader
        pageTitle={pageTitle}
        projectKey={projectKey}
        metadata={headerMetadata}
      />
      <Layout.PageGrid>
        <Layout.PageContent>
          {pageSlug === 'overview'
            ? <ProjectOverviewContent />
            : <ContentPlaceholder />
          }
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
