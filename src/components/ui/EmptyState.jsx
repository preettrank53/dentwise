import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  actionOnClick,
  secondaryLabel,
  secondaryHref,
  size = 'md',
}) {
  const sizes = {
    sm: {
      padding: 'py-8',
      iconContainer: 'h-14 w-14 rounded-[12px]',
      icon: 'h-8 w-8',
      title: 'text-sm font-semibold text-gray-900 mt-4',
      description: 'text-xs text-gray-500 max-w-sm text-center mt-2 leading-relaxed',
    },
    md: {
      padding: 'py-16',
      iconContainer: 'h-20 w-20 rounded-[12px]',
      icon: 'h-12 w-12',
      title: 'text-lg font-semibold text-gray-900 mt-4',
      description: 'text-sm text-gray-500 max-w-sm text-center mt-2 leading-relaxed',
    },
    lg: {
      padding: 'py-24 max-h-[50vh] flex items-center justify-center flex-col',
      iconContainer: 'h-24 w-24 rounded-[12px]',
      icon: 'h-16 w-16',
      title: 'text-2xl font-semibold text-gray-900 mt-4',
      description: 'text-base text-gray-500 max-w-sm text-center mt-2 leading-relaxed',
    },
  }[size]

  return (
    <div className={`flex flex-col items-center text-center w-full ${sizes.padding}`}>
      <div className={`${sizes.iconContainer} bg-gray-100 flex items-center justify-center`}>
        {Icon && <Icon className={`${sizes.icon} text-gray-400`} />}
      </div>
      
      <h3 className={sizes.title}>{title}</h3>
      <p className={sizes.description}>{description}</p>

      {(actionLabel || secondaryLabel) && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs sm:max-w-none">
          {actionLabel && (
            actionHref ? (
              <Link
                href={actionHref}
                className="gradient-primary text-white rounded-xl px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {actionLabel}
              </Link>
            ) : (
              <Button
                onClick={actionOnClick}
                className="gradient-primary text-white rounded-xl px-6 py-2.5 text-sm font-medium border-0"
              >
                {actionLabel}
              </Button>
            )
          )}
          
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl px-6 py-2.5 text-sm font-medium transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
