import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@sonarsource/echoes-react';
import { FileGroup, FileChange } from '../types/PRFileTypes';
import PRSidebar from '../components/PRSidebar';
import PRFileGroups from '../components/PRFileGroups';
import PRFilesContent from '../components/PRFilesContent';
import { getPRInfo, getAllPRs } from '../data/pr-info';

export default function PRFilesView() {
  const params = useParams();
  const prId = (params.id as string) || getAllPRs()[0]?.id || '35';

  const prData = getPRInfo(prId);

  const fileGroups: FileGroup[] = prData?.groups?.map((group, idx) => ({
    id: String(idx),
    name: group.name,
    files: (group.files || []).map(path => ({ path })),
    reviewed: false,
  })) ?? [];

  const fileChanges: FileChange[] = prData?.groups?.map((group, idx) => ({
    groupId: String(idx),
    groupName: group.name,
    description: group.description,
    reviewFocus: group.reviewFocus || '',
    fileCount: group.files?.length || 0,
    additions: 0,
    deletions: 0,
    needsReview: true,
    files: (group.files || []).map(filePath => ({
      filename: filePath,
      additions: 0,
      deletions: 0,
      expanded: true,
      checked: false,
      changes: [],
    })),
  })) ?? [];

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedFileChanges, setExpandedFileChanges] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const toggleFileChange = (groupId: string) => {
    setExpandedFileChanges(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const scrollToGroup = (groupId: string) => {
    const element = document.getElementById(`group-${groupId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const reviewedCount = fileGroups.filter(g => g.reviewed).length;

  return (
    <Layout.ContentGrid>
      <Layout.AsideLeft>
        <PRSidebar prId={prId} activeSection="review" />
      </Layout.AsideLeft>

      <Layout.PageGrid>
        <Layout.PageContent>
        <div className="files-view">
          <PRFileGroups
            fileGroups={fileGroups}
            expandedGroups={expandedGroups}
            reviewedCount={reviewedCount}
            onToggleGroup={toggleGroup}
            onScrollToGroup={scrollToGroup}
          />

          <PRFilesContent
            fileChanges={fileChanges}
            expandedFileChanges={expandedFileChanges}
            onToggleFileChange={toggleFileChange}
          />
        </div>
        </Layout.PageContent>
      </Layout.PageGrid>
    </Layout.ContentGrid>
  );
}
