import type { Project } from '../data/orgs';
import { useFavourites } from '../context/FavouritesContext';
import { ProjectCard } from './ProjectCard';
import { NoFilterResults } from './NoFilterResults';

interface OrgProjectsContentProps {
  projects: Project[];
  totalProjects: number;
}

// ─── Content slot: Organization › Projects ────────────────────────────────────
// To populate: add/edit project entries in src/data/orgs.ts.
// To extend (search bar, sort controls, etc.): add them here above the card list.

export function OrgProjectsContent({ projects, totalProjects }: Readonly<OrgProjectsContentProps>) {
  const { isStarred, toggleStar } = useFavourites();
  const projectKey = (p: Project) => `${p.orgId}-${p.id}`;

  if (projects.length === 0 && totalProjects > 0) {
    return <NoFilterResults />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-200)',
    }}>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          isStarred={isStarred(projectKey(project))}
          onToggleStar={() => toggleStar(projectKey(project))}
        />
      ))}
      <div style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', textAlign: 'center' }}>
        {projects.length} of {projects.length} shown
      </div>
    </div>
  );
}
