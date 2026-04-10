export default function ProfileLoading() {
  return (
    <div className="page-container section-padding animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4 text-center h-fit">
          <div className="h-24 w-24 rounded-full bg-gray-200" />
          <div className="h-6 w-32 rounded-xl bg-gray-200 mt-2" />
          <div className="h-4 w-48 rounded-xl bg-gray-100" />
          
          <div className="h-6 w-20 rounded-full bg-cyan-50 mt-1" />

          <div className="grid grid-cols-2 gap-4 w-full border-t border-gray-100 pt-6 mt-2">
            <div className="text-center space-y-2 flex flex-col items-center">
              <div className="h-8 w-12 rounded-xl bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-100" />
            </div>
            <div className="text-center space-y-2 flex flex-col items-center">
              <div className="h-8 w-24 rounded-xl bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
            <div className="col-span-2 text-center mt-3 flex justify-center">
              <div className="h-8 w-28 rounded-full bg-purple-50" />
            </div>
          </div>
        </div>

        {/* Right Section Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 rounded-xl bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-100" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-100" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-50" />
                <div className="h-3 w-48 rounded bg-gray-100" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-100" />
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 my-8" />

            <div className="bg-gray-50 rounded-xl p-4 space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-6 w-32 rounded bg-gray-200" />
              </div>
              <div className="h-px w-full bg-gray-200" />
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-5 w-24 rounded bg-gray-200" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <div className="h-12 w-full sm:w-36 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
