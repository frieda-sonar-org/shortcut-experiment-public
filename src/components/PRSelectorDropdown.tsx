import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPRs } from '../data/pr-info';

interface PRSelectorDropdownProps {
  readonly prId: string;
  readonly basePath?: string;
  /** Route segment to navigate to on selection, e.g. 'pr' or 'overview' */
  readonly pathPrefix?: string;
}

const PR_ICON_PATH = 'M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z';

export default function PRSelectorDropdown({
  prId,
  basePath = '',
  pathPrefix = 'pr',
}: PRSelectorDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const allPRs = getAllPRs();
  const current = allPRs.find((pr) => pr.id === prId);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="pr-selector-container" style={{ position: 'relative' }}>
      <button className="pr-selector-button" onClick={() => setOpen(!open)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d={PR_ICON_PATH} />
        </svg>
        <span className="pr-selector-text">
          {current ? `${current.number} - ${current.title}` : prId}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <path d="M6 8L2 4h8L6 8z" />
        </svg>
      </button>

      {open && (
        <div className="pr-selector-dropdown">
          {allPRs.map((pr) => (
            <button
              key={pr.id}
              className={`pr-selector-item ${prId === pr.id ? 'active' : ''}`}
              onClick={() => {
                if (prId !== pr.id) {
                  setOpen(false);
                  navigate(`${basePath}/${pathPrefix}/${pr.id}`);
                }
              }}
            >
              <div className="pr-selector-item-content">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d={PR_ICON_PATH} />
                </svg>
                <span className="pr-selector-item-text">{pr.number} - {pr.title}</span>
              </div>
              <span className="pr-selector-item-status passed">Passed</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
