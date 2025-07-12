"use client"

import { useState, Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Wrap the existing component content in Step2Content function
function Step2Content() {
  const [selectedAge, setSelectedAge] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "male"

  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age)
    setTimeout(() => {
      router.push(`/quiz/step-3?gender=${gender}&age=${age}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Custom header for quiz pages */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link href="/" className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">What's your age?</h1>

          <p className="text-gray-600 text-base">We only use your age to personalize your plan</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => handleAgeSelect(age)}
              className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 ${
                selectedAge === age
                  ? "border-teal-500 bg-white text-gray-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

// Update the default export
export default function Step2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step2Content />
    </Suspense>
  )
}
