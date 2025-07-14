import { Skeleton } from "@/components/ui/skeleton"

export default function Step38Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        {/* Logo Skeleton */}
        <Skeleton className="w-12 h-12 rounded-lg mx-auto" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
          <Skeleton className="h-6 w-24 mx-auto" />
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <Skeleton className="h-6 w-48 mx-auto mb-8" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-12 w-full max-w-md mx-auto rounded-full" />
      </div>
    </div>
  )
}
