import { useLocation } from 'react-router-dom';
import {
  Badge,
  BadgeCounter,
  IconBranch,
  IconBug,
  IconComment,
  IconFileCode,
  IconGraph3,
  IconInfo,
  IconOverview,
  IconProject,
  IconPullrequest,
  IconSecurityFinding,
  IconSlideshow,
  IconSparkleInShield,
  IconTarget,
  Layout,
} from '@sonarsource/echoes-react';
import { getAllProjects } from '../data/orgs';

function ProjectAvatar({ letter, color = '#6b7280' }: Readonly<{ letter: string; color?: string }>) {
  return (
    <div style={{
      width: '2rem', height: '2rem',
      borderRadius: '6px',
      backgroundColor: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
    }}>
      {letter}
    </div>
  );
}

export function SidebarNav() {
  const { search } = useLocation();
  const projectId = new URLSearchParams(search).get('id') ?? '';
  const allProjects = getAllProjects();
  const project = allProjects.find(p => `${p.orgId}-${p.id}` === projectId);
  const projectName = project?.name ?? projectId ?? 'Project';
  const letter = projectName.charAt(0).toUpperCase() || 'P';

  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Header
        avatar={
          <span style={{ display: 'inline-flex', paddingRight: 'var(--echoes-dimension-space-150)' }}>
            <ProjectAvatar letter={letter} />
          </span>
        }
        name={projectName}
        qualifier="Project"
        isInteractive
      />

      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconOverview} to="/project/overview" enableTooltip>
          Overview
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item
          Icon={IconSlideshow}
          to="/project/dashboards"
          enableTooltip
          suffix={<Badge variety="info" size="small">New</Badge>}
        >
          Dashboards
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Group label="Analysis">
          <Layout.SidebarNavigation.Item Icon={IconGraph3} to="/project/summary" enableTooltip>
            Summary
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item
            Icon={IconComment}
            to="/project/review"
            enableTooltip
            suffix={<Badge variety="info" size="small">New</Badge>}
          >
            Review
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconBug} to="/project/issues" enableTooltip>
            Issues
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSecurityFinding} to="/project/security-hotspots" enableTooltip>
            Security Hotspots
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconTarget} to="/project/dependency-risks" enableTooltip>
            Dependency Risks
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSparkleInShield} to="/project/security-reports" enableTooltip>
            Security Reports
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item
            Icon={IconBranch}
            to="/project/architecture"
            enableTooltip
            suffix={<Badge variety="highlight" size="small">Beta</Badge>}
          >
            Architecture
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconGraph3} to="/project/measures" enableTooltip>
            Measures
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconFileCode} to="/project/code" enableTooltip>
            Code
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconProject} to="/project/dependencies" enableTooltip>
            Dependencies
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSlideshow} to="/project/activity" enableTooltip>
            Activity
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.AccordionItem Icon={IconInfo} label="Information">
          <Layout.SidebarNavigation.Item Icon={IconSparkleInShield} to="/project/agent-activity" enableTooltip>
            Agent activity
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconProject} to="/project/project-information" enableTooltip>
            Project Information
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.AccordionItem>

        <Layout.SidebarNavigation.Item
          Icon={IconPullrequest}
          to="/project/pull-requests"
          enableTooltip
          suffix={<BadgeCounter value={5} />}
        >
          Pull Requests
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item
          Icon={IconBranch}
          to="/project/branches"
          enableTooltip
          suffix={<BadgeCounter value={1} />}
        >
          Branches
        </Layout.SidebarNavigation.Item>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
