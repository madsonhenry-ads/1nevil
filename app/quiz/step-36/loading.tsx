import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>

        {/* Title skeletons */}
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-8 w-80 mx-auto" />
        </div>

        {/* Form skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="flex items-start space-x-3">
            <Skeleton className="w-4 h-4 mt-0.5" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
