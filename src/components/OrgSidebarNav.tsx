import {
  IconBug,
  IconCreditCardGear,
  IconGear,
  IconPeople,
  IconProject,
  IconSecurityFinding,
  Layout,
} from '@sonarsource/echoes-react';

export function OrgSidebarNav() {
  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconProject} to="projects" enableTooltip>
          Projects
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconBug} to="issues" enableTooltip>
          Issues
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconSecurityFinding} to="security-reports" enableTooltip>
          Security Reports
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconPeople} to="members" enableTooltip>
          Members
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconCreditCardGear} to="billing" enableTooltip>
          Billing
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconGear} to="settings" enableTooltip>
          Settings
        </Layout.SidebarNavigation.Item>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
