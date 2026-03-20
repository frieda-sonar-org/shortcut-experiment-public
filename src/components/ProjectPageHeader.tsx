import { ReactNode } from 'react';
import { getAllProjects } from '../data/orgs';
import { useFavourites } from '../context/FavouritesContext';
import { PageContentHeader } from './PageContentHeader';

// Maps URL slugs to human-readable labels matching SidebarNav
const PAGE_LABELS: Record<string, string> = {
  'overview':             'Overview',
  'dashboards':           'Dashboards',
  'summary':              'Summary',
  'review':               'Review',
  'issues':               'Issues',
  'security-hotspots':    'Security Hotspots',
  'dependency-risks':     'Dependency Risks',
  'security-reports':     'Security Reports',
  'architecture':         'Architecture',
  'measures':             'Measures',
  'code':                 'Code',
  'dependencies':         'Dependencies',
  'activity':             'Activity',
  'agent-activity':       'Agent Activity',
  'project-information':  'Project Information',
  'pull-requests':        'Pull Requests',
  'branches':             'Branches',
};

export function slugToLabel(slug: string): string {
  return PAGE_LABELS[slug] ?? (slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll('-', ' '));
}

interface ProjectPageHeaderProps {
  /** Human-readable page title, e.g. "Overview", "Dashboards" */
  pageTitle: string;
  /** Project key in the format "orgId-projectId" (from the ?id= query param) */
  projectKey: string;
  /** Optional metadata line below the title. Pass nothing to hide. */
  metadata?: ReactNode;
}

export function ProjectPageHeader({
  pageTitle,
  projectKey,
  metadata,
}: Readonly<ProjectPageHeaderProps>) {
  const allProjects = getAllProjects();
  const project = allProjects.find(p => `${p.orgId}-${p.id}` === projectKey);
  const projectName = project?.name ?? projectKey;
  const orgId = project?.orgId ?? projectKey.split('-')[0];

  const { isStarred, toggleStar } = useFavourites();

  return (
    <PageContentHeader
      title={pageTitle}
      breadcrumbs={[
        { linkElement: orgId,        to: `/organizations/${orgId}/projects` },
        { linkElement: projectName,  to: `/project/overview?id=${projectKey}` },
        { linkElement: pageTitle },
      ]}
      metadata={metadata}
      githubUrl="https://github.com"
      isStarred={isStarred(projectKey)}
      onToggleStar={() => toggleStar(projectKey)}
    />
  );
}
