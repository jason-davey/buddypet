"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Info } from "lucide-react"

export function StepYourDetails() {
  const { state, dispatch } = useQuote()
  const [formData, setFormData] = useState(state.personalDetails)

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    dispatch({ type: "UPDATE_PERSONAL_DETAILS", payload: updatedData })
  }

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" })
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-buddy-bg-light relative">
      {/* Main Content Container */}
      <div className="flex-grow relative z-20 flex items-start justify-start pt-10 pb-10 px-4 lg:pl-12">
        <div className="flex w-full max-w-7xl gap-8">
          {/* Form Section */}
          <div className="w-full max-w-[632px]">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="step4-your-details">
                  Your details
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">What is your title? *</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {["Mr", "Mrs", "Miss", "Ms", "Dr"].map((title) => (
                        <Button
                          key={title}
                          type="button"
                          variant={formData.title === title ? "default" : "outline"}
                          onClick={() => handleInputChange("title", title)}
                          className="h-10 text-sm"
                        >
                          {title}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-4 block">Your address</Label>
                    <div className="space-y-4">
                      <div>
                        <Input
                          id="address"
                          value={formData.address || ""}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Enter address"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <a href="#" className="text-pink-600 text-sm underline">
                          Can't find your address?
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-base font-medium">Authorised Person</Label>
                      <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Would you like to authorise an additional person who can submit claims and make enquiries about
                      the policy?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={formData.authorizedPerson === "yes" ? "default" : "outline"}
                        onClick={() => handleInputChange("authorizedPerson", "yes")}
                        className="h-12"
                      >
                        Yes
                      </Button>
                      <Button
                        type="button"
                        variant={formData.authorizedPerson === "no" ? "default" : "outline"}
                        onClick={() => handleInputChange("authorizedPerson", "no")}
                        className="h-12"
                      >
                        No
                      </Button>
                    </div>
                  </div>

                  {formData.authorizedPerson === "yes" && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        I confirm that I have permission to disclose the authorised person's details listed below.
                      </p>

                      <div>
                        <Label htmlFor="authFirstName" className="text-sm font-medium text-gray-700">
                          Their first name
                        </Label>
                        <Input
                          id="authFirstName"
                          value={formData.authorizedFirstName || ""}
                          onChange={(e) => handleInputChange("authorizedFirstName", e.target.value)}
                          placeholder="Jenny"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="authLastName" className="text-sm font-medium text-gray-700">
                          Their last name
                        </Label>
                        <Input
                          id="authLastName"
                          value={formData.authorizedLastName || ""}
                          onChange={(e) => handleInputChange("authorizedLastName", e.target.value)}
                          placeholder="Dewey"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="authDob" className="text-sm font-medium text-gray-700">
                          Their date of birth
                        </Label>
                        <Input
                          id="authDob"
                          type="date"
                          value={formData.authorizedDob || ""}
                          onChange={(e) => handleInputChange("authorizedDob", e.target.value)}
                          className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          An additional authorised person must be over 18 years old.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-base font-medium block mb-3">
                      Select how you would like to receive your insurance documents
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={formData.documentDelivery === "email" ? "default" : "outline"}
                        onClick={() => handleInputChange("documentDelivery", "email")}
                        className="h-12"
                      >
                        Email
                      </Button>
                      <Button
                        type="button"
                        variant={formData.documentDelivery === "post" ? "default" : "outline"}
                        onClick={() => handleInputChange("documentDelivery", "post")}
                        className="h-12"
                      >
                        Post
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You can change how you receive your insurance documents at any time by calling us on 1300 678 489.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <Button
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 h-14 text-lg font-medium rounded-full"
                      onClick={handleContinue}
                      data-gtm-event="step4-details-submitted"
                    >
                      Continue
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="w-full h-14 text-lg font-medium rounded-full border-2 border-pink-500 text-gray-800 bg-transparent hover:bg-pink-50"
                    >
                      Back
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 pt-2">
                    By clicking 'Continue' you acknowledge that you have had an opportunity to review and consider the
                    relevant{" "}
                    <a href="#" className="text-pink-600 underline">
                      Policy Booklet
                    </a>{" "}
                    and that your personal information is collected, used and disclosed in accordance with our{" "}
                    <a href="#" className="text-pink-600 underline">
                      Privacy Collection Notice
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Callout Card - Desktop Only, positioned to align with form top and sticky with proper margin */}
          <div className="hidden lg:block w-full max-w-[424px]">
            <div className="sticky top-48 z-50">
              {/* Triangle arrow pointing left - exact match to live site */}
              <div className="absolute -left-4 top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 rotate-45 transform bg-white lg:block"></div>

              {/* Main callout content */}
              <div className="grid w-full grid-cols-[1fr_96px] items-end gap-4 gap-x-2 overflow-hidden bg-white p-4 px-6 pr-0 pt-3 shadow-md md:items-center lg:min-h-24 lg:justify-center lg:rounded-lg lg:p-4 lg:px-6 lg:pr-0">
                {/* First section - You're almost there */}
                <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold text-gray-900 leading-5">You're almost there!</h2>
                  </div>
                  <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                    Only a few more details to get protected from the unexpected.
                  </p>
                </div>

                {/* Second section - Did you know */}
                <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                  <div className="sticky top-20 z-50">
                    <div className="flex items-center gap-1">
                      <h2 className="font-semibold text-gray-900 leading-5">Did you know?</h2>
                    </div>
                    <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                      Once covered, you'll get <strong className="text-pink-600">24/7 Live Vet Support</strong>,
                      exclusive pet discounts and perks with <strong className="text-pink-600">myPetPass™</strong> and
                      access to easy on-the-spot claims with <strong className="text-pink-600">GapOnly®</strong>.{" "}
                      <button
                        type="button"
                        className="z-40 -m-4 p-0 pb-1 px-[9px] relative -top-[1px]"
                        aria-label="Show tooltip info"
                      >
                        <Info className="inline-block h-4 w-4" />
                      </button>
                    </p>
                  </div>
                </div>

                {/* Charlie image - positioned in grid */}
                <div className="col-start-2 row-start-1 flex justify-end self-end row-end-3">
                  <Image
                    src="/charlie.webp"
                    alt="Charlie the dog"
                    width={88}
                    height={88}
                    className="max-w-[88px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile callout card - appears at top on mobile */}
        <div className="block lg:hidden mx-4 mt-4 mb-6 absolute top-0 left-0 right-0 z-40">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">You're almost there!</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Only a few more details to get protected from the unexpected.
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong className="text-gray-900">Did you know?</strong>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Once covered, you'll get <strong className="text-pink-600">24/7 Live Vet Support</strong>, exclusive
                    pet discounts and perks with <strong className="text-pink-600">myPetPass™</strong> and access to
                    easy on-the-spot claims with <strong className="text-pink-600">GapOnly®</strong>.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/charlie.webp"
                  alt="Charlie the dog"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dalmatian mascot */}
      <div className="absolute bottom-0 right-8 z-10 w-1/3 max-w-xs lg:max-w-md hidden lg:block pointer-events-none">
        <Image
          src="/dalmatian-mascot.svg"
          alt="Happy Dalmatian mascot"
          width={500}
          height={750}
          className="w-full h-auto"
        />
      </div>

      {/* Background wave */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <Image
          src="/background-wave.svg"
          alt=""
          width={1440}
          height={317}
          className="w-full h-auto"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
