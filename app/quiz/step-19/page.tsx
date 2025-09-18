"use client"

import { useState, Suspense } from "react"
import {
  ArrowLeft,
  BatteryCharging,
  Brain,
  Frown,
  MessageCircleQuestion,
  Sparkles,
  ThumbsUp,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"

function Step19Content() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
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
  const overwhelmed = searchParams.get("overwhelmed") || ""
  const decision = searchParams.get("decision") || ""
  const ambitions = searchParams.get("ambitions") || ""
  const compliments = searchParams.get("compliments") || ""
  const insecure = searchParams.get("insecure") || ""
  const overthinkPartner = searchParams.get("overthinkPartner") || ""
  const prioritizeOthers = searchParams.get("prioritizeOthers") || ""
  const motivated = searchParams.get("motivated") || ""

  const handleOptionToggle = (optionText: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(optionText)
        ? prevSelected.filter((item) => item !== optionText)
        : [...prevSelected, optionText],
    )
  }

  const handleContinue = () => {
    const selectedAspects = selectedOptions.join(",")
    router.push(
      `/quiz/step-20?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}&overwhelmed=${overwhelmed}&decision=${decision}&ambitions=${ambitions}&compliments=${compliments}&insecure=${insecure}&overthinkPartner=${overthinkPartner}&prioritizeOthers=${prioritizeOthers}&motivated=${motivated}&aspects=${selectedAspects}`,
    )
  }

  const options = [
    { text: "Low energy", icon: BatteryCharging },
    { text: "Worry", icon: Brain },
    { text: "Emotional exhaustion", icon: Frown },
    { text: "Overthinking", icon: MessageCircleQuestion },
    { text: "Irritability", icon: Sparkles },
    { text: "I'm totally fine", icon: ThumbsUp },
  ]

  return (
    <QuizLayout step={16} totalSteps={26}>
      {" "}
      {/* Usar QuizLayout para a barra de progresso, agora na etapa 16/26 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link
          href={`/quiz/step-18?gender=${gender}&age=${age}&tiredness=${tiredness}&lastMinute=${lastMinute}&distraction=${distraction}&worried=${worried}&moodSwings=${moodSwings}&harmony=${harmony}&emotions=${emotions}&overwhelmed=${overwhelmed}&decision=${decision}&ambitions=${ambitions}&compliments=${compliments}&insecure=${insecure}&overthinkPartner=${overthinkPartner}&prioritizeOthers=${prioritizeOthers}&motivated=${motivated}`}
          className="p-2"
        >
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">{/* Ícone central pode ser adicionado aqui se necessário */}</div>
        <span className="text-gray-600 text-sm font-medium">16/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Are there aspects of your well-being you'd
            <br />
            like to address?
          </h1>
          <p className="text-gray-600 text-base">Choose all that apply</p>
        </div>
        <div className="w-full max-w-md space-y-4 mb-8">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedOptions.includes(option.text)
            return (
              <button
                key={option.text}
                onClick={() => handleOptionToggle(option.text)}
                className={`w-full p-4 text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 flex items-center justify-between gap-4 ${
                  isSelected
                    ? "border-teal-500 bg-white text-gray-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className={`w-6 h-6 ${isSelected ? "text-teal-500" : "text-gray-400"}`} />
                  <span>{option.text}</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-teal-500 bg-teal-500" : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            )
          })}
        </div>
        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-full text-lg transition-colors"
        >
          Continue
        </button>
      </main>
    </QuizLayout>
  )
}

export default function Step19() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step19Content />
    </Suspense>
  )
}
