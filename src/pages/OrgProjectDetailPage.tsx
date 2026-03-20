import { useEffect } from 'react';
import { Layout } from '@sonarsource/echoes-react';
import { useSearchParams } from 'react-router-dom';
import { getAllProjects } from '../data/orgs';
import { PageContentHeader } from '../components/PageContentHeader';

// ─── Content slot ─────────────────────────────────────────────────────────────
// Replace this component with your actual project content.
function PageContent() {
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
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id') ?? 'Project';
  const allProjects = getAllProjects();
  const project = allProjects.find(p => `${p.orgId}-${p.id}` === projectId);
  const projectName = project?.name ?? projectId;
  const orgId = project?.orgId ?? projectId.split('-')[0];

  useEffect(() => { document.title = `Overview - ${projectName} - SonarQube Cloud`; }, [projectName]);

  const metadataParts = [
    project?.lastAnalysis ? `Last analysis: ${project.lastAnalysis}` : null,
    project?.linesOfCode ? `${project.linesOfCode} Lines of Code` : null,
    project?.languages?.join(', ') ?? null,
  ].filter(Boolean).join(' · ');

  return (
    <Layout.ContentGrid>
      <PageContentHeader
        title={projectName}
        breadcrumbs={[
          { linkElement: orgId, to: `/organizations/${orgId}/projects` },
          { linkElement: projectName },
        ]}
        metadata={metadataParts || undefined}
        githubUrl="https://github.com"
      />
      <Layout.PageGrid>
        <Layout.PageContent>
          <PageContent />
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
