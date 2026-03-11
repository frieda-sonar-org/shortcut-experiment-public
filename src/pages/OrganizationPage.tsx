import { Layout } from '@sonarsource/echoes-react';
import { useParams } from 'react-router-dom';

// ─── Content slot ───────────────────────────────────────────────────────────
// Replace this component with your actual page content.
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function OrganizationPage() {
  const { orgId } = useParams<{ orgId: string }>();
  const orgName = orgId ?? 'Organization';

  return (
    <Layout.ContentGrid>
      <Layout.ContentHeader
        breadcrumbs={
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'Organizations', to: '/organizations' },
              { linkElement: orgName },
            ]}
          />
        }
        title={<Layout.ContentHeader.Title>{orgName}</Layout.ContentHeader.Title>}
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
