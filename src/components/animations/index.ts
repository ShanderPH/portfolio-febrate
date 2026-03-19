/**
 * Animation Components
 *
 * Reusable animation components for scroll-triggered reveals,
 * parallax effects, and infinite marquee scrolling.
 *
 * All components are optimized for performance:
 * - GPU-accelerated transforms (transform, opacity only)
 * - Respects prefers-reduced-motion
 * - Mobile-optimized with reduced animation intensity
 * - Lazy initialization outside viewport
 */

export { ScrollReveal, ScrollRevealItem } from './ScrollReveal'
export { Parallax, ParallaxLayer } from './Parallax'
export { Marquee, MarqueeItem } from './Marquee'
export { TextBlockAnimation } from './TextBlockAnimation'
export { SmoothScrollProvider, useSmoothScroll } from './SmoothScrollProvider'
