import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import {
  EchoesProvider,
  Layout,
  ThemeProvider,
} from '@sonarsource/echoes-react';

import { GlobalNav } from './components/GlobalNav';
import { SidebarNav } from './components/SidebarNav';
import PullRequestsPage from './pages/PullRequestsPage';
import MyPullRequestsPage from './pages/MyPullRequestsPage';
import PROverview from './pages/PROverview';
import PRFilesView from './pages/PRFilesView';
import NotFound from './pages/NotFound';
import { experimentalRoutes } from '../sandbox';

const App: React.FC = () => {
  return (
    <IntlProvider locale="en" messages={{}}>
      <BrowserRouter>
        <EchoesProvider>
          <ThemeProvider theme="dark" asChild>
          <div style={{ isolation: 'isolate', position: 'relative' }}>
            <Layout>
              <GlobalNav />

              <SidebarNav />

              <Routes>
                <Route path="/pull-requests" element={<PullRequestsPage />} />
                <Route path="/my-pull-requests" element={<MyPullRequestsPage />} />
                <Route path="/overview/:id" element={<PROverview />} />
                <Route path="/review/:id" element={<PRFilesView />} />
                {experimentalRoutes}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </div>
          </ThemeProvider>
        </EchoesProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
