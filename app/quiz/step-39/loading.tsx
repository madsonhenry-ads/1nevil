import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="bg-[#F9F9F7] min-h-screen">
      <header className="py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-16 h-6" />
          </div>
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Before/After Comparison Skeleton */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="text-center mb-6">
              <Skeleton className="w-16 h-6 mx-auto mb-4" />
              <Skeleton className="w-48 h-48 mx-auto mb-4" />
            </div>
            <div className="space-y-4">
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center mb-6">
              <Skeleton className="w-20 h-6 mx-auto mb-4" />
              <Skeleton className="w-48 h-48 mx-auto mb-4" />
            </div>
            <div className="space-y-4">
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
              <div>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="w-96 h-8 mx-auto mb-3" />
          <Skeleton className="w-80 h-4 mx-auto" />
        </div>

        {/* Pricing Skeleton */}
        <div className="space-y-4 mb-6">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>

        <Skeleton className="w-full h-12 rounded-full" />
      </main>
    </div>
  )
}
