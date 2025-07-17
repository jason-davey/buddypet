import { useQuote } from "./quote-context"
import { PawIcon } from "./icons/paw-icon"
import { CheckCircleIcon } from "./icons/check-circle-icon"

const steps = [
  { number: 1, name: "Your pet" },
  { number: 2, name: "Your cover" },
  { number: 3, name: "Your details" },
  { number: 4, name: "Terms & Conditions" },
  { number: 5, name: "Protect your pet" },
]

export function ProgressBar() {
  const { state } = useQuote()
  // The form has 6 steps, but the progress bar only shows 5.
  // Step 1 is "Get Started", which doesn't appear in the progress bar.
  // So, `state.currentStep` from 2 to 6 maps to progress bar steps 1 to 5.
  const currentProgressBarStep = state.currentStep - 1

  return (
    <div className="w-full bg-[#384559] px-4 py-3 sm:py-3 lg:px-4 sticky top-[76px] lg:top-[90px] z-30">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Progress steps" className="relative md:ml-3">
          <ol className="flex items-center justify-between gap-4">
            {steps.map((step, index) => {
              const isCompleted = step.number < currentProgressBarStep
              const isCurrent = step.number === currentProgressBarStep
              return (
                <li key={step.number} className="relative flex flex-1 items-center last:flex-initial">
                  {index < steps.length - 1 && (
                    <div className="absolute inset-0 flex items-center -z-10" aria-hidden="true">
                      <div className="h-px w-full bg-[#202935]" />
                    </div>
                  )}
                  <button
                    type="button"
                    className="relative bg-[#384559] z-10 flex items-center gap-1 px-2 text-center text-white first:pl-0 md:gap-5 md:px-4 cursor-default"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg sm:h-10 sm:w-10">
                      {isCompleted ? <CheckCircleIcon /> : <PawIcon stepNumber={step.number} isCurrent={isCurrent} />}
                    </span>
                    <span className="hidden text-xs font-medium text-white sm:text-sm md:block">{step.name}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
