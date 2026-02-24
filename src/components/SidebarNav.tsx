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

export function SidebarNav() {
  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconOverview} to="/overview" enableTooltip>
          Overview
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item
          Icon={IconSlideshow}
          to="/dashboards"
          enableTooltip
          suffix={<Badge variety="info" size="small">New</Badge>}
        >
          Dashboards
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Group label="Analysis">
          <Layout.SidebarNavigation.Item Icon={IconGraph3} to="/summary" enableTooltip>
            Summary
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item
            Icon={IconComment}
            to="/review"
            enableTooltip
            suffix={<Badge variety="info" size="small">New</Badge>}
          >
            Review
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconBug} to="/issues" enableTooltip>
            Issues
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSecurityFinding} to="/security-hotspots" enableTooltip>
            Security Hotspots
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconTarget} to="/dependency-risks" enableTooltip>
            Dependency Risks
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSparkleInShield} to="/security-reports" enableTooltip>
            Security Reports
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item
            Icon={IconBranch}
            to="/architecture"
            enableTooltip
            suffix={<Badge variety="highlight" size="small">Beta</Badge>}
          >
            Architecture
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconGraph3} to="/measures" enableTooltip>
            Measures
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconFileCode} to="/code" enableTooltip>
            Code
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconProject} to="/dependencies" enableTooltip>
            Dependencies
          </Layout.SidebarNavigation.Item>

          <Layout.SidebarNavigation.Item Icon={IconSlideshow} to="/activity" enableTooltip>
            Activity
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.AccordionItem Icon={IconInfo} label="Information">
          <Layout.SidebarNavigation.Item Icon={IconSparkleInShield} to="/agent-activity" enableTooltip>
            Agent activity
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconProject} to="/project-information" enableTooltip>
            Project Information
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.AccordionItem>

        <Layout.SidebarNavigation.Item
          Icon={IconPullrequest}
          to="/pull-requests"
          enableTooltip
          suffix={<BadgeCounter value={5} />}
        >
          Pull Requests
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item
          Icon={IconBranch}
          to="/branches"
          enableTooltip
          suffix={<BadgeCounter value={1} />}
        >
          Branches
        </Layout.SidebarNavigation.Item>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
