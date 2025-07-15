import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="bg-[#F9F9F7] font-sans text-gray-800 min-h-screen">
      <header className="py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-16 h-8" />
          </div>
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Discount Banner Skeleton */}
        <Card className="mb-8 p-6">
          <div className="text-center space-y-4">
            <Skeleton className="w-40 h-6 mx-auto" />
            <Skeleton className="w-80 h-8 mx-auto" />
            <Skeleton className="w-60 h-6 mx-auto" />
            <Skeleton className="w-24 h-8 mx-auto" />
          </div>
        </Card>

        {/* Before/After Comparison Skeleton */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="text-center mb-8">
              <Skeleton className="w-16 h-6 mx-auto mb-4" />
              <Skeleton className="w-48 h-48 mx-auto rounded-lg mb-4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center mb-8">
              <Skeleton className="w-20 h-6 mx-auto mb-4" />
              <Skeleton className="w-48 h-48 mx-auto rounded-lg mb-4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </Card>
        </div>

        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="w-96 h-8 mx-auto mb-3" />
          <div className="flex items-center justify-center space-x-4">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-px h-4" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>

        {/* Pricing Skeleton */}
        <div className="space-y-4 mb-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div>
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                </div>
                <Skeleton className="w-20 h-12 rounded-md" />
              </div>
            </Card>
          ))}
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-14 rounded-full" />
      </main>
    </div>
  )
}
