"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, XCircle, Info, ChevronRight } from "lucide-react"
import Image from "next/image"

// --- Ícones SVG ---
const LivenLogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="black" />
    <path d="M12.875 22V10H15.125V22H12.875ZM17.125 22V10H19.375V22H17.125Z" fill="white" />
  </svg>
)

const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C9.23858 2 7 4.23858 7 7V9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 13.1193 2 14.5C2 15.8807 3.11929 17 4.5 17H5.25C6.0113 18.2933 7.08985 19.3718 8.38317 20.1331L8.5 22H10.5L10.6168 20.1331C11.3121 20.4432 12 20.6559 12 22H14C14 20.6559 14.6879 20.4432 15.3832 20.1331L15.5 22H17.5L17.6168 20.1331C18.9101 19.3718 19.9887 18.2933 20.75 17H21.5C22.8807 17 24 15.8807 24 14.5C24 13.1193 22.8807 12 21.5 12C20.1193 12 19 10.8807 19 9.5V7C19 4.23858 16.7614 2 14 2H12Z"
      fill="#2DD4BF"
    />
  </svg>
)

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="#2DD4BF"
    />
    <path
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
      fill="white"
    />
    <path
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
      fill="#2DD4BF"
    />
  </svg>
)

const GuaranteeSeal = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 64C32 64 64 54 64 32V10L32 0L0 10V32C0 54 32 64 32 64Z" fill="#2DD4BF" />
    <path d="M22 32.5L28.5 39L44 23.5" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// --- Componentes Auxiliares ---
const StatBar = ({ label, value, level, isGood = false }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="font-medium text-gray-500">{level}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${isGood ? "bg-teal-500" : "bg-gray-400"}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
)

const BeforeAfterComparison = ({ gender, age }) => {
  // Função para obter a imagem baseada no gênero, idade e estado
  const getProfileImage = (gender, age, state) => {
    let ageRangeSuffix = ""

    if (age === "18-24") {
      ageRangeSuffix = "18-24"
    } else if (age === "25-34") {
      ageRangeSuffix = "25-34"
    } else if (age === "35-44" || age === "45-54") {
      ageRangeSuffix = "35-54"
    } else if (age === "55-64") {
      ageRangeSuffix = "55-65"
    } else if (age === "65") {
      ageRangeSuffix = "65"
    } else {
      ageRangeSuffix = "25-34" // fallback
    }

    const suffix = state === "bad" ? "bad" : "good"
    return `/images/${gender}-${ageRangeSuffix}-${suffix}.avif`
  }

  const badImage = getProfileImage(gender, age, "bad")
  const goodImage = getProfileImage(gender, age, "good")

  return (
    <div className="relative max-w-4xl mx-auto mb-12">
      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Now Card */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 bg-gray-100 text-gray-600 border-gray-300">
              Now
            </Badge>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src={badImage || "/placeholder.svg"}
                alt="Person before Liven"
                width={192}
                height={192}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <StatBar label="Energy level" value={25} level="Low" isGood={false} />
            <StatBar label="Well-being level" value={30} level="Weak" isGood={false} />
            <StatBar label="Self-esteem level" value={20} level="Low" isGood={false} />
          </div>
        </Card>

        {/* Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="bg-white rounded-full p-3 shadow-lg border-2 border-gray-200">
            <ChevronRight className="w-6 h-6 text-teal-500" />
          </div>
        </div>

        {/* Your Goal Card */}
        <Card className="p-6 bg-white shadow-lg border-2 border-teal-200">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-teal-500 text-white">Your Goal</Badge>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src={goodImage || "/placeholder.svg"}
                alt="Person after Liven"
                width={192}
                height={192}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <StatBar label="Energy level" value={90} level="High" isGood={true} />
            <StatBar label="Well-being level" value={95} level="Strong" isGood={true} />
            <StatBar label="Self-esteem level" value={85} level="High" isGood={true} />
          </div>
        </Card>
      </div>
    </div>
  )
}

const PricingOption = ({ id, label, price, perDay, isPopular, selectedPlan, setSelectedPlan }) => (
  <div className="relative">
    <label
      htmlFor={id}
      className={`block rounded-xl border-2 p-5 cursor-pointer transition-all ${
        selectedPlan === id ? "border-teal-500 bg-white" : "border-gray-200 bg-white"
      }`}
    >
      <input
        type="radio"
        name="pricing-plan"
        id={id}
        className="hidden"
        checked={selectedPlan === id}
        onChange={() => setSelectedPlan(id)}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedPlan === id ? "border-teal-500 bg-teal-500" : "border-gray-300"
            }`}
          >
            {selectedPlan === id && <Check className="w-4 h-4 text-white" />}
          </div>
          <div>
            <span className="font-semibold text-gray-800">{label}</span>
            <p className="text-sm text-gray-500">${price}</p>
          </div>
        </div>
        <div className="text-right bg-gray-100 px-3 py-1 rounded-md">
          <div className="font-bold text-lg text-gray-800">
            $<span className="text-2xl">{perDay.split(".")[0]}</span>
            <sup className="text-lg font-bold">.{perDay.split(".")[1]}</sup>
          </div>
          <span className="text-xs text-gray-500 font-medium -mt-1 block">per day</span>
        </div>
      </div>
    </label>
    {isPopular && (
      <div className="absolute -top-3 left-0 w-full flex justify-center">
        <Badge className="bg-teal-500 text-white uppercase text-xs font-bold tracking-wider px-3 py-1">
          <Star className="w-3 h-3 mr-1.5 fill-white text-white" />
          MOST POPULAR
        </Badge>
      </div>
    )}
  </div>
)

// --- Componente da Página Principal ---
export default function Step39() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const name = searchParams.get("name") || "madson"
  const gender = searchParams.get("gender") || "male"
  const age = searchParams.get("age") || "25-34"
  const [selectedPlan, setSelectedPlan] = useState("plan-2")
  const hasRedirected = useRef(false)

  // URLs de checkout para cada plano
  const checkoutUrls = {
    "plan-1": "https://pay.hotmart.com/D100838092L?off=n7vz0ceo&checkoutMode=6", // 7-DAY PLAN
    "plan-2": "https://pay.hotmart.com/D100838092L?off=oaytx2ck&checkoutMode=6", // 1-MONTH PLAN
    "plan-3": "https://pay.hotmart.com/D100838092L?off=czqrbgur&checkoutMode=6", // 3-MONTH PLAN
  }

  // Exit intent redirect - versão corrigida
  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Detecta quando o mouse sai da área superior da página
      if (e.clientY <= 0 && !hasRedirected.current) {
        hasRedirected.current = true
        const currentParams = new URLSearchParams(window.location.search)
        router.push(`/quiz/step-40?${currentParams.toString()}`)
      }
    }

    const handleBeforeUnload = (e) => {
      if (!hasRedirected.current) {
        // Não previne o evento, apenas marca que tentou sair
        hasRedirected.current = true
        // Usa setTimeout para redirecionar após o browser processar o evento
        setTimeout(() => {
          const currentParams = new URLSearchParams(window.location.search)
          router.push(`/quiz/step-40?${currentParams.toString()}`)
        }, 100)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !hasRedirected.current) {
        hasRedirected.current = true
        const currentParams = new URLSearchParams(window.location.search)
        router.push(`/quiz/step-40?${currentParams.toString()}`)
      }
    }

    const handleKeyDown = (e) => {
      // Detecta Ctrl+W, Ctrl+T, Alt+F4, etc.
      if ((e.ctrlKey && (e.key === "w" || e.key === "t")) || (e.altKey && e.key === "F4") || e.key === "F5") {
        if (!hasRedirected.current) {
          hasRedirected.current = true
          const currentParams = new URLSearchParams(window.location.search)
          router.push(`/quiz/step-40?${currentParams.toString()}`)
        }
      }
    }

    // Adiciona todos os event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("keydown", handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [router])

  // Função para redirecionar para o checkout
  const handleGetMyPlan = () => {
    hasRedirected.current = true // Previne redirect quando clica no botão
    const checkoutUrl = checkoutUrls[selectedPlan]
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank")
    }
  }

  const goals = [
    "You wake up feeling energized",
    "You no longer feel overwhelmed or worried",
    "You're no longer stuck by overthinking",
    "You enhance your overall emotional well-being",
    "Boost your energy levels and achieve your goals",
    "Your self-confidence is at an all-time high",
  ]

  const problems = [
    "Feeling guilty for not being productive",
    "Scrolling on social media in the middle of a task",
    "Feeling uneasy when you have free time",
    "Feeling rushed at work",
    "Always checking phone for messages or emails",
    "Lack of time for self care",
    "Problems with feeling rested",
    "Feeling tired and overwhelmed during the day",
  ]

  const solutions = [
    "Continuous focus and concentration",
    "Elevated energy levels",
    "Improved sleep quality and schedule",
    "Emotional stability",
    "No guilt for getting relaxed",
    "Efficient performance at work",
    "Stable self-care routines",
  ]

  const faqs = [
    {
      question: "What if I don't have enough willpower to stick to the plan?",
      answer:
        "Our plan is designed to help you build your willpower gradually, so you don't have to rely on your own willpower too much in the beginning. We also provide support and guidance to help you stay motivated throughout the process.",
    },
    {
      question: "What if I have too many distractions in my life?",
      answer:
        "We understand that life can be hectic, but our plan includes strategies to help you minimize distractions and stay focused on your goals. From setting clear priorities to creating a distraction-free environment, we'll help you develop habits that promote productivity and lower negative effects.",
    },
    {
      question: "What if I feel overwhelmed about starting this plan?",
      answer:
        "Starting anything new can be scary, but our plan is designed to be manageable and easy to follow. We'll help you break down your goals into small, actionable steps, and provide support and encouragement to help you overcome any obstacles that come up along the way.",
    },
    {
      question: "What if I've tried tools before and they haven't worked for me?",
      answer:
        "Our plan is different from other tools you may have tried because it is evidence-based. We combine proven techniques and strategies, supported by field specialists, to give you the best possible chance of success. Unlike other tools, our plan is personalized to address your specific needs and challenges.",
    },
  ]

  const testimonials = [
    {
      name: "Brian Ross",
      text: "It has really changed my life... I have been using this app for six months now. During this time, I have been able to get rid of the habit of putting everything off until the last minute. The app has helped me to become better and start achieving my goals. It has really changed my life for the better.",
    },
    {
      name: "Selactive",
      text: "Liven is a great self-help tool... Liven helps me understand why I procrastinate on tasks and how to get free from that. Liven is doing a great job at it. I am very grateful for a tool like Liven.",
    },
    {
      name: "Patrick Naughton",
      text: "Eye-opening information... I am new to this app. I'm not new to my own issues. At my age and now being 62, with years of having needed help. Such little money for eye-opening information in regard to my inner self and drive.",
    },
  ]

  const mediaLogos = ["The New York Times", "THE WALL STREET JOURNAL", "Forbes", "CNN Health", "Vox"]

  const pricingPlans = [
    { id: "plan-1", label: "7-DAY PLAN", price: "49.99", perDay: "7.14", isPopular: false },
    { id: "plan-2", label: "1-MONTH PLAN", price: "49.99", perDay: "1.66", isPopular: true },
    { id: "plan-3", label: "3-MONTH PLAN", price: "99.99", perDay: "1.11", isPopular: false },
  ]

  const renderPricing = () => (
    <div className="space-y-4">
      {pricingPlans.map((plan) => (
        <PricingOption key={plan.id} {...plan} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      ))}
    </div>
  )

  return (
    <div className="bg-[#F9F9F7] font-sans text-gray-800">
      {/* CSS personalizado para o efeito pulsante */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(45, 212, 191, 0);
          }
        }
        
        .pulse-button {
          animation: pulse-glow 2s infinite;
        }
        
        .pulse-button:hover {
          animation-play-state: paused;
          transform: scale(1.05);
        }
      `}</style>

      <header className="py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LivenLogoIcon />
            <span className="font-extrabold text-2xl tracking-tighter">Liven</span>
          </div>
          <Button
            onClick={handleGetMyPlan}
            className="bg-teal-500 hover:bg-teal-600 rounded-full px-8 py-3 font-semibold text-white pulse-button"
          >
            GET MY PLAN
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <BeforeAfterComparison gender={gender} age={age} />

        <div className="text-center mt-8 mb-8">
          <h1 className="text-3xl font-bold mb-3">{name}, your personalized plan is ready!</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <BrainIcon />
              <span>
                Main difficulty: <span className="font-semibold">Low energy</span>
              </span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <TargetIcon />
              <span>
                Goal: <span className="font-semibold">State of calm</span>
              </span>
            </div>
          </div>
        </div>

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          GET MY PLAN
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          By clicking "Get My Plan", you agree to our automatic subscription renewal. First month is $49.99, then
          $49.99/month(period). You can cancel via the app or email: support@theliven.com. See{" "}
          <a href="#" className="underline">
            Subscription Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex justify-center items-center space-x-2 mt-4 py-2 border-y border-gray-200">
          <span className="text-xs font-semibold text-gray-500">Pay Safe & Secure</span>
          <Image src="/images/payment-methods.png" alt="Payment methods" width={280} height={40} />
        </div>

        <Card className="my-12 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Our goals</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {goals.map((goal, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Check className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full p-1 flex-shrink-0" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="my-12 p-8 text-center">
          <p className="text-sm font-semibold text-gray-500 mb-4">Our program is based on methodology</p>
          <h2 className="text-3xl font-bold mb-6">As featured in</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-400">
            {mediaLogos.map((logo) => (
              <span key={logo} className="text-xl font-bold tracking-wider">
                {logo}
              </span>
            ))}
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-center mb-6">
          People just like you achieved great results using our Well-being Management Plan!
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center my-12">
          <div>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="3"
                  strokeDasharray="83, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-teal-500">
                83%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              of users were able to improve their well-being after just 6 weeks
            </p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">77%</p>
            <p className="text-sm text-gray-600 mt-1">of users started with similar levels of energy levels as you</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">45%</p>
            <p className="text-sm text-gray-600 mt-1">of users suffer from the same issues as you</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-12">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">How life might be without Liven</h3>
            <div className="space-y-3">
              {problems.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-gray-600">
                  <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 bg-teal-50/50 border-teal-200">
            <h3 className="font-bold text-lg mb-4">What Liven can help you with</h3>
            <div className="space-y-3">
              {solutions.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-gray-800">
                  <Check className="w-5 h-5 bg-teal-500 text-white rounded-full p-0.5 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="my-12 p-6 bg-gray-100 border-gray-200">
          <div className="flex items-center space-x-4">
            <Image src="/images/award-badge.png" alt="Award Badge" width={80} height={80} />
            <div className="text-sm">
              <p className="font-semibold">Liven is proudly nominated for an</p>
              <p className="font-bold text-teal-600">International Digital Well-being Innovation Award - 2023.</p>
            </div>
          </div>
        </Card>

        <Card className="my-12 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">People often ask</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-bold flex items-start space-x-3">
                  <Info className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-gray-600 mt-2 pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Users love our plans</h2>
          <p className="text-center text-gray-600 mb-8">Here's what people are saying about Liven</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 flex flex-col">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{t.text}</p>
                <p className="font-bold text-sm">{t.name}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl font-bold mb-3">{name}, your personalized plan is ready!</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <BrainIcon />
              <span>
                Main difficulty: <span className="font-semibold">Low energy</span>
              </span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <TargetIcon />
              <span>
                Goal: <span className="font-semibold">State of calm</span>
              </span>
            </div>
          </div>
        </div>

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          GET MY PLAN
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          By clicking "Get My Plan", you agree to our automatic subscription renewal. First month is $49.99, then
          $49.99/month(period). You can cancel via the app or email: support@theliven.com. See{" "}
          <a href="#" className="underline">
            Subscription Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex justify-center items-center space-x-2 mt-4 py-2 border-y border-gray-200">
          <span className="text-xs font-semibold text-gray-500">Pay Safe & Secure</span>
          <Image src="/images/payment-methods.png" alt="Payment methods" width={280} height={40} />
        </div>

        <div className="relative mt-16 mb-8">
          <Card className="p-8 text-center border-2 border-teal-500 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Our plan is backed by a money-back guarantee. We believe that our plan will work for you, that we
              guarantee a full refund within 30 days after purchase if you don't see visible results in your ability to
              reduce negative effects despite following your plan as directed. Find more about applicable limitations in
              our{" "}
              <a href="#" className="underline font-semibold text-teal-600">
                money-back policy
              </a>
              .
            </p>
          </Card>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <GuaranteeSeal />
          </div>
        </div>
      </main>

      <footer className="text-center py-12">
        <p className="text-xs text-gray-400">Chesmint Limited, Lekorpouzier 12a, Limassol, 3075, Cyprus</p>
      </footer>
    </div>
  )
}
