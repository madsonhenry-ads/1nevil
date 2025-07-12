import { Header } from "@/components/header"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      <Header />

      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            A PERSONALIZED WELL-BEING
            <br />
            MANAGEMENT PLAN
          </h1>

          <p className="text-gray-600 text-lg max-w-md mx-auto">
            IMPROVE YOUR WELL-BEING WITH OUR PERSONALIZED
            <br />
            PLAN
          </p>

          <p className="text-gray-700 font-medium">3-MINUTE QUIZ</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-48 h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-4 relative">
              <Image
                src="/images/male.avif"
                alt="Male character"
                width={192}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              href="/quiz/step-2?gender=male"
              className="w-48 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-between transition-colors"
            >
              <span>Male</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-4 relative">
              <Image
                src="/images/female.avif"
                alt="Female character"
                width={192}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              href="/quiz/step-2?gender=female"
              className="w-48 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-between transition-colors"
            >
              <span>Female</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

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
      </main>
    </div>
  )
}
