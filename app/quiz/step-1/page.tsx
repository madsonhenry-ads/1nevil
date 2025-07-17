"use client"

import { useRouter } from "next/navigation"
import { Suspense } from "react"

function Step1Content() {
  const router = useRouter()

  const handleGenderSelect = (gender: string) => {
    router.push(`/quiz/step-2?gender=${gender}`)
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center flex-shrink-0">
        <div className="w-10"></div> {/* Spacer for centering */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      {/* Progress Bar */}
      <div className="w-full px-4 sm:px-6 mb-4 flex-shrink-0">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(1 / 26) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md space-y-8 sm:space-y-12">
          {/* Title */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-2">
              What's your gender?
            </h1>
          </div>

          {/* Gender Options */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
            {/* Male Option */}
            <button
              onClick={() => handleGenderSelect("male")}
              className="min-h-[120px] sm:min-h-[140px] bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 group"
            >
              <div className="text-4xl sm:text-5xl">👨</div>
              <span className="text-lg sm:text-xl font-medium text-gray-900 group-hover:text-blue-600">Male</span>
            </button>

            {/* Female Option */}
            <button
              onClick={() => handleGenderSelect("female")}
              className="min-h-[120px] sm:min-h-[140px] bg-white rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 group"
            >
              <div className="text-4xl sm:text-5xl">👩</div>
              <span className="text-lg sm:text-xl font-medium text-gray-900 group-hover:text-pink-600">Female</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step1() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#f5f3f0] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      }
    >
      <Step1Content />
    </Suspense>
  )
}
