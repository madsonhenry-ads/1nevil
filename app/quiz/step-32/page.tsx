"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"

function Step32Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      router.push(`/quiz/step-33?${query}&dailyGoal=${option}`)
    }, 300)
  }

  const options = [
    { text: "5 min/day", icon: Clock },
    { text: "10 min/day", icon: Clock },
    { text: "15 min/day", icon: Clock },
    { text: "20 min/day", icon: Clock },
  ]

  return (
    <QuizLayout step={26} totalSteps={26}>
      {" "}
      {/* Usar QuizLayout para a barra de progresso, mantendo 26/26 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-31?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">{/* Ícone central pode ser adicionado aqui se necessário */}</div>
        <span className="text-gray-600 text-sm font-medium">26/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Set your daily goal</h1>
          <p className="text-gray-600 text-base">Pick the amount of time you want to spend on self-development daily</p>
        </div>
        <div className="w-full max-w-md space-y-4">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.text}
                onClick={() => handleOptionSelect(option.text)}
                className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === option.text
                    ? "border-teal-500 bg-white text-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-6 h-6 ${selectedOption === option.text ? "text-teal-500" : "text-gray-400"}`} />
                <span>{option.text}</span>
              </button>
            )
          })}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step32() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step32Content />
    </Suspense>
  )
}
