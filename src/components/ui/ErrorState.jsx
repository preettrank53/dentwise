import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ErrorState({
  title = "Something Went Wrong",
  description = "Could not load data. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center text-center py-12 w-full">
      <div className="bg-red-50 rounded-[12px] p-3">
        <AlertTriangle className="h-12 w-12 text-red-400" />
      </div>
      
      <h3 className="text-base font-semibold text-gray-900 mt-4">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-2 max-w-sm text-center">
        {description}
      </p>

      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="mt-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          <RefreshCw className="mr-2 h-4 w-4 text-gray-400" />
          Try Again
        </Button>
      )}
    </div>
  )
}
