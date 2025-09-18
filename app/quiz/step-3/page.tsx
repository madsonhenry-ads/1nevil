"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"

function Step3Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""

  const handleContinue = () => {
    router.push(`/quiz/step-4?gender=${gender}&age=${age}`)
  }

  // Escolhe a imagem de perfil com base no gênero
  const centralProfileImage = gender === "female" ? "/images/female1.avif" : "/images/male2.avif"

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Cabeçalho customizado para as páginas do quiz */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link href={`/quiz/step-2?gender=${gender}`} className="p-2">
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
        <div className="w-10"></div> {/* Espaçador para centralizar */}
      </header>

      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="text-center space-y-2 mb-16">
          <h1 className="text-2xl md:text-3xl font-bold text-teal-600">Over 1,000,000 people</h1>
          <p className="text-gray-800 text-lg">have chosen Liven</p>
        </div>

        {/* 
        IMAGEM CENTRAL - AGORA SIMPLIFICADA E MAIOR 
        Removemos o container 'relative' e todos os elementos ao redor.
        A imagem agora é um elemento direto do flex container 'main'.
      */}
        <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-lg mb-16">
          <Image
            src={centralProfileImage || "/placeholder.svg"}
            alt={`${gender} profile`}
            width={320} // Corresponde ao w-80 (320px)
            height={320} // Corresponde ao h-80 (320px)
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-8 rounded-full text-lg transition-colors"
        >
          Continue
        </button>
      </main>
    </div>
  )
}

// O componente exportado permanece o mesmo
export default function Step3() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step3Content />
    </Suspense>
  )
}
