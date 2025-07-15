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

  const centralProfileImage = gender === "female" ? "/images/female1.avif" : "/images/male2.avif"

  return (
    <div className="min-h-screen w-full bg-[#f5f3f0] flex flex-col">
      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center flex-shrink-0">
        <Link href={`/quiz/step-2?gender=${gender}`} className="p-2">
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
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="text-center space-y-2 sm:space-y-4 mb-8 sm:mb-12 md:mb-16 w-full max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-600 px-2">
            Over 1,000,000 people
          </h1>
          <p className="text-gray-800 text-base sm:text-lg md:text-xl px-2">have chosen Liven</p>
        </div>

        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg mb-8 sm:mb-12 md:mb-16 flex-shrink-0">
          <Image
            src={centralProfileImage || "/placeholder.svg"}
            alt={`${gender} profile`}
            width={320}
            height={320}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full max-w-sm px-2">
          <button
            onClick={handleContinue}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  )
}

export default function Step3() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step3Content />
    </Suspense>
  )
}
