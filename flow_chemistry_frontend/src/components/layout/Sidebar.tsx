import React from 'react';

export type NavKey =
  | 'dashboard'
  | 'simulations'
  | 'resources'
  | 'community'
  | 'workflow_designer';

export type NavItem = Readonly<{
  key: NavKey;
  label: string;
  icon: React.ReactNode;
}>;

export interface SidebarProps {
  items: ReadonlyArray<NavItem>;
  activeKey: NavKey;
  collapsed: boolean;
  onNavigate: (key: NavKey) => void;
}

/**
 * Simple inline icons to avoid external icon dependencies.
 * Intentionally minimalist to match the Ocean Professional theme.
 */
function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
      />
    </svg>
  );
}

function IconBeaker() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9 2h6v2h-1v5.1l4.9 8.5A3.5 3.5 0 0 1 15.9 22H8.1a3.5 3.5 0 0 1-3-5.4L10 9.1V4H9V2zm3 8.1l-5.2 9a1.5 1.5 0 0 0 1.3 2.3h7.8a1.5 1.5 0 0 0 1.3-2.3l-5.2-9z"
      />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h11V4H6zm2 2h7v2H8V6zm0 4h7v2H8v-2z"
      />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5S14.34 11 16 11zM8 11c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h7v-3.5C24 14.17 18.33 13 16 13z"
      />
    </svg>
  );
}

function IconWorkflow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2V8H6V6h2V4H6zm10 0v2h2v2h-2v4h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2zM8 12h8v2H8v-2zm-2 6h2v-2H6v-2H4v2a2 2 0 0 0 2 2zm12-2v2h-2v2h2a2 2 0 0 0 2-2v-2h-2z"
      />
    </svg>
  );
}

// PUBLIC_INTERFACE
export function getDefaultNavItems(): ReadonlyArray<NavItem> {
  /** Returns the default sidebar navigation items (placeholder routing keys). */
  return [
    { key: 'dashboard', label: 'Dashboard', icon: <IconGrid /> },
    { key: 'workflow_designer', label: 'Workflow Designer', icon: <IconWorkflow /> },
    { key: 'simulations', label: 'Simulations', icon: <IconBeaker /> },
    { key: 'resources', label: 'Resources', icon: <IconBook /> },
    { key: 'community', label: 'Community', icon: <IconUsers /> },
  ] as const;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeKey,
  collapsed,
  onNavigate,
}) => {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand" aria-label="App brand">
        <div className="sidebar__logoMark" aria-hidden="true" />
        <div className="sidebar__brandText">
          <div className="sidebar__brandTitle">Flow Chemistry</div>
          <div className="sidebar__brandSubtitle">Learning Platform</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
              onClick={() => onNavigate(item.key)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={collapsed ? item.label : undefined}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar__label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__hint">
          Tip: Routes will be added later — this is a layout shell.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
