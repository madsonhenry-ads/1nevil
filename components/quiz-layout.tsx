import type React from "react"
import { Header } from "./header"

interface QuizLayoutProps {
  children: React.ReactNode
  step: number
  totalSteps?: number
}

export function QuizLayout({ children, step, totalSteps = 40 }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-green-600 h-1 transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto">{children}</main>
    </div>
  )
}
