"use client"

import type React from "react"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, Info } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FormErrors {
  name?: string
  gender?: string
  desexed?: string
  breed?: string
  age?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  postcode?: string
  state?: string
  phone?: string
  email?: string
}

export function StepYourPet() {
  const { state, dispatch } = useQuote()
  const [petData, setPetData] = useState(state.pet)
  const [personalData, setPersonalData] = useState(state.personalDetails)
  const [errors, setErrors] = useState<FormErrors>({})

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handlePetInputChange = (field: keyof typeof petData, value: string) => {
    if (value.trim() !== "") {
      clearError(field as keyof FormErrors)
    }
    const updatedData = { ...petData, [field]: value }
    setPetData(updatedData)
    dispatch({ type: "UPDATE_PET", payload: updatedData })
  }

  const handlePersonalInputChange = (field: keyof typeof personalData, value: string) => {
    if (value.trim() !== "") {
      clearError(field as keyof FormErrors)
    }
    const updatedData = { ...personalData, [field]: value }
    setPersonalData(updatedData)
    dispatch({ type: "UPDATE_PERSONAL_DETAILS", payload: updatedData })
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    if (!petData.name?.trim()) {
      newErrors.name = "Please enter your pet's name."
    }
    if (!petData.gender) {
      newErrors.gender = "Please select if your pet is male or female."
    }
    if (!petData.desexed) {
      newErrors.desexed = "Please let us know if your pet is desexed."
    }
    if (!petData.breed?.trim()) {
      newErrors.breed = "Please select your pet's breed. If you can't find the breed, enter 'Unknown'."
    }
    if (!petData.age) {
      newErrors.age = "Please select the month and year your pet was born."
    }
    if (!personalData.firstName?.trim()) {
      newErrors.firstName = "Please enter your first name."
    }
    if (!personalData.lastName?.trim()) {
      newErrors.lastName = "Please enter your last name."
    }
    if (!personalData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select your date of birth. The policyholder must be over 18 years old."
    }
    if (!personalData.postcode?.trim()) {
      newErrors.postcode = "Please enter your postcode."
    }
    if (!personalData.state) {
      newErrors.state = "Please enter your state."
    }
    if (!personalData.phone?.trim()) {
      newErrors.phone = "Please enter your phone number."
    }
    if (!personalData.email?.trim()) {
      newErrors.email = "Please enter a valid email address in the format name@domain.com."
    } else if (!/\S+@\S+\.\S+/.test(personalData.email)) {
      newErrors.email = "Please enter a valid email address in the format name@domain.com."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (state.devMode || validateForm()) {
      dispatch({ type: "NEXT_STEP" })
    }
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-buddy-bg-light relative">
      {/* Main Content Container */}
      <div className="flex-grow relative z-20 flex items-start justify-start pt-4 lg:pt-10 px-4 lg:pl-12">
        <div className="flex w-full max-w-7xl gap-8">
          {/* Form Section */}
          <div className="w-full max-w-[632px]">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm md:text-base text-gray-700 mb-6">
                  It only takes a few minutes to get a Buddy Pet Insurance quote. Simply complete this form to get a
                  quote and apply online. We ask for your phone number so we can call you to answer any questions you
                  may have and help you finalise your application.
                </p>
                <form onSubmit={handleContinue} noValidate>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Who are we protecting?</h2>

                    <div>
                      <Label htmlFor="petName" className="text-base font-semibold text-gray-800">
                        What is your pet's name?
                      </Label>
                      <Input
                        id="petName"
                        value={petData.name || ""}
                        onChange={(e) => handlePetInputChange("name", e.target.value)}
                        className={cn("mt-2", errors.name && "border-red-500 focus-visible:ring-red-500")}
                        placeholder="Pet's name"
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-gray-800">Is your pet male or female?</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Button
                          type="button"
                          variant={petData.gender === "male" ? "default" : "outline"}
                          onClick={() => handlePetInputChange("gender", "male")}
                          className={cn("w-full", errors.gender && "border-red-500")}
                        >
                          Male
                        </Button>
                        <Button
                          type="button"
                          variant={petData.gender === "female" ? "default" : "outline"}
                          onClick={() => handlePetInputChange("gender", "female")}
                          className={cn("w-full", errors.gender && "border-red-500")}
                        >
                          Female
                        </Button>
                      </div>
                      {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-gray-800">Is your pet desexed?</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <Button
                          type="button"
                          variant={petData.desexed === "yes" ? "default" : "outline"}
                          onClick={() => handlePetInputChange("desexed", "yes")}
                          className={cn(errors.desexed && "border-red-500")}
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={petData.desexed === "no" ? "default" : "outline"}
                          onClick={() => handlePetInputChange("desexed", "no")}
                          className={cn(errors.desexed && "border-red-500")}
                        >
                          No
                        </Button>
                        <Button
                          type="button"
                          variant={petData.desexed === "unknown" ? "default" : "outline"}
                          onClick={() => handlePetInputChange("desexed", "unknown")}
                          className={cn(errors.desexed && "border-red-500")}
                        >
                          Unknown
                        </Button>
                      </div>
                      {errors.desexed && <p className="text-sm text-red-500 mt-1">{errors.desexed}</p>}
                    </div>

                    <div>
                      <Label htmlFor="breed" className="text-base font-semibold text-gray-800">
                        What breed is your pet?
                      </Label>
                      <Input
                        id="breed"
                        value={petData.breed || ""}
                        onChange={(e) => handlePetInputChange("breed", e.target.value)}
                        className={cn("mt-2", errors.breed && "border-red-500 focus-visible:ring-red-500")}
                        placeholder="Enter breed"
                      />
                      {errors.breed && <p className="text-sm text-red-500 mt-1">{errors.breed}</p>}
                      <p className="text-sm text-gray-500 mt-1">
                        If you can't find your pet's dominant breed or cross-breed, please enter small, medium or large
                        breed based on expected size when fully grown. We factor in each breed's typical claim history
                        to provide a quote. There are some breeds that are not legally available in Australia, and we
                        don't insure. Please call us to discuss if you're unsure.
                      </p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-gray-800">When was your pet born?</Label>
                      <div className="relative mt-2">
                        <Input
                          type="date"
                          onChange={(e) => handlePetInputChange("age", e.target.value)}
                          className={cn("pr-10", errors.age && "border-red-500 focus-visible:ring-red-500")}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
                      </div>
                      {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
                      <p className="text-sm text-gray-500 mt-1">
                        To qualify for any Buddy Pet Insurance policies, your pet needs to be younger than 9 years of
                        age when you first take out a policy.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg border p-6 my-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Do you have another cat or dog you'd like to protect?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Our multi-pet discount rewards pet-parents that insure more than one pet by giving{" "}
                        <span className="font-semibold text-gray-800">10% off</span> each additional policy purchased.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 bg-transparent"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add another pet
                      </Button>
                    </div>

                    <div className="space-y-6 pt-6 border-t">
                      <h2 className="text-2xl font-semibold text-gray-900">Tell us about yourself</h2>
                      <p className="text-gray-600">
                        We just need some basic details to provide you with an accurate quote.
                      </p>

                      <div>
                        <Label htmlFor="firstName" className="text-base font-semibold text-gray-800">
                          Your first name
                        </Label>
                        <Input
                          id="firstName"
                          value={personalData.firstName || ""}
                          onChange={(e) => handlePersonalInputChange("firstName", e.target.value)}
                          className={cn("mt-2", errors.firstName && "border-red-500 focus-visible:ring-red-500")}
                          placeholder="First name"
                        />
                        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-base font-semibold text-gray-800">
                          Your last name
                        </Label>
                        <Input
                          id="lastName"
                          value={personalData.lastName || ""}
                          onChange={(e) => handlePersonalInputChange("lastName", e.target.value)}
                          className={cn("mt-2", errors.lastName && "border-red-500 focus-visible:ring-red-500")}
                          placeholder="Last name"
                        />
                        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                      </div>

                      <div>
                        <Label className="text-base font-semibold text-gray-800">Your date of birth</Label>
                        <div className="relative mt-2">
                          <Input
                            type="date"
                            onChange={(e) => handlePersonalInputChange("dateOfBirth", e.target.value)}
                            className={cn("pr-10", errors.dateOfBirth && "border-red-500 focus-visible:ring-red-500")}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
                        </div>
                        {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
                        <p className="text-sm text-gray-500 mt-1">
                          You must be over 18 years old to apply for Buddy Pet Insurance.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="postcode" className="text-base font-semibold text-gray-800">
                          Your postcode
                        </Label>
                        <Input
                          id="postcode"
                          value={personalData.postcode || ""}
                          onChange={(e) => handlePersonalInputChange("postcode", e.target.value)}
                          className={cn("mt-2", errors.postcode && "border-red-500 focus-visible:ring-red-500")}
                          placeholder="Postcode"
                        />
                        {errors.postcode && <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>}
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-base font-semibold text-gray-800">
                          State
                        </Label>
                        <Select
                          onValueChange={(value) => handlePersonalInputChange("state", value)}
                          value={personalData.state || ""}
                        >
                          <SelectTrigger
                            className={cn("mt-2", errors.state && "border-red-500 focus-visible:ring-red-500")}
                          >
                            <SelectValue placeholder="Please select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NSW">NSW</SelectItem>
                            <SelectItem value="VIC">VIC</SelectItem>
                            <SelectItem value="QLD">QLD</SelectItem>
                            <SelectItem value="WA">WA</SelectItem>
                            <SelectItem value="SA">SA</SelectItem>
                            <SelectItem value="TAS">TAS</SelectItem>
                            <SelectItem value="ACT">ACT</SelectItem>
                            <SelectItem value="NT">NT</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
                        <p className="text-sm text-gray-500 mt-1">Your pet must reside with you to be eligible.</p>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold text-gray-800">
                          Your phone number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={personalData.phone || ""}
                          onChange={(e) => handlePersonalInputChange("phone", e.target.value)}
                          className={cn("mt-2", errors.phone && "border-red-500 focus-visible:ring-red-500")}
                          placeholder="Mobile or landline with area code"
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                        <p className="text-sm text-gray-500 mt-1">
                          Please include an area code if entering a landline number.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-base font-semibold text-gray-800">
                          Your email address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalData.email || ""}
                          onChange={(e) => handlePersonalInputChange("email", e.target.value)}
                          className={cn("mt-2", errors.email && "border-red-500 focus-visible:ring-red-500")}
                          placeholder="name@domain.com"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        <p className="text-sm text-gray-500 mt-1">
                          Providing us with your email address enables us to email your quote.
                        </p>
                      </div>
                    </div>

                    <div className="my-6 p-4 border rounded-md bg-gray-50 flex items-center justify-between">
                      <Label htmlFor="robot" className="text-gray-700">
                        I'm not a robot
                      </Label>
                      <Image src="/placeholder.svg?width=100&height=40" alt="reCAPTCHA" width={100} height={40} />
                    </div>

                    <div className="flex flex-col gap-4 pt-6">
                      <Button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 h-14 text-lg font-semibold rounded-full"
                        data-gtm-event="step2-pet-submitted"
                      >
                        Compare your cover options
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="w-full py-3 h-14 text-lg font-semibold rounded-full border-pink-500 text-gray-800 bg-transparent"
                      >
                        Back
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 pt-4">
                      By submitting this form you consent to receiving a phone call from us for the purpose of
                      discussing and providing assistance with your insurance quote. You can opt out of receiving calls
                      from us when we contact you or by contacting us on <span className="font-bold">1300 678 489</span>
                      . You acknowledge that you have had an opportunity to review and consider the relevant{" "}
                      <a href="#" className="text-pink-500 underline">
                        Policy Booklet
                      </a>{" "}
                      and that your personal information is collected, used and disclosed in accordance with our{" "}
                      <a href="#" className="text-pink-500 underline">
                        Privacy Collection Notice
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Callout Card - Desktop Only, positioned to align with form top and sticky with proper margin */}
          <div className="hidden lg:block w-full max-w-[424px]">
            <div className="sticky top-40 z-50">
              {/* Triangle arrow pointing left - exact match to live site */}
              <div className="absolute -left-4 top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 rotate-45 transform bg-white lg:block"></div>

              {/* Main callout content */}
              <div className="grid w-full grid-cols-[1fr_96px] items-end gap-4 gap-x-2 overflow-hidden bg-white p-4 px-6 pr-0 pt-3 shadow-md md:items-center lg:min-h-24 lg:justify-center lg:rounded-lg lg:p-4 lg:px-6 lg:pr-0">
                {/* First section - Hi, I'm Charlie */}
                <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold text-gray-900 leading-5">Hi, I'm Charlie</h2>
                  </div>
                  <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                    I'll be helping you protect your fur-bestie today.
                  </p>
                </div>

                /*{/* Second section - Did you know */}
                <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold text-gray-900 leading-5">Did you know?</h2>
                  </div>
                  <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                    Once covered, you'll get <strong className="text-pink-600">24/7 Live Vet Support</strong>, exclusive
                    pet discounts and perks with <strong className="text-pink-600">myPetPass™</strong> and access to
                    easy on-the-spot claims with <strong className="text-pink-600">GapOnly®</strong>.{" "}
                    <button
                      type="button"
                      className="z-40 -m-4 p-0 pb-1 px-[9px] relative -top-[1px]"
                      aria-label="Show tooltip info"
                    >
                      <Info className="inline-block h-4 w-4" />
                    </button>
                  </p>
                </div>
                */

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
                <h3 className="font-semibold text-gray-900 mb-2 text-base">Hi, I'm Charlie</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  I'll be helping you protect your fur-bestie today.
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
