import { useLocation } from 'react-router-dom';
import {
  Badge,
  IconBug,
  IconCreditCardGear,
  IconDeveloperGuide,
  IconFile,
  IconGear,
  IconKey,
  IconLink,
  IconLock,
  IconOrganization,
  IconPeople,
  IconProject,
  IconRule,
  IconTarget,
  Layout,
} from '@sonarsource/echoes-react';

function OrgAvatar({ letter, color = '#6b7280' }: { letter: string; color?: string }) {
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

export function OrgSidebarNav() {
  const { pathname } = useLocation();
  const orgId = pathname.split('/')[2] ?? '';

  const letter = orgId.charAt(0).toUpperCase() || 'O';
  const displayName = orgId || 'Organization';

  return (
    <Layout.SidebarNavigation>
      <Layout.SidebarNavigation.Header
        avatar={
          <span style={{ display: 'inline-flex', paddingRight: 'var(--echoes-dimension-space-150)' }}>
            <OrgAvatar letter={letter} />
          </span>
        }
        name={displayName}
        qualifier="Organization"
        isInteractive
      />

      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconProject} to={`/organizations/${orgId}/projects`} enableTooltip>
          Projects
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconBug} to={`/organizations/${orgId}/issues`} enableTooltip>
          Issues
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Group label="Policies">
          <Layout.SidebarNavigation.Item Icon={IconDeveloperGuide} to={`/organizations/${orgId}/license-profiles`} enableTooltip>
            License profiles
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconRule} to={`/organizations/${orgId}/rules`} enableTooltip>
            Rules
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconTarget} to={`/organizations/${orgId}/quality-profiles`} enableTooltip>
            Quality profiles
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconFile} to={`/organizations/${orgId}/quality-gates`} enableTooltip>
            Quality gates
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.Group>

        <Layout.SidebarNavigation.Group label="Access">
          <Layout.SidebarNavigation.Item Icon={IconCreditCardGear} to={`/organizations/${orgId}/billing`} enableTooltip>
            Billing and usage
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconPeople} to={`/organizations/${orgId}/members`} enableTooltip>
            Members
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconOrganization} to={`/organizations/${orgId}/groups`} enableTooltip>
            Groups
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconLock} to={`/organizations/${orgId}/permissions`} enableTooltip>
            Permissions
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconFile} to={`/organizations/${orgId}/permission-templates`} enableTooltip>
            Permission templates
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item
            Icon={IconKey}
            to={`/organizations/${orgId}/scoped-org-tokens`}
            enableTooltip
            suffix={<Badge variety="info" size="small">New</Badge>}
          >
            Scoped Organization Tokens
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconLink} to={`/organizations/${orgId}/webhooks`} enableTooltip>
            Webhooks
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Item Icon={IconGear} to={`/organizations/${orgId}/administration`} enableTooltip>
            Administration
          </Layout.SidebarNavigation.Item>
        </Layout.SidebarNavigation.Group>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
