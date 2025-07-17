"use client"

import { useQuote } from "../quote-context"
import { CatIcon } from "../icons/cat-icon"
import { DogIcon } from "../icons/dog-icon"

export function StepGetStarted() {
  const { dispatch } = useQuote()

  const handlePetSelection = (petType: "dog" | "cat") => {
    dispatch({ type: "UPDATE_PET", payload: { type: petType } })
    dispatch({ type: "NEXT_STEP" })
  }

  return (
    <div className="w-full max-w-[632px] bg-white p-8 md:p-12 rounded-lg buddy-shadow-xl ml-12 mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hi there, welcome to Buddy!</h1>
        <p className="text-3xl font-bold text-gray-800">Let's get started, do you have a...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          className="bg-background hover:border-ring border-input hover:bg-blue-ultralight hover:text-secondary-foreground text-foreground group flex h-[180px] flex-col items-center justify-center gap-4 rounded-lg border p-6 transition-all md:w-[244px]"
          onClick={() => handlePetSelection("dog")}
          data-gtm-event="step1-dog-selected"
        >
          <div className="h-16 w-16 text-inherit md:h-20 md:w-20">
            <DogIcon />
          </div>
          <span className="text-secondary-foreground font-medium">Dog</span>
        </button>

        <button
          className="bg-background hover:border-ring border-input hover:bg-blue-ultralight hover:text-secondary-foreground text-foreground group flex h-[180px] flex-col items-center justify-center gap-4 rounded-lg border p-6 transition-all md:w-[244px]"
          onClick={() => handlePetSelection("cat")}
          data-gtm-event="step1-cat-selected"
        >
          <div className="h-16 w-16 text-inherit md:h-20 md:w-20">
            <CatIcon />
          </div>
          <span className="text-secondary-foreground font-medium">Cat</span>
        </button>
      </div>

      <div className="text-left">
        <button
          className="text-[var(--buddy-pink)] font-semibold underline"
          onClick={() => {
            // Handle multiple pets logic
          }}
        >
          Got another pet?
        </button>
      </div>
    </div>
  )
}
