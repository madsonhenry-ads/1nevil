"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { ArrowLeft, ThumbsDown, ThumbsUp, HelpCircle, XCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout" // 1. Importando o layout padrão

function Step11Content() {
  const [selectedOption, setSelectedOption] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Reúne todos os parâmetros da URL para passar adiante de forma limpa
  const urlParams = {
    gender: searchParams.get("gender") || "",
    age: searchParams.get("age") || "",
    tiredness: searchParams.get("tiredness") || "",
    lastMinute: searchParams.get("lastMinute") || "",
    distraction: searchParams.get("distraction") || "",
    worried: searchParams.get("worried") || "",
    moodSwings: searchParams.get("moodSwings") || "",
    harmony: searchParams.get("harmony") || "",
    emotions: searchParams.get("emotions") || "",
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      // Adiciona o novo parâmetro e navega para a próxima etapa
      const nextParams = new URLSearchParams({
        ...urlParams,
        overwhelmed: option,
      })
      router.push(`/quiz/step-12?${nextParams.toString()}`)
    }, 500)
  }

  const options = [
    { value: "strongly-disagree", icon: ThumbsDown, label: "Strongly disagree", iconModifier: XCircle },
    { value: "disagree", icon: ThumbsDown, label: "" },
    { value: "neutral", icon: HelpCircle, label: "" },
    { value: "agree", icon: ThumbsUp, label: "" },
    { value: "strongly-agree", icon: ThumbsUp, label: "Strongly agree", iconModifier: Sparkles },
  ]

  // Constrói o link de "voltar" dinamicamente
  const backLinkHref = `/quiz/step-10?${new URLSearchParams(urlParams).toString()}`

  return (
    // 2. Usando o QuizLayout para manter a consistência do design
    <QuizLayout step={8} totalSteps={26}>
      
      {/* 3. Header padronizado, idêntico ao das etapas anteriores */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={backLinkHref} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          {/* Ícone central padrão, se houver */}
        </div>
        <span className="text-gray-600 text-sm font-medium">8/26</span> {/* Etapa atualizada */}
      </header>

      {/* 4. 'main' com a estrutura e espaçamento padronizados */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        
        {/* Título com estilo padronizado */}
        <div className="text-center space-y-3 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            I often feel overwhelmed by the amount of tasks I have to do
          </h1>
          <p className="text-gray-600">Do you agree with the following statement?</p>
        </div>
        
        {/* 5. A escala de avaliação com estilos unificados */}
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-between items-start gap-2 sm:gap-4">
            {options.map((option) => {
              const Icon = option.icon
              const IconModifier = option.iconModifier
              const isSelected = selectedOption === option.value

              return (
                <div key={option.value} className="flex flex-col items-center gap-2 flex-1 text-center">
                  <button
                    onClick={() => handleOptionSelect(option.value)}
                    // Estilos do botão unificados com o padrão da Step10
                    className={`flex items-center justify-center rounded-xl border-2 transition-all duration-200 w-14 h-14 sm:w-16 sm:h-16 relative ${
                      isSelected
                        ? "border-teal-500 bg-white scale-105"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                    />
                    {IconModifier && (
                      <IconModifier
                        className={`absolute ${
                          option.value === "strongly-disagree" ? "top-1 left-1" : "bottom-1 right-1"
                        } w-4 h-4 ${isSelected ? "text-teal-500" : "text-gray-400"}`}
                      />
                    )}
                  </button>
                  {option.label && (
                    <span className="text-xs sm:text-sm font-medium text-gray-600 min-h-[40px] flex items-center leading-tight">
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
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#f5f3f0] flex items-center justify-center text-gray-500">Loading...</div>
      }
    >
      <Step11Content />
    </Suspense>
  )
}
