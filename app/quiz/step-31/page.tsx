"use client"

import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { QuizLayout } from "@/components/quiz-layout"
import Image from "next/image"

function Step31Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString()

  const handleContinue = () => {
    router.push(`/quiz/step-32?${query}`)
  }

  return (
    <QuizLayout step={26} totalSteps={26}>
      {" "}
      {/* Usar QuizLayout para a barra de progresso, mantendo 26/26 */}
      <header className="w-full px-6 py-4 flex justify-between items-center absolute top-0 left-0 right-0 bg-[#f5f3f0] z-10">
        <Link href={`/quiz/step-30?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">{/* Ícone central pode ser adicionado aqui se necessário */}</div>
        <span className="text-gray-600 text-sm font-medium">26/26</span>
      </header>
      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-6 mb-12">
          {/* Imagem do mapa mundi com pinos de pessoas */}
          {/* A DIV ABAIXO FOI ALTERADA PARA AUMENTAR A IMAGEM */}
          <div className="relative w-full max-w-xl h-64 mx-auto mb-8">
            <Image
              src="/images/world-map-people.png" // Imagem real
              alt="World map with people"
              width={500}
              height={192}
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Join over 1,000,000 people</h1>
          <p className="text-gray-600 text-base max-w-md mx-auto">
            Become part of a growing worldwide community and achieve your goals with us!
          </p>
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

export default function Step31() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step31Content />
    </Suspense>
  )
}
