export default function AppointmentsMyLoading() {
  return (
    <div className="page-container section-padding min-h-screen animate-pulse">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="h-10 w-64 rounded-xl bg-gray-200" />
          <div className="h-6 w-48 rounded bg-gray-100" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-gray-200" />
      </header>

      <section className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl border border-gray-100 shadow-sm p-6 bg-white gap-6 flex">
            <div className="h-12 w-12 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-5 w-40 rounded xl bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-100" />
            </div>
            <div className="w-24 shrink-0 flex flex-col justify-between items-end">
              <div className="h-6 w-20 rounded-full bg-gray-100" />
              <div className="h-8 w-24 rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
