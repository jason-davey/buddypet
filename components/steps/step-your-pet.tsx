"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useQuote } from "@/components/quote-context"
import { CatIcon } from "@/components/icons/cat-icon"
import { DogIcon } from "@/components/icons/dog-icon"

export function StepYourPet() {
  const { state, updateState, nextStep } = useQuote()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!state.petType) newErrors.petType = "Please select your pet type"
    if (!state.petName?.trim()) newErrors.petName = "Pet name is required"
    if (!state.petBreed?.trim()) newErrors.petBreed = "Pet breed is required"
    if (!state.petAge) newErrors.petAge = "Pet age is required"
    if (!state.petGender) newErrors.petGender = "Pet gender is required"
    if (!recaptchaCompleted) newErrors.recaptcha = "Please complete the reCAPTCHA"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      nextStep()
    }
  }

  const handlePetTypeSelect = (type: "dog" | "cat") => {
    updateState({ petType: type })
    if (errors.petType) {
      setErrors((prev) => ({ ...prev, petType: "" }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your pet</h1>
            <p className="text-gray-600">We need some basic information to provide you with an accurate quote</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pet Type Selection */}
            <div>
              <Label className="text-base font-medium text-gray-900 mb-4 block">What type of pet do you have?</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePetTypeSelect("dog")}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    state.petType === "dog" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <DogIcon />
                  <span className="block mt-2 font-medium">Dog</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePetTypeSelect("cat")}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    state.petType === "cat" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CatIcon />
                  <span className="block mt-2 font-medium">Cat</span>
                </button>
              </div>
              {errors.petType && <p className="text-red-500 font-medium text-sm mt-1">{errors.petType}</p>}
            </div>

            {/* Pet Name */}
            <div>
              <Label htmlFor="petName" className="text-base font-medium text-gray-900">
                Pet's name
              </Label>
              <Input
                id="petName"
                type="text"
                value={state.petName || ""}
                onChange={(e) => {
                  updateState({ petName: e.target.value })
                  if (errors.petName) setErrors((prev) => ({ ...prev, petName: "" }))
                }}
                className={`mt-1 ${errors.petName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your pet's name"
              />
              {errors.petName && <p className="text-red-500 font-medium text-sm mt-1">{errors.petName}</p>}
            </div>

            {/* Pet Breed */}
            <div>
              <Label htmlFor="petBreed" className="text-base font-medium text-gray-900">
                Breed
              </Label>
              <Input
                id="petBreed"
                type="text"
                value={state.petBreed || ""}
                onChange={(e) => {
                  updateState({ petBreed: e.target.value })
                  if (errors.petBreed) setErrors((prev) => ({ ...prev, petBreed: "" }))
                }}
                className={`mt-1 ${errors.petBreed ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="Enter your pet's breed"
              />
              {errors.petBreed && <p className="text-red-500 font-medium text-sm mt-1">{errors.petBreed}</p>}
            </div>

            {/* Pet Age */}
            <div>
              <Label htmlFor="petAge" className="text-base font-medium text-gray-900">
                Age
              </Label>
              <Select
                value={state.petAge || ""}
                onValueChange={(value) => {
                  updateState({ petAge: value })
                  if (errors.petAge) setErrors((prev) => ({ ...prev, petAge: "" }))
                }}
              >
                <SelectTrigger className={`mt-1 ${errors.petAge ? "border-red-500 focus-visible:ring-red-500" : ""}`}>
                  <SelectValue placeholder="Select your pet's age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="5-8">5-8 years</SelectItem>
                  <SelectItem value="8+">8+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.petAge && <p className="text-red-500 font-medium text-sm mt-1">{errors.petAge}</p>}
            </div>

            {/* Pet Gender */}
            <div>
              <Label htmlFor="petGender" className="text-base font-medium text-gray-900">
                Gender
              </Label>
              <Select
                value={state.petGender || ""}
                onValueChange={(value) => {
                  updateState({ petGender: value })
                  if (errors.petGender) setErrors((prev) => ({ ...prev, petGender: "" }))
                }}
              >
                <SelectTrigger
                  className={`mt-1 ${errors.petGender ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your pet's gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.petGender && <p className="text-red-500 font-medium text-sm mt-1">{errors.petGender}</p>}
            </div>

            {/* Medical History */}
            <div>
              <Label htmlFor="medicalHistory" className="text-base font-medium text-gray-900">
                Medical history (optional)
              </Label>
              <Textarea
                id="medicalHistory"
                value={state.medicalHistory || ""}
                onChange={(e) => updateState({ medicalHistory: e.target.value })}
                className="mt-1"
                placeholder="Please describe any pre-existing conditions, injuries, or ongoing treatments"
                rows={4}
              />
            </div>

            {/* reCAPTCHA */}
            <div>
              <Label className="text-base font-medium text-gray-900 mb-2 block">Security verification</Label>
              <div className="flex items-center space-x-3">
                <iframe
                  title="reCAPTCHA"
                  width="304"
                  height="78"
                  role="presentation"
                  name="a-g465i2rviqg8"
                  frameBorder="0"
                  scrolling="no"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                  src="https://www.google.com/recaptcha/enterprise/anchor?ar=1&k=6LcTbS4rAAAAAP7Qp28DvV8y-owSPzFtDIiL8ZnP&co=aHR0cHM6Ly9wZXQuYnVkZHlwZXRpbnN1cmFuY2UuY29tLmF1OjQ0Mw..&hl=en&v=3jpV4E_UA9gZWYy11LtggjoU&size=normal&sa=LOGIN&anchor-ms=20000&execute-ms=15000&cb=6kiid0homon9"
                />
              </div>
              {errors.recaptcha && <p className="text-red-500 font-medium text-sm mt-1">{errors.recaptcha}</p>}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
