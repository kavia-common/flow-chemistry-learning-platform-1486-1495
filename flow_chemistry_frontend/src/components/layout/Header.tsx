import React from 'react';

export interface HeaderProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

// PUBLIC_INTERFACE
const Header: React.FC<HeaderProps> = ({ collapsed, onToggleSidebar }) => {
  /** Top header bar for the dashboard shell (title + sidebar toggle + profile placeholder). */
  return (
    <header className="header" role="banner">
      <div className="header__left">
        <button
          type="button"
          className="header__toggle"
          onClick={onToggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {/* hamburger icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
            />
          </svg>
        </button>

        <div className="header__titleWrap">
          <p className="header__title">Flow Chemistry Dashboard</p>
          <p className="header__subtitle">Ocean Professional</p>
        </div>
      </div>

      <div className="header__right" aria-label="User area">
        <span className="header__pill">
          <span className="header__avatar" aria-hidden="true" />
          <span>Profile</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
