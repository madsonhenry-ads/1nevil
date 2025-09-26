import { Skeleton } from "@/components/ui/skeleton"

export default function EmailLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#f5f3f0" }}>
      {/* Header Skeleton */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white shadow-sm">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      {/* Progress Bar Skeleton */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-2 bg-white">
        <Skeleton className="w-full h-1.5 rounded-full" />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>

            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
