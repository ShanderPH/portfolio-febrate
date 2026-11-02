'use client';

import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const MeshGradient = lazy(() => import('@paper-design/shaders-react').then(module => ({ default: module.MeshGradient })));
const colors = ['#8B7355', '#A08060', '#C4A77D', '#D4C4A8', '#6B5B45', '#9C8B6E'];

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Decorative enhancement: static first, no GPU on mobile/reduced motion. */
export function MeshGradientBackground({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)');
    let visible = false;
    const update = () => setEnabled(media.matches && visible && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      update();
    });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div ref={ref} aria-hidden="true" className={`absolute inset-0 ${className}`}
    style={{ background: 'radial-gradient(ellipse at 25% 25%, #d4c4a8, #a08060 55%, #6b5b45)', pointerEvents: 'none' }}>
    {enabled && <ShaderBoundary><Suspense fallback={null}>
      <MeshGradient style={{ width: '100%', height: '100%' }} maxPixelCount={650000} colors={colors}
        distortion={0.6} swirl={0.5} grainMixer={0} grainOverlay={0} speed={0.2} offsetX={0.1} />
    </Suspense></ShaderBoundary>}
  </div>;
}
