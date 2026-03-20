import {
  IconBell,
  IconGear,
  IconKey,
  IconOrganization,
  IconPeople,
  IconProject,
  Layout,
} from '@sonarsource/echoes-react';
import { CURRENT_USER } from '../data/currentUser';

export function AccountSidebarNav() {
  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Header
        avatar={
          <span style={{ display: 'inline-flex', paddingRight: 'var(--echoes-dimension-space-150)' }}>
            <img
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.displayName}
              style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover', display: 'block', flexShrink: 0 }}
            />
          </span>
        }
        name={CURRENT_USER.displayName}
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
