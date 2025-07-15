"use client"

import { useState, useEffect, Suspense } from "react"
import { ArrowLeft, Check, Shield, Clock, Users, Award } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

function Step40Content() {
  const [selectedPlan, setSelectedPlan] = useState<string>("1-month")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get all quiz parameters
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || ""
  const name = searchParams.get("name") || "Friend"

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Checkout URLs for each plan (same as step 39)
  const checkoutUrls = {
    "7-day": "https://pay.hotmart.com/D100838092L?off=n7vz0ceo&checkoutMode=6",
    "1-month": "https://pay.hotmart.com/D100838092L?off=oaytx2ck&checkoutMode=6",
    "3-month": "https://pay.hotmart.com/D100838092L?off=czqrbgur&checkoutMode=6",
  }

  const handleGetMyPlan = () => {
    const url = checkoutUrls[selectedPlan as keyof typeof checkoutUrls]
    window.open(url, "_blank")
  }

  // Get images based on gender and age (same logic as step 39)
  const getBeforeImage = () => {
    if (gender === "female") {
      if (age === "18-24") return "/images/female-18-24-bad.avif"
      if (age === "25-34") return "/images/female-25-34-bad.avif"
      if (age === "35-54") return "/images/female-35-54-bad.avif"
      if (age === "55-64") return "/images/female-55-65-bad.avif"
      if (age === "65") return "/images/female-65-bad.avif"
      return "/images/female-25-34-bad.avif"
    } else {
      if (age === "18-24") return "/images/male-18-24-bad.avif"
      if (age === "25-34") return "/images/male-25-34-bad.avif"
      if (age === "35-54") return "/images/male-35-54-bad.avif"
      if (age === "55-64") return "/images/male-55-65-bad.avif"
      if (age === "65") return "/images/male-65-bad.avif"
      return "/images/male-25-34-bad.avif"
    }
  }

  const getAfterImage = () => {
    if (gender === "female") {
      if (age === "18-24") return "/images/female-18-24-good.avif"
      if (age === "25-34") return "/images/female-25-34-good.avif"
      if (age === "35-54") return "/images/female-35-54-good.avif"
      if (age === "55-64") return "/images/female-55-65-good.avif"
      if (age === "65") return "/images/female-65-good.avif"
      return "/images/female-25-34-good.avif"
    } else {
      if (age === "18-24") return "/images/male-18-24-good.avif"
      if (age === "25-34") return "/images/male-25-34-good.avif"
      if (age === "35-54") return "/images/male-35-54-good.avif"
      if (age === "55-64") return "/images/male-55-65-good.avif"
      if (age === "65") return "/images/male-65-good.avif"
      return "/images/male-25-34-good.avif"
    }
  }

  const plans = [
    {
      id: "7-day",
      name: "7-DAY PLAN",
      originalPrice: "€49.99",
      price: "€29.99",
      description: "Perfect for getting started",
      discount: "40% OFF",
      popular: false,
    },
    {
      id: "1-month",
      name: "1-MONTH PLAN",
      originalPrice: "€49.99",
      price: "€29.99",
      description: "Most popular choice",
      discount: "40% OFF",
      popular: true,
    },
    {
      id: "3-month",
      name: "3-MONTH PLAN",
      originalPrice: "€99.99",
      price: "€59.99",
      description: "Best value for long-term results",
      discount: "40% OFF",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .pulse-glow:hover {
          animation-play-state: paused;
          transform: scale(1.1);
        }
      `}</style>

      {/* Discount Banner */}
      <div className="w-full bg-red-600 text-white py-2 sm:py-3 px-4 sm:px-6 text-center flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-bold">Discount is reserved for: {name}</span>
          </div>
          <div className="text-lg sm:text-xl font-bold">{formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 flex-shrink-0">
        <Link href={`/quiz/step-39?${searchParams.toString()}`} className="p-2">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/images/humanBrain.png" alt="Liven" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="font-bold text-lg sm:text-xl">Liven</span>
        </div>
        <button
          onClick={handleGetMyPlan}
          className="pulse-glow bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors"
        >
          GET MY PLAN
        </button>
      </header>

      <main className="flex-1 w-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              Your personalized plan was built for you, {name}!
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              🔥 SPECIAL DISCOUNT - 40% OFF
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              This exclusive offer expires in {formatTime(timeLeft)} - Don't miss out!
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 px-2">
              Your Transformation Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Now Card */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-red-200">
                    <Image
                      src={getBeforeImage() || "/placeholder.svg"}
                      alt="Before transformation"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2">Now</h3>
                  <ul className="text-sm sm:text-base text-red-600 space-y-1 sm:space-y-2 text-left">
                    <li>• Feeling tired and drained</li>
                    <li>• Struggling with motivation</li>
                    <li>• Overwhelmed by daily tasks</li>
                    <li>• Difficulty managing emotions</li>
                  </ul>
                </div>
              </div>

              {/* Your Goal Card */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200">
                    <Image
                      src={getAfterImage() || "/placeholder.svg"}
                      alt="After transformation"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Your Goal</h3>
                  <ul className="text-sm sm:text-base text-green-600 space-y-1 sm:space-y-2 text-left">
                    <li>• Energized and vibrant</li>
                    <li>• Highly motivated and focused</li>
                    <li>• Confident in handling challenges</li>
                    <li>• Emotionally balanced and happy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section with Discount */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 px-2">
              {name}, your personalized plan is ready!
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm sm:text-base text-gray-700">Your current mood analysis:</span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  Medium Level
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${plan.popular ? "ring-2 ring-green-500 ring-opacity-50" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="absolute -top-2 -right-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {plan.discount}
                    </span>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-sm sm:text-base mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-lg sm:text-xl font-bold text-green-600">{plan.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{plan.originalPrice}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div
                    className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 ${
                      selectedPlan === plan.id ? "border-green-500 bg-green-500" : "border-gray-300"
                    }`}
                  >
                    {selectedPlan === plan.id && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleGetMyPlan}
                className="pulse-glow w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-12 rounded-full text-base sm:text-lg transition-colors mb-4"
              >
                GET MY PLAN - 40% OFF
              </button>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="text-center mb-8 sm:mb-12">
            <Image
              src="/images/payment-methods.png"
              alt="Payment Methods"
              width={400}
              height={60}
              className="mx-auto max-w-full h-auto"
            />
          </div>

          {/* Goals Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 px-2">Our goals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                "You walk in harmony with yourself",
                "You no longer feel tired or overwhelmed",
                "You no longer doubt your self-worth",
                "You pursue your dreams without fear of failure",
                "You will confidently be as you are meant to be!",
              ].map((goal, index) => (
                <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 px-2">
              People just like you achieved great results
            </h2>
            <div className="text-center space-y-4 sm:space-y-6">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-2">83%</div>
                <p className="text-sm sm:text-base text-gray-600">
                  of users notice improved mood and energy within 30 days
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">77%</div>
                <p className="text-sm sm:text-base text-gray-600">
                  of users achieved their well-being goals in 90 days
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2">45%</div>
                <p className="text-sm sm:text-base text-gray-600">of users suffer from the same issues as you</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="bg-red-100 border border-red-300 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-sm sm:text-base text-red-700 font-bold">
                  Limited Time Offer - Expires in {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  } ${plan.popular ? "ring-2 ring-green-500 ring-opacity-50" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="absolute -top-2 -right-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {plan.discount}
                    </span>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-sm sm:text-base mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-lg sm:text-xl font-bold text-green-600">{plan.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{plan.originalPrice}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div
                    className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 ${
                      selectedPlan === plan.id ? "border-green-500 bg-green-500" : "border-gray-300"
                    }`}
                  >
                    {selectedPlan === plan.id && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGetMyPlan}
              className="pulse-glow w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-12 rounded-full text-base sm:text-lg transition-colors mb-4"
            >
              GET MY PLAN - 40% OFF
            </button>

            <div className="mt-6 sm:mt-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/award-badge.png"
                  alt="30-Day Money-Back Guarantee"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                We stand behind our program. If you don't see improvements in your well-being within 30 days, we'll
                refund your money back easily.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Step40() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step40Content />
    </Suspense>
  )
}
