"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"

function Step1Content() {
  const router = useRouter()

  const handleGenderSelect = (gender: string) => {
    router.push(`/quiz/step-2?gender=${gender}`)
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-green-600 h-1 transition-all duration-300" style={{ width: `${(1 / 26) * 100}%` }} />
      </div>

      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <div className="p-2">{/* Empty space for back button alignment */}</div>
        <div className="flex items-center gap-2"></div>
        <span className="text-gray-600 text-sm font-medium">1/26</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 w-full max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 px-2">
            What's your gender?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
            This helps us personalize your experience
          </p>
        </div>

        <div className="w-full max-w-2xl px-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <button
              onClick={() => handleGenderSelect("male")}
              className="group relative p-4 sm:p-6 md:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center w-full"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3">👨</div>
              <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                Male
              </span>
            </button>

            <button
              onClick={() => handleGenderSelect("female")}
              className="group relative p-4 sm:p-6 md:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 text-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col items-center justify-center w-full"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3">👩</div>
              <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 group-hover:text-pink-600">
                Female
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step1() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step1Content />
    </Suspense>
  )
}
