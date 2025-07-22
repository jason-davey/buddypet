"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircleIcon } from "../icons/check-circle-icon"

interface CoverOption {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  popular?: boolean
}

const coverOptions: CoverOption[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: "$29.88",
    period: "Fortnight",
    features: [
      "The benefit percentage of 70% and overall annual limit of $11,000",
      "Covers accidents, illnesses, and emergency care",
      "24/7 vet helpline included",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "$39.88",
    period: "Fortnight",
    features: [
      "The benefit percentage of 80% and overall annual limit of $15,000",
      "Covers accidents, illnesses, and emergency care",
      "24/7 vet helpline included",
      "Dental coverage included",
    ],
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    price: "$49.88",
    period: "Fortnight",
    features: [
      "The benefit percentage of 90% and overall annual limit of $20,000",
      "Covers accidents, illnesses, and emergency care",
      "24/7 vet helpline included",
      "Dental coverage included",
      "Alternative therapies covered",
    ],
  },
]

interface ConfirmationAccordionProps {
  selectedPlan: string
}

function ConfirmationAccordion({ selectedPlan }: ConfirmationAccordionProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const getArrowPosition = () => {
    switch (selectedPlan) {
      case "bronze":
        return "left-[16.67%]"
      case "silver":
        return "left-[50%]"
      case "gold":
        return "left-[83.33%]"
      default:
        return "left-[50%]"
    }
  }

  if (!selectedPlan) return null

  return (
    <div className="relative -mt-[47px]">
      {/* Speech bubble arrow */}
      <div className={`absolute ${getArrowPosition()} transform -translate-x-1/2 z-0`}>
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-gray-800"></div>
      </div>

      {/* Confirmation content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg relative z-10">
        <p className="text-sm text-gray-700 mb-4">
          You have selected{" "}
          <strong>
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Accidental Injury & Illness Cover
          </strong>{" "}
          and acknowledge the level of protection and following benefits are right for you and your pet:
        </p>

        <ul className="space-y-2 mb-6">
          {coverOptions
            .find((option) => option.id === selectedPlan)
            ?.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
        </ul>

        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-3">
            Do you want to continue with <strong>{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</strong>{" "}
            cover?
          </p>
          <div className="flex gap-3">
            <Button
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium text-base"
              onClick={() => setShowConfirmation(true)}
            >
              Yes
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-base bg-transparent"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </Button>
          </div>
        </div>

        {showConfirmation && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-green-800 font-medium">Great choice! Your {selectedPlan} plan is confirmed.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function StepYourCover() {
  const { state, dispatch } = useQuote()
  const [selectedCover, setSelectedCover] = useState<string>(state.selectedCover || "")

  const handleCoverSelect = (coverId: string) => {
    setSelectedCover(coverId)
    dispatch({ type: "SELECT_COVER", payload: coverId })
  }

  const handleNext = () => {
    if (selectedCover) {
      dispatch({ type: "NEXT_STEP" })
    }
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" id="step4-your-cover">
                Choose your cover
              </h2>

              <p className="text-sm text-gray-600 mb-8">Select the level of cover that's right for you and your pet</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {coverOptions.map((option) => (
                  <div key={option.id} className="relative">
                    {option.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedCover === option.id
                          ? "border-2 border-black shadow-lg"
                          : "border border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleCoverSelect(option.id)}
                    >
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">{option.name}</CardTitle>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-gray-900">{option.price}</span>
                          <span className="text-sm text-gray-500 ml-1">/{option.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          variant="outline"
                          className="w-full mb-4 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                        >
                          See more cover details
                        </Button>
                        <ul className="space-y-2">
                          {option.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                              <CheckCircleIcon className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <ConfirmationAccordion selectedPlan={selectedCover} />

              <div className="flex flex-col gap-4 mt-8">
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium"
                  onClick={handleNext}
                  disabled={!selectedCover}
                  data-gtm-event="step4-cover-selected"
                >
                  Continue
                </Button>
                <Button variant="outline" onClick={handleBack} className="w-full bg-transparent">
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full"
                  style={{ backgroundImage: "url('/charlie.webp')" }}
                />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Choose your cover</h3>
                  <p className="text-sm text-blue-800">
                    Select the level of protection that's right for you and your pet. Each plan offers different
                    benefits and coverage limits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
