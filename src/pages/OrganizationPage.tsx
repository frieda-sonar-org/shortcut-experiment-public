import { Badge, Layout } from '@sonarsource/echoes-react';
import { Navigate, useParams } from 'react-router-dom';
import { PageContentHeader } from '../components/PageContentHeader';

// ─── Content slot ───────────────────────────────────────────────────────────
// Replace this component with your actual section content.
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

// ─── Filters slot ────────────────────────────────────────────────────────────
// Replace this component with your actual filters.
function Filters() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-200)',
      color: 'var(--echoes-color-text-subtle)',
    }}>
      <div style={{
        padding: 'var(--echoes-dimension-space-200)',
        border: '1px dashed var(--echoes-color-border-weak)',
        borderRadius: 'var(--echoes-border-radius-200)',
        fontSize: '0.875rem',
      }}>
        Filters go here
      </div>
    </div>
  );
}

// Derive a human-readable label from a URL segment (e.g. "quality-gates" → "Quality gates")
function sectionLabel(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replaceAll('-', ' ');
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function OrganizationPage() {
  const { orgId, '*': subPath } = useParams<{ orgId: string; '*': string }>();
  const org = orgId ?? 'organization';

  // No sub-path → redirect to the Projects default page
  if (!subPath) {
    return <Navigate to={`/organizations/${org}/projects`} replace />;
  }

  // Strip query string from sub-path to get the section segment
  const section = subPath.split('?')[0].split('/')[0] || 'projects';
  const label = sectionLabel(section);

  return (
    <Layout.ContentGrid>
      <PageContentHeader
        title={org}
        breadcrumbs={[
          { linkElement: org, to: `/organizations/${org}/projects` },
          { linkElement: label },
        ]}
        badge={<Badge variety="neutral" size="small">Public</Badge>}
        metadata="Created by lisalee00 · Last analysis 2 hours ago"
        githubUrl="https://github.com"
      />

      <Layout.AsideLeft size="medium">
        <Filters />
      </Layout.AsideLeft>

      <Layout.PageGrid>
        <Layout.PageContent>
          <PageContent />
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
