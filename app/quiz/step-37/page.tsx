"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitName } from "./actions"

export default function Step37() {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters")
      return
    }

    setError("")

    startTransition(async () => {
      // Collect all quiz data from URL parameters
      const quizData: { [key: string]: string | null } = {
        name: name.trim(),
      }

      // Add all existing parameters
      searchParams.forEach((value, key) => {
        quizData[key] = value
      })

      const result = await submitName(quizData)

      if (result.success) {
        // Create URL with all parameters including name
        const params = new URLSearchParams()
        searchParams.forEach((value, key) => {
          params.set(key, value)
        })
        params.set("name", name.trim())

        // Redirect to step 38
        router.push(`/quiz/step-38?${params.toString()}`)
      } else {
        setError(result.error || "Failed to submit name")
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            What's your <span className="text-green-600">first name</span>?
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your name to get your plan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              maxLength={50}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || isPending}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Submitting..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  )
}
