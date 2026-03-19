import { Layout } from '@sonarsource/echoes-react';
import { useSearchParams } from 'react-router-dom';

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

  return (
    <Layout.ContentGrid>
      <Layout.ContentHeader
        title={<Layout.ContentHeader.Title>{projectId}</Layout.ContentHeader.Title>}
      />
      <Layout.PageGrid>
        <Layout.PageContent>
          <PageContent />
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
