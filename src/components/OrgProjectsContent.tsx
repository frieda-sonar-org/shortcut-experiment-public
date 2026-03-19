import type { Project } from '../data/orgs';
import { ProjectCard } from './ProjectCard';

interface OrgProjectsContentProps {
  projects: Project[];
}

// ─── Content slot: Organization › Projects ────────────────────────────────────
// To populate: add/edit project entries in src/data/orgs.ts.
// To extend (search bar, sort controls, etc.): add them here above the card list.

export function OrgProjectsContent({ projects }: OrgProjectsContentProps) {
  if (projects.length === 0) {
    return (
      <div style={{
        padding: 'var(--echoes-dimension-space-400)',
        color: 'var(--echoes-color-text-subdued)',
        textAlign: 'center',
        border: '1px dashed var(--echoes-color-border-weak)',
        borderRadius: 'var(--echoes-border-radius-200)',
      }}>
        No projects in this organization yet.
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-200)',
    }}>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
