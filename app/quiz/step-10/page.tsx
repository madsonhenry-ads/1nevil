"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function Step10Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
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

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 flex-shrink-0">
        <div className="bg-green-600 h-1 transition-all duration-300" style={{ width: `${(7 / 26) * 100}%` }} />
      </div>

      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <Link
          href={`/quiz/step-9?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}`}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <span className="text-gray-600 text-xs sm:text-sm font-medium">7/26</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-12 w-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-0 flex-1">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight px-2">
              It's difficult for me to express emotions
            </h1>
            <p className="text-gray-600 text-sm sm:text-base px-2">Do you agree with the following statement?</p>
          </div>

          {/* Rating Scale */}
          <div className="w-full max-w-lg flex justify-between items-start gap-2 sm:gap-4">
            {options.map((option) => {
              const Icon = option.icon
              const IconModifier = option.iconModifier
              const isSelected = selectedOption === option.value

              return (
                <div key={option.value} className="flex flex-col items-center gap-2 flex-1 text-center">
                  <button
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex items-center justify-center p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative ${
                      isSelected
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                    />
                    {IconModifier && (
                      <IconModifier
                        className={`absolute ${
                          option.value === "strongly-disagree"
                            ? "top-0.5 left-0.5 sm:top-1 sm:left-1"
                            : "bottom-0.5 right-0.5 sm:bottom-1 sm:right-1"
                        } w-3 h-3 sm:w-4 sm:h-4 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                      />
                    )}
                  </button>

                  {option.label && (
                    <span className="text-xs sm:text-sm font-medium text-gray-600 h-6 sm:h-8 flex items-center leading-tight">
                      {option.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step10() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center">Loading...</div>}>
      <Step10Content />
    </Suspense>
  )
}
