import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@sonarsource/echoes-react';
import { getAllPRs, ReviewStatus } from '../data/pr-info';

const SECTIONS: { id: ReviewStatus; label: string; dotColor: string }[] = [
  { id: 'needs-review',       label: 'Needs your review',   dotColor: '#9fa9ed' },
  { id: 'changes-requested',  label: 'Changes requested',   dotColor: '#f0a500' },
  { id: 'approved',           label: 'Approved',            dotColor: '#4caf50' },
  { id: 'draft',              label: 'Draft',               dotColor: '#888ea8' },
];

export default function MyPullRequestsPage() {
  const prs = getAllPRs();
  const [collapsedSections, setCollapsedSections] = useState<Set<ReviewStatus>>(new Set());

  const toggleSection = (id: ReviewStatus) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Layout.ContentGrid>
      <Layout.PageGrid>
        <Layout.PageContent>
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <button className="breadcrumb-link">SonarSource</button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">My Pull Requests</span>
        </div>
        <div className="page-header-title-section">
          <h1 className="page-title">My Pull Requests</h1>
        </div>
      </div>

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

      {/* Inbox Sections */}
      <div className="inbox-sections">
        {SECTIONS.map(section => {
          const sectionPRs = prs.filter(pr => pr.reviewStatus === section.id);
          if (sectionPRs.length === 0) return null;
          const isCollapsed = collapsedSections.has(section.id);

          return (
            <div key={section.id} className="inbox-section">
              <button
                className="inbox-section-header"
                onClick={() => toggleSection(section.id)}
              >
                <svg
                  className={`chevron-icon ${isCollapsed ? '' : 'chevron-expanded'}`}
                  width="16" height="16" viewBox="0 0 16 16"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M4 6l4 4 4-4"/>
                </svg>
                <span className="inbox-section-count">{sectionPRs.length}</span>
                <span className="inbox-section-dot" style={{ backgroundColor: section.dotColor }} />
                <span className="inbox-section-label">{section.label}</span>
              </button>

              {!isCollapsed && (
                <div className="inbox-section-body">
                  <div className="inbox-col-headers">
                    <div />
                    <div className="inbox-col-title">Title</div>
                    <div className="inbox-col-qg">Quality Gate</div>
                    <div className="inbox-col-changes">Changes</div>
                    <div className="inbox-col-date">Updated</div>
                  </div>

                  {sectionPRs.map(pr => (
                    <Link key={pr.id} to={`/overview/${pr.id}`} className="inbox-pr-row">
                      <div className="inbox-pr-avatar-col">
                        {pr.avatar?.type === 'image' ? (
                          <img src={pr.avatar.src} alt={pr.author} className="inbox-pr-avatar-img" />
                        ) : (
                          <div className="inbox-pr-avatar-letter">{pr.avatar?.letter}</div>
                        )}
                      </div>

                      <div className="inbox-pr-info">
                        <span className="inbox-pr-title">{pr.number} — {pr.title}</span>
                        <span className="inbox-pr-meta">{pr.author} · {pr.version}</span>
                      </div>

                      <div className="inbox-pr-qg">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8l4 4 8-8" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Passed
                      </div>

                      <div className="inbox-pr-changes">
                        {pr.additions !== undefined && (
                          <>
                            <span className="additions">+{pr.additions}</span>
                            <span className="deletions">−{pr.deletions}</span>
                          </>
                        )}
                      </div>

                      <div className="inbox-pr-date">{pr.timestamp}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
