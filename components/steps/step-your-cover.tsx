"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tag, Check, HelpCircle, Minus, Plus, Info } from "lucide-react"

type Price = { Fortnightly: number; Monthly: number; Yearly: number }

type Frequency = "Fortnightly" | "Monthly" | "Yearly"
type PlanName = "Gold" | "Silver" | "Bronze"
type Excess = 0 | 200 | 500

interface Plan {
  id: PlanName
  name: string
  price: Price
  basePrice: Price
  excess: Excess
  benefitPercentage: number
  benefitLimit: number
  entryAge: string
  hasAccidentalCover: boolean
  boosterCare: boolean
  routineCare: boolean
}

const initialPlans: Plan[] = [
  {
    id: "Gold",
    name: "Gold Cover",
    price: { Fortnightly: 43.52, Monthly: 94.28, Yearly: 1037.15 },
    basePrice: { Fortnightly: 43.52, Monthly: 94.28, Yearly: 1037.15 },
    excess: 200,
    benefitPercentage: 90,
    benefitLimit: 35000,
    entryAge: "Under 9 years",
    hasAccidentalCover: true,
    boosterCare: false,
    routineCare: false,
  },
  {
    id: "Silver",
    name: "Silver Cover",
    price: { Fortnightly: 37.68, Monthly: 81.63, Yearly: 898.01 },
    basePrice: { Fortnightly: 37.68, Monthly: 81.63, Yearly: 898.01 },
    excess: 200,
    benefitPercentage: 80,
    benefitLimit: 20000,
    entryAge: "Under 9 years",
    hasAccidentalCover: true,
    boosterCare: false,
    routineCare: false,
  },
  {
    id: "Bronze",
    name: "Bronze Cover",
    price: { Fortnightly: 31.74, Monthly: 68.77, Yearly: 756.48 },
    basePrice: { Fortnightly: 31.74, Monthly: 68.77, Yearly: 756.48 },
    excess: 200,
    benefitPercentage: 70,
    benefitLimit: 11000,
    entryAge: "Under 9 years",
    hasAccidentalCover: true,
    boosterCare: false,
    routineCare: false,
  },
]

const FrequencyToggle = ({
  selected,
  onSelect,
}: {
  selected: Frequency
  onSelect: (freq: Frequency) => void
}) => {
  const frequencies: Frequency[] = ["Fortnightly", "Monthly", "Yearly"]
  return (
    <div role="radiogroup" className="relative grid grid-cols-3 gap-2">
      {frequencies.map((freq) => (
        <button
          key={freq}
          type="button"
          role="radio"
          aria-checked={selected === freq}
          onClick={() => onSelect(freq)}
          className={cn(
            "group cursor-pointer appearance-none rounded border px-4 py-1 text-center text-sm font-semibold outline-0 transition-colors disabled:bg-slate-50 disabled:shadow-none lg:w-32 lg:text-base",
            selected === freq
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-900 bg-white text-gray-900 hover:bg-gray-100",
          )}
        >
          {freq}
        </button>
      ))}
    </div>
  )
}

const ExcessToggle = ({
  planId,
  options,
  selected,
  onSelect,
}: {
  planId: string
  options: Excess[]
  selected: Excess
  onSelect: (excess: Excess) => void
}) => (
  <div role="radiogroup" className={`relative grid gap-2 grid-cols-${options.length}`}>
    {options.map((option) => (
      <button
        key={`${planId}-excess-${option}`}
        type="button"
        role="radio"
        aria-checked={selected === option}
        onClick={() => onSelect(option)}
        className={cn(
          "group w-full cursor-pointer appearance-none rounded border bg-white py-0 px-4 text-center text-base font-semibold outline-0 transition-colors disabled:bg-slate-50 disabled:shadow-none",
          selected === option
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-900 text-gray-900 hover:bg-gray-100",
        )}
      >
        ${option}
      </button>
    ))}
  </div>
)

const CareToggle = ({
  label,
  id,
  enabled,
  onToggle,
}: {
  label: React.ReactNode
  id: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
}) => (
  <div className="flex w-full items-center justify-between gap-2">
    <label htmlFor={id} className="w-full text-sm font-normal">
      {label}
      <button type="button" className="relative -m-4 ml-1 p-4 align-middle">
        <HelpCircle className="inline-block h-4 w-4" />
      </button>
    </label>
    <div role="radiogroup" className="relative flex h-10 flex-row rounded-full border border-gray-900 p-0.5">
      <button
        type="button"
        role="radio"
        aria-checked={!enabled}
        onClick={() => onToggle(false)}
        className={cn(
          "flex h-full w-14 items-center justify-center rounded-full border-0 px-0 text-sm font-semibold transition-colors",
          !enabled ? "bg-gray-900 text-white" : "bg-white text-gray-900",
        )}
      >
        No
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={enabled}
        onClick={() => onToggle(true)}
        className={cn(
          "flex h-full w-14 items-center justify-center rounded-full border-0 px-0 text-sm font-semibold transition-colors",
          enabled ? "bg-gray-900 text-white" : "bg-white text-gray-900",
        )}
      >
        Yes
      </button>
    </div>
  </div>
)

const CoverPlanCard = ({
  plan,
  frequency,
  isSelected,
  onSelect,
  onUpdate,
}: {
  plan: Plan
  frequency: Frequency
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updatedPlan: Partial<Plan>) => void
}) => {
  const excessOptions: Excess[] = plan.id === "Bronze" ? [0, 200] : [0, 200, 500]

  return (
    <div
      className={cn(
        "relative row-span-full flex w-full snap-center flex-col gap-6 rounded-xl border-2 bg-white shadow-lg transition-all",
        isSelected ? "border-pink-500 ring-2 ring-pink-500" : "border-gray-200",
      )}
    >
      <div className="rounded-t-md bg-gray-800 p-4 text-center text-2xl font-semibold text-white">{plan.name}</div>
      <div className="flex flex-col items-center gap-2">
        <p className="flex items-center gap-2 text-gray-800">
          <Tag className="h-5 w-5 text-teal-500" />
          <span className="text-xl font-semibold md:text-xl">Get first month free*</span>
        </p>
        <span className="text-center text-3xl md:text-4xl font-bold">${plan.price[frequency].toFixed(2)}</span>
      </div>
      <div className="px-6">
        <Button
          type="button"
          onClick={onSelect}
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "relative w-full rounded-full border-pink-500 py-2 font-semibold outline-offset-4 focus:outline-2",
            isSelected
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "text-pink-500 hover:bg-pink-500/10 bg-transparent",
          )}
        >
          {isSelected ? "Selected" : "Select Cover"}
        </Button>
      </div>
      <div className="px-6">
        <div className="mb-2 flex justify-between text-sm">
          <span>Annual excess</span>
        </div>
        <div className="border-b border-gray-200 pb-4">
          <ExcessToggle
            planId={plan.id}
            options={excessOptions}
            selected={plan.excess}
            onSelect={(excess) => onUpdate({ excess })}
          />
        </div>
      </div>
      <ul className="mb-4 px-6">
        <li className="flex justify-between border-b border-gray-200 py-3 text-sm">
          <span>Benefit %</span>
          <span className="flex items-center font-semibold">{plan.benefitPercentage}%</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 py-3 text-sm">
          <span>Benefit limit</span>
          <span className="flex items-center font-semibold">${plan.benefitLimit.toLocaleString()}</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 py-3 text-sm">
          <span>Entry age</span>
          <span className="flex items-center font-semibold">{plan.entryAge}</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 py-3 text-sm">
          <span>
            Accidental injuries &amp; illnesses
            <sup className="text-pink-500">4</sup>
            <br />
            (Waiting periods apply)
          </span>
          <span className="flex items-center font-semibold">
            <Check className="inline-block h-5 w-5 text-teal-500" />
          </span>
        </li>
      </ul>
      <div className="mt-auto space-y-2 px-6">
        <CareToggle
          id={`${plan.id}-booster`}
          enabled={plan.boosterCare}
          onToggle={(enabled) => onUpdate({ boosterCare: enabled })}
          label={
            <>
              Optional booster care
              <br />
              (up to $2,000)
            </>
          }
        />
        <CareToggle
          id={`${plan.id}-routine`}
          enabled={plan.routineCare}
          onToggle={(enabled) => onUpdate({ routineCare: enabled })}
          label={
            <>
              Optional routine care
              <br />
              (non-insurance benefit up to $100)
            </>
          }
        />
      </div>
      <div className="flex px-6 pb-8">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-3xl border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent"
        >
          See more cover details
        </Button>
      </div>
    </div>
  )
}

const ConfirmationAccordion = ({
  plan,
  petName,
  onConfirm,
  showError,
  selectedPlan,
}: {
  plan: Plan
  petName: string
  onConfirm: (confirmed: boolean) => void
  showError: boolean
  selectedPlan: PlanName
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="border-2 border-gray-800 rounded-lg p-6 mb-6 relative">
        {/* Speech bubble arrow pointing up - positioned under selected plan */}
        <div
          className={cn(
            "absolute -top-3 bg-white px-2",
            selectedPlan === "Bronze" ? "left-1/6" : selectedPlan === "Silver" ? "left-1/2" : "right-1/6",
          )}
        >
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-gray-800 mx-auto mb-1"></div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-4">
          You have selected {plan.name} and acknowledge the level of protection and following benefits are right for you
          and your pet:
        </h4>

        <ul className="list-disc list-inside mb-6 space-y-2 text-sm">
          <li>
            the benefit percentage of <strong>{plan.benefitPercentage}%</strong> and overall annual limit of{" "}
            <strong>${plan.benefitLimit.toLocaleString()}</strong>.
          </li>
        </ul>

        <h5 className="font-semibold text-gray-900 mb-4">You are comfortable and agree that you can afford to pay:</h5>

        <ul className="list-disc list-inside mb-6 space-y-2 text-sm">
          <li>
            the applicable premium for this policy period, which will increase each year and be shared with you at least
            14 days prior to your next renewal for consideration;
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              the vet invoice in full and upfront before submitting a claim for eligible vet expenses unless you use
              GapOnly*, in which case you will only need to pay the gap upfront;
            </span>
            <Info className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          </li>
          <li>
            any vet expenses above the accepted claim amount. This includes any amount above the benefit percentage,
            benefit limit and any other applicable limits that may apply for some conditions, treatments or benefits as
            outlined in the table above.
          </li>
        </ul>

        <div className="mb-6 relative">
          <p className="text-sm mb-4">
            <span>
              Lastly, you acknowledge that this product does not provide cover for chronic pre-existing conditions or
              for general exclusions listed in the PDS.{" "}
            </span>
            <button
              type="button"
              className="relative text-pink-500 underline hover:no-underline"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="inline h-4 w-4" />
            </button>
          </p>

          {showTooltip && (
            <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md text-sm right-0 top-full mt-2">
              <h6 className="font-semibold mb-2">Pre-Existing Conditions</h6>
              <p className="mb-2">A pre-existing condition is a condition that first existed or occurred:</p>
              <ul className="list-disc list-inside mb-2 space-y-1">
                <li>prior to the commencement date of your first policy period; or</li>
                <li>within any applicable waiting period;</li>
              </ul>
              <p className="mb-2">
                <strong>AND</strong>
              </p>
              <p className="mb-2">
                is a condition that you were aware of, or a reasonable person in your circumstances would have been
                aware of, irrespective of whether the underlying or causative condition has been diagnosed.
              </p>
              <p>
                Whether it is a pre-existing condition will depend on its nature and experience. If your pet has a
                temporary condition that has not existed, occurred or shown noticeable signs, symptoms or an abnormality
                in the 18-month period immediately prior to your claim treatment date, it will no longer be excluded
                from cover as a pre-existing condition. Chronic conditions and several other specified conditions that
                are pre-existing conditions cannot fall within this category. For more information, please refer to the
                relevant PDS.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-4">
          <Button
            type="button"
            onClick={() => onConfirm(true)}
            variant="outline"
            className="rounded-full border-pink-900 text-pink-900 hover:bg-pink-900/10 bg-transparent px-8"
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={() => onConfirm(false)}
            className="rounded-full bg-pink-500 text-white hover:bg-pink-600 px-8"
          >
            No
          </Button>
        </div>

        {showError && <p className="text-red-500 text-sm font-medium">You must select 'Yes' to proceed.</p>}
      </div>
    </div>
  )
}

export function StepYourCover() {
  const { state, dispatch } = useQuote()
  const { pet } = state
  const [frequency, setFrequency] = useState<Frequency>("Fortnightly")
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationError, setConfirmationError] = useState(false)

  const calculatePrice = (plan: Plan, updatedValues: Partial<Plan>): Price => {
    const newExcess = updatedValues.excess ?? plan.excess
    const newBoosterCare = updatedValues.boosterCare ?? plan.boosterCare
    const newRoutineCare = updatedValues.routineCare ?? plan.routineCare

    const pricingData = {
      Gold: {
        0: { Fortnightly: 69.76, Monthly: 151.15, Yearly: 1663.48 },
        200: { Fortnightly: 43.52, Monthly: 94.28, Yearly: 1037.15 },
        500: { Fortnightly: 31.74, Monthly: 68.77, Yearly: 756.57 },
      },
      Silver: {
        0: { Fortnightly: 60.29, Monthly: 130.63, Yearly: 1437.6 },
        200: { Fortnightly: 37.68, Monthly: 81.63, Yearly: 898.01 },
        500: { Fortnightly: 28.85, Monthly: 62.5, Yearly: 687.5 },
      },
      Bronze: {
        0: { Fortnightly: 48.34, Monthly: 104.74, Yearly: 1152.24 },
        200: { Fortnightly: 31.74, Monthly: 68.77, Yearly: 756.48 },
      },
    }

    const basePrice = pricingData[plan.id][newExcess] || plan.basePrice

    const calculateAdjustedPrice = (base: number, freq: Frequency) => {
      let adjusted = base

      if (newBoosterCare) {
        const boosterCosts = {
          Gold: {
            0: { Fortnightly: 8.3, Monthly: 17.99, Yearly: 197.11 },
            200: { Fortnightly: 4.94, Monthly: 10.7, Yearly: 117.65 },
            500: { Fortnightly: 3.5, Monthly: 7.58, Yearly: 83.38 },
          },
          Silver: {
            0: { Fortnightly: 7.53, Monthly: 16.31, Yearly: 178.82 },
            200: { Fortnightly: 4.48, Monthly: 9.71, Yearly: 106.81 },
            500: { Fortnightly: 3.2, Monthly: 6.93, Yearly: 76.23 },
          },
          Bronze: {
            0: { Fortnightly: 5.91, Monthly: 12.81, Yearly: 140.87 },
            200: { Fortnightly: 3.53, Monthly: 7.65, Yearly: 84.15 },
          },
        }

        const excessKey = newExcess as keyof typeof boosterCosts.Gold
        if (boosterCosts[plan.id][excessKey]) {
          adjusted += boosterCosts[plan.id][excessKey][freq]
        }
      }

      if (newRoutineCare) {
        const routineCosts = {
          Fortnightly: 2.82,
          Monthly: 6.11,
          Yearly: 73.33,
        }
        adjusted += routineCosts[freq]
      }

      return Math.round(adjusted * 100) / 100
    }

    return {
      Fortnightly: calculateAdjustedPrice(basePrice.Fortnightly, "Fortnightly"),
      Monthly: calculateAdjustedPrice(basePrice.Monthly, "Monthly"),
      Yearly: calculateAdjustedPrice(basePrice.Yearly, "Yearly"),
    }
  }

  const handleUpdatePlan = (planId: PlanName, updatedValues: Partial<Plan>) => {
    setPlans((prevPlans) =>
      prevPlans.map((p) => {
        if (p.id === planId) {
          const newPrice = calculatePrice(p, updatedValues)
          return { ...p, ...updatedValues, price: newPrice }
        }
        return p
      }),
    )
  }

  const handleSelectPlan = (planId: PlanName) => {
    setSelectedPlan(planId)
    setShowConfirmation(true)
    setConfirmationError(false)
  }

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      const finalPlan = plans.find((p) => p.id === selectedPlan)
      if (finalPlan) {
        dispatch({
          type: "UPDATE_COVER_DETAILS",
          payload: {
            plan: finalPlan.id.toLowerCase() as "gold" | "silver" | "bronze",
            paymentFrequency: frequency,
            ...finalPlan,
          },
        })
        dispatch({ type: "NEXT_STEP" })
      }
    } else {
      setConfirmationError(true)
    }
  }

  const handleContinue = () => {
    if (selectedPlan && showConfirmation) {
      handleConfirmation(true)
    }
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  const currentPlanDetails = selectedPlan ? plans.find((p) => p.id === selectedPlan) : null

  return (
    <div className="w-full lg:px-8 lg:py-6">
      <form
        className="mx-auto w-full max-w-container overflow-hidden bg-white lg:rounded-lg lg:shadow-lg"
        onSubmit={(e) => {
          e.preventDefault()
          handleContinue()
        }}
      >
        <div className="mb-4 px-4 py-2 sm:mb-0 sm:px-10 sm:py-8">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
            <p className="font-sans text-2xl font-semibold leading-8 text-gray-900 md:leading-10">Your cover options</p>
            <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center lg:gap-6">
              <p className="whitespace-nowrap text-sm font-semibold text-gray-800">Payment frequency</p>
              <FrequencyToggle selected={frequency} onSelect={setFrequency} />
            </div>
          </div>
          <hr className="mb-5 hidden h-px w-full bg-gray-200 sm:block" />
          <div className="grid items-center gap-1 text-left lg:grid-cols-[1fr_560px]">
            <div className="w-full">
              <p className="mb-1 text-sm text-gray-600 sm:mb-3">Promotion applied:</p>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-teal-500" />
                <h2 className="font-semibold text-gray-900 text-3xl">First month free offer*</h2>
              </div>
            </div>
            <div className="max-w-[560px]">
              <p className="text-xs text-gray-600">
                Each new policy purchased on or after 21/06/2025 is entitled to the first month free in your first year
                of cover. All quotes provided automatically include this offer.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-pink-500 underline hover:no-underline"
              >
                *See full terms and conditions
              </a>
            </div>
          </div>
        </div>

        <section className="border-t border-teal-500/50">
          <button
            type="button"
            className="flex w-full justify-between bg-teal-500/20 px-4 py-2 text-left sm:items-center sm:px-8 sm:py-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-xl leading-tight text-gray-700 sm:text-2xl sm:leading-tight font-bold">
              Select a level of Accidental Injury &amp; Illness Cover for
              <span className="capitalize text-pink-500"> {pet.name || "your pet"}</span>
            </h3>
            <span className="flex items-center text-teal-500">{isExpanded ? <Minus /> : <Plus />}</span>
          </button>
          {isExpanded && (
            <div className="grid w-full snap-both snap-mandatory grid-cols-[repeat(3,calc(100%_-_30px))] gap-4 overflow-x-auto scroll-smooth px-4 py-6 sm:grid-flow-col sm:grid-cols-[repeat(3,1fr)] sm:px-8 min-[920px]:overflow-x-hidden">
              {plans.map((plan) => (
                <CoverPlanCard
                  key={plan.id}
                  plan={plan}
                  frequency={frequency}
                  isSelected={selectedPlan === plan.id}
                  onSelect={() => handleSelectPlan(plan.id)}
                  onUpdate={(updatedValues) => handleUpdatePlan(plan.id, updatedValues)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Confirmation Accordion */}
        {showConfirmation && selectedPlan && currentPlanDetails && (
          <section>
            <ConfirmationAccordion
              plan={currentPlanDetails}
              petName={pet.name || "your pet"}
              onConfirm={handleConfirmation}
              showError={confirmationError}
              selectedPlan={selectedPlan}
            />
          </section>
        )}

        <div className="mt-6 grid flex-col justify-normal gap-4 border-t border-teal-500/25 px-9 pt-6 pb-0 text-center md:mt-0 md:grid-cols-2 md:justify-between md:gap-x-8 md:gap-y-10 md:pb-6">
          <div className="flex flex-col gap-3 pb-6 md:px-0 md:pb-0">
            <div className="grid items-center gap-1 text-left">
              <div className="w-full">
                <p className="mb-1 text-sm text-gray-600 sm:mb-3">Promotion applied:</p>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-teal-500" />
                  <h2 className="text-xl font-semibold text-gray-900">First month free offer*</h2>
                </div>
              </div>
              <div className="max-w-[560px]">
                <p className="text-xs text-gray-600">
                  Each new policy purchased on or after 21/06/2025 is entitled to the first month free in your first
                  year of cover. All quotes provided automatically include this offer.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-500 underline hover:no-underline"
                >
                  *See full terms and conditions
                </a>
              </div>
            </div>
            <hr />
            <div className="grid w-full gap-2 md:gap-3">
              <p className="flex justify-between text-base font-bold sm:text-2xl">
                <span>
                  Total Per{" "}
                  <span className="capitalize">
                    {frequency === "Fortnightly" ? "Fortnight" : frequency.toLowerCase()}
                  </span>
                </span>
                <span>{currentPlanDetails ? `$${currentPlanDetails.price[frequency].toFixed(2)}` : "-"}</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col-reverse gap-3 md:grid md:grid-cols-2 md:justify-between">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="h-16 w-full rounded-full border-pink-500 text-gray-900 hover:bg-pink-500/10 focus:outline-2 md:w-40 bg-transparent"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!selectedPlan || !showConfirmation}
                className="h-16 w-full rounded-full border border-pink-500 bg-pink-500 text-white hover:enabled:bg-pink-600 hover:enabled:border-pink-600 focus:outline-2 disabled:pointer-events-none disabled:opacity-50 md:max-w-full"
              >
                Continue
              </Button>
            </div>
          </div>

          <div className="row-start-3 -mx-8 flex h-auto items-center gap-4 rounded-lg bg-buddy-bg-light p-6 md:row-start-1 md:mx-0 xl:h-48">
            <Image
              className="w-24 flex-shrink-0 mix-blend-darken sm:w-32 lg:-mt-7"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/animal-welfare-badge.8804d18d-BazoJNwyiGwfCWMyhSwGt1il9bV3bh.webp"
              alt="Animal Welfare - $1M guaranteed support"
              width={128}
              height={128}
            />
            <p className="text-left">
              <strong className="block text-xl xl:text-2xl font-extrabold">
                Supporting Australia's animal welfare community
              </strong>
              <span className="text-sm text-gray-600">
                At Buddy we're committed to giving $1 million in support to animal welfare, vet welfare, and animal
                research charities and organisations across Australia.
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
