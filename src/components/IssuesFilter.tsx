// ─── Issues Filter ────────────────────────────────────────────────────────────
// Placeholder — filter content will be added in a follow-up.
// Structure should mirror ProjectFilters: FilterSectionTitle + FilterRow sections.

export function IssuesFilter() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--echoes-dimension-space-200)',
    }}>
      <span style={{
        fontSize: 'var(--echoes-font-size-30)',
        color: 'var(--echoes-color-text-subdued)',
        fontStyle: 'italic',
      }}>
        Filters coming soon…
      </span>
    </div>
  );
}
