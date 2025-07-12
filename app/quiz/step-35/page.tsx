"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function Step35() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [allCompleted, setAllCompleted] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: "goals", label: "Goals", completed: false, progress: 0, isActive: true },
    { id: "growth", label: "Growth areas", completed: false, progress: 0, isActive: false },
    { id: "content", label: "Content", completed: false, progress: 0, isActive: false },
  ])

  const testimonials: Testimonial[] = [
    {
      id: 1,
      title: "It has really changed my life",
      author: "Brian Ross",
      text: "I have been using this app for six months now. During this time, I have been able to get rid of the habit of putting everything off until the last minute. The app has helped me to organise my time better and start achieving my goals. It has really changed my life for the better.",
    },
    {
      id: 2,
      title: "Liven is a great self-help tool...",
      author: "Dylan Beker",
      text: "Liven helps me understand why I procrastinate on tasks and how to get rid of it. Liven is doing a great job at this. I am very grateful for a tool like Liven.",
    },
    {
      id: 3,
      title: "Eye-opening information...",
      author: "Patrick Naughton",
      text: "I am new to this app. I am not new to my own problems. As I get older and am now 62, years needing help. So little money for eye-opening information in relation to my inner self and motivation.",
    },
  ]

  useEffect(() => {
    // Testimonial rotation every 6 seconds
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    // Sequential step loading
    const loadStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setAllCompleted(true)
        return
      }

      // Activate current step
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => ({
          ...step,
          isActive: index === stepIndex,
        })),
      )

      // Progress animation for 12 seconds
      const progressInterval = setInterval(() => {
        setSteps((prevSteps) => {
          const newSteps = [...prevSteps]
          if (newSteps[stepIndex].progress < 100) {
            newSteps[stepIndex].progress = Math.min(newSteps[stepIndex].progress + 1, 100)
          }
          return newSteps
        })
      }, 120) // 12000ms / 100 = 120ms per 1%

      // Complete step after 12 seconds and move to next
      setTimeout(() => {
        setSteps((prevSteps) => {
          const newSteps = [...prevSteps]
          newSteps[stepIndex].completed = true
          newSteps[stepIndex].progress = 100
          newSteps[stepIndex].isActive = false
          return newSteps
        })

        clearInterval(progressInterval)
        setCurrentStepIndex(stepIndex + 1)

        // Load next step after a brief pause
        setTimeout(() => {
          loadStep(stepIndex + 1)
        }, 500)
      }, 12000)
    }

    // Start loading first step after 1 second
    const initialTimeout = setTimeout(() => {
      loadStep(0)
    }, 1000)

    return () => {
      clearInterval(testimonialInterval)
      clearTimeout(initialTimeout)
    }
  }, [])

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/quiz/step-36?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
          <Image src="/placeholder-logo.svg" alt="Logo" width={24} height={24} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Creating your</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600">personalized Well-being</h2>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-600">Management plan</h2>
      </div>

      {/* Loading Steps */}
      <div className="w-full max-w-md space-y-8 mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <span
                className={`font-medium text-lg transition-colors duration-300 ${
                  step.isActive ? "text-green-600" : step.completed ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step.completed ? "bg-green-500 scale-110" : step.isActive ? "bg-green-200" : "bg-gray-200"
                }`}
              >
                {step.completed && <Check className="w-4 h-4 text-white animate-in zoom-in duration-300" />}
              </div>
            </div>

            {/* Progress Bar - Only show for active or completed steps */}
            {(step.isActive || step.completed) && (
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ease-out ${
                    step.completed ? "bg-green-500" : "bg-green-400"
                  }`}
                  style={{ width: `${step.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Testimonials Slider */}
      <div className="w-full max-w-md mb-8">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {/* Stars */}
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-green-500 text-green-500" />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{testimonial.title}</h3>

                  {/* Author */}
                  <p className="text-gray-600 text-sm mb-4">{testimonial.author}</p>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Continue Button - Shows when all completed */}
      {allCompleted && (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <Button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-3 rounded-full text-lg font-medium"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}
