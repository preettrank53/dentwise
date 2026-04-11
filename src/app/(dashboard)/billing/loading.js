export default function BillingLoading() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-48 bg-gray-800 animate-pulse rounded-b-3xl"></div>
      
      <div className="page-container -mt-8 relative z-10 w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
          <div className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
          <div className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
