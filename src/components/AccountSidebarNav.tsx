import {
  IconBell,
  IconGear,
  IconKey,
  IconOrganization,
  IconPeople,
  IconProject,
  Layout,
} from '@sonarsource/echoes-react';

function AccountAvatar() {
  return (
    <div style={{
      width: '2rem', height: '2rem',
      borderRadius: '50%',
      backgroundColor: '#6b7280',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
    }}>
      M
    </div>
  );
}

export function AccountSidebarNav() {
  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Header
        avatar={
          <span style={{ display: 'inline-flex', paddingRight: 'var(--echoes-dimension-space-150)' }}>
            <AccountAvatar />
          </span>
        }
        name="My Account"
        qualifier="Personal account"
        isInteractive
      />

      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconPeople} to="/account/profile" enableTooltip>
          Profile
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconKey} to="/account/security" enableTooltip>
          Security
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconBell} to="/account/notifications" enableTooltip>
          Notifications
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconOrganization} to="/account/organizations" enableTooltip>
          Organizations
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconProject} to="/account/enterprises" enableTooltip>
          Enterprises
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconGear} to="/account/appearance" enableTooltip>
          Appearance
        </Layout.SidebarNavigation.Item>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
