"use client"

import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function Step2Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

  const handleAgeSelect = (age: string) => {
    const ageForUrl = age === "65+" ? "65" : age
    const params = new URLSearchParams(searchParams)
    params.set("age", ageForUrl)
    router.push(`/quiz/step-3?${params.toString()}`)
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-green-600 h-1 transition-all duration-300" style={{ width: `${(2 / 26) * 100}%` }} />
      </div>

      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <Link href={`/quiz/step-1?${query}`} className="p-2">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2"></div>
        <span className="text-gray-600 text-sm font-medium">2/26</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 w-full max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 px-2">What's your age?</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
            This helps us personalize your experience
          </p>
        </div>

        <div className="w-full max-w-md px-2">
          <div className="space-y-3 sm:space-y-4">
            {ageRanges.map((age) => (
              <button
                key={age}
                onClick={() => handleAgeSelect(age)}
                className="w-full p-3 sm:p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-gray-800 font-medium text-sm sm:text-base md:text-lg"
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step2Content />
    </Suspense>
  )
}
