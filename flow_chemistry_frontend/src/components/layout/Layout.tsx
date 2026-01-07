import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Sidebar, { NavKey, getDefaultNavItems } from './Sidebar';
import WorkflowDesigner from '../../pages/WorkflowDesigner';

export interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Internal helper to keep resize listeners clean and typed.
 */
function useIsNarrowScreen(breakpointPx: number): boolean {
  const [isNarrow, setIsNarrow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx}px)`);

    const onChange = () => setIsNarrow(mql.matches);
    onChange();

    // Support both modern and older browser APIs.
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }

    // Legacy API fallback (some older browsers)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql as any).addListener(onChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mql as any).removeListener(onChange);
  }, [breakpointPx]);

  return isNarrow;
}

// PUBLIC_INTERFACE
const Layout: React.FC<LayoutProps> = ({ children }) => {
  /** Dashboard shell layout: persistent sidebar + sticky header + main content slot. */
  const items = useMemo(() => getDefaultNavItems(), []);
  const [activeKey, setActiveKey] = useState<NavKey>('dashboard');

  // Under 1024px we default to collapsed (icons-only). Users can still toggle.
  const isNarrow = useIsNarrowScreen(1024);

  // Manual override so user can toggle even on narrow screens.
  // When viewport crosses breakpoint, we reset override to avoid confusing states.
  const [manualCollapsed, setManualCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    setManualCollapsed(null);
  }, [isNarrow]);

  const collapsed = manualCollapsed ?? isNarrow;

  return (
    <div className={`dashboardShell ${collapsed ? 'dashboardShell--collapsed' : ''}`}>
      <Sidebar
        items={items}
        activeKey={activeKey}
        collapsed={collapsed}
        onNavigate={(key) => setActiveKey(key)}
      />

      <div className="shellMainColumn">
        <Header
          collapsed={collapsed}
          onToggleSidebar={() => setManualCollapsed((prev) => !(prev ?? isNarrow))}
        />

        <main className="main" role="main">
          <div className="main__inner">
            {activeKey === 'workflow_designer' ? <WorkflowDesigner /> : children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
