import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <div className="flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto">
        {/* Logo skeleton */}
        <Skeleton className="w-12 h-12 rounded-lg mb-8" />

        {/* Title skeleton */}
        <Skeleton className="h-8 w-80 mb-4" />

        {/* Subtitle skeleton */}
        <Skeleton className="h-4 w-64 mb-2" />

        {/* Date skeleton */}
        <Skeleton className="h-6 w-32 mb-12" />

        {/* Chart skeleton */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-end justify-center space-x-4 h-48 mb-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} className="w-16 h-20" />
            ))}
          </div>

          {/* Month labels skeleton */}
          <div className="flex justify-center space-x-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Skeleton key={index} className="w-16 h-4" />
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <Skeleton className="w-full max-w-md h-12 rounded-full" />
      </div>
    </div>
  )
}
