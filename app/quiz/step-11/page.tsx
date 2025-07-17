"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Mock do QuizLayout para o exemplo funcionar de forma independente.
// No seu projeto real, você pode remover isso e usar o seu import.
const QuizLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">{children}</div>
)

function Step11Content() {
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
  const emotions = searchParams.get("emotions") || ""

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      router.push(
        `/quiz/step-12?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}&overwhelmed=${option}`,
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

  // Cálculo da porcentagem de progresso (step 8 de 26)
  const progressPercentage = (8 / 26) * 100

  return (
    <QuizLayout>
      {/* Header: Estrutura correta, em fluxo e com classes responsivas */}
      <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center bg-[#f5f3f0] flex-shrink-0">
        <Link
          href={`/quiz/step-10?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}`}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black flex-shrink-0" />
        </Link>
        <span className="text-gray-600 text-xs sm:text-sm font-medium">8/26</span>
      </header>

      {/* Progress Bar: Em fluxo, abaixo do header */}
      <div className="w-full bg-gray-200 h-1.5 flex-shrink-0">
        <div
          className="bg-teal-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content: Usa flex-1 para ocupar o espaço restante, centralizando o conteúdo */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
          {/* Título: Usa classes responsivas para a fonte e sem <br /> forçado */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight px-2">
            I often feel overwhelmed by the amount of tasks I have to do
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-2">
            Do you agree with the following statement?
          </p>
        </div>

        {/* Rating Scale: Estrutura totalmente responsiva */}
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            {options.map((option) => {
              const Icon = option.icon
              const IconModifier = option.iconModifier
              const isSelected = selectedOption === option.value

              return (
                // CORREÇÃO CRÍTICA: flex-1 permite que os itens se expandam para preencher o espaço
                <div
                  key={option.value}
                  className="flex flex-col items-center gap-2 flex-1 max-w-[70px] sm:max-w-[80px] text-center"
                >
                  <button
                    onClick={() => handleOptionSelect(option.value)}
                    // CORREÇÃO: Tamanhos responsivos para os botões e ícones
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

                  {/* Label: Com altura mínima para evitar pulos no layout */}
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

export default function Step11() {
  return (
    // Fallback melhorado, como no primeiro exemplo
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
      <Step11Content />
    </Suspense>
  )
}
