'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProjectArtwork({ src, title, fallback }: { src: string | null; title: string; fallback: string }) {
  const [failed, setFailed] = useState(false);
  return <div className="author-project-artwork">
    {src && !failed ? <Image src={src} alt={title} fill sizes="(max-width: 767px) 100vw, 70vw"
      unoptimized={!src.startsWith('/')} onError={() => setFailed(true)} />
      : <div className="author-project-placeholder"><strong>{title}</strong><span>{fallback}</span></div>}
  </div>;
}
