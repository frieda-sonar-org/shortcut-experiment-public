// ─── Types ───────────────────────────────────────────────────────────────────

export type Rating = 'A' | 'B' | 'C' | 'D' | 'E';
export type QualityGateStatus = 'passed' | 'failed' | 'not_computed';
export type Visibility = 'public' | 'private';
export type ProjectTag = 'new' | 'ai_code_detected';

export interface RatingMetric {
  rating: Rating;
  value: string; // e.g. "3", "101", "2.9k", "100%"
}

export interface ProjectMetrics {
  security: RatingMetric;
  reliability: RatingMetric;
  maintainability: RatingMetric;
  hotspots: RatingMetric;
  /** undefined = don't show; null = show "—" dash; object = show rating + value */
  dependencyRisks?: { rating: Rating; value: string } | null;
  /** Optional coverage percentage — shown with CoverageIndicator (not inverted) */
  coverage?: { percentage: number };
  duplications: {
    percentage: number;
  };
}

export interface Project {
  id: string;
  name: string;
  orgId: string;
  visibility: Visibility;
  starred?: boolean;
  tags?: ProjectTag[];
  lastAnalysis?: string;   // formatted: "DD/MM/YYYY, HH:MM"
  linesOfCode?: string;    // e.g. "5.8k", "198k"
  languages?: string[];    // e.g. ["TypeScript", "CSS"]
  qualityGate?: QualityGateStatus;
  metrics?: ProjectMetrics;
}

export interface OrgData {
  id: string;
  name: string;
  projects: Project[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const ORGS: OrgData[] = [
  {
    id: 'product-design-ux-org',
    name: 'Product-Design-UX-Org',
    projects: [
      {
        id: 'code-review-prototype',
        name: 'code-review-prototype',
        orgId: 'product-design-ux-org',
        visibility: 'public',
        tags: ['new'],
        lastAnalysis: '18/03/2026, 10:42',
        linesOfCode: '5.8k',
        languages: ['TypeScript', 'CSS'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'C', value: '3' },
          reliability:     { rating: 'C', value: '98' },
          maintainability: { rating: 'A', value: '101' },
          hotspots:        { rating: 'A', value: '100%' },
          duplications:    { percentage: 5.6 },
        },
      },
      {
        id: 'cpp-test',
        name: 'cpp-test',
        orgId: 'product-design-ux-org',
        visibility: 'private',
        starred: true,
        // No lastAnalysis / metrics → "not analyzed yet" state
      },
      {
        id: 'CakePHP',
        name: 'CakePHP',
        orgId: 'product-design-ux-org',
        visibility: 'private',
        lastAnalysis: '09/03/2026, 12:18',
        linesOfCode: '198k',
        languages: ['PHP', 'CSS'],
        qualityGate: 'passed',
        metrics: {
          security:        { rating: 'E', value: '42' },
          reliability:     { rating: 'D', value: '81' },
          maintainability: { rating: 'A', value: '2.9k' },
          hotspots:        { rating: 'E', value: '0.0%' },
          dependencyRisks: null,
          duplications:    { percentage: 5.6 },
        },
      },
      {
        id: 'design-system-docs',
        name: 'design-system-docs',
        orgId: 'product-design-ux-org',
        visibility: 'public',
        lastAnalysis: '17/03/2026, 14:22',
        linesOfCode: '12k',
        languages: ['TypeScript', 'CSS'],
        qualityGate: 'passed',
        metrics: {
          security:        { rating: 'A', value: '0' },
          reliability:     { rating: 'B', value: '5' },
          maintainability: { rating: 'A', value: '34' },
          hotspots:        { rating: 'A', value: '100%' },
          coverage:        { percentage: 82.3 },
          duplications:    { percentage: 1.2 },
        },
      },
      {
        id: 'ux-audit-tool',
        name: 'ux-audit-tool',
        orgId: 'product-design-ux-org',
        visibility: 'private',
        lastAnalysis: '15/03/2026, 09:11',
        linesOfCode: '3.2k',
        languages: ['TypeScript', 'CSS'],
        qualityGate: 'failed',
        metrics: {
          security:        { rating: 'C', value: '4' },
          reliability:     { rating: 'B', value: '8' },
          maintainability: { rating: 'B', value: '47' },
          hotspots:        { rating: 'C', value: '60.0%' },
          coverage:        { percentage: 45 },
          duplications:    { percentage: 8.1 },
        },
      },
    ],
  },
  {
    id: 'lisa-lee-sonar',
    name: 'lisa-lee-sonar',
    projects: [
      {
        id: 'test-cpp-simple',
        name: 'test-cpp-simple',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        lastAnalysis: '05/03/2026, 15:39',
        linesOfCode: '18',
        languages: ['C++'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'A', value: '0' },
          reliability:     { rating: 'A', value: '0' },
          maintainability: { rating: 'A', value: '0' },
          hotspots:        { rating: 'A', value: '100%' },
          dependencyRisks: null,
          duplications:    { percentage: 0 },
        },
      },
      {
        id: 'data-vis-v1',
        name: 'data-vis-v1',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        lastAnalysis: '05/03/2026, 15:39',
        linesOfCode: '549',
        languages: ['TypeScript', 'CSS'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'C', value: '3' },
          reliability:     { rating: 'A', value: '1' },
          maintainability: { rating: 'A', value: '2' },
          hotspots:        { rating: 'A', value: '100%' },
          dependencyRisks: null,
          duplications:    { percentage: 0 },
        },
      },
      {
        id: 'echoes-AI-figma-plugin',
        name: 'echoes-AI-figma-plugin',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        lastAnalysis: '03/03/2026, 19:32',
        linesOfCode: '600',
        languages: ['TypeScript', 'HTML'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'E', value: '2' },
          reliability:     { rating: 'A', value: '13' },
          maintainability: { rating: 'A', value: '21' },
          hotspots:        { rating: 'E', value: '0.0%' },
          dependencyRisks: null,
          duplications:    { percentage: 2.2 },
        },
      },
      {
        id: 'cpp-test-2',
        name: 'cpp-test-2',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        starred: true,
        lastAnalysis: '03/03/2026, 09:49',
        linesOfCode: '195k',
        languages: ['C++', 'HTML'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'D', value: '2' },
          reliability:     { rating: 'E', value: '16' },
          maintainability: { rating: 'A', value: '2.4k' },
          hotspots:        { rating: 'E', value: '0.0%' },
          dependencyRisks: null,
          duplications:    { percentage: 1.1 },
        },
      },
      {
        id: 'sonar-cpp-test',
        name: 'sonar-cpp-test',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        starred: true,
        tags: ['ai_code_detected'],
        lastAnalysis: '02/03/2026, 15:25',
        linesOfCode: '195k',
        languages: ['C++', 'HTML'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'D', value: '2' },
          reliability:     { rating: 'E', value: '16' },
          maintainability: { rating: 'A', value: '2.4k' },
          hotspots:        { rating: 'E', value: '0.0%' },
          dependencyRisks: null,
          duplications:    { percentage: 1.1 },
        },
      },
      {
        id: 'sqc-template',
        name: 'sqc-template',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        lastAnalysis: '20/03/2026, 08:45',
        linesOfCode: '4.1k',
        languages: ['TypeScript', 'CSS'],
        qualityGate: 'not_computed',
        metrics: {
          security:        { rating: 'B', value: '2' },
          reliability:     { rating: 'A', value: '3' },
          maintainability: { rating: 'A', value: '18' },
          hotspots:        { rating: 'B', value: '85.0%' },
          coverage:        { percentage: 0 },
          duplications:    { percentage: 2.8 },
        },
      },
      {
        id: 'api-gateway',
        name: 'api-gateway',
        orgId: 'lisa-lee-sonar',
        visibility: 'private',
        lastAnalysis: '12/03/2026, 17:30',
        linesOfCode: '28k',
        languages: ['Java', 'TypeScript'],
        qualityGate: 'failed',
        metrics: {
          security:        { rating: 'D', value: '7' },
          reliability:     { rating: 'C', value: '22' },
          maintainability: { rating: 'B', value: '312' },
          hotspots:        { rating: 'D', value: '20.0%' },
          dependencyRisks: { rating: 'B', value: '12' },
          coverage:        { percentage: 63.5 },
          duplications:    { percentage: 4.2 },
        },
      },
    ],
  },
  {
    id: 'enterprise-platform-org',
    name: 'Enterprise-Platform-Org',
    projects: [
      {
        id: 'platform-api',
        name: 'platform-api',
        orgId: 'enterprise-platform-org',
        visibility: 'private',
        lastAnalysis: '19/03/2026, 16:00',
        linesOfCode: '87k',
        languages: ['Java', 'TypeScript'],
        qualityGate: 'passed',
        metrics: {
          security:        { rating: 'B', value: '5' },
          reliability:     { rating: 'A', value: '12' },
          maintainability: { rating: 'A', value: '1.1k' },
          hotspots:        { rating: 'B', value: '75.0%' },
          dependencyRisks: { rating: 'A', value: '3' },
          coverage:        { percentage: 78.4 },
          duplications:    { percentage: 2.1 },
        },
      },
      {
        id: 'mobile-app',
        name: 'mobile-app',
        orgId: 'enterprise-platform-org',
        visibility: 'private',
        lastAnalysis: '18/03/2026, 11:22',
        linesOfCode: '34k',
        languages: ['TypeScript', 'Swift'],
        qualityGate: 'failed',
        metrics: {
          security:        { rating: 'C', value: '8' },
          reliability:     { rating: 'B', value: '21' },
          maintainability: { rating: 'B', value: '342' },
          hotspots:        { rating: 'C', value: '55.0%' },
          coverage:        { percentage: 58.2 },
          duplications:    { percentage: 5.4 },
        },
      },
      {
        id: 'data-pipeline',
        name: 'data-pipeline',
        orgId: 'enterprise-platform-org',
        visibility: 'private',
        starred: true,
        lastAnalysis: '17/03/2026, 09:45',
        linesOfCode: '22k',
        languages: ['Python', 'TypeScript'],
        qualityGate: 'passed',
        metrics: {
          security:        { rating: 'A', value: '0' },
          reliability:     { rating: 'A', value: '4' },
          maintainability: { rating: 'A', value: '187' },
          hotspots:        { rating: 'A', value: '100%' },
          dependencyRisks: { rating: 'B', value: '9' },
          coverage:        { percentage: 91.3 },
          duplications:    { percentage: 0.8 },
        },
      },
      {
        id: 'auth-service',
        name: 'auth-service',
        orgId: 'enterprise-platform-org',
        visibility: 'private',
        tags: ['ai_code_detected'],
        lastAnalysis: '16/03/2026, 14:10',
        linesOfCode: '11k',
        languages: ['TypeScript', 'Java'],
        qualityGate: 'failed',
        metrics: {
          security:        { rating: 'D', value: '14' },
          reliability:     { rating: 'C', value: '9' },
          maintainability: { rating: 'B', value: '98' },
          hotspots:        { rating: 'D', value: '30.0%' },
          dependencyRisks: { rating: 'C', value: '21' },
          coverage:        { percentage: 44.6 },
          duplications:    { percentage: 3.7 },
        },
      },
    ],
  },
  {
    id: 'sonar-ux-testing-org',
    name: 'Sonar-UX-Testing-Org',
    projects: [
      {
        id: 'autosecurity',
        name: 'autosecurity',
        orgId: 'sonar-ux-testing-org',
        visibility: 'private',
        starred: true,
        lastAnalysis: '19/03/2026, 01:13',
        linesOfCode: '6.9k',
        languages: ['Python', 'Shell'],
        qualityGate: 'failed',
        metrics: {
          security:        { rating: 'A', value: '0' },
          reliability:     { rating: 'A', value: '0' },
          maintainability: { rating: 'A', value: '15' },
          hotspots:        { rating: 'A', value: '100%' },
          dependencyRisks: { rating: 'C', value: '36' },
          coverage:        { percentage: 70.5 },
          duplications:    { percentage: 0.3 },
        },
      },
    ],
  },
];

export function getOrg(orgId: string): OrgData | undefined {
  return ORGS.find(o => o.id === orgId);
}

export function getAllProjects(): Project[] {
  return ORGS.flatMap(o => o.projects);
}
