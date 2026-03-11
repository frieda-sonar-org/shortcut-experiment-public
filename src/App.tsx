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
import PullRequestsPage from './pages/PullRequestsPage';
import MyPullRequestsPage from './pages/MyPullRequestsPage';
import PROverview from './pages/PROverview';
import PRFilesView from './pages/PRFilesView';
import OrganizationPage from './pages/OrganizationPage';
import ProjectPage from './pages/ProjectPage';
import ExplorePage from './pages/ExplorePage';
import NotFound from './pages/NotFound';
import { experimentalRoutes } from '../sandbox';

function AppShell() {
  const location = useLocation();
  const isOrgPage = location.pathname.startsWith('/organizations');
  const isProjectPage = location.pathname.startsWith('/project');

  return (
    <Layout>
      <GlobalNav />

      {isOrgPage && <OrgSidebarNav />}
      {isProjectPage && <SidebarNav />}

      <Routes>
        <Route path="/" element={<Navigate to="/explore" replace />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/pull-requests" element={<PullRequestsPage />} />
        <Route path="/my-pull-requests" element={<MyPullRequestsPage />} />
        <Route path="/overview/:id" element={<PROverview />} />
        <Route path="/review/:id" element={<PRFilesView />} />
        <Route path="/organizations/:orgId/*" element={<OrganizationPage />} />
        <Route path="/project/*" element={<ProjectPage />} />
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
