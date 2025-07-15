"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function Step8Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Reúne todos os parâmetros da URL para evitar repetição
  const urlParams = {
    gender: searchParams.get("gender") || "male",
    age: searchParams.get("age") || "",
    tiredness: searchParams.get("tiredness") || "",
    lastMinute: searchParams.get("lastMinute") || "",
    distraction: searchParams.get("distraction") || "",
    worried: searchParams.get("worried") || "",
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      // Cria a nova query string de forma mais limpa
      const nextParams = new URLSearchParams({
        ...urlParams,
        moodSwings: option,
      })
      router.push(`/quiz/step-9?${nextParams.toString()}`)
    }, 500)
  }

  const options = [
    { text: "Often", icon: Check },
    { text: "Sometimes", icon: HelpCircle },
    { text: "Rarely", icon: CircleOff },
  ]

  // Constrói o link de volta de forma dinâmica
  const backLinkHref = `/quiz/step-7?${new URLSearchParams(urlParams).toString()}`

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 h-1.5 flex-shrink-0">
        <div className="bg-green-600 h-1.5 transition-all duration-300" style={{ width: `${(5 / 26) * 100}%` }} />
      </div>

      {/* Header com separador visual */}
      <header className="w-full px-4 py-3 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0 border-b border-gray-200">
        <Link href={backLinkHref} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
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
        <span className="text-gray-600 text-xs sm:text-sm font-medium">5/26</span>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight px-2">
              How often do you experience mood
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              swings?
            </h1>
          </div>

          <div className="w-full max-w-md space-y-3 sm:space-y-4">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.text}
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-4 sm:p-6 text-left text-base sm:text-lg font-medium rounded-xl border-2 transition-all duration-200 flex items-center gap-4 min-h-[60px] sm:min-h-[70px] ${
                    selectedOption === option.text
                      ? "border-teal-500 bg-white text-gray-800 shadow-lg scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 flex-shrink-0 ${selectedOption === option.text ? "text-teal-500" : "text-gray-400"}`}
                  />
                  <span className="flex-1">{option.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step8() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center text-gray-500">Loading...</div>
      }
    >
      <Step8Content />
    </Suspense>
  )
}
