"use client"

import { Suspense } from "react"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Mock do QuizLayout para o exemplo funcionar de forma independente
const QuizLayout = ({ children, step, totalSteps }: { children: React.ReactNode, step: number, totalSteps: number }) => (
    <div className="bg-[#f5f3f0] min-h-screen">
      {children}
    </div>
);

function Step30Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.toString();
  
  const handleContinue = () => {
    router.push(`/quiz/step-31?${query}`)
  }
  
  // Array para gerar os raios de sol de forma programática
  const sunRayCount = 16;

  return (
    <QuizLayout step={26} totalSteps={26}>
      <header className="w-full px-6 py-4 flex justify-between items-center bg-[#f5f3f0] z-20">
        <Link href={`/quiz/step-29?${query}`} className="p-2">
          <ArrowLeft className="w-6 h-6 text-black" />
        </Link>
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="flex flex-col items-center justify-center px-3 pt-1 pb-2 max-w-2xl mx-auto mt-4">
        <div className="relative w-48 h-48 mx-auto mb-8">
          
          {/* Brilho de sol (camada de trás) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-5"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255, 223, 102, 0.4) 0%, rgba(255, 223, 102, 0) 70%)' }}
          ></div>
            
          <Image
            src="/images/humanBrain.png"
            alt="Human Brain"
            width={120}
            height={120}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker id="arrowhead" markerWidth="3" markerHeight="4" refX="1.5" refY="2" orient="auto">
                <polygon points="0 0, 3 2, 0 4" fill="currentColor" />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              </filter>
            </defs>

            <circle cx="50" cy="50" r="48" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="3 3" />
            
            <g className="text-yellow-400 opacity-50">
              {Array.from({ length: sunRayCount }).map((_, i) => {
                const angle = (i * 360) / sunRayCount;
                const startRadius = 30;
                const endRadius = 48;
                const x1 = 50 + startRadius * Math.cos((angle * Math.PI) / 180);
                const y1 = 50 + startRadius * Math.sin((angle * Math.PI) / 180);
                const x2 = 50 + endRadius * Math.cos((angle * Math.PI) / 180);
                const y2 = 50 + endRadius * Math.sin((angle * Math.PI) / 180);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />;
              })}
            </g>

            <g filter="url(#glow)" opacity="0.6">
                <path d="M 25 25 A 40 40 0 0 1 75 25" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <path d="M 75 75 A 40 40 0 0 1 25 75" stroke="white" strokeWidth="5" strokeLinecap="round" />
            </g>

            <g className="text-gray-400">
                <path d="M 65 15 A 40 40 0 0 1 85 35" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <path d="M 85 65 A 40 40 0 0 1 65 85" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <path d="M 35 85 A 40 40 0 0 1 15 65" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <path d="M 15 35 A 40 40 0 0 1 35 15" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            </g>
          </svg>
          
          {/* Rótulos de texto */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap z-20 shadow-sm border border-gray-200">
            Thoughts
          </div>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap z-20 shadow-sm border border-gray-200">
            Feelings
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap z-20 shadow-sm border border-gray-200">
            Behavior
          </div>
        </div>

        {/* --- CONTEÚDO RESTAURADO AQUI --- */}
        <div className="text-center space-y-6 mb-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            Your plan will be reviewed by our <span className="text-teal-600">science team</span>
          </h1>
          <p className="text-gray-500 text-sm italic">
            "I love that Liven incorporates science-backed techniques to provide personalized content and resources to its users. This approach enhances their emotional well-being."
          </p>
          
          <div className="w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full w-1.5 bg-teal-300"></div>
             <div className="absolute -top-4 -right-4 w-16 h-16 bg-teal-500/10 rounded-full"></div>
             <div className="pl-4">
                 <p className="text-xs font-semibold text-teal-600 mb-2">Content reviewed by an expert</p>
                 <div className="flex items-center gap-3">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-800 text-sm">Anieta Dixon, MA, SME</p>
                       <p className="text-xs text-gray-500">Practicing mindset coach</p>
                     </div>
                 </div>
             </div>
          </div>
        </div>
        
        <button
          onClick={handleContinue}
          className="w-full max-w-sm bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-full text-lg transition-colors"
        >
          Continue
        </button>
      </main>
    </QuizLayout>
  )
}

export default function Step30() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Step30Content />
    </Suspense>
  )
}
