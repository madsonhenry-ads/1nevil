export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-green-600 h-1 w-[4%]" />
      </div>

      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-[#f5f3f0]">
        <div className="p-2"></div>
        <div className="flex items-center gap-2"></div>
        <span className="text-gray-600 text-sm font-medium">1/26</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 w-full max-w-4xl">
          <div className="h-8 sm:h-10 md:h-12 bg-gray-300 rounded animate-pulse mx-auto w-3/4"></div>
          <div className="h-6 sm:h-7 bg-gray-300 rounded animate-pulse mx-auto w-1/2"></div>
        </div>

        <div className="w-full max-w-2xl px-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="p-4 sm:p-6 md:p-8 bg-gray-300 rounded-xl animate-pulse min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"></div>
            <div className="p-4 sm:p-6 md:p-8 bg-gray-300 rounded-xl animate-pulse min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
