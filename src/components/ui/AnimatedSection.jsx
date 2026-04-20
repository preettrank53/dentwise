'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function getHiddenTransform(direction) {
  if (direction === 'left') return 'translateX(-24px)'
  if (direction === 'right') return 'translateX(24px)'
  return 'translateY(24px)'
}

function getVisibleTransform(direction) {
  if (direction === 'left' || direction === 'right') return 'translateX(0)'
  return 'translateY(0)'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? getVisibleTransform(direction) : getHiddenTransform(direction),
        transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
