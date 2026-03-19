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
