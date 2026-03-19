import { Badge, Layout } from '@sonarsource/echoes-react';
import { Navigate, useParams } from 'react-router-dom';
import { PageContentHeader, PlanType } from '../components/PageContentHeader';
import { OrgProjectsContent } from '../components/OrgProjectsContent';
import { getOrg } from '../data/orgs';

const ORG_PLANS: Record<string, PlanType> = {
  'product-design-ux-org': 'enterprise',
  'lisa-lee-sonar':        'team',
};

// ─── Content slot (generic placeholder) ──────────────────────────────────────
// Used for org sections that don't have a dedicated content component yet.
// To add real content: create src/components/Org[Section]Content.tsx and wire
// it in below alongside OrgProjectsContent.
function ContentPlaceholder() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      color: 'var(--echoes-color-text-subdued)',
      border: '1px dashed var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
    }}>
      Content goes here
    </div>
  );
}

// ─── Filters slot ────────────────────────────────────────────────────────────
// TODO: Replace filter groups below with real filter controls.
function Filters() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-300)' }}>
      {/* Filter group placeholder — duplicate and rename as needed */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--echoes-dimension-space-100)',
      }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--echoes-color-text-subdued)',
        }}>
          Filter group
        </div>
        <div style={{
          height: '6rem',
          border: '1px dashed var(--echoes-color-border-weak)',
          borderRadius: 'var(--echoes-border-radius-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--echoes-color-text-subdued)',
          fontSize: '0.875rem',
        }}>
          Filters go here
        </div>
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
  const orgData = getOrg(org);

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
        plan={ORG_PLANS[org]}
        metadata="Created by lisalee00 · Last analysis 2 hours ago"
        githubUrl="https://github.com"
      />

      {section === 'projects' && (
        <Layout.AsideLeft size="medium">
          <Filters />
        </Layout.AsideLeft>
      )}

      <Layout.PageGrid>
        <Layout.PageContent>
          {/* ── Slot routing: map section → content component ── */}
          {section === 'projects' && orgData
            ? <OrgProjectsContent projects={orgData.projects} />
            : <ContentPlaceholder />
          }
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
