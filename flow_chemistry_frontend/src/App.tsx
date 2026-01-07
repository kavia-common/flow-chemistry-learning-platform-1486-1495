import React from 'react';
import Layout from './components/layout/Layout';

import './styles/theme.css';
import './styles/layout.css';

// PUBLIC_INTERFACE
function App() {
  /** Application root: renders the dashboard shell with placeholder main content. */
  return (
    <Layout>
      <section className="card" aria-label="Welcome card">
        <h1 className="card__title">Welcome to Flow Chemistry</h1>
        <p className="card__desc">
          This is the starting point for the learning, simulation, and resource
          experience. Navigation is currently a placeholder (no router yet), but
          the dashboard shell is ready for future routes and pages.
        </p>
      </section>
    </Layout>
  );
}

export default App;
