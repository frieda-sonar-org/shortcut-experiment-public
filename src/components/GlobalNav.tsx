import React from 'react';
import {
  Badge,
  BadgeSize,
  BadgeVariety,
  ButtonIcon,
  DropdownMenu,
  IconBell,
  IconPlus,
  IconQuestionMark,
  IconSearch,
  IconSparkle,
  Layout,
  LogoSize,
  LogoSonarQubeCloud,
} from '@sonarsource/echoes-react';

export function GlobalNav() {
  return (
    <Layout.GlobalNavigation>
      <Layout.GlobalNavigation.Primary>
        <Layout.GlobalNavigation.Home>
          <LogoSonarQubeCloud hasText size={LogoSize.Small} />
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
          <Layout.GlobalNavigation.Action Icon={IconPlus} ariaLabel="Create" />
        </DropdownMenu>

        {/* TODO: Replace with your user's avatar URL and name when customising */}
        <Layout.GlobalNavigation.Account
          ariaLabel="User menu"
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
          items={
            <>
              <DropdownMenu.ItemLink to="/account">My Account</DropdownMenu.ItemLink>
              <DropdownMenu.Separator />
              <DropdownMenu.ItemButton>My Organizations</DropdownMenu.ItemButton>
              <DropdownMenu.Separator />
              <DropdownMenu.ItemButton>Logout</DropdownMenu.ItemButton>
            </>
          }
        />
      </Layout.GlobalNavigation.Secondary>
    </Layout.GlobalNavigation>
  );
}
