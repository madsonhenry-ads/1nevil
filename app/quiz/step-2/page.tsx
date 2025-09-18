"use client"

import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"

function Step2Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]

  const handleAgeSelect = (age: string) => {
    // Mapeia "65+" para "65" na URL
    const ageForUrl = age === "65+" ? "65" : age
    const params = new URLSearchParams(searchParams)
    params.set("age", ageForUrl)
    router.push(`/quiz/step-3?${params.toString()}`)
  }

  return (
    <QuizLayout step={2} totalSteps={26}>
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-1?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2"></div>
        <span className="text-gray-600 text-sm font-medium">2/26</span>
      </header>

      {/* --- ALTERAÇÃO AQUI --- */}
      {/* Trocamos 'py-12' (padding vertical) por 'pt-8 pb-12' para reduzir o padding superior */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">What's your age?</h1>
          <p className="text-gray-600 text-lg">This helps us personalize your experience</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => handleAgeSelect(age)}
              className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-gray-800 font-medium"
            >
              {age}
            </button>
          ))}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step2() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step2Content />
    </Suspense>
  )
}
