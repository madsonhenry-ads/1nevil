"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { submitEmail } from "../step-36/actions"

export default function EmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Get all current URL parameters
  const currentParams = new URLSearchParams(searchParams.toString())

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString())
    const lastStep = params.get("from") || "step-35"
    router.push(`/quiz/${lastStep}?${params.toString()}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      // Prepare quiz data with all parameters
      const quizData: { [key: string]: any } = { email }

      // Add all URL parameters to quiz data
      currentParams.forEach((value, key) => {
        if (key !== "from") {
          quizData[key] = value
        }
      })

      const result = await submitEmail(quizData)

      if (result.success) {
        setIsSuccess(true)
        setMessage(result.message || "Email saved successfully!")

        // Redirect to next step after a short delay
        setTimeout(() => {
          const nextParams = new URLSearchParams(searchParams.toString())
          nextParams.set("email", email)
          router.push(`/quiz/step-37?${nextParams.toString()}`)
        }, 1500)
      } else {
        setMessage(result.message || "Failed to save email. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#f5f3f0" }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white shadow-sm">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex items-center gap-2">
          <img src="/placeholder-logo.png" alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xs sm:text-sm text-gray-600">Email Collection</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-2 bg-white">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-teal-600 h-1.5 rounded-full transition-all duration-300" style={{ width: "92%" }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {isSuccess ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <Mail className="w-12 h-12 text-teal-600" />
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {isSuccess ? "Email Saved!" : "Enter Your Email"}
              </h1>

              <p className="text-sm sm:text-base text-gray-600">
                {isSuccess
                  ? "Redirecting you to the next step..."
                  : "We'll send your personalized results to this email address"}
              </p>
            </div>

            {!isSuccess && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 text-base"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base"
                >
                  {isSubmitting ? "Saving..." : "Continue"}
                </Button>
              </form>
            )}

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center text-sm ${
                  isSuccess
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {isSuccess && (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
