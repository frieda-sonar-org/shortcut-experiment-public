import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import {
  EchoesProvider,
  Layout,
  ThemeProvider,
} from '@sonarsource/echoes-react';

import { GlobalNav } from './components/GlobalNav';
import { SidebarNav } from './components/SidebarNav';
import { OrgSidebarNav } from './components/OrgSidebarNav';
import { AccountSidebarNav } from './components/AccountSidebarNav';
import PullRequestsPage from './pages/PullRequestsPage';
import MyPullRequestsPage from './pages/MyPullRequestsPage';
import PROverview from './pages/PROverview';
import PRFilesView from './pages/PRFilesView';
import OrganizationPage from './pages/OrganizationPage';
import ProjectPage from './pages/ProjectPage';
import ExplorePage from './pages/ExplorePage';
import AccountPage from './pages/AccountPage';
import NotFound from './pages/NotFound';
import { experimentalRoutes } from '../sandbox';

// ─── IA Levels ───────────────────────────────────────────────────────────────
// TOP LEVEL     : /explore, /projects, /issues, /portfolios  → no sidebar
// ORG LEVEL     : /organizations/*                           → OrgSidebarNav
// PROJECT LEVEL : /project/*                                 → SidebarNav
// ACCOUNT LEVEL : /account/*                                 → AccountSidebarNav

function AppShell() {
  const { pathname } = useLocation();

  const isOrgLevel     = pathname.startsWith('/organizations');
  const isProjectLevel = pathname.startsWith('/project');
  const isAccountLevel = pathname.startsWith('/account');

  return (
    <Layout>
      <GlobalNav />

      {isOrgLevel     && <OrgSidebarNav />}
      {isProjectLevel && <SidebarNav />}
      {isAccountLevel && <AccountSidebarNav />}

      <Routes>
        <Route path="/" element={<Navigate to="/explore" replace />} />
        {/* TOP LEVEL */}
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/pull-requests" element={<PullRequestsPage />} />
        <Route path="/my-pull-requests" element={<MyPullRequestsPage />} />
        <Route path="/overview/:id" element={<PROverview />} />
        <Route path="/review/:id" element={<PRFilesView />} />
        {/* ORG LEVEL */}
        <Route path="/organizations/:orgId/*" element={<OrganizationPage />} />
        {/* PROJECT LEVEL */}
        <Route path="/project/*" element={<ProjectPage />} />
        {/* ACCOUNT LEVEL */}
        <Route path="/account/*" element={<AccountPage />} />
        {experimentalRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App: React.FC = () => {
  return (
    <IntlProvider locale="en" messages={{}}>
      <BrowserRouter>
        <EchoesProvider>
          <ThemeProvider theme="dark" asChild>
          <div style={{ isolation: 'isolate', position: 'relative' }}>
            <AppShell />
          </div>
          </ThemeProvider>
        </EchoesProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
