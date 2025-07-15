"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Componente de Pop-up
const PopupModal = ({ isOpen, question, onAnswer, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop com blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">To move forward, specify</p>
          <h3 className="text-xl font-bold text-gray-900 mb-8 leading-tight">{question}</h3>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onAnswer("no")}
              variant="outline"
              className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 font-medium min-w-[100px]"
            >
              No
            </Button>
            <Button
              onClick={() => onAnswer("yes")}
              variant="outline"
              className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 border-0 text-gray-700 font-medium min-w-[100px]"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Step35() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Estados para as barras de progresso
  const [goalsProgress, setGoalsProgress] = useState(0)
  const [growthProgress, setGrowthProgress] = useState(0)
  const [contentProgress, setContentProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0) // 0: goals, 1: growth, 2: content

  // Estados para os pop-ups
  const [showPopup, setShowPopup] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [popupAnswered, setPopupAnswered] = useState({
    goals: false,
    growth: false,
    content: false,
  })

  // Perguntas dos pop-ups
  const questions = {
    goals: "Are you inclined to finish what you start?",
    growth: "Are you familiar with journaling for self-reflection?",
    content: "Do you want to learn how to build strong habits?",
  }

  // Carregar estado dos pop-ups do sessionStorage
  useEffect(() => {
    const savedState = sessionStorage.getItem("popupAnswered")
    if (savedState) {
      setPopupAnswered(JSON.parse(savedState))
    }
  }, [])

  // Salvar estado dos pop-ups no sessionStorage
  const savePopupState = (newState) => {
    setPopupAnswered(newState)
    sessionStorage.setItem("popupAnswered", JSON.stringify(newState))
  }

  // Função para mostrar pop-up
  const showPopupForStep = (step) => {
    const stepNames = ["goals", "growth", "content"]
    const stepName = stepNames[step]

    if (!popupAnswered[stepName]) {
      setCurrentQuestion(questions[stepName])
      setShowPopup(true)
      console.log(`Showing popup for ${stepName}: ${questions[stepName]}`)
    }
  }

  // Função para lidar com resposta do pop-up
  const handlePopupAnswer = (answer) => {
    const stepNames = ["goals", "growth", "content"]
    const stepName = stepNames[currentStep]

    console.log(`User answered "${answer}" for ${stepName}`)

    const newState = {
      ...popupAnswered,
      [stepName]: true,
    }
    savePopupState(newState)
    setShowPopup(false)
  }

  // Efeito para controlar o progresso das barras
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep === 0) {
        // Carregando Goals
        setGoalsProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Mostrar pop-up aos 50%
          if (newProgress === 50) {
            showPopupForStep(0)
          }

          // Quando Goals chegar a 100%, começar Growth
          if (newProgress === 100) {
            setTimeout(() => setCurrentStep(1), 500)
          }

          return newProgress
        })
      } else if (currentStep === 1) {
        // Carregando Growth areas
        setGrowthProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Mostrar pop-up aos 50%
          if (newProgress === 50) {
            showPopupForStep(1)
          }

          // Quando Growth chegar a 100%, começar Content
          if (newProgress === 100) {
            setTimeout(() => setCurrentStep(2), 500)
          }

          return newProgress
        })
      } else if (currentStep === 2) {
        // Carregando Content
        setContentProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)

          // Mostrar pop-up aos 50%
          if (newProgress === 50) {
            showPopupForStep(2)
          }

          // Quando Content chegar a 100%, redirecionar
          if (newProgress === 100) {
            setTimeout(() => {
              const params = new URLSearchParams(searchParams.toString())
              router.push(`/quiz/step-36?${params.toString()}`)
            }, 1000)
          }

          return newProgress
        })
      }
    }, 50) // Atualiza a cada 50ms para suavidade

    return () => clearInterval(interval)
  }, [currentStep, router, searchParams, popupAnswered])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Creating your personalized plan</h1>
            <p className="text-gray-600">
              We're analyzing your responses to build the perfect wellness journey for you
            </p>
          </div>

          <div className="space-y-8">
            {/* Goals Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Goals</span>
                <span className="text-sm text-gray-500">{goalsProgress}%</span>
              </div>
              <Progress value={goalsProgress} className="h-3 bg-gray-200" />
            </div>

            {/* Growth Areas Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Growth areas</span>
                <span className="text-sm text-gray-500">{growthProgress}%</span>
              </div>
              <Progress value={growthProgress} className="h-3 bg-gray-200" />
            </div>

            {/* Content Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Content</span>
                <span className="text-sm text-gray-500">{contentProgress}%</span>
              </div>
              <Progress value={contentProgress} className="h-3 bg-gray-200" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span>Analyzing your wellness profile...</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pop-up Modal */}
      <PopupModal
        isOpen={showPopup}
        question={currentQuestion}
        onAnswer={handlePopupAnswer}
        onClose={() => setShowPopup(false)}
      />

      {/* CSS personalizado para animações */}
      <style jsx>{`
        @keyframes zoom-in-95 {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
        
        .duration-300 {
          animation-duration: 300ms;
        }
      `}</style>
    </div>
  )
}
