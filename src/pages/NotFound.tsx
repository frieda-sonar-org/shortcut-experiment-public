import React from 'react';
import { Heading, HeadingSize, Layout, Text } from '@sonarsource/echoes-react';

export default function NotFound() {
  return (
    <Layout.ContentGrid>
      <Layout.PageGrid>
        <Layout.PageContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--echoes-dimension-space-200)',
              padding: 'var(--echoes-dimension-space-600)',
              textAlign: 'center',
            }}
          >
            <Heading size={HeadingSize.Large}>404</Heading>
            <Text style={{ color: 'var(--echoes-color-text-default)' }}>
              Page not found. Navigate using the sidebar.
            </Text>
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
