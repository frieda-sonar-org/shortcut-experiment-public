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
  // ── product-design-ux-org / code-review-prototype ──────────────────────────
  {
    id: 'i1',
    title: 'Move this read permission from workflow level to job level.',
    org: 'product-design-ux-org',
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
    assignee: 'lisalee',
  },
  {
    id: 'i2',
    title: 'Move this write permission from workflow level to job level.',
    org: 'product-design-ux-org',
    project: 'code-review-prototype',
    filePath: '.github/workflows/deploy.yml',
    line: 'L14',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '5min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'Low',
    assignee: 'lisalee',
  },
  {
    id: 'i3',
    title: 'Mark the props of this component as read-only.',
    org: 'product-design-ux-org',
    project: 'code-review-prototype',
    filePath: 'src/components/AddCommentButton.tsx',
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
    assignee: 'lisalee',
  },
  {
    id: 'i4',
    title: 'Refactor this function to reduce its Cognitive Complexity from 21 to the 15 allowed.',
    org: 'product-design-ux-org',
    project: 'code-review-prototype',
    filePath: 'src/components/PRFilesContent.tsx',
    line: 'L34',
    status: 'open',
    type: 'code_smell',
    severity: 'critical',
    effort: '30min',
    age: '2 months ago',
    category: 'Responsibility',
    attribute: 'Maintainability',
    attributeSeverity: 'Medium',
    assignee: 'lisalee',
  },

  // ── product-design-ux-org / CakePHP ────────────────────────────────────────
  {
    id: 'i5',
    title: 'SQL queries should not be vulnerable to injection attacks.',
    org: 'product-design-ux-org',
    project: 'CakePHP',
    filePath: 'src/ORM/Query.php',
    line: 'L87',
    status: 'open',
    type: 'vulnerability',
    severity: 'blocker',
    effort: '30min',
    age: '5 days ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'High',
    assignee: 'lisalee',
  },
  {
    id: 'i6',
    title: 'Identical expressions on both sides of operator "===".',
    org: 'product-design-ux-org',
    project: 'CakePHP',
    filePath: 'src/Validation/Validator.php',
    line: 'L214',
    status: 'open',
    type: 'bug',
    severity: 'major',
    effort: '2min',
    age: '5 days ago',
    category: 'Correctness',
    attribute: 'Reliability',
    attributeSeverity: 'Medium',
    assignee: 'lisalee',
  },
  {
    id: 'i7',
    title: 'Remove this commented-out code.',
    org: 'product-design-ux-org',
    project: 'CakePHP',
    filePath: 'src/Database/Connection.php',
    line: 'L152',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '1min',
    age: '5 days ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    assignee: 'lisalee',
  },

  // ── product-design-ux-org / design-system-docs ─────────────────────────────
  {
    id: 'i8',
    title: 'Remove the declaration of the unused "theme" variable.',
    org: 'product-design-ux-org',
    project: 'design-system-docs',
    filePath: 'src/components/TokenTable.tsx',
    line: 'L22',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '2min',
    age: '1 week ago',
    category: 'Clarity',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    tags: ['unused'],
    assignee: 'lisalee',
  },
  {
    id: 'i9',
    title: 'Define a constant instead of duplicating this literal "echoes-color-" 4 times.',
    org: 'product-design-ux-org',
    project: 'design-system-docs',
    filePath: 'src/utils/tokens.ts',
    line: 'L45',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '10min',
    age: '1 week ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    assignee: 'lisalee',
  },

  // ── lisa-lee-sonar / data-vis-v1 ───────────────────────────────────────────
  {
    id: 'i10',
    title: 'Credentials should not be hard-coded.',
    org: 'lisa-lee-sonar',
    project: 'data-vis-v1',
    filePath: 'src/api/client.ts',
    line: 'L8',
    status: 'open',
    type: 'vulnerability',
    severity: 'blocker',
    effort: '15min',
    age: '3 weeks ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'High',
    tags: ['security', 'credentials'],
    assignee: 'lisalee',
  },
  {
    id: 'i11',
    title: 'Mark the props of this component as read-only.',
    org: 'lisa-lee-sonar',
    project: 'data-vis-v1',
    filePath: 'src/components/BarChart.tsx',
    line: 'L17',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '5min',
    age: '3 weeks ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    tags: ['react'],
    assignee: 'lisalee',
  },

  // ── lisa-lee-sonar / echoes-AI-figma-plugin ────────────────────────────────
  {
    id: 'i12',
    title: 'Promises must be handled appropriately.',
    org: 'lisa-lee-sonar',
    project: 'echoes-AI-figma-plugin',
    filePath: 'src/plugin/figma-api.ts',
    line: 'L63',
    status: 'open',
    type: 'bug',
    severity: 'critical',
    effort: '15min',
    age: '2 weeks ago',
    category: 'Correctness',
    attribute: 'Reliability',
    attributeSeverity: 'High',
    assignee: 'lisalee',
  },
  {
    id: 'i13',
    title: 'Make sure that using "any" type is safe here.',
    org: 'lisa-lee-sonar',
    project: 'echoes-AI-figma-plugin',
    filePath: 'src/plugin/ai-completion.ts',
    line: 'L29',
    status: 'open',
    type: 'code_smell',
    severity: 'major',
    effort: '20min',
    age: '2 weeks ago',
    category: 'Adaptability',
    attribute: 'Maintainability',
    attributeSeverity: 'Medium',
    tags: ['typescript'],
    assignee: 'lisalee',
  },

  // ── lisa-lee-sonar / sqc-template ──────────────────────────────────────────
  {
    id: 'i14',
    title: 'Make sure that command line arguments are used safely here.',
    org: 'lisa-lee-sonar',
    project: 'sqc-template',
    filePath: 'scripts/postinstall.js',
    line: 'L12',
    status: 'open',
    type: 'vulnerability',
    severity: 'major',
    effort: '10min',
    age: '1 month ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'Medium',
    assignee: 'lisalee',
  },
  {
    id: 'i15',
    title: 'Refactor this function to reduce its Cognitive Complexity from 18 to the 15 allowed.',
    org: 'lisa-lee-sonar',
    project: 'sqc-template',
    filePath: 'src/components/ProjectFilters.tsx',
    line: 'L88',
    status: 'open',
    type: 'code_smell',
    severity: 'critical',
    effort: '30min',
    age: '1 month ago',
    category: 'Responsibility',
    attribute: 'Maintainability',
    attributeSeverity: 'Medium',
    assignee: 'lisalee',
  },

  // ── lisa-lee-sonar / api-gateway ───────────────────────────────────────────
  {
    id: 'i16',
    title: 'HTTP response headers should not be vulnerable to injection attacks.',
    org: 'lisa-lee-sonar',
    project: 'api-gateway',
    filePath: 'src/main/java/com/gateway/filter/ResponseFilter.java',
    line: 'L47',
    status: 'open',
    type: 'vulnerability',
    severity: 'critical',
    effort: '20min',
    age: '1 week ago',
    category: 'Responsibility',
    attribute: 'Security',
    attributeSeverity: 'High',
    assignee: 'lisalee',
  },
  {
    id: 'i17',
    title: 'Null pointers should not be dereferenced.',
    org: 'lisa-lee-sonar',
    project: 'api-gateway',
    filePath: 'src/main/java/com/gateway/service/TokenService.java',
    line: 'L113',
    status: 'open',
    type: 'bug',
    severity: 'blocker',
    effort: '10min',
    age: '1 week ago',
    category: 'Correctness',
    attribute: 'Reliability',
    attributeSeverity: 'High',
    tags: ['java', 'null-pointer'],
    assignee: 'lisalee',
  },
  {
    id: 'i18',
    title: 'Use a logger instead of "System.out.println".',
    org: 'lisa-lee-sonar',
    project: 'api-gateway',
    filePath: 'src/main/java/com/gateway/controller/HealthController.java',
    line: 'L28',
    status: 'open',
    type: 'code_smell',
    severity: 'minor',
    effort: '5min',
    age: '1 week ago',
    category: 'Consistency',
    attribute: 'Maintainability',
    attributeSeverity: 'Low',
    assignee: 'lisalee',
  },
];
