"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Assumindo que QuizLayout é um componente que você já tem
// import { QuizLayout } from "@/components/quiz-layout"; 

// Mock do QuizLayout para o exemplo funcionar de forma independente
const QuizLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

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
    }, 300) // Diminuí o tempo para uma transição mais rápida
  }

  const options = [
    { value: "strongly-disagree", icon: ThumbsDown, label: "Strongly disagree", iconModifier: XCircle },
    { value: "disagree", icon: ThumbsDown, label: "" },
    { value: "neutral", icon: HelpCircle, label: "" },
    { value: "agree", icon: ThumbsUp, label: "" },
    { value: "strongly-agree", icon: ThumbsUp, label: "Strongly agree", iconModifier: Sparkles },
  ]

  return (
    <QuizLayout>
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link
          href={`/quiz/step-9?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}`}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          {/* Ícone central pode ser adicionado aqui se necessário */}
        </div>
        <span className="text-gray-600 text-sm font-medium">7/26</span>
      </header>
      
      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto min-h-screen">
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">It's difficult for me to express emotions</h1>
          <p className="text-gray-600 text-base">Do you agree with the following statement?</p>
        </div>

        {/* --- CORREÇÃO APLICADA AQUI --- */}
        <div className="w-full max-w-lg flex justify-between items-start mt-8">
          {options.map((option) => {
            const Icon = option.icon
            const IconModifier = option.iconModifier
            const isSelected = selectedOption === option.value
            
            return (
              // 1. Novo container para agrupar o botão e o rótulo
              <div key={option.value} className="flex flex-col items-center gap-2 w-20 text-center">
                <button
                  onClick={() => handleOptionSelect(option.value)}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 w-20 h-20 relative ${
                    isSelected
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                  />
                  {IconModifier && (
                    <IconModifier
                      className={`absolute ${
                        option.value === "strongly-disagree" ? "top-1 left-1" : "bottom-1 right-1"
                      } w-4 h-4 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                    />
                  )}
                </button>
                
                {/* 2. O rótulo agora fica FORA do botão, mas dentro do container do grupo */}
                {option.label && (
                  <span className="text-xs font-medium text-gray-600 h-8 flex items-center">
                    {option.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step10() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step10Content />
    </Suspense>
  )
}
