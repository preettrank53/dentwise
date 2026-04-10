export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse p-4 md:p-8">
      {/* Banner Skeleton */}
      <div className="h-48 md:h-64 rounded-2xl bg-gray-100" />

      {/* Stats Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-gray-100 border border-gray-50 flex items-center p-6 gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-200 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 rounded-2xl bg-gray-100" />
            <div className="h-16 rounded-2xl bg-gray-100" />
          </div>
          <div className="h-96 rounded-2xl bg-gray-100" />
        </div>
        <div className="lg:col-span-1 h-full min-h-[300px] rounded-2xl bg-gray-100" />
      </div>
    </div>
  )
}
