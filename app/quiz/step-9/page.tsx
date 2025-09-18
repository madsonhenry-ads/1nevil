"use client"

import { useState, Suspense } from "react"
import { ArrowLeft, Check, HelpCircle, CircleOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout" // 1. Importando o layout padrão

function Step9Content() {
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
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      // Adiciona o novo parâmetro e navega para a próxima etapa
      const nextParams = new URLSearchParams({
        ...urlParams,
        harmony: option,
      })
      router.push(`/quiz/step-10?${nextParams.toString()}`)
    }, 500)
  }

  const options = [
    { text: "Yes", icon: Check },
    { text: "Moderately", icon: HelpCircle },
    { text: "No", icon: CircleOff },
  ]

  // Constrói o link de "voltar" dinamicamente
  const backLinkHref = `/quiz/step-8?${new URLSearchParams(urlParams).toString()}`

  return (
    // 2. Usando o QuizLayout para manter a consistência do design
    <QuizLayout step={6} totalSteps={26}>
      
      {/* 3. Header padronizado, idêntico ao das etapas anteriores */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={backLinkHref} className="p-2">
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
        <span className="text-gray-600 text-sm font-medium">6/26</span> {/* Etapa atualizada */}
      </header>

      {/* 4. 'main' com a estrutura e espaçamento padronizados */}
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        
        {/* Título com estilo padronizado */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            Have you felt in harmony with yourself and
            <br className="hidden sm:block" /> your circle in recent months?
          </h1>
        </div>
        
        {/* 5. Opções com botões de estilo padronizado */}
        <div className="w-full max-w-md space-y-4">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.text}
                onClick={() => handleOptionSelect(option.text)}
                // Classes de estilo EXATAMENTE iguais às das etapas anteriores
                className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === option.text
                    ? "border-teal-500 bg-white text-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-6 h-6 flex-shrink-0 ${
                    selectedOption === option.text ? "text-teal-500" : "text-gray-400"
                  }`}
                />
                <span>{option.text}</span>
              </button>
            )
          })}
        </div>
      </main>
    </QuizLayout>
  )
}

export default function Step9() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f3f0] flex items-center justify-center text-gray-500">Loading...</div>
      }
    >
      <Step9Content />
    </Suspense>
  )
}
