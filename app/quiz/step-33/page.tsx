"use client"

import { Suspense } from "react"
import { ArrowLeft, BatteryCharging, Calendar, Zap, Info } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"
import Image from "next/image"

function Step33Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  // Pega o gênero para a imagem do perfil
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || "18-24"

  const getProfileImage = (gender: string, age: string) => {
    let ageRangeSuffix = ""
    if (age === "18-24") ageRangeSuffix = "18-24"
    else if (age === "25-34") ageRangeSuffix = "25-34"
    else if (age === "35-44" || age === "45-54")
      ageRangeSuffix = "35-54" // Mapeia para a faixa 35-54
    else if (age === "55-64" || age === "65+") ageRangeSuffix = "55-65" // Mapeia para a faixa 55-65

    if (gender === "female") {
      return `/images/female-${ageRangeSuffix}-bad.avif`
    } else {
      return `/images/male-${ageRangeSuffix}-bad.avif`
    }
  }

  const profileImage = getProfileImage(gender, age)

  const handleContinue = () => {
    router.push(`/quiz/step-34?${query}`)
  }

  // Para simplificar, os valores são hardcoded para corresponder à imagem.
  // Em uma implementação real, eles seriam calculados a partir dos searchParams.
  const negativeEffectsLevel = "High" // Pode ser 'Low', 'Normal', 'Medium', 'High'
  const mainDifficulty = "Low energy"
  const challengingPeriod = "Few months"
  const trigger = "Family or relationship"
  const energyLevel = "Low"

  const levelColorClass =
    negativeEffectsLevel === "Low"
      ? "bg-blue-500"
      : negativeEffectsLevel === "Normal"
        ? "bg-green-500"
        : negativeEffectsLevel === "Medium"
          ? "bg-yellow-500"
          : "bg-red-500"

  const levelTextClass =
    negativeEffectsLevel === "Low"
      ? "text-blue-500"
      : negativeEffectsLevel === "Normal"
        ? "text-green-500"
        : negativeEffectsLevel === "Medium"
          ? "text-yellow-500"
          : "text-red-500"

  const alertMessage =
    negativeEffectsLevel === "High"
      ? "This means you may experience increase feelings of worry, create a sense of pressure, drain your energy, and disrupt your sleep patterns."
      : "This is a placeholder message for other levels." // Adicione mensagens para outros níveis se necessário

  return (
    <QuizLayout step={26} totalSteps={26}>
      {" "}
      {/* Usar QuizLayout para a barra de progresso, mantendo 26/26 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-32?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">{/* Ícone central pode ser adicionado aqui se necessário */}</div>
        <span className="text-gray-600 text-sm font-medium">26/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto mt-20">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Summary of your Well-being Profile</h1>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Negative effects level</h2>
          <div className="relative w-full h-48 mb-4">
            <Image
              src={profileImage || "/placeholder.svg"}
              alt="Profile character"
              width={200}
              height={200}
              className="absolute top-0 left-1/2 -translate-x-1/2 h-full object-contain"
              priority // Adiciona priority para carregar a imagem mais rápido [^1]
            />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full"></div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-2 mt-1">
              <span>Low</span>
              <span>Normal</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            {/* "Your level" indicator */}
            <div
              className="absolute bottom-8 w-20 h-8 bg-gray-800 text-white text-xs font-medium rounded-md flex items-center justify-center"
              style={{ right: "10%", transform: "translateX(50%)" }} // Ajuste conforme o nível
            >
              Your level
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
            <div
              className={`absolute bottom-6 w-4 h-4 rounded-full border-2 border-white shadow-md ${levelColorClass}`}
              style={{ right: "10%", transform: "translateX(50%)" }} // Ajuste conforme o nível
            ></div>
          </div>

          <div
            className={`flex items-start p-3 rounded-lg ${negativeEffectsLevel === "High" ? "bg-red-50 border border-red-200" : "bg-gray-50 border border-gray-200"} text-sm`}
          >
            <Info className={`w-5 h-5 mr-3 ${levelTextClass}`} />
            <div>
              <p className={`font-semibold ${levelTextClass}`}>{negativeEffectsLevel.toUpperCase()} level</p>
              <p className="text-gray-700">{alertMessage}</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <BatteryCharging className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Main difficulty</p>
            <p className="text-base font-semibold text-gray-900">{mainDifficulty}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <Calendar className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Challenging period</p>
            <p className="text-base font-semibold text-gray-900">{challengingPeriod}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <Zap className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Trigger</p>
            <p className="text-base font-semibold text-gray-900">{trigger}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-start gap-2">
            <BatteryCharging className="w-6 h-6 text-teal-600" />
            <p className="text-sm font-medium text-gray-800">Energy level</p>
            <p className="text-base font-semibold text-gray-900">{energyLevel}</p>
          </div>
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

export default function Step33() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step33Content />
    </Suspense>
  )
}
