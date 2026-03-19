import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '@sonarsource/echoes-react';

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const { '*': subPath } = useParams<{ '*': string }>();

  // No sub-path → redirect to Profile by default
  if (!subPath) {
    return <Navigate to="/account/profile" replace />;
  }

  return (
    <Layout.ContentGrid>
      <Layout.PageGrid>
        <Layout.PageContent>
          {/* TODO: Replace with account section content */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: 'var(--echoes-color-text-subdued)',
            border: '1px dashed var(--echoes-color-border-weak)',
            borderRadius: 'var(--echoes-border-radius-200)',
          }}>
            Account — {subPath}
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
