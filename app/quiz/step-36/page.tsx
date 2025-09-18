"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button" // Assuming you have these components
import { Input } from "@/components/ui/input"   // Assuming you have these components
import { Lock } from "lucide-react"
import { submitEmail } from "./actions" // Import the server action

export default function Step36() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic client-side validation
    if (!email) {
      setError("Please enter your email")
      return
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Collect all quiz data from URL params into a plain object
      const quizData = {
        email,
        ...Object.fromEntries(searchParams.entries()),
      }

      // Call the server action with the quiz data
      const result = await submitEmail(quizData)

      if (result.success) {
        // If successful, redirect to the next step
        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set("email", email)
        window.location.href = `/quiz/step-37?${currentParams.toString()}`
      } else {
        // Show a generic error from the server
        setError(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      // Handle unexpected errors during the action call
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">Enter your email to</h1>
          <h2 className="text-2xl font-semibold text-gray-900">get your personal</h2>
          <h3 className="text-2xl font-semibold text-green-600">Well-being Management Plan!</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email to get your plan"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex items-start space-x-3 text-sm text-gray-600">
            <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              We respect your privacy and are committed to protecting your personal data. Your data will be processed
              according to our Privacy policy.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  )
}
