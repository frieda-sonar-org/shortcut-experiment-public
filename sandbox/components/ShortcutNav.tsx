/**
 * ShortcutNav — Renamed navigation items for the shortcut experiment.
 *
 * Changes from GlobalNav:
 *   - "My Projects"  →  "Favorited Projects"
 *   - "My Issues"    →  "Assigned Issues"
 *
 * This is now the default nav for all routes in this experiment.
 * Revert to GlobalNav in App.tsx to restore the original labels.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../../src/data/currentUser';
import {
  Badge,
  ButtonIcon,
  DropdownMenu,
  IconBell,
  IconOrganization,
  IconPlus,
  IconQuestionMark,
  IconSearch,
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

export function ShortcutNav() {
  return (
    <Layout.GlobalNavigation>
      <Layout.GlobalNavigation.Primary>
        <Layout.GlobalNavigation.Home>
          <Link to="/explore" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <LogoSonarQubeCloud hasText size={LogoSize.Small} />
          </Link>
        </Layout.GlobalNavigation.Home>
        <Layout.GlobalNavigation.ItemsContainer>
          {/* ↓ RENAMED: My Projects → Favorited Projects */}
          <Layout.GlobalNavigation.Item to="/projects">Favorited Projects</Layout.GlobalNavigation.Item>
          {/* ↓ RENAMED: My Issues → Assigned Issues */}
          <Layout.GlobalNavigation.Item to="/issues">Assigned Issues</Layout.GlobalNavigation.Item>
          <Layout.GlobalNavigation.DropdownItem
            items={
              <DropdownMenu.ItemLink to="/portfolios/product-design-ux">
                Product-Design-UX
              </DropdownMenu.ItemLink>
            }
          >
            My Portfolios
          </Layout.GlobalNavigation.DropdownItem>
          <Layout.GlobalNavigation.Item to="/explore">Explore</Layout.GlobalNavigation.Item>
        </Layout.GlobalNavigation.ItemsContainer>
      </Layout.GlobalNavigation.Primary>

      <Layout.GlobalNavigation.Secondary>
        {/* Upgrade button — unchanged */}
        <button
          aria-label="Upgrade"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <svg width="97" height="32" viewBox="0 0 97 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="snav-upg-border" x1="0" y1="16" x2="96" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF84DA"/><stop offset="1" stopColor="#B7A6FF"/>
              </linearGradient>
              <linearGradient id="snav-upg-text" x1="30" y1="16" x2="88" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF84DA"/><stop offset="1" stopColor="#B7A6FF"/>
              </linearGradient>
              <mask id="snav-upg-clip" maskUnits="userSpaceOnUse" x="8" y="8" width="16" height="16">
                <rect x="8" y="8" width="16" height="16" fill="white"/>
              </mask>
              <mask id="snav-upg-icon" maskUnits="userSpaceOnUse" x="9" y="10" width="14" height="12">
                <g mask="url(#snav-upg-clip)">
                  <path d="M14.134 13.5L15.9007 10H16.1007L17.8673 13.5H14.134ZM15.5007 21.4L9.75065 14.5H15.5007V21.4ZM16.5007 21.4V14.5H22.2507L16.5007 21.4ZM18.9673 13.5L17.234 10H20.6673L22.4173 13.5H18.9673ZM9.58398 13.5L11.334 10H14.7673L13.034 13.5H9.58398Z" fill="white"/>
                </g>
              </mask>
            </defs>
            <path d="M8 0.5H89C93.1421 0.5 96.5 3.85786 96.5 8V24C96.5 28.1421 93.1421 31.5 89 31.5H8C3.85786 31.5 0.5 28.1421 0.5 24V8C0.5 3.85786 3.85786 0.5 8 0.5Z" fill="#2A2F40"/>
            <path d="M8 0.5H89C93.1421 0.5 96.5 3.85786 96.5 8V24C96.5 28.1421 93.1421 31.5 89 31.5H8C3.85786 31.5 0.5 28.1421 0.5 24V8C0.5 3.85786 3.85786 0.5 8 0.5Z" stroke="url(#snav-upg-border)"/>
            <g mask="url(#snav-upg-icon)">
              <rect x="-8" y="-2" width="143" height="36" fill="#FF84DA"/>
            </g>
            <path d="M37.7536 10.8182H39.5981V17.4702C39.5981 18.1993 39.4258 18.8407 39.0811 19.3942C38.7397 19.9477 38.2591 20.3802 37.6393 20.6918C37.0195 21 36.2953 21.1541 35.4667 21.1541C34.6348 21.1541 33.9089 21 33.2892 20.6918C32.6694 20.3802 32.1888 19.9477 31.8474 19.3942C31.506 18.8407 31.3353 18.1993 31.3353 17.4702V10.8182H33.1798V17.3161C33.1798 17.7403 33.2726 18.1181 33.4582 18.4496C33.6471 18.781 33.9123 19.0412 34.2536 19.2301C34.595 19.4157 34.9994 19.5085 35.4667 19.5085C35.934 19.5085 36.3384 19.4157 36.6798 19.2301C37.0245 19.0412 37.2896 18.781 37.4752 18.4496C37.6608 18.1181 37.7536 17.7403 37.7536 17.3161V10.8182ZM41.5233 23.8636V13.3636H43.2932V14.6264H43.3976C43.4904 14.4408 43.6214 14.2436 43.7904 14.0348C43.9594 13.8227 44.1881 13.642 44.4765 13.4929C44.7648 13.3404 45.1327 13.2642 45.5802 13.2642C46.1701 13.2642 46.7021 13.415 47.176 13.7166C47.6533 14.0149 48.0312 14.4574 48.3096 15.044C48.5913 15.6274 48.7322 16.3433 48.7322 17.1918C48.7322 18.0303 48.5946 18.7429 48.3195 19.3295C48.0444 19.9162 47.6699 20.3636 47.1959 20.6719C46.722 20.9801 46.185 21.1342 45.5851 21.1342C45.1476 21.1342 44.7847 21.0613 44.4964 20.9155C44.208 20.7696 43.976 20.594 43.8003 20.3885C43.628 20.1797 43.4938 19.9825 43.3976 19.7969H43.3231V23.8636H41.5233ZM43.2883 17.1818C43.2883 17.6757 43.3579 18.1082 43.4971 18.4794C43.6396 18.8506 43.8434 19.1406 44.1086 19.3494C44.377 19.5549 44.7019 19.6577 45.083 19.6577C45.4807 19.6577 45.8138 19.5516 46.0823 19.3395C46.3508 19.1241 46.5529 18.8307 46.6888 18.4595C46.828 18.085 46.8976 17.6591 46.8976 17.1818C46.8976 16.7079 46.8297 16.2869 46.6938 15.919C46.5579 15.5511 46.3557 15.2628 46.0873 15.054C45.8188 14.8452 45.484 14.7408 45.083 14.7408C44.6985 14.7408 44.3721 14.8419 44.1036 15.044C43.8351 15.2462 43.6313 15.5296 43.4921 15.8942C43.3562 16.2588 43.2883 16.688 43.2883 17.1818ZM53.5944 24.0227C52.9481 24.0227 52.3929 23.9349 51.9289 23.7592C51.4649 23.5869 51.092 23.3549 50.8103 23.0632C50.5286 22.7715 50.333 22.4484 50.2236 22.0938L51.8444 21.701C51.9173 21.8501 52.0233 21.9976 52.1626 22.1435C52.3018 22.2926 52.489 22.4152 52.7243 22.5114C52.963 22.6108 53.2629 22.6605 53.6242 22.6605C54.1346 22.6605 54.5572 22.5362 54.892 22.2876C55.2267 22.0424 55.3941 21.638 55.3941 21.0746V19.6278H55.3046C55.2118 19.8134 55.0759 20.004 54.8969 20.1996C54.7213 20.3951 54.4876 20.5592 54.1959 20.6918C53.9076 20.8243 53.5447 20.8906 53.1072 20.8906C52.5205 20.8906 51.9885 20.7531 51.5113 20.478C51.0373 20.1996 50.6595 19.7853 50.3778 19.2351C50.0993 18.6816 49.9601 17.9889 49.9601 17.157C49.9601 16.3184 50.0993 15.6108 50.3778 15.0341C50.6595 14.4541 51.039 14.0149 51.5162 13.7166C51.9935 13.415 52.5255 13.2642 53.1121 13.2642C53.5596 13.2642 53.9275 13.3404 54.2158 13.4929C54.5075 13.642 54.7395 13.8227 54.9118 14.0348C55.0842 14.2436 55.2151 14.4408 55.3046 14.6264H55.404V13.3636H57.1789V21.1243C57.1789 21.7772 57.0231 22.3175 56.7116 22.745C56.4 23.1726 55.9741 23.4924 55.4339 23.7045C54.8936 23.9167 54.2805 24.0227 53.5944 24.0227ZM53.6093 19.4787C53.9904 19.4787 54.3153 19.3859 54.5837 19.2003C54.8522 19.0147 55.056 18.7479 55.1952 18.3999C55.3344 18.0518 55.404 17.6342 55.404 17.147C55.404 16.6664 55.3344 16.2455 55.1952 15.8842C55.0593 15.523 54.8572 15.2429 54.5887 15.044C54.3235 14.8419 53.9971 14.7408 53.6093 14.7408C53.2082 14.7408 52.8735 14.8452 52.605 15.054C52.3366 15.2628 52.1344 15.5495 51.9985 15.9141C51.8626 16.2753 51.7947 16.6863 51.7947 17.147C51.7947 17.6143 51.8626 18.0237 51.9985 18.375C52.1377 18.723 52.3415 18.9948 52.61 19.1903C52.8818 19.3826 53.2149 19.4787 53.6093 19.4787ZM59.0233 21V13.3636H60.7684V14.6364H60.8479C60.9871 14.1955 61.2258 13.8558 61.5638 13.6172C61.9052 13.3752 62.2947 13.2543 62.7322 13.2543C62.8316 13.2543 62.9426 13.2592 63.0653 13.2692C63.1912 13.2758 63.2956 13.2874 63.3785 13.304V14.9595C63.3022 14.933 63.1813 14.9098 63.0155 14.8899C62.8531 14.8667 62.6957 14.8551 62.5432 14.8551C62.2151 14.8551 61.9201 14.9264 61.6583 15.0689C61.3998 15.2081 61.1959 15.402 61.0468 15.6506C60.8976 15.8991 60.8231 16.1858 60.8231 16.5107V21H59.0233ZM66.6349 21.1541C66.151 21.1541 65.7151 21.0679 65.3273 20.8956C64.9429 20.7199 64.6379 20.4614 64.4126 20.12C64.1905 19.7786 64.0795 19.3577 64.0795 18.8572C64.0795 18.4264 64.159 18.0701 64.3181 17.7884C64.4772 17.5066 64.6943 17.2812 64.9694 17.1122C65.2445 16.9432 65.5544 16.8156 65.8991 16.7294C66.2471 16.6399 66.6067 16.5753 66.9779 16.5355C67.4253 16.4891 67.7883 16.4477 68.0667 16.4112C68.3451 16.3714 68.5473 16.3118 68.6732 16.2322C68.8025 16.1494 68.8671 16.0218 68.8671 15.8494V15.8196C68.8671 15.4451 68.7561 15.1551 68.534 14.9496C68.3119 14.7441 67.9921 14.6413 67.5745 14.6413C67.1337 14.6413 66.784 14.7375 66.5255 14.9297C66.2703 15.1219 66.0979 15.349 66.0084 15.6108L64.328 15.3722C64.4606 14.9081 64.6794 14.5204 64.9843 14.2088C65.2892 13.8939 65.6621 13.6586 66.1029 13.5028C66.5437 13.3438 67.0309 13.2642 67.5645 13.2642C67.9324 13.2642 68.2987 13.3073 68.6633 13.3935C69.0278 13.4796 69.3609 13.6222 69.6626 13.821C69.9642 14.0166 70.2061 14.2834 70.3884 14.6214C70.574 14.9595 70.6668 15.3821 70.6668 15.8892V21H68.9367V19.951H68.877C68.7677 20.1631 68.6135 20.362 68.4147 20.5476C68.2191 20.7299 67.9722 20.8774 67.6739 20.9901C67.3789 21.0994 67.0326 21.1541 66.6349 21.1541ZM67.1022 19.8317C67.4635 19.8317 67.7767 19.7604 68.0418 19.6179C68.307 19.4721 68.5108 19.2798 68.6533 19.0412C68.7992 18.8026 68.8721 18.5424 68.8721 18.2607V17.3608C68.8157 17.4072 68.7196 17.4503 68.5837 17.4901C68.4511 17.5298 68.302 17.5646 68.1363 17.5945C67.9706 17.6243 67.8065 17.6508 67.6441 17.674C67.4817 17.6972 67.3408 17.7171 67.2215 17.7337C66.953 17.7701 66.7127 17.8298 66.5006 17.9126C66.2885 17.9955 65.9985 18.1115 65.9985 18.2607C65.8759 18.4065 65.8145 18.5954 65.8145 18.8274C65.8145 19.1589 65.9355 19.4091 66.1775 19.5781C66.4194 19.7472 66.7277 19.8317 67.1022 19.8317ZM75.3103 21.1342C74.7104 21.1342 74.1734 20.9801 73.6995 20.6719C73.2255 20.3636 72.851 19.9162 72.5759 19.3295C72.3008 18.7429 72.1633 18.0303 72.1633 17.1918C72.1633 16.3433 72.3025 15.6274 72.5809 15.044C72.8626 14.4574 73.2421 14.0149 73.7194 13.7166C74.1966 13.415 74.7286 13.2642 75.3153 13.2642C75.7627 13.2642 76.1306 13.3404 76.4189 13.4929C76.7073 13.642 76.936 13.8227 77.105 14.0348C77.2741 14.2436 77.405 14.4408 77.4978 14.6264H77.5724V10.8182H79.377V21H77.6072V19.7969H77.4978C77.405 19.9825 77.2707 20.1797 77.0951 20.3885C76.9194 20.594 76.6874 20.7696 76.3991 20.9155C76.1107 21.0613 75.7478 21.1342 75.3103 21.1342ZM75.8124 19.6577C76.1936 19.6577 76.5184 19.5549 76.7868 19.3494C77.0553 19.1406 77.2591 18.8506 77.3983 18.4794C77.5376 18.1082 77.6072 17.6757 77.6072 17.1818C77.6072 16.688 77.5376 16.2588 77.3983 15.8942C77.2625 15.5296 77.0603 15.2462 76.7918 15.044C76.5267 14.8419 76.2002 14.7408 75.8124 14.7408C75.4114 14.7408 75.0766 14.8452 74.8081 15.054C74.5397 15.2628 74.3375 15.5511 74.2016 15.919C74.0657 16.2869 73.9978 16.7079 73.9978 17.1818C73.9978 17.6591 74.0657 18.085 74.2016 18.4595C74.3408 18.8307 74.5447 19.1241 74.8131 19.3395C75.0849 19.5516 75.418 19.6577 75.8124 19.6577ZM84.6755 21.1491C83.9099 21.1491 83.2487 20.9901 82.6919 20.6719C82.1383 20.3504 81.7124 19.8963 81.4142 19.3097C81.1159 18.7197 80.9667 18.0253 80.9667 17.2266C80.9667 16.4411 81.1159 15.7517 81.4142 15.1584C81.7158 14.5618 82.1367 14.0978 82.6769 13.7663C83.2172 13.4316 83.8519 13.2642 84.5811 13.2642C85.0517 13.2642 85.4958 13.3404 85.9134 13.4929C86.3344 13.642 86.7056 13.8741 87.0271 14.1889C87.3519 14.5038 87.6071 14.9048 87.7927 15.392C87.9783 15.8759 88.0711 16.4527 88.0711 17.1222V17.674H81.8119V16.4609H86.346C86.3427 16.1162 86.2681 15.8097 86.1222 15.5412C85.9764 15.2694 85.7726 15.0556 85.5107 14.8999C85.2522 14.7441 84.9506 14.6662 84.6059 14.6662C84.238 14.6662 83.9149 14.7557 83.6365 14.9347C83.358 15.1103 83.141 15.3423 82.9852 15.6307C82.8327 15.9157 82.7548 16.2289 82.7515 16.5703V17.6293C82.7515 18.0734 82.8327 18.4545 82.9951 18.7727C83.1575 19.0876 83.3846 19.3295 83.6762 19.4986C83.9679 19.6643 84.3093 19.7472 84.7004 19.7472C84.9622 19.7472 85.1992 19.7107 85.4113 19.6378C85.6234 19.5616 85.8074 19.4505 85.9632 19.3047C86.1189 19.1589 86.2366 18.9782 86.3161 18.7628L87.9965 18.9517C87.8905 19.3958 87.6883 19.7836 87.39 20.1151C87.095 20.4432 86.7172 20.6984 86.2565 20.8807C85.7958 21.0597 85.2688 21.1491 84.6755 21.1491Z" fill="url(#snav-upg-text)"/>
          </svg>
        </button>

        <ButtonIcon Icon={IconSearch} ariaLabel="Search" size="medium" variety="default-ghost" />
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

        <Layout.GlobalNavigation.Account
          ariaLabel="Account"
          avatar={
            <img
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.displayName}
              style={{
                borderRadius: 'var(--echoes-border-radius-200)',
                width: 'var(--echoes-dimension-width-250)',
                height: 'var(--echoes-dimension-width-250)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          }
          header={{ label: CURRENT_USER.username, helpText: CURRENT_USER.email }}
          items={
            <>
              <DropdownMenu.ItemLink to="/account">My account</DropdownMenu.ItemLink>
              <DropdownMenu.Separator />
              <DropdownMenu.GroupLabel>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)' }}>
                  My Organizations <Badge variety="neutral" size="small">3</Badge>
                </span>
              </DropdownMenu.GroupLabel>
              <DropdownMenu.ItemLink to="/organizations/product-design-ux-org/projects" prefix={<OrgAvatar letter="P" color="#e11d48" />} suffix={<Badge variety="neutral" size="small">Admin</Badge>}>
                Product-Design-UX-Org
              </DropdownMenu.ItemLink>
              <DropdownMenu.ItemLink to="/organizations/lisa-lee-sonar/projects" prefix={<OrgAvatar letter="l" color="#6b7280" />} suffix={<Badge variety="neutral" size="small">Admin</Badge>}>
                lisa-lee-sonar
              </DropdownMenu.ItemLink>
              <DropdownMenu.ItemLink to="/organizations/enterprise-platform-org/projects" prefix={<OrgAvatar letter="E" color="#7c3aed" />} suffix={<Badge variety="neutral" size="small">Admin</Badge>}>
                Enterprise-Platform-Org
              </DropdownMenu.ItemLink>
              <DropdownMenu.Separator />
              <DropdownMenu.GroupLabel>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--echoes-dimension-space-100)' }}>
                  My Enterprises <Badge variety="neutral" size="small">1</Badge>
                </span>
              </DropdownMenu.GroupLabel>
              <DropdownMenu.ItemButton prefix={<IconOrganization />}>Product-Design-UX</DropdownMenu.ItemButton>
              <DropdownMenu.Separator />
              <DropdownMenu.ItemButtonDestructive>Log out</DropdownMenu.ItemButtonDestructive>
            </>
          }
        />
      </Layout.GlobalNavigation.Secondary>
    </Layout.GlobalNavigation>
  );
}
