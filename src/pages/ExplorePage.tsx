import { useEffect } from 'react';
import { Badge, IconCheckCircle, Layout } from '@sonarsource/echoes-react';
import CoverageIndicator from '../components/CoverageIndicator';

// ─── Types ────────────────────────────────────────────────────────────────────

type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

interface Metric {
  label: string;
  value: string;
  grade?: Grade;
  type?: 'coverage' | 'duplication';
}

interface Project {
  org: string;
  orgLetter: string;
  orgColor: string;
  name: string;
  status: 'passed' | 'failed';
  loc: string;
  languages: string;
  metrics: Metric[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    org: 'Amazon Web Services',
    orgLetter: 'A',
    orgColor: '#ff9900',
    name: 'AWS Java SDK ::...',
    status: 'failed',
    loc: '245k',
    languages: 'Java, XML, ...',
    metrics: [
      { label: 'Security', value: '6', grade: 'C' },
      { label: 'Reliability', value: '57', grade: 'E' },
      { label: 'Maintainability', value: '3.7k', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '53.8%', grade: 'C' },
      { label: 'Coverage', value: '72.8', type: 'coverage' },
      { label: 'Duplications', value: '3.9', type: 'duplication' },
    ],
  },
  {
    org: 'Microsoft',
    orgLetter: 'M',
    orgColor: '#00a4ef',
    name: 'kiota',
    status: 'failed',
    loc: '44k',
    languages: 'C#, TypeScript, ...',
    metrics: [
      { label: 'Security', value: '0', grade: 'A' },
      { label: 'Reliability', value: '7', grade: 'C' },
      { label: 'Maintainability', value: '633', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '0.0%', grade: 'E' },
      { label: 'Coverage', value: '83.1', type: 'coverage' },
      { label: 'Duplications', value: '1.2', type: 'duplication' },
    ],
  },
  {
    org: 'The Apache Software Foundation',
    orgLetter: 'A',
    orgColor: '#d22128',
    name: 'kvrocks',
    status: 'passed',
    loc: '96k',
    languages: 'C++, Go, ...',
    metrics: [
      { label: 'Security', value: '1', grade: 'E' },
      { label: 'Reliability', value: '12', grade: 'E' },
      { label: 'Maintainability', value: '4.1k', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '26.7%', grade: 'E' },
      { label: 'Coverage', value: '63.6', type: 'coverage' },
      { label: 'Duplications', value: '1.5', type: 'duplication' },
    ],
  },
  {
    org: 'monicahq',
    orgLetter: 'm',
    orgColor: '#374151',
    name: 'monica',
    status: 'passed',
    loc: '78k',
    languages: 'PHP, JavaScript, ...',
    metrics: [
      { label: 'Security', value: '0', grade: 'A' },
      { label: 'Reliability', value: '3', grade: 'A' },
      { label: 'Maintainability', value: '892', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '100%', grade: 'A' },
      { label: 'Coverage', value: '68.4', type: 'coverage' },
      { label: 'Duplications', value: '2.1', type: 'duplication' },
    ],
  },
  {
    org: 'SonarSource',
    orgLetter: 'S',
    orgColor: '#cb3032',
    name: 'SonarLint for Vi...',
    status: 'passed',
    loc: '40k',
    languages: 'C#, XML',
    metrics: [
      { label: 'Security', value: '0', grade: 'A' },
      { label: 'Reliability', value: '0', grade: 'A' },
      { label: 'Maintainability', value: '241', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '100%', grade: 'A' },
      { label: 'Coverage', value: '91.2', type: 'coverage' },
      { label: 'Duplications', value: '0.8', type: 'duplication' },
    ],
  },
  {
    org: 'Deskflow',
    orgLetter: 'D',
    orgColor: '#0ea5e9',
    name: 'deskflow',
    status: 'passed',
    loc: '49k',
    languages: 'C++, C, ...',
    metrics: [
      { label: 'Security', value: '0', grade: 'A' },
      { label: 'Reliability', value: '8', grade: 'C' },
      { label: 'Maintainability', value: '1.2k', grade: 'A' },
      { label: 'Hotspots Reviewed', value: '42.9%', grade: 'C' },
      { label: 'Coverage', value: '33.1', type: 'coverage' },
      { label: 'Duplications', value: '4.7', type: 'duplication' },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const GRADE_COLORS: Record<Grade, string> = {
  A: '#22c55e',
  B: '#84cc16',
  C: '#f97316',
  D: '#f59e0b',
  E: '#ef4444',
};

function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '1.25rem', height: '1.25rem', borderRadius: '50%',
      backgroundColor: GRADE_COLORS[grade], color: '#fff',
      fontSize: '0.68rem', fontWeight: 700, flexShrink: 0,
    }}>
      {grade}
    </span>
  );
}

function DuplicationDot({ value }: { value: number }) {
  const color = value < 3 ? '#22c55e' : value < 10 ? '#f97316' : '#ef4444';
  return (
    <span style={{
      display: 'inline-block',
      width: '0.75rem', height: '0.75rem', borderRadius: '50%',
      backgroundColor: color, flexShrink: 0,
    }} />
  );
}

function OrgLogo({ letter, color }: { letter: string; color: string }) {
  return (
    <div style={{
      width: '2.5rem', height: '2.5rem', borderRadius: '6px',
      backgroundColor: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0,
    }}>
      {letter}
    </div>
  );
}

function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
      gap: 'var(--echoes-dimension-space-200)',
      padding: '6px var(--echoes-dimension-space-200)',
      borderTop: '1px solid var(--echoes-color-border-weak)',
      fontSize: '0.875rem',
    }}>
      <span style={{ color: 'var(--echoes-color-text-default)' }}>{metric.label}</span>
      <span style={{ color: 'var(--echoes-color-text-default)', fontWeight: 600 }}>{metric.value}</span>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {metric.type === 'coverage' ? (
          <CoverageIndicator percentage={parseFloat(metric.value)} size={16} />
        ) : metric.type === 'duplication' ? (
          <DuplicationDot value={parseFloat(metric.value)} />
        ) : (
          <GradeBadge grade={metric.grade!} />
        )}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{
      border: '1px solid var(--echoes-color-border-weak)',
      borderRadius: 'var(--echoes-border-radius-200)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: 'var(--echoes-dimension-space-200)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--echoes-dimension-space-100)',
        }}>
          <div style={{ display: 'flex', gap: 'var(--echoes-dimension-space-100)', alignItems: 'center', minWidth: 0 }}>
            <OrgLogo letter={project.orgLetter} color={project.orgColor} />
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--echoes-color-text-subtle)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {project.org}
              </div>
              <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {project.name}
              </div>
            </div>
          </div>
          <Badge
            variety={project.status === 'passed' ? 'success' : 'danger'}
            IconLeft={project.status === 'passed' ? IconCheckCircle : undefined}
            size="small"
          >
            {project.status === 'passed' ? 'Passed' : 'Failed'}
          </Badge>
        </div>
      </div>

      {/* Lines of Code */}
      <div style={{
        padding: '6px var(--echoes-dimension-space-200)',
        borderTop: '1px solid var(--echoes-color-border-weak)',
        fontSize: '0.8rem',
        color: 'var(--echoes-color-text-subtle)',
      }}>
        <strong style={{ color: 'var(--echoes-color-text-default)' }}>{project.loc}</strong>
        {' Lines of Code · '}{project.languages}
      </div>

      {/* Metrics */}
      {project.metrics.map(metric => (
        <MetricRow key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  useEffect(() => { document.title = 'Open Source Projects - My Account - SonarQube Cloud'; }, []);

  return (
    <Layout.ContentGrid>
      <Layout.PageGrid>
        <Layout.PageContent>
          {/* Page heading */}
          <div style={{ marginBottom: 'var(--echoes-dimension-space-300)' }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--echoes-color-text-default)',
              marginBottom: 'var(--echoes-dimension-space-100)',
            }}>
              Explore public projects
            </h1>
            <p style={{ color: 'var(--echoes-color-text-default)', maxWidth: '520px' }}>
              Explore our featured public projects to see how SonarQube Cloud helps organizations improve their code.
            </p>
          </div>

          {/* Project grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--echoes-dimension-space-200)',
          }}>
            {PROJECTS.map(project => (
              <ProjectCard key={`${project.org}-${project.name}`} project={project} />
            ))}
          </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
