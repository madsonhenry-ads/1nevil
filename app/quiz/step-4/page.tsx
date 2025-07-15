"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function Step4Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      router.push(`/quiz/step-5?gender=${gender}&age=${age}&tiredness=${option}`)
    }, 500)
  }

  const options = [
    { text: "Often", icon: Check },
    { text: "Sometimes", icon: HelpCircle },
    { text: "Rarely", icon: CircleOff },
  ]

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-green-600 h-1 transition-all duration-300" style={{ width: `${(1 / 26) * 100}%` }} />
      </div>

      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <Link href={`/quiz/step-3?gender=${gender}&age=${age}`} className="p-2">
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
        <span className="text-gray-600 text-sm font-medium">1/26</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 w-full max-w-4xl">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 px-2 leading-tight">
            How often do you feel tired or lack energy,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            even after rest?
          </h1>
        </div>

        <div className="w-full max-w-md px-2">
          <div className="space-y-3 sm:space-y-4">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.text}
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-3 sm:p-4 text-left text-base sm:text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                    selectedOption === option.text
                      ? "border-teal-500 bg-white text-gray-800"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${selectedOption === option.text ? "text-teal-500" : "text-gray-400"}`}
                  />
                  <span>{option.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step4() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step4Content />
    </Suspense>
  )
}
