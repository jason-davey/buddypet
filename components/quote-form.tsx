"use client"

import { useQuote } from "./quote-context"
import { StepGetStarted } from "./steps/step-get-started"
import { StepYourPet } from "./steps/step-your-pet"
import { StepYourCover } from "./steps/step-your-cover"
import { StepYourDetails } from "./steps/step-your-details"
import { StepTermsConditions } from "./steps/step-terms-conditions"
import { StepProtectYourPet } from "./steps/step-protect-your-pet"

export function QuoteForm() {
  const { state } = useQuote()

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <StepGetStarted />
      case 2:
        return <StepYourPet />
      case 3:
        return <StepYourCover />
      case 4:
        return <StepYourDetails />
      case 5:
        return <StepTermsConditions />
      case 6:
        return <StepProtectYourPet />
      default:
        return <StepGetStarted />
    }
  }

  return <>{renderStep()}</>
}
