"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StepProtectYourPet() {
  const { state, dispatch } = useQuote()
  const [formData, setFormData] = useState(state.coverDetails)

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    dispatch({ type: "UPDATE_COVER_DETAILS", payload: updatedData })
  }

  const handleProtectPet = () => {
    // Handle final submission
    console.log("Quote completed:", state)
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
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Last step!</h2>
                <p className="text-2xl font-bold">
                  Your total payment due for <span className="text-pink-600">Axolotl</span> is{" "}
                  <span className="text-pink-600">$29.88</span> Fortnight
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">Promotion applied: First month free offer*</span>
                </div>
                <p className="text-sm text-green-700 mt-2">Premium includes GST and Stamp Duty.</p>
                <p className="text-xs text-green-600 mt-1">
                  Due to receiving your first premium discount you may be slightly different with the remaining
                  installments being a consistent amount.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">When would you like your policy to start?</Label>
                  <Select onValueChange={(value) => handleInputChange("startDate", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select start date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="next-week">Next week</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Any policy starts at 4pm the day you're in midnight (12am) on the policy commencement date. Policy
                    premium may have additional based on the start date you selected.
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium">Choose your preferred payment method</Label>
                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      variant={formData.paymentMethod === "direct-debit" ? "default" : "outline"}
                      onClick={() => handleInputChange("paymentMethod", "direct-debit")}
                      className="flex-1"
                    >
                      Direct Debit
                    </Button>
                    <Button
                      type="button"
                      variant={formData.paymentMethod === "credit-card" ? "default" : "outline"}
                      onClick={() => handleInputChange("paymentMethod", "credit-card")}
                      className="flex-1"
                    >
                      Credit Card
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Our payment forms are secured with 256bit encryption.</p>
                </div>

                {formData.paymentMethod === "direct-debit" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountName">Account name</Label>
                      <Input
                        id="accountName"
                        value={formData.accountName || ""}
                        onChange={(e) => handleInputChange("accountName", e.target.value)}
                        placeholder="Enter account name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bsb">BSB</Label>
                      <Input
                        id="bsb"
                        value={formData.bsb || ""}
                        onChange={(e) => handleInputChange("bsb", e.target.value)}
                        placeholder="123-456"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">Account number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber || ""}
                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                        placeholder="Enter account number"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        A valid credit will be paid directly into your nominated bank account.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium"
                    onClick={handleProtectPet}
                    data-gtm-event="step6-protect-pet-submitted"
                    id="step6-protect-your-pet"
                  >
                    Protect my pet
                  </Button>
                  <Button variant="outline" onClick={handleBack} className="w-full bg-transparent">
                    Back
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  By clicking 'Protect my pet', I acknowledge PetSure (Australia) Pty Ltd the insurer is cover to submit
                  to qualify the account with the services offered by the insurer as direct debit I authorise PetSure
                  (Australia) Pty Ltd and/or their nominated processing institution to arrange for any amount PetSure
                  (Australia) Pty Ltd may debit or charge to my account to be debited through the Bulk Electronic
                  Clearing System from my account held with the financial institution identified in this request. Please
                  read and understand the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Direct Debit Service Agreement
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
                  <h3 className="font-semibold text-blue-900 mb-2">Hi, I'm Charlie</h3>
                  <p className="text-sm text-blue-800">I'm looking out for you and your Buddy today.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
