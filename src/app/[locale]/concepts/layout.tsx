import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lexendDeca } from '@/lib/fonts';
import '@/styles/authorial.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Febrate — Design review', robots: { index: false, follow: false } };

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  // Explicit opt-in prevents unfinished concepts from appearing on a production deploy.
  if (process.env.NODE_ENV !== 'development' && process.env.FEBRATE_DESIGN_REVIEW !== 'true') notFound();
  return <div className={lexendDeca.variable}>{children}</div>;
}
