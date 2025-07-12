import { Menu } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        <span className="text-xl font-bold text-black">Liven</span>
      </Link>
      <button className="p-2">
        <Menu className="w-6 h-6 text-black" />
      </button>
    </header>
  )
}
