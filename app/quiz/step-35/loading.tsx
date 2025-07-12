import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Logo Skeleton */}
      <div className="mb-8">
        <Skeleton className="w-12 h-12 rounded-lg" />
      </div>

      {/* Title Skeleton */}
      <div className="text-center mb-12 space-y-2">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-8 w-80 mx-auto" />
        <Skeleton className="h-8 w-72 mx-auto" />
      </div>

      {/* Loading Steps Skeleton */}
      <div className="w-full max-w-md space-y-8 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Skeleton */}
      <div className="w-full max-w-md">
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  )
}
