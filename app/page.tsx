import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    // 1. Usamos flexbox na div principal para controlar o layout geral
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      <Header />

      {/* 2. O 'main' agora cresce para ocupar o espaço disponível, empurrando o rodapé para baixo */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Reduzimos as margens e o espaçamento em telas pequenas */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              A PERSONALIZED WELL-BEING
              <br />
              MANAGEMENT PLAN
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-md mx-auto">
              IMPROVE YOUR WELL-BEING WITH OUR PERSONALIZED PLAN
            </p>
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              3-MINUTE QUIZ
            </p>
          </div>

          {/* --- INÍCIO DA ALTERAÇÃO PRINCIPAL --- */}

          <div className="w-full flex flex-row justify-center items-center gap-4 sm:gap-8 mb-6">
            
            {/* CARD MASCULINO - AGORA TODO ENVOLVIDO PELO LINK */}
            <Link
              href="/quiz/step-2?gender=male"
              className="flex flex-col items-center group" // Adicionado 'group' para hover effects, se desejar
            >
              {/* 3. Reduzimos o tamanho dos cards em telas de celular (w-32 h-44) */}
              <div className="w-32 h-44 sm:w-48 sm:h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
                <Image
                  src="/images/male.avif"
                  alt="Male character"
                  fill
                  sizes="(max-width: 640px) 128px, 192px" // Otimiza o carregamento da imagem
                  className="object-cover"
                />
              </div>
              <div
                className="w-32 sm:w-48 bg-green-600 group-hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors text-sm sm:text-base"
              >
                <span>Male</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>

            {/* CARD FEMININO - AGORA TODO ENVOLVIDO PELO LINK */}
            <Link
              href="/quiz/step-2?gender=female"
              className="flex flex-col items-center group"
            >
              <div className="w-32 h-44 sm:w-48 sm:h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-3 relative transition-transform group-hover:scale-105">
                <Image
                  src="/images/female.avif"
                  alt="Female character"
                  fill
                  sizes="(max-width: 640px) 128px, 192px"
                  className="object-cover"
                />
              </div>
              <div
                className="w-32 sm:w-48 bg-green-600 group-hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between transition-colors text-sm sm:text-base"
              >
                <span>Female</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>

          </div>

          {/* --- FIM DA ALTERAÇÃO PRINCIPAL --- */}

          <div className="text-center text-xs text-gray-500 max-w-lg">
            <p>
              By clicking "Male" or "Female" you agree with the{" "}
              <Link href="/terms" className="text-blue-600 underline">
                Terms of Use and Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/subscription" className="text-blue-600 underline">
                Subscription Policy
              </Link>{" "}
              and{" "}
              <Link href="/cookie" className="text-blue-600 underline">
                Cookie Policy
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
