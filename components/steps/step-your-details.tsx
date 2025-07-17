"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" id="step4-your-details">
                Your details
              </h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">What is your title? *</Label>
                  <div className="flex gap-2 mt-2">
                    {["Mr", "Mrs", "Miss", "Dr"].map((title) => (
                      <Button
                        key={title}
                        type="button"
                        variant={formData.title === title ? "default" : "outline"}
                        onClick={() => handleInputChange("title", title)}
                        className="flex-1"
                      >
                        {title}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Enter address manually</Label>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="streetAddress">Street address</Label>
                      <Input
                        id="streetAddress"
                        value={formData.streetAddress || ""}
                        onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                        placeholder="31 Corner Street"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="suburb">Suburb</Label>
                      <Input
                        id="suburb"
                        value={formData.suburb || ""}
                        onChange={(e) => handleInputChange("suburb", e.target.value)}
                        placeholder="MELBOURNE"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode || ""}
                        onChange={(e) => handleInputChange("postcode", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Authorised Person</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Would you like to authorise an additional person who can submit claims and make enquiries about the
                    policy?
                  </p>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.authorizedPerson === "yes" ? "default" : "outline"}
                      onClick={() => handleInputChange("authorizedPerson", "yes")}
                      className="flex-1"
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={formData.authorizedPerson === "no" ? "default" : "outline"}
                      onClick={() => handleInputChange("authorizedPerson", "no")}
                      className="flex-1"
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
                      <Label htmlFor="authFirstName">Their first name</Label>
                      <Input
                        id="authFirstName"
                        value={formData.authorizedFirstName || ""}
                        onChange={(e) => handleInputChange("authorizedFirstName", e.target.value)}
                        placeholder="Jenny"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="authLastName">Their last name</Label>
                      <Input
                        id="authLastName"
                        value={formData.authorizedLastName || ""}
                        onChange={(e) => handleInputChange("authorizedLastName", e.target.value)}
                        placeholder="Dewey"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="authDob">Their date of birth</Label>
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
                  <Label className="text-base font-medium">
                    Select how you would like to receive your insurance documents
                  </Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={formData.documentDelivery === "email" ? "default" : "outline"}
                      onClick={() => handleInputChange("documentDelivery", "email")}
                      className="flex-1"
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={formData.documentDelivery === "post" ? "default" : "outline"}
                      onClick={() => handleInputChange("documentDelivery", "post")}
                      className="flex-1"
                    >
                      Post
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can change your preference for insurance documents at any time by calling us on 1300 911 604.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium"
                    onClick={handleContinue}
                    data-gtm-event="step4-details-submitted"
                  >
                    Continue
                  </Button>
                  <Button variant="outline" onClick={handleBack} className="w-full bg-transparent">
                    Back
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  By clicking 'Continue', you acknowledge that you have read our opportunity to review and consider the
                  relevant{" "}
                  <a href="#" className="text-blue-600 underline">
                    Policy Booklet
                  </a>{" "}
                  and that your personal information is collected, used and disclosed in accordance with our{" "}
                  <a href="#" className="text-blue-600 underline">
                    Privacy Collection Notice
                  </a>
                  .
                </p>
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
                  style={{ backgroundImage: "url('/dog-mascot.webp')" }}
                />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">You're almost there!</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Only a few more details to get protection from the unexpected.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Did you know?</strong>
                    </div>
                    <p className="text-blue-700">
                      Buddy Pet Insurance offers you the best treatment and care with{" "}
                      <strong className="text-pink-600">myPetPlan™</strong> and provides access to easy on-the-spot
                      claims with <strong className="text-pink-600">GapOnly™</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
