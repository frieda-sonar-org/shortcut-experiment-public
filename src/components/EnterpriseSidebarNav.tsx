import { useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  IconGear,
  IconGraph3,
  IconOrganization,
  Layout,
} from '@sonarsource/echoes-react';
import { ENTERPRISES } from '../data/enterprises';

function EnterpriseAvatar({ letter }: { letter: string }) {
  return (
    <div style={{
      width: '2rem', height: '2rem',
      borderRadius: '6px',
      backgroundColor: '#7c3aed',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
    }}>
      {letter}
    </div>
  );
}

export function EnterpriseSidebarNav() {
  const { pathname } = useLocation();
  const enterpriseId = pathname.split('/')[2] ?? '';

  const enterprise = ENTERPRISES.find(e => e.id === enterpriseId);
  const displayName = enterprise?.name ?? enterpriseId;
  const letter = displayName.charAt(0).toUpperCase();

  return (
    <Layout.SidebarNavigation>
      <DropdownMenu
        items={
          ENTERPRISES.map(e => (
            <DropdownMenu.ItemLink key={e.id} to={`/portfolios/${e.id}`}>
              {e.name}
            </DropdownMenu.ItemLink>
          ))
        }
      >
        <Layout.SidebarNavigation.Header
          avatar={
            <span style={{ display: 'inline-flex', marginRight: 'var(--echoes-dimension-space-200)' }}>
              <EnterpriseAvatar letter={letter} />
            </span>
          }
          name={displayName}
          qualifier="Enterprise"
          isInteractive
        />
      </DropdownMenu>

      <Layout.SidebarNavigation.Body>

        <Layout.SidebarNavigation.Item Icon={IconOrganization} to={`/portfolios/${enterpriseId}/organizations`} enableTooltip>
          Organizations
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconGraph3} to={`/portfolios/${enterpriseId}`} enableTooltip>
          Portfolios
        </Layout.SidebarNavigation.Item>

        <Layout.SidebarNavigation.Item Icon={IconGear} to={`/portfolios/${enterpriseId}/administration`} enableTooltip>
          Administration
        </Layout.SidebarNavigation.Item>

      </Layout.SidebarNavigation.Body>
    </Layout.SidebarNavigation>
  );
}
