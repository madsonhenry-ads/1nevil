"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, XCircle, Info, ChevronRight, Clock } from "lucide-react"
import Image from "next/image"
import Countdown from "react-countdown"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

// --- SVG Icons ---
const LivenLogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="black" />
    <path d="M12.875 22V10H15.125V22H12.875ZM17.125 22V10H19.375V22H17.125Z" fill="white" />
  </svg>
)

const GuaranteeSeal = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 64C32 64 64 54 64 32V10L32 0L0 10V32C0 54 32 64 32 64Z" fill="#2DD4BF" />
    <path d="M22 32.5L28.5 39L44 23.5" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// --- Promo Code Banner Component ---
const PromoCodeBanner = ({ promoCode }) => {
  // Renderer for the countdown timer
  const countdownRenderer = ({ minutes, seconds }) => {
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 tracking-wider">
          <span>{String(minutes).padStart(2, "0")}</span>
          <span className="mx-1 text-green-600">:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="text-[10px] text-gray-500 -mt-1 flex justify-between px-1">
          <span>minutes</span>
          <span>seconds</span>
        </div>
      </div>
    );
  };

  return (
    // Main container with relative positioning for the cutouts
    <div className="relative bg-[#E9F7EB] border border-[#B2DFB9] rounded-lg p-4 mb-8 font-sans">
      {/* Left cutout */}
      <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-5 bg-[#F9F9F7] rounded-full"></div>
      {/* Right cutout */}
      <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-[#F9F9F7] rounded-full"></div>

      {/* Top part */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="bg-[#D4EFDF] p-1.5 rounded-md">
           <svg className="w-5 h-5 text-[#27AE60]" fill="currentColor" viewBox="0 0 20 20"><path d="M18.484 11.25l-8.25-8.25a.75.75 0 00-1.06 0l-8.25 8.25a.75.75 0 000 1.06l8.25 8.25a.75.75 0 001.06 0l8.25-8.25a.75.75 0 000-1.06zM12 5.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </div>
        <p className="font-semibold text-[#27AE60] text-lg">Your promo code applied!</p>
      </div>

      {/* Bottom part */}
      <div className="flex items-stretch space-x-3">
        {/* Promo code display */}
        <div className="flex-grow flex items-center bg-white border border-gray-200 rounded-md px-4 py-2">
          <Check className="w-5 h-5 text-white bg-green-500 rounded-full p-0.5 mr-3 flex-shrink-0" />
          <span className="font-bold text-gray-800 text-md truncate">{promoCode}</span>
        </div>
        {/* Timer display */}
        <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center justify-center">
           <Countdown date={Date.now() + 583000} renderer={countdownRenderer} /> {/* Approx. 9:43 */}
        </div>
      </div>
    </div>
  );
};


// --- Pricing Option Component ---
const PricingOption = ({
  id,
  label,
  price,
  originalPrice,
  perDay,
  isPopular,
  selectedPlan,
  setSelectedPlan,
  discount,
}) => (
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
            <div className="flex items-center space-x-2">
              {originalPrice && <span className="text-sm text-gray-400 line-through">{originalPrice}$</span>}
              <span className="text-sm text-teal-600 font-bold">{price}$</span>
              {discount && <Badge className="bg-red-500 text-white text-xs px-2 py-1">{discount}% OFF</Badge>}
            </div>
          </div>
        </div>
        <div className="text-right bg-gray-100 px-3 py-1 rounded-md">
          <div className="font-bold text-lg text-gray-800">
            $<span className="text-2xl">{perDay.split(".")[0]}</span>
            <sup className="text-lg font-bold">,{perDay.split(".")[1]}</sup>
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

// --- Main Page Component ---
export default function Step40() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "madson"
  const [selectedPlan, setSelectedPlan] = useState("plan-2")
  const [promoCode, setPromoCode] = useState("")

  useEffect(() => {
    const date = new Date()
    // Formats the month with the first three letters and the first letter capitalized
    const month = date.toLocaleString("en-US", { month: "short" }).charAt(0).toUpperCase() + date.toLocaleString("en-US", { month: "short" }).slice(1)
    const year = date.getFullYear()
    setPromoCode(`Promo_${month}${year}`)
  }, [])

  const checkoutUrls = {
    "plan-1": "https://pay.hotmart.com/D100838092L?off=wm2ocbeh&checkoutMode=6",
    "plan-2": "https://pay.hotmart.com/D100838092L?off=tkhn3sa2&checkoutMode=6",
    "plan-3": "https://pay.hotmart.com/D100838092L?off=mjpmb8c6&checkoutMode=6",
  }

  const handleGetMyPlan = () => {
    const checkoutUrl = checkoutUrls[selectedPlan]
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank")
    }
  }

  const goals = [
    "You wake up full of energy",
    "You no longer feel overwhelmed or anxious",
    "You are no longer blocked by mental rumination",
    "You improve your overall emotional well-being",
    "Increase your energy level and achieve your goals",
    "Your self-confidence is at its highest",
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

  const pricingPlans = [
    {
      id: "plan-1",
      label: "7-DAY PLAN",
      price: "7.00",
      originalPrice: "14.00",
      perDay: "1.00",
      isPopular: false,
      discount: 50,
    },
    {
      id: "plan-2",
      label: "1-MONTH PLAN",
      price: "23.00",
      originalPrice: "46.00",
      perDay: "0.76",
      isPopular: true,
      discount: 50,
    },
    {
      id: "plan-3",
      label: "3-MONTH PLAN",
      price: "47.00",
      originalPrice: "94.00",
      perDay: "0.50",
      isPopular: false,
      discount: 50,
    },
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
            GET MY PROGRAM
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        <div className="text-center mt-8 mb-8">
          <h1 className="text-3xl font-bold mb-3">{name}, your personalized program is ready!</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Image src="/images/brain.png" alt="Brain icon" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Main difficulty:</p>
                <p className="font-semibold text-gray-800 leading-tight">Low energy</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Image src="/images/target.png" alt="Target icon" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Goal:</p>
                <p className="font-semibold text-gray-800 leading-tight">State of calm</p>
              </div>
            </div>
          </div>
        </div>
        
        <PromoCodeBanner promoCode={promoCode} />

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          GET MY PROGRAM
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          By clicking "Get My Program", you agree to our automatic subscription renewal. The discounted price applies to the first payment only. You can cancel via the app or by email: support@theliven.com. See the{" "}
          <a href="#" className="underline">
            Subscription Policy
          </a>{" "}
          for more details.
        </p>
        <div className="flex flex-col items-center justify-center space-y-3 mt-4 py-4 border-y border-gray-200">
          <div className="flex items-center space-x-2 bg-teal-100/60 text-teal-700 font-semibold text-sm rounded-full px-4 py-1.5">
            <Check className="w-4 h-4 text-teal-600" />
            <span>Safe & Secure Payment</span>
          </div>
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
        
        <h2 className="text-2xl font-bold text-center mb-6">
          People like you have achieved great results with our Wellness Management Program!
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center my-12">
          <div>
            <div className="relative w-32 h-32 mx-auto">
              <CircularProgressbar
                value={83}
                text="83%"
                styles={buildStyles({
                  textColor: "#14B8A6",
                  pathColor: "#14B8A6",
                  trailColor: "#E6E6E6",
                })}
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">of users were able to improve their well-being after just 6 weeks</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">77%</p>
            <p className="text-sm text-gray-600 mt-1">of users started with energy levels similar to yours</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-teal-500">45%</p>
            <p className="text-sm text-gray-600 mt-1">of users suffer from the same issues as you</p>
          </div>
        </div>

        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Users love our programs</h2>
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
          <h1 className="text-3xl font-bold mb-3">{name}, your personalized program is ready!</h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Image src="/images/brain.png" alt="Brain icon" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Main difficulty:</p>
                <p className="font-semibold text-gray-800 leading-tight">Low energy</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Image src="/images/target.png" alt="Target icon" width={24} height={24} />
              <div className="text-left">
                <p className="text-gray-500 leading-tight">Goal:</p>
                <p className="font-semibold text-gray-800 leading-tight">State of calm</p>
              </div>
            </div>
          </div>
        </div>

        {renderPricing()}

        <Button
          onClick={handleGetMyPlan}
          className="w-full bg-teal-500 hover:bg-teal-600 rounded-full py-4 text-lg font-bold text-white mt-6 pulse-button"
        >
          GET MY PROGRAM
        </Button>
        <p className="text-[11px] text-gray-500 text-center mt-3">
          By clicking "Get My Program", you agree to our automatic subscription renewal. The discounted price applies to the first payment only. You can cancel via the app or by email: support@theliven.com. See the{" "}
          <a href="#" className="underline">
            Subscription Policy
          </a>{" "}
          for more details.
        </p>
        <div className="flex flex-col items-center justify-center space-y-3 mt-4 py-4 border-y border-gray-200">
          <div className="flex items-center space-x-2 bg-teal-100/60 text-teal-700 font-semibold text-sm rounded-full px-4 py-1.5">
            <Check className="w-4 h-4 text-teal-600" />
            <span>Safe & Secure Payment</span>
          </div>
          <Image src="/images/payment-methods.png" alt="Payment methods" width={280} height={40} />
        </div>

        <div className="relative mt-16 mb-8">
          <Card className="p-8 text-center border-2 border-teal-500 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Our program is backed by a money-back guarantee. We believe our program will work for you, which is why we guarantee a full refund within 30 days of purchase if you do not see visible results in your ability to reduce negative effects despite following your program as directed. To learn more about the applicable limitations, see our{" "}
              <a href="#" className="underline font-semibold text-teal-600">
                refund policy
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
