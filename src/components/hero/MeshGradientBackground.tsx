'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

const emptySubscribe = () => () => {}

interface MeshGradientBackgroundProps {
  className?: string
}

export function MeshGradientBackground({ className = '' }: MeshGradientBackgroundProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!mounted) return
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [mounted])

  const earthToneColors = [
    '#8B7355',
    '#A08060',
    '#C4A77D',
    '#D4C4A8',
    '#6B5B45',
    '#9C8B6E',
  ]

  const speed = prefersReducedMotion ? 0 : 0.35

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-linear-to-br from-(--stone-200) via-(--stone-100) to-(--stone-50) dark:from-(--stone-900) dark:via-(--stone-950) dark:to-(--stone-900)" />
      
      {mounted && (
        <div className="absolute inset-0">
          <MeshGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={earthToneColors}
            distortion={0.6}
            swirl={0.5}
            grainMixer={0}
            grainOverlay={0}
            speed={speed}
            offsetX={0.1}
          />
        </div>
      )}
      
      <div className="absolute inset-0 pointer-events-none bg-white/30 dark:bg-black/40" />
    </div>
  )
}
