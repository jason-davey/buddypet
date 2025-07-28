"use client"

import Image from "next/image"
import { Phone, Wrench } from "lucide-react"
import { useQuote } from "./quote-context"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const { state, dispatch } = useQuote()

  const handleToggleDevMode = () => {
    dispatch({ type: "TOGGLE_DEV_MODE" })
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md h-[76px] lg:h-[90px]">
      <div className="max-w-container mx-auto flex h-full items-center justify-between px-4">
        <a href="/" aria-label="Buddy Pet Insurance Home" className="ml-8">
          <Image
            src="/logo.svg"
            alt="Buddy Pet Insurance"
            width={150}
            height={61}
            className="h-[40px] w-auto lg:h-[61px]"
          />
        </a>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleDevMode}
            className={cn(
              "border-dashed",
              state.devMode
                ? "border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                : "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600",
            )}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Dev Mode: {state.devMode ? "ON" : "OFF"}
          </Button>
          <a
            href="tel:1300678489"
            className="hidden sm:flex items-center gap-2 rounded-3xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            <Phone className="h-5 w-5 text-pink-500" />
            <span>
              Call <span className="font-semibold">1300 678 489</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
