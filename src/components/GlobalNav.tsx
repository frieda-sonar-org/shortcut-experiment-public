import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  BadgeSize,
  BadgeVariety,
  ButtonIcon,
  DropdownMenu,
  IconBell,
  IconOrganization,
  IconPlus,
  IconQuestionMark,
  IconSearch,
  IconSparkle,
  Layout,
  LogoSize,
  LogoSonarQubeCloud,
} from '@sonarsource/echoes-react';

function OrgAvatar({ letter, color = '#6b7280' }: { letter: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '1.25rem', height: '1.25rem', borderRadius: '4px',
      backgroundColor: color, color: '#fff',
      fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
      marginRight: 'var(--echoes-dimension-space-100)',
    }}>
      {letter}
    </span>
  );
}

export function GlobalNav() {
  return (
    <Layout.GlobalNavigation>
      <Layout.GlobalNavigation.Primary>
        <Layout.GlobalNavigation.Home>
          <Link to="/explore" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <LogoSonarQubeCloud hasText size={LogoSize.Small} />
          </Link>
        </Layout.GlobalNavigation.Home>
        <Layout.GlobalNavigation.ItemsContainer>
          <Layout.GlobalNavigation.Item to="/projects">My Projects</Layout.GlobalNavigation.Item>
          <Layout.GlobalNavigation.Item to="/issues">My Issues</Layout.GlobalNavigation.Item>
          <Layout.GlobalNavigation.Item to="/portfolios">My Portfolios</Layout.GlobalNavigation.Item>
          <Layout.GlobalNavigation.Item to="/explore">Explore</Layout.GlobalNavigation.Item>
        </Layout.GlobalNavigation.ItemsContainer>
      </Layout.GlobalNavigation.Primary>

      <Layout.GlobalNavigation.Secondary>
        <Badge
          size={BadgeSize.Medium}
          variety={BadgeVariety.Highlight}
          isInteractive
          IconLeft={IconSparkle}
        >
          Upgrade
        </Badge>

        <ButtonIcon
          Icon={IconSearch}
          ariaLabel="Search"
          size="medium"
          variety="default-ghost"
        />

        <Layout.GlobalNavigation.Action Icon={IconBell} ariaLabel="Notifications" isIconFilled />

        <Layout.GlobalNavigation.Action Icon={IconQuestionMark} ariaLabel="Help" isIconFilled />

        <DropdownMenu
          items={
            <>
              <DropdownMenu.ItemButton>Analyze new project</DropdownMenu.ItemButton>
              <DropdownMenu.ItemButton>Create new organization</DropdownMenu.ItemButton>
            </>
          }
        >
          <Layout.GlobalNavigation.Action Icon={IconPlus} ariaLabel="New.." />
        </DropdownMenu>

        {/* TODO: Replace with your user's avatar URL and name when customising */}
        <Layout.GlobalNavigation.Account
          ariaLabel="Account"
          avatar={
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt="User"
              style={{
                borderRadius: 'var(--echoes-border-radius-200)',
                width: 'var(--echoes-dimension-width-250)',
                height: 'var(--echoes-dimension-width-250)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          }
          header={{ label: 'lisalee00', helpText: 'lisa.lee@sonarsource.com' }}
          items={
            <>
              <DropdownMenu.ItemLink to="/account">My account</DropdownMenu.ItemLink>
              <DropdownMenu.Separator />

              <DropdownMenu.GroupLabel>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)' }}>
                  My Organizations
                  <Badge variety="neutral" size="small">2</Badge>
                </span>
              </DropdownMenu.GroupLabel>

              <DropdownMenu.ItemLink
                to="/organizations/product-design-ux-org/projects?sort=-analysis_date"
                prefix={<OrgAvatar letter="P" color="#e11d48" />}
                suffix={<Badge variety="neutral" size="small">Admin</Badge>}
              >
                Product-Design-UX-Org
              </DropdownMenu.ItemLink>
              <DropdownMenu.ItemLink
                to="/organizations/lisa-lee-sonar/projects?sort=-analysis_date"
                prefix={<OrgAvatar letter="l" color="#6b7280" />}
                suffix={<Badge variety="neutral" size="small">Admin</Badge>}
              >
                lisa-lee-sonar
              </DropdownMenu.ItemLink>
              <DropdownMenu.ItemLink to="/organizations" isMatchingFullPath>View all</DropdownMenu.ItemLink>
              <DropdownMenu.Separator />

              <DropdownMenu.GroupLabel>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)' }}>
                  My Enterprises
                  <Badge variety="neutral" size="small">1</Badge>
                </span>
              </DropdownMenu.GroupLabel>

              <DropdownMenu.ItemButton prefix={<IconOrganization />}>Product-Design-UX</DropdownMenu.ItemButton>
              <DropdownMenu.ItemLink to="/enterprises">View all</DropdownMenu.ItemLink>
              <DropdownMenu.Separator />

              <DropdownMenu.ItemButtonDestructive>Log out</DropdownMenu.ItemButtonDestructive>
            </>
          }
        />
      </Layout.GlobalNavigation.Secondary>
    </Layout.GlobalNavigation>
  );
}
