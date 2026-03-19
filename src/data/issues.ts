// ─── Types ────────────────────────────────────────────────────────────────────

export type IssueType = 'vulnerability' | 'code_smell' | 'bug';
export type IssueSeverity = 'blocker' | 'critical' | 'major' | 'minor' | 'info';
export type IssueStatus = 'open' | 'confirmed' | 'resolved';

export interface Issue {
  id: string;
  title: string;
  org: string;
  project: string;
  filePath: string;
  line: string;
  status: IssueStatus;
  type: IssueType;
  severity: IssueSeverity;
  effort: string;
  age: string;
  /** Software quality category, e.g. "Responsibility", "Consistency" */
  category: string;
  /** Clean code attribute, e.g. "Security", "Maintainability" */
  attribute: string;
  /** Attribute severity label, e.g. "Low", "Medium", "High" */
  attributeSeverity: string;
  tags?: string[];
  assignee: string;
}

export interface IssueGroup {
  org: string;
  project: string;
  filePath: string;
  issues: Issue[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function groupIssuesByFile(issues: Issue[]): IssueGroup[] {
  const map = new Map<string, IssueGroup>();
  for (const issue of issues) {
    const key = `${issue.org}/${issue.project}/${issue.filePath}`;
    if (!map.has(key)) {
      map.set(key, { org: issue.org, project: issue.project, filePath: issue.filePath, issues: [] });
    }
    map.get(key)!.issues.push(issue);
  }
  return Array.from(map.values());
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const TOTAL_ISSUES = 447;
export const TOTAL_EFFORT = '4d 4h';

export const ISSUES: Issue[] = [
  {
    id: 'i1',
    title: 'Move this read permission from workflow level to job level.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: '.github/workflows/deploy.yml',
    line: 'L9',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '5min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'Low',
    assignee: 'heyfrieda',
  },
  {
    id: 'i2',
    title: 'Move this write permission from workflow level to job level.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: '.github/workflows/deploy.yml',
    line: 'L10',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '5min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'Low',
    assignee: 'heyfrieda',
  },
  {
    id: 'i3',
    title: 'Move this write permission from workflow level to job level.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: '.github/workflows/deploy.yml',
    line: 'L11',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '5min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'Low',
    assignee: 'heyfrieda',
  },
  {
    id: 'i4',
    title: 'Mark the props of the component as read-only.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: 'app/components/AddCommentButton.tsx',
    line: 'L13',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '5min',
    age: '2 months ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    tags: ['react', 'type-dependent'],
    assignee: 'heyfrieda',
  },
  {
    id: 'i5',
    title: 'Mark the props of the component as read-only.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: 'app/components/CodeLine.tsx',
    line: 'L8',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '5min',
    age: '2 months ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    tags: ['react', 'type-dependent'],
    assignee: 'heyfrieda',
  },
  {
    id: 'i6',
    title: 'Refactor this function to reduce its Cognitive Complexity from 21 to the 15 allowed.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: 'app/components/PRFilesContent.tsx',
    line: 'L34',
    status: 'open',
    type: 'code_smell',
    severity: 'critical',
    effort: '30min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Maintainability',
    attributeSeverity: 'Medium',
    assignee: 'heyfrieda',
  },
  {
    id: 'i7',
    title: "Remove this commented-out code.",
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: 'app/components/PRFilesContent.tsx',
    line: 'L89',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '1min',
    age: '2 months ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    assignee: 'heyfrieda',
  },
  {
    id: 'i8',
    title: 'Make sure that command line arguments are used safely here.',
    org: 'frieda-sonar-org',
    project: 'code-review-prototype',
    filePath: 'scripts/postinstall.js',
    line: 'L12',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '10min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'High',
    assignee: 'heyfrieda',
  },
];
