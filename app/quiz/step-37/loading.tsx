import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo skeleton */}
        <div className="flex justify-center">
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>

        {/* Title skeleton */}
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-80 mx-auto" />
        </div>

        {/* Form skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
