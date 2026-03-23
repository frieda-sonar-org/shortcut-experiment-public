import { useEffect, useState } from 'react';
import { Button, ButtonIcon, IconArrowDown, IconHome, Layout } from '@sonarsource/echoes-react';
import { useFavourites } from '../context/FavouritesContext';
import { getAllProjects } from '../data/orgs';
import type { Project } from '../data/orgs';
import { ProjectCard } from '../components/ProjectCard';
import { applyProjectFilters, emptyProjectFilters, ProjectFilterState, ProjectFilters } from '../components/ProjectFilters';
import { NoFilterResults } from '../components/NoFilterResults';

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ count }: Readonly<{ count: number }>) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--echoes-dimension-space-200)',
      marginBottom: 'var(--echoes-dimension-space-200)',
      flexWrap: 'wrap',
    }}>
      {/* Search */}
      <div style={{
        flex: 1,
        minWidth: '16rem',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--echoes-dimension-space-100)',
        border: '1px solid var(--echoes-color-border-bold)',
        borderRadius: 'var(--echoes-border-radius-200)',
        padding: '0 var(--echoes-dimension-space-150)',
        height: '2.25rem',
        background: 'var(--echoes-color-surface-default)',
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--echoes-color-icon-subtle)" aria-hidden="true">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85-.708.707-3.85-3.85a6.5 6.5 0 0 0 1.398-1.397zM6.5 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
        </svg>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-placeholder)' }}>
          Search projects (minimum 2 characters)
        </span>
      </div>

      {/* Perspective */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Perspective
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)',
          border: '1px solid var(--echoes-color-border-bold)', borderRadius: 'var(--echoes-border-radius-200)',
          padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
          fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)',
          background: 'var(--echoes-color-surface-default)',
        }}>
          Overall Status
          <svg width="10" height="6" viewBox="0 0 10 6" fill="var(--echoes-color-icon-default)" aria-hidden="true">
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </div>
      </div>

      {/* Sort by */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)' }}>
        <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
          Sort by
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-75)',
          border: '1px solid var(--echoes-color-border-bold)', borderRadius: 'var(--echoes-border-radius-200)',
          padding: '0 var(--echoes-dimension-space-150)', height: '2.25rem',
          fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)',
          background: 'var(--echoes-color-surface-default)',
        }}>
          Last analysis
          <svg width="10" height="6" viewBox="0 0 10 6" fill="var(--echoes-color-icon-default)" aria-hidden="true">
            <path d="M0 0l5 6 5-6z"/>
          </svg>
        </div>
      </div>

      <ButtonIcon Icon={IconArrowDown} ariaLabel="Toggle sort direction" size="medium" variety="default-ghost" />

      <span style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', whiteSpace: 'nowrap' }}>
        {count} {count === 1 ? 'project' : 'projects'}
      </span>

      <ButtonIcon Icon={IconHome} ariaLabel="Toggle view" size="medium" variety="default-ghost" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface MyProjectsPageProps {
  pageTitle?: string;
  pageDescription?: string;
}

export default function MyProjectsPage({ pageTitle, pageDescription }: Readonly<MyProjectsPageProps> = {}) {
  useEffect(() => { document.title = 'Projects - My Account - SonarQube Cloud'; }, []);

  const projects = getAllProjects();
  const projectKey = (p: Project) => `${p.orgId}-${p.id}`;
  const { isStarred, toggleStar } = useFavourites();

  const [filters, setFilters] = useState<ProjectFilterState>(emptyProjectFilters);

  const favourites = projects.filter(p => isStarred(projectKey(p)));
  const filtered = applyProjectFilters(favourites, filters);

  if (favourites.length === 0) {
    return (
      <Layout.ContentGrid>
        <Layout.PageGrid>
          <Layout.PageContent>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--echoes-dimension-space-200)',
              padding: 'var(--echoes-dimension-space-800) var(--echoes-dimension-space-400)',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 'var(--echoes-font-size-40)',
                fontWeight: 'var(--echoes-font-weight-semi-bold)',
                color: 'var(--echoes-color-text-default)',
              }}>
                You don't have any favorite projects yet.
              </span>
              <span style={{
                fontSize: 'var(--echoes-font-size-30)',
                color: 'var(--echoes-color-text-default)',
              }}>
                Here is how to add projects to this page
              </span>
              <div style={{ display: 'flex', gap: 'var(--echoes-dimension-space-200)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--echoes-dimension-space-200)' }}>
                <Button variety="default">Analyze new project</Button>
                <Button variety="default" suffix={<IconArrowDown />}>Favorite projects from your orgs</Button>
                <Button variety="default">Favorite public projects</Button>
              </div>
            </div>
          </Layout.PageContent>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    );
  }

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft size="medium">
        <ProjectFilters allProjects={favourites} filters={filters} onChange={setFilters} />
      </Layout.AsideLeft>

      <Layout.PageGrid width="fluid">
        <div style={{
          background: 'var(--echoes-color-surface-default)',
          borderBottom: '1px solid var(--echoes-color-border-weak)',
          padding: 'var(--echoes-dimension-space-300) var(--echoes-dimension-space-400)',
        }}>
          <div style={{ fontSize: 'var(--echoes-font-size-50)', fontWeight: 'var(--echoes-font-weight-bold)', color: 'var(--echoes-color-text-default)' }}>
            {pageTitle ?? 'Favorited Projects'}
          </div>
          {pageDescription && (
            <div style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-subtle)', marginTop: 'var(--echoes-dimension-space-50)' }}>
              {pageDescription}
            </div>
          )}
        </div>
        <Layout.PageContent>
          <div style={{ maxWidth: 'var(--echoes-layout-sizes-max-width-default)', marginLeft: 'auto', marginRight: 'auto' }}>
          <Toolbar count={filtered.length} />
          {filtered.length === 0 ? (
            <NoFilterResults message="We couldn't find any results matching the selected criteria in your favorites." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--echoes-dimension-space-200)' }}>
              {filtered.map(p => (
                <ProjectCard
                  key={projectKey(p)}
                  project={p}
                  showOrgContext
                  isStarred
                  onToggleStar={() => toggleStar(projectKey(p))}
                />
              ))}
              <div style={{ fontSize: 'var(--echoes-font-size-30)', color: 'var(--echoes-color-text-default)', textAlign: 'center' }}>
                {filtered.length} of {favourites.length} shown
              </div>
            </div>
          )}
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
