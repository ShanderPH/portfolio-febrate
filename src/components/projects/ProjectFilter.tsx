'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';
import type { ProjectCategory } from '@/lib/projects.config';

const categories = ['all', 'product', 'platform', 'automation'] as const;
const subscribe = () => () => {};

export function ProjectFilter({ items, labels }: {
  items: { id: string; category: ProjectCategory; content: ReactNode }[];
  labels: Record<(typeof categories)[number], string>;
}) {
  const [category, setCategory] = useState<(typeof categories)[number]>('all');
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  return <>
    <div className="author-filters" role="group" aria-label={labels.all}>
      {ready && categories.map(value => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{labels[value]}</button>)}
    </div>
    <div className="author-projects">{items.filter(item => category === 'all' || item.category === category).map(item => item.content)}</div>
  </>;
}
