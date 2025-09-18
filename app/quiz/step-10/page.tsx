"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Mock do QuizLayout para o exemplo funcionar de forma independente
const QuizLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">{children}</div>
)

function Step10Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Pega os parâmetros da URL
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""
  const tiredness = searchParams.get("tiredness") || ""
  const lastMinute = searchParams.get("lastMinute") || ""
  const distraction = searchParams.get("distraction") || ""
  const worried = searchParams.get("worried") || ""
  const moodSwings = searchParams.get("moodSwings") || ""
  const harmony = searchParams.get("harmony") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      router.push(
        `/quiz/step-11?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${option}`,
      )
    }, 300)
  }

  const options = [
    { value: "strongly-disagree", icon: ThumbsDown, label: "Strongly disagree", iconModifier: XCircle },
    { value: "disagree", icon: ThumbsDown, label: "" },
    { value: "neutral", icon: HelpCircle, label: "" },
    { value: "agree", icon: ThumbsUp, label: "" },
    { value: "strongly-agree", icon: ThumbsUp, label: "Strongly agree", iconModifier: Sparkles },
  ]

  // Cálculo da porcentagem de progresso (step 10 de 26)
  const progressPercentage = (7 / 26) * 100

  return (
    <QuizLayout>
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <Link
          href={`/quiz/step-9?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}`}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />
        </Link>

        <div className="flex items-center gap-2">{/* Logo ou ícone central pode ser adicionado aqui */}</div>

        <span className="text-gray-600 text-xs sm:text-sm font-medium">7/26</span>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1.5 flex-shrink-0">
        <div
          className="bg-teal-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="w-full max-w-2xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight px-2">
            It's difficult for me to express emotions
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">
            Do you agree with the following statement?
          </p>
        </div>

        {/* Rating Scale */}
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            {options.map((option) => {
              const Icon = option.icon
              const IconModifier = option.iconModifier
              const isSelected = selectedOption === option.value

              return (
                <div
                  key={option.value}
                  className="flex flex-col items-center gap-2 flex-1 max-w-[70px] sm:max-w-[80px] text-center"
                >
                  <button
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex items-center justify-center rounded-xl border-2 transition-all duration-200 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative ${
                      isSelected
                        ? "border-teal-500 bg-teal-50 scale-105 shadow-lg"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0 ${
                        isSelected ? "text-teal-500" : "text-gray-400"
                      }`}
                    />
                    {IconModifier && (
                      <IconModifier
                        className={`absolute ${
                          option.value === "strongly-disagree" ? "top-1 left-1" : "bottom-1 right-1"
                        } w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                      />
                    )}
                  </button>

                  {/* Label */}
                  {option.label && (
                    <span className="text-xs sm:text-sm font-medium text-gray-600 min-h-[32px] sm:min-h-[36px] flex items-center leading-tight">
                      {option.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step10() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#f5f3f0] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <Step10Content />
    </Suspense>
  )
}
