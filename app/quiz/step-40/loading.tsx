export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Discount Banner Skeleton */}
      <div className="w-full bg-gray-300 py-2 sm:py-3 px-4 sm:px-6 animate-pulse">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="h-4 sm:h-5 bg-gray-400 rounded w-48"></div>
          <div className="h-6 sm:h-7 bg-gray-400 rounded w-16"></div>
        </div>
      </div>

      {/* Header Skeleton */}
      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100">
        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-16 animate-pulse"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded-full w-24 animate-pulse"></div>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Hero Section Skeleton */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 sm:h-16 bg-gray-300 rounded w-full max-w-2xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-80 mx-auto animate-pulse"></div>
          </div>

          {/* Before/After Skeleton */}
          <div className="mb-8 sm:mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 animate-pulse">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 bg-gray-300 rounded-full"></div>
                <div className="h-6 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 sm:p-6 animate-pulse">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 bg-gray-300 rounded-full"></div>
                <div className="h-6 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Skeleton */}
          <div className="mb-8 sm:mb-12">
            <div className="h-8 bg-gray-300 rounded w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="bg-gray-100 rounded-xl p-4 sm:p-6 mb-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-32 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-4 sm:p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-24 mx-auto mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="h-12 bg-gray-300 rounded-full w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
