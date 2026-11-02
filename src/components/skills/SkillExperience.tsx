'use client';

import { Component, lazy, Suspense, useState, type ReactNode } from 'react';

const SkillCloud = lazy(() => import('./SkillCloud'));

class CloudBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SkillExperience({ explore, closeLabel }: { explore: string; closeLabel: string }) {
  const [open, setOpen] = useState(false);
  return <details className="author-skill-experience" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>{explore}</summary>
    {open && <CloudBoundary><Suspense fallback={null}><SkillCloud closeLabel={closeLabel}/></Suspense></CloudBoundary>}
  </details>;
}
