import { Badge, IconCheckCircle, Layout, Table } from '@sonarsource/echoes-react';
import { getAllPRs } from '../data/pr-info';

const PR_ICON_PATH = 'M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z';

export default function PullRequestsPage() {
  const prs = getAllPRs();

  return (
    <Layout.ContentGrid>
      <Layout.ContentHeader
        breadcrumbs={
          <Layout.ContentHeader.Breadcrumbs
            items={[
              { linkElement: 'SonarSource', to: '/projects' },
              { linkElement: 'asast-scanner-pipeline', to: '#' },
              { linkElement: 'Pull Requests' },
            ]}
          />
        }
        title={<Layout.ContentHeader.Title>Pull Requests</Layout.ContentHeader.Title>}
      />

      <Layout.PageGrid>
        <Layout.PageContent>
          {/* Search and Filter Bar */}
          <div className="search-bar">
            <div className="pr-count">{prs.length} Pull Requests</div>
            <div className="search-input-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" className="search-input" placeholder="Search for Pull Requests..."/>
            </div>
            <button className="btn-filters">Filters</button>
          </div>

          <Table
            ariaLabel="Pull Requests"
            gridTemplate="1fr 140px 48px 140px 100px"
            variety="ghost"
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quality Gate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Last Updated</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Commit ID</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {prs.map(pr => (
                <Table.Row key={pr.id}>
                  <Table.CellLink to={`/overview/${pr.id}`}>
                    <svg
                      width="14" height="14" viewBox="0 0 16 16"
                      fill="currentColor" aria-hidden="true"
                      style={{ flexShrink: 0, marginRight: 'var(--echoes-dimension-space-100)' }}
                    >
                      <path d={PR_ICON_PATH} />
                    </svg>
                    {pr.number} — {pr.title}
                  </Table.CellLink>

                  <Table.Cell>
                    <Badge
                      variety={pr.status === 'passed' ? 'success' : 'danger'}
                      IconLeft={pr.status === 'passed' ? IconCheckCircle : undefined}
                    >
                      {pr.status === 'passed' ? 'Passed' : 'Failed'}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell>
                    {pr.avatar?.type === 'image' ? (
                      <img src={pr.avatar.src} alt={pr.author} className="inbox-pr-avatar-img" />
                    ) : (
                      <div className="inbox-pr-avatar-letter">{pr.avatar?.letter}</div>
                    )}
                  </Table.Cell>

                  <Table.CellText>{pr.timestamp}</Table.CellText>

                  <Table.CellText>{pr.version}</Table.CellText>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
