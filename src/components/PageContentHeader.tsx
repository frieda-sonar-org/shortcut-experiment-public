import { ReactNode } from 'react';
import { Badge, Button, Layout } from '@sonarsource/echoes-react';

export type PlanType = 'free' | 'team' | 'enterprise';

const PLAN_CONFIG: Record<PlanType, { label: string; variety: 'info' | 'success' | 'highlight' }> = {
  free:       { label: 'Free Plan',       variety: 'info' },
  team:       { label: 'Team Plan',       variety: 'success' },
  enterprise: { label: 'Enterprise Plan', variety: 'highlight' },
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

interface BreadcrumbItem {
  linkElement: ReactNode;
  to?: string;
}

interface PageContentHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Optional badge shown inline next to the title (e.g. "Public", "Beta") */
  badge?: ReactNode;
  /** Optional plan tier badge: 'free' | 'team' | 'enterprise' */
  plan?: PlanType;
  /** Optional metadata line below the title (e.g. "Created by user · Last analysis 2h ago") */
  metadata?: ReactNode;
  /** If provided, renders a "View on GitHub" button in the actions area */
  githubUrl?: string;
}

export function PageContentHeader({
  title,
  breadcrumbs,
  badge,
  plan,
  metadata,
  githubUrl,
}: Readonly<PageContentHeaderProps>) {
  const planBadge = plan ? (
    <Badge variety={PLAN_CONFIG[plan].variety} size="small">
      {PLAN_CONFIG[plan].label}
    </Badge>
  ) : null;

  const suffix = (badge || planBadge) ? (
    <span style={{ marginLeft: 'var(--echoes-dimension-space-100)' }}>{badge}{planBadge}</span>
  ) : undefined;

  return (
    <Layout.ContentHeader
      hasDivider
      breadcrumbs={
        breadcrumbs && breadcrumbs.length > 0 ? (
          <Layout.ContentHeader.Breadcrumbs
            items={breadcrumbs.map((item) => ({
              ...item,
              highlight: 'subtle' as const,
              linkElement: item.to
                ? item.linkElement
                : <span style={{ color: 'var(--echoes-color-text-default)' }}>{item.linkElement}</span>,
            }))}
          />
        ) : undefined
      }
      title={
        <Layout.ContentHeader.Title suffix={suffix}>
          {title}
        </Layout.ContentHeader.Title>
      }
      metadata={
        metadata ? (
          <Layout.ContentHeader.Metadata>{metadata}</Layout.ContentHeader.Metadata>
        ) : undefined
      }
      actions={
        githubUrl ? (
          <Layout.ContentHeader.Actions>
            <Button to={githubUrl} variety="default" prefix={<GitHubIcon />}>
              View on GitHub
            </Button>
          </Layout.ContentHeader.Actions>
        ) : undefined
      }
    />
  );
}
