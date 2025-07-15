"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Interfaces de Tipos ---
interface LoadingStep {
  id: string
  label: string
  completed: boolean
  progress: number
  isActive: boolean
}

interface Testimonial {
  id: number
  title: string
  author: string
  text: string
}

interface PopupQuestion {
  id: string
  question: string
  stepIndex: number
}

// --- Componente Principal ---
export default function Step35() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // --- Estados do Componente ---
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: "goals", label: "Goals", completed: false, progress: 0, isActive: false },
    { id: "growth", label: "Growth areas", completed: false, progress: 0, isActive: false },
    { id: "content", label: "Content", completed: false, progress: 0, isActive: false },
  ])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [allCompleted, setAllCompleted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [currentPopup, setCurrentPopup] = useState<PopupQuestion | null>(null)
  
  // SOLUÇÃO: Inicialização "Lazy" do useState para carregar do sessionStorage imediatamente.
  // Isso evita a "race condition" e garante que o estado esteja correto desde o início.
  const [popupAnswered, setPopupAnswered] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = sessionStorage.getItem("livenquiz-popup-answers");
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });

  const progressIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({})

  // --- Dados Estáticos ---
  const popupQuestions: PopupQuestion[] = [
    { id: "goals", question: "Are you inclined to finish what you start?", stepIndex: 0 },
    { id: "growth", question: "Are you familiar with journaling for self-reflection?", stepIndex: 1 },
    { id: "content", question: "Do you want to learn how to build strong habits?", stepIndex: 2 },
  ]

  const testimonials: Testimonial[] = [
    { id: 1, title: "It has really changed my life", author: "Brian Ross", text: "I have been using this app for six months now. During this time, I have been able to get rid of the habit of putting everything off until the last minute. The app has helped me to organise my time better and start achieving my goals. It has really changed my life for the better." },
    { id: 2, title: "Liven is a great self-help tool...", author: "Dylan Beker", text: "Liven helps me understand why I procrastinate on tasks and how to get rid of it. Liven is doing a great job at this. I am very grateful for a tool like Liven." },
    { id: 3, title: "Eye-opening information...", author: "Patrick Naughton", text: "I am new to this app. I am not new to my own problems. As I get older and am now 62, years needing help. So little money for eye-opening information in relation to my inner self and motivation." },
  ]

  // --- Funções de Lógica ---
  const savePopupState = (newAnswers: { [key: string]: boolean }) => {
    sessionStorage.setItem("livenquiz-popup-answers", JSON.stringify(newAnswers))
  }

  const loadStep = (stepIndex: number) => {
    if (stepIndex >= steps.length) {
      setAllCompleted(true)
      return
    }

    setSteps(prev => prev.map((step, index) => ({ ...step, isActive: index === stepIndex })))

    const stepId = steps[stepIndex].id;
    // CORREÇÃO: Acessa o estado mais recente usando a forma funcional do setState
    // para garantir que a verificação `wasAnswered` é correta.
    setPopupAnswered(currentAnswers => {
        const wasAnswered = currentAnswers[stepId];
        let progress = 0;
        let targetProgress = wasAnswered ? 100 : 50;
        const intervalId = `step-${stepIndex}`;

        const interval = setInterval(() => {
            progress++;
            setSteps(prev => prev.map((s, i) => (i === stepIndex ? { ...s, progress: Math.min(progress, 100) } : s)));

            if (progress >= targetProgress) {
                clearInterval(interval);
                delete progressIntervals.current[intervalId];

                if (wasAnswered) {
                    setSteps(prev => prev.map((s, i) => (i === stepIndex ? { ...s, completed: true, isActive: false } : s)));
                    setTimeout(() => loadStep(stepIndex + 1), 300);
                } else {
                    const popupQuestion = popupQuestions.find(q => q.stepIndex === stepIndex);
                    if (popupQuestion) {
                        setCurrentPopup(popupQuestion);
                        setShowPopup(true);
                    }
                }
            }
        }, 60);

        progressIntervals.current[intervalId] = interval;
        return currentAnswers; // Retorna o estado inalterado
    });
  };

  const resumeLoading = (stepIndex: number) => {
    let progress = 50
    const intervalId = `step-${stepIndex}-resume`

    const interval = setInterval(() => {
      progress++
      setSteps(prev => prev.map((s, i) => i === stepIndex ? { ...s, progress } : s))

      if (progress >= 100) {
        clearInterval(interval)
        delete progressIntervals.current[intervalId]

        setSteps(prev => prev.map((s, i) => i === stepIndex ? { ...s, completed: true, isActive: false } : s))
        setTimeout(() => loadStep(stepIndex + 1), 300)
      }
    }, 60)

    progressIntervals.current[intervalId] = interval
  }

  const handlePopupAnswer = (answer: "yes" | "no") => {
    if (!currentPopup) return

    const newAnswers = { ...popupAnswered, [currentPopup.id]: true }
    setPopupAnswered(newAnswers)
    savePopupState(newAnswers)

    console.log(`User answered "${answer}" to question: ${currentPopup.question}`)

    setShowPopup(false)
    setTimeout(() => {
      const stepToResume = currentPopup.stepIndex
      setCurrentPopup(null)
      resumeLoading(stepToResume)
    }, 300)
  }

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/quiz/step-36?${params.toString()}`)
  }

  // --- Efeito de Inicialização (Roda apenas uma vez) ---
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 6000)

    const initialTimeout = setTimeout(() => {
      loadStep(0)
    }, 500)

    return () => {
      clearInterval(testimonialInterval)
      clearTimeout(initialTimeout)
      Object.values(progressIntervals.current).forEach(clearInterval)
    }
  }, []) // Dependência vazia garante que o efeito rode apenas uma vez.

  // --- Renderização do Componente ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      <div className="mb-8">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
          <Image src="/placeholder.svg" alt="Logo" width={24} height={24} />
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Creating your</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600">personalized Well-being</h2>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600">Management plan</h2>
      </div>

      <div className="w-full max-w-md space-y-8 mb-12">
        {steps.map((step) => (
          <div key={step.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`font-medium text-lg transition-colors duration-300 ${step.isActive ? "text-green-600" : step.completed ? "text-gray-700" : "text-gray-400"}`}>
                {step.label}
              </span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${step.completed ? "bg-green-500 scale-110" : step.isActive ? "bg-green-200" : "bg-gray-200"}`}>
                {step.completed && <Check className="w-4 h-4 text-white animate-in zoom-in duration-300" />}
              </div>
            </div>
            {(step.isActive || step.completed) && (
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-200 ease-linear ${step.completed ? "bg-green-500" : "bg-green-400"}`}
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mb-8">
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-5 h-5 fill-green-500 text-green-500" />)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{testimonial.author}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? "bg-green-500" : "bg-gray-300"}`} />)}
        </div>
      </div>

      {allCompleted && (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-full text-lg font-medium">
            Continue
          </Button>
        </div>
      )}

      {showPopup && currentPopup && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${showPopup ? "opacity-100" : "opacity-0"}`} style={{ backdropFilter: "blur(8px)" }}>
          <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all duration-300 ${showPopup ? "scale-100 opacity-100" : "scale-95 opacity-0"}`} style={{ animation: showPopup ? "popupZoomIn 0.3s ease-out" : "none" }}>
            <div className="text-center mb-6">
              <p className="text-sm text-blue-600 font-medium mb-4">To move forward, specify</p>
              <h3 className="text-xl font-bold text-gray-900 leading-tight px-2">{currentPopup.question}</h3>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handlePopupAnswer("no")} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95" style={{ minHeight: "56px" }}>
                No
              </button>
              <button onClick={() => handlePopupAnswer("yes")} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95" style={{ minHeight: "56px" }}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popupZoomIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 640px) {
          .backdrop-blur-sm { backdrop-filter: blur(4px); }
        }
        button:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
