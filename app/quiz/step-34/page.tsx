"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Step34() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // O estado inicial permanece o mesmo (todas as barras com altura 0)
  const [animatedBars, setAnimatedBars] = useState([0, 0, 0, 0])

  // Get current month and next 3 months
  const getMonthsSequence = () => {
    const now = new Date()
    const months = []
    for (let i = 0; i < 4; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1)
      months.push({
        name: date.toLocaleDateString("en-US", { month: "long" }),
        year: date.getFullYear(),
      })
    }
    return months
  }

  // Calculate target date (3 months from now)
  const getTargetDate = () => {
    const now = new Date()
    const target = new Date(now.getFullYear(), now.getMonth() + 3, 1)
    return target.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Animate bars on component mount
  useEffect(() => {
    // Apenas definimos o estado final. A animação escalonada será controlada pelo CSS.
    const timer = setTimeout(() => {
      setAnimatedBars([30, 50, 70, 90])
    }, 100) // Um pequeno atraso para garantir que a renderização inicial com altura 0 aconteça

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/quiz/step-35?${params.toString()}`)
  }

  const months = getMonthsSequence()
  const barColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"]
  // NOVO: Array de classes de delay para a animação sequencial
  const delayClasses = ["delay-0", "delay-200", "delay-400", "delay-600"]

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 max-w-md">
          A plan designed to support your wellbeing journey
        </h1>

        <p className="text-gray-600 text-center mb-2 max-w-md">
          Based on your answers, we expect you to improve your well-being by
        </p>

        <p className="text-xl font-semibold text-gray-800 mb-12">{getTargetDate()}</p>

        <div className="w-full max-w-md mb-8">
          <div className="flex items-end justify-center space-x-4 h-48 mb-4">
            {animatedBars.map((height, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full">
                {/* Goal label for the last bar (index 3) */}
                {index === 3 && (
                  <div className="mb-2 relative">
                    <div className="bg-green-500 text-white text-sm px-3 py-1 rounded-md font-medium">Goal</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-green-500"></div>
                  </div>
                )}
                
                {/* Separator to connect the goal indicator to the bar */}
                 {index === 3 && (
                    <div className="w-4 h-4 bg-transparent border-2 border-green-500 rounded-full mb-[-8px] z-10 bg-[#f5f3f0]"></div>
                 )}

                {/* Bar */}
                <div
                  // MUDANÇA: Adiciona a classe de delay e ajusta a duração
                  className={`w-12 ${barColors[index]} rounded-lg transition-all duration-1000 ease-out shadow-sm ${delayClasses[index]}`}
                  style={{
                    height: `${height}%`,
                  }}
                ></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            {months.map((month, index) => (
              <div key={index} className="w-12 text-center">
                <span className="text-xs text-gray-600 font-medium block">{month.name.substring(0,3)}</span>
                {index === 0 && <span className="text-xs text-gray-400">(Now)</span>}
                {index === 3 && <span className="text-xs text-green-600 font-medium">(Goal)</span>}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            The chart is a non-customized illustration and results may vary
          </p>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-medium transition-colors duration-200"
        >
          Continue
        </Button>
      </main>
    </div>
  )
}
