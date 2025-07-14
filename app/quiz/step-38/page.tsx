"use client"

import { Suspense, useEffect, useState, useRef, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// --- Helper function to create a smooth SVG path ---
const createSvgPath = (points, smoothing, dimensions) => {
  if (points.length === 0) return ""

  const svgPoints = points.map((point) => ({
    x: ((point.week - 1) / (points.length - 1)) * dimensions.width,
    y: dimensions.height - (point.value / 100) * dimensions.height,
  }))

  const line = (pointA, pointB) => {
    const lengthX = pointB.x - pointA.x
    const x1 = pointA.x + lengthX * smoothing
    const y1 = pointA.y
    const x2 = pointB.x - lengthX * smoothing
    const y2 = pointB.y
    return `C ${x1},${y1} ${x2},${y2} ${pointB.x},${pointB.y}`
  }

  const pathParts = svgPoints.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`
    return `${acc} ${line(a[i - 1], point)}`
  }, "")

  return pathParts
}

// --- The Dynamic Chart Component ---
function WellbeingChart() {
  const [isAnimated, setIsAnimated] = useState(false)
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)

  const chartData = [
    { week: 1, value: 15, label: "Today" },
    { week: 2, value: 35 },
    { week: 3, value: 75 },
    { week: 4, value: 85 },
  ]
  const dimensions = { width: 500, height: 180 }

  const pathD = useMemo(() => createSvgPath(chartData, 0.2, dimensions), [chartData])
  const areaPathD = `${pathD} V ${dimensions.height} H 0 Z`

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
    const timer = setTimeout(() => setIsAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [pathD])

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-8">Your Well-being level</h2>

      <div className="relative w-full" style={{ height: `${dimensions.height}px` }}>
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-dashed border-gray-200"
              style={{ bottom: `${(dimensions.height / 5) * (i + 1)}px`, left: 0 }}
            ></div>
          ))}
        </div>

        {/* SVG for Gradient Fill and Animated Line */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "rgba(239, 68, 68, 0.1)", stopOpacity: 1 }} />
              <stop offset="33%" style={{ stopColor: "rgba(249, 115, 22, 0.15)", stopOpacity: 1 }} />
              <stop offset="66%" style={{ stopColor: "rgba(234, 179, 8, 0.2)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgba(34, 197, 94, 0.25)", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d={areaPathD}
            fill="url(#areaGradient)"
            className={`transition-opacity duration-1000 ease-in-out ${isAnimated ? "opacity-100" : "opacity-0"}`}
          />
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isAnimated ? 0 : pathLength,
              transition: "stroke-dashoffset 2s ease-in-out",
            }}
          />
        </svg>

        {/* Data Points and Labels */}
        <div className="absolute inset-0">
          {chartData.map((point, index) => {
            const pointColors = ["bg-red-500", "bg-orange-400", "bg-yellow-500", "bg-green-500"]
            const leftPercentage = ((point.week - 1) / (chartData.length - 1)) * 100
            const bottomPercentage = (point.value / 100) * 100

            return (
              <div
                key={point.week}
                className="absolute"
                style={{
                  left: `${leftPercentage}%`,
                  bottom: `${bottomPercentage}%`,
                  transform: "translate(-50%, 50%)",
                }}
              >
                <div
                  className={`w-5 h-5 rounded-full border-4 border-white ring-1 ring-gray-200 shadow-md transition-all duration-1000 ease-out ${pointColors[index]}`}
                  style={{ transform: isAnimated ? "scale(1)" : "scale(0)", transitionDelay: `${index * 200 + 500}ms` }}
                >
                  {point.label === "Today" && (
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md shadow-lg whitespace-nowrap transition-all duration-500 ease-out ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                      style={{ transitionDelay: "700ms" }}
                    >
                      Today
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-red-500"></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <div
            className={`absolute px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md shadow-lg transition-all duration-700 ease-out ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ right: "0%", top: "-35px", transform: "translateX(10px)", transitionDelay: "1800ms" }}
          >
            After using Liven
            <div className="absolute top-full right-[15px] w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-green-500"></div>
          </div>
        </div>
      </div>

      {/* X-Axis */}
      <div className="relative w-full border-t border-gray-200 pt-3 mt-4">
        <div className="flex justify-between">
          {chartData.map((point) => (
            <div key={point.week} className="text-xs text-gray-500 font-medium uppercase">
              WEEK {point.week}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        The chart is a non-customized illustration and results may vary
      </p>
    </div>
  )
}

// --- The Main Page Content Component ---
function Step38Content() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "User"

  const handleContinue = () => {
    const currentParams = new URLSearchParams(searchParams.toString())
    router.push(`/quiz/step-39?${currentParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-8">
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">{name},</h1>
          <div className="text-xl text-gray-800">
            Your personal <span className="text-green-600 font-semibold">Well-being Management Plan</span>
            <br />
            is ready!
          </div>
        </div>

        {/* Chart Section */}
        <WellbeingChart />

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-medium transition-colors"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

// --- The Export and Suspense Wrapper ---
export default function Step38() {
  return (
    <Suspense fallback={<Step38Loading />}>
      <Step38Content />
    </Suspense>
  )
}

// --- The Loading Skeleton Component ---
function Step38Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8">
        <Skeleton className="w-12 h-12 rounded-lg mx-auto" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-6 w-80 mx-auto" />
          <Skeleton className="h-6 w-24 mx-auto" />
        </div>
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <Skeleton className="h-6 w-48 mx-auto mb-8" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <Skeleton className="h-12 w-full max-w-md mx-auto rounded-full" />
      </div>
    </div>
  )
}
