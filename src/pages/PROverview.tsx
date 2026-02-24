import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@sonarsource/echoes-react';
import PRSidebar from '../components/PRSidebar';
import { getPRInfo, getAllPRs } from '../data/pr-info';

type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <div className={`overview-grade overview-grade-${grade}`}>{grade}</div>
  );
}

function DonutChart({ toReviewPct }: { toReviewPct: number }) {
  const r = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * (toReviewPct / 100);
  const gap = circumference - filled;

  return (
    <div className="overview-donut">
      <svg width="110" height="110" viewBox="0 0 120 120">
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="var(--color-border-secondary)"
          strokeWidth="20"
        />
        {/* Fill */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#e8826e"
          strokeWidth="20"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div className="overview-donut-legend">
        <div className="overview-donut-legend-item">
          <div className="overview-donut-legend-dot" style={{ background: '#e8826e' }} />
          <span>To Review {toReviewPct}%</span>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      className={`overview-section-chevron${collapsed ? ' collapsed' : ''}`}
      width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
    >
      <path d="M4 6l4 4 4-4H4z" />
    </svg>
  );
}

export default function PROverview() {
  const params = useParams();
  const prId = (params.id as string) || getAllPRs()[0]?.id || '35';

  const [showBanner, setShowBanner] = useState(true);
  const [securityExpanded, setSecurityExpanded] = useState(true);
  const [hotspotsExpanded, setHotspotsExpanded] = useState(true);

  const prData = getPRInfo(prId) || {
    id: prId,
    number: parseInt(prId),
    title: 'Pull Request',
    version: 'unknown',
    description: '',
    status: 'unknown',
    author: 'unknown',
    timestamp: 'unknown',
    githubUrl: 'https://github.com',
  };

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft>
        <PRSidebar prId={prId} activeSection="overview" />
      </Layout.AsideLeft>

      <Layout.PageGrid>
        <Layout.PageContent>
        {/* Page Header */}
        <div className="page-header">
          <div className="breadcrumb">
            <a href="#" className="breadcrumb-link">SonarSource</a>
            <span className="breadcrumb-separator">/</span>
            <a href="#" className="breadcrumb-link">asast-scanner-pipeline</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Overview</span>
          </div>

          <div className="page-header-content">
            <div className="page-header-left">
              <h1 className="pr-detail-title">Overview</h1>

              <div className="page-metadata">
                <span className="metadata-item">Private</span>
                <span className="metadata-separator"></span>
                <span className="metadata-item">No tags</span>
                <span className="metadata-separator"></span>
                <span className="metadata-item">6.7k Lines of Code</span>
                <span className="metadata-separator"></span>
                <span className="metadata-item">Last analysis 2 hours ago</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                className="btn-view-github"
                title="View on GitHub"
                onClick={() => window.open(prData.githubUrl || 'https://github.com', '_blank')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                  <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on GitHub
              </button>
              <button className="btn-star" title="Add to favorites">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Overview Content */}
        <div className="overview-tab-container">

          {/* Info Banner */}
          {showBanner && (
            <div className="overview-banner">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: '#4d9de0' }}>
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>
                The Overview page has a new look, putting your metrics front and center.{' '}
                <a href="#" className="overview-banner-link">Share your feedback ↗</a>
              </span>
              <button className="overview-banner-dismiss" onClick={() => setShowBanner(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Project Health Dashboard ── */}
          <div className="overview-section">
            <div className="overview-section-header">
              <div>
                <div className="overview-section-title" style={{ marginBottom: '4px' }}>Project health dashboard</div>
                <div className="overview-section-subtitle">
                  See your project&apos;s branch health at a glance by exploring trends and risk breakdowns.
                </div>
              </div>
              <button className="overview-section-action">View all dashboards</button>
            </div>

            <div className="overview-cards">
              {/* Quality Gate */}
              <div className="overview-card">
                <span className="overview-card-badge">Overall co...</span>
                <div className="overview-card-metric">
                  <div className="overview-qg-status">
                    <div className="overview-qg-icon failed">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="overview-qg-text failed">Failed</div>
                      <div className="overview-qg-sub">1 failed condition</div>
                    </div>
                  </div>
                </div>
                <div className="overview-card-label">Quality Gate Status</div>
              </div>

              {/* Open Issues */}
              <div className="overview-card">
                <span className="overview-card-badge">Overall code</span>
                <div className="overview-card-metric">
                  <div className="overview-card-value">15</div>
                </div>
                <div className="overview-card-label">Open Issues</div>
              </div>

              {/* Duplications */}
              <div className="overview-card">
                <span className="overview-card-badge">Overall code</span>
                <div className="overview-card-metric">
                  <div className="overview-card-value">0.3%</div>
                  <div className="overview-card-trend trend-good">↘ -62.5% (last 30 days)</div>
                </div>
                <div className="overview-card-label">Duplications</div>
              </div>

              {/* Coverage */}
              <div className="overview-card">
                <span className="overview-card-badge">Overall code</span>
                <div className="overview-card-metric">
                  <div className="overview-card-value">69.8%</div>
                  <div className="overview-card-trend trend-good">↗ +198.3% (last 30 days)</div>
                </div>
                <div className="overview-card-label">Coverage</div>
              </div>
            </div>
          </div>

          {/* ── Security Snapshot ── */}
          <div className="overview-section">
            <button
              className="overview-collapsible-header"
              onClick={() => setSecurityExpanded(!securityExpanded)}
            >
              <span className="overview-section-title">Security snapshot</span>
              <ChevronIcon collapsed={!securityExpanded} />
            </button>

            {securityExpanded && (
              <div className="overview-cards-3">
                {/* Security Rating */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall c...</span>
                  <div className="overview-card-metric">
                    <GradeBadge grade="A" />
                  </div>
                  <div className="overview-card-label">Security Rating</div>
                </div>

                {/* Security Issues */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall code</span>
                  <div className="overview-card-metric">
                    <div className="overview-card-value">0</div>
                    <div className="overview-card-trend trend-neutral">No change (last 30 days)</div>
                  </div>
                  <div className="overview-card-label">Security Issues</div>
                </div>

                {/* Security Issues by Severity */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall code</span>
                  <div className="overview-card-metric overview-card-metric--centered">
                    <div className="overview-no-data">No data available to display</div>
                  </div>
                  <div className="overview-card-label">Security Issues by Severity</div>
                </div>
              </div>
            )}
          </div>

          {/* ── Security Hotspot Snapshot ── */}
          <div className="overview-section">
            <button
              className="overview-collapsible-header"
              onClick={() => setHotspotsExpanded(!hotspotsExpanded)}
            >
              <span className="overview-section-title">Security Hotspot snapshot</span>
              <ChevronIcon collapsed={!hotspotsExpanded} />
            </button>

            {hotspotsExpanded && (
              <div className="overview-cards-3">
                {/* Security Review Rating */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall c...</span>
                  <div className="overview-card-metric">
                    <GradeBadge grade="E" />
                  </div>
                  <div className="overview-card-label">Security Review Rating</div>
                </div>

                {/* Security Hotspots */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall code</span>
                  <div className="overview-card-metric">
                    <div className="overview-card-value">1</div>
                    <div className="overview-card-trend trend-neutral">No change (last 30 days)</div>
                  </div>
                  <div className="overview-card-label">Security Hotspots</div>
                </div>

                {/* Security Hotspots by Review Status */}
                <div className="overview-card">
                  <span className="overview-card-badge">Overall code</span>
                  <div className="overview-card-metric">
                    <DonutChart toReviewPct={100} />
                  </div>
                  <div className="overview-card-label">Security Hotspots by Review Status</div>
                </div>
              </div>
            )}
          </div>

        </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
