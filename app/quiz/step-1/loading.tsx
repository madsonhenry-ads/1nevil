export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      {/* Header Skeleton */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center flex-shrink-0">
        <div className="w-10"></div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-10"></div>
      </header>

      {/* Progress Bar Skeleton */}
      <div className="w-full px-4 sm:px-6 mb-4 flex-shrink-0">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-gray-300 h-1.5 rounded-full w-1/26 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-8 sm:space-y-12">
          {/* Title Skeleton */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="h-8 sm:h-10 bg-gray-300 rounded-lg animate-pulse mx-auto w-3/4"></div>
          </div>

          {/* Gender Options Skeleton */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
            <div className="min-h-[120px] sm:min-h-[140px] bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="min-h-[120px] sm:min-h-[140px] bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
