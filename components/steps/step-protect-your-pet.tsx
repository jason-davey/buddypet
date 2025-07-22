"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { Calendar, Lock, HelpCircle } from "lucide-react"

interface ValidationErrors {
  startDate?: string
  accountName?: string
  bsb?: string
  accountNumber?: string
  cardNumber?: string
  cardName?: string
  expiryMonth?: string
  expiryYear?: string
}

export function StepProtectYourPet() {
  const { state, dispatch } = useQuote()
  const [formData, setFormData] = useState(state.coverDetails)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    dispatch({ type: "UPDATE_COVER_DETAILS", payload: updatedData })

    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, formData[field as keyof typeof formData] || "")
  }

  const validateField = (field: string, value: string) => {
    let error = ""

    switch (field) {
      case "startDate":
        if (!value) {
          error = "Please select a valid start date."
        }
        break
      case "accountName":
        if (!value || value.trim().length < 2) {
          error = "Please enter a valid account name."
        }
        break
      case "bsb":
        if (!value || !/^\d{3}-?\d{3}$/.test(value)) {
          error = "Please enter a valid BSB number."
        }
        break
      case "accountNumber":
        if (!value || value.length < 6) {
          error = "Please enter a valid account number."
        }
        break
      case "cardNumber":
        if (!value || value.replace(/\s/g, "").length < 13) {
          error =
            "Please enter a valid Visa or MasterCard number. This is the 16 digit number at the front of the card."
        }
        break
      case "cardName":
        if (!value || value.trim().length < 2) {
          error = "Please enter the name exactly as it appears on the card."
        }
        break
      case "expiryMonth":
        if (!value || !/^(0[1-9]|1[0-2])$/.test(value)) {
          error = "Please enter a valid month (MM)."
        }
        break
      case "expiryYear":
        if (!value || !/^\d{2}$/.test(value)) {
          error = "Please enter a valid year (YY)."
        }
        break
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
    return error === ""
  }

  const validateForm = () => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    // Always validate start date
    if (!formData.startDate) {
      newErrors.startDate = "Please select a valid start date."
      isValid = false
    }

    // Validate based on payment method
    if (formData.paymentMethod === "direct-debit") {
      if (!formData.accountName || formData.accountName.trim().length < 2) {
        newErrors.accountName = "Please enter a valid account name."
        isValid = false
      }
      if (!formData.bsb || !/^\d{3}-?\d{3}$/.test(formData.bsb)) {
        newErrors.bsb = "Please enter a valid BSB number."
        isValid = false
      }
      if (!formData.accountNumber || formData.accountNumber.length < 6) {
        newErrors.accountNumber = "Please enter a valid account number."
        isValid = false
      }
    } else if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = "Please enter a valid card number."
        isValid = false
      }
      if (!formData.cardName || formData.cardName.trim().length < 2) {
        newErrors.cardName = "Please enter a valid name on card."
        isValid = false
      }
      if (!formData.expiryMonth || !/^(0[1-9]|1[0-2])$/.test(formData.expiryMonth)) {
        newErrors.expiryMonth = "Please enter a valid month (MM)."
        isValid = false
      }
      if (!formData.expiryYear || !/^\d{2}$/.test(formData.expiryYear)) {
        newErrors.expiryYear = "Please enter a valid year (YY)."
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleProtectPet = () => {
    // Mark all fields as touched
    const allFields = [
      "startDate",
      "accountName",
      "bsb",
      "accountNumber",
      "cardNumber",
      "cardName",
      "expiryMonth",
      "expiryYear",
    ]
    const newTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    setTouched(newTouched)

    if (validateForm()) {
      // Handle final submission
      console.log("Quote completed:", state)
    }
  }

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" })
  }

  const getFieldError = (field: string) => {
    return touched[field] ? errors[field as keyof ValidationErrors] : undefined
  }

  const hasFieldError = (field: string) => {
    return touched[field] && errors[field as keyof ValidationErrors]
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-buddy-bg-light relative">
        {/* Main Content Container */}
        <div className="flex-grow relative z-20 flex items-start justify-start pt-10 pb-10 px-4 lg:pl-12">
          <div className="flex w-full max-w-7xl gap-8">
            {/* Form Section */}
            <div className="w-full max-w-[632px]">
              <Card className="bg-white shadow-lg rounded-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <p className="text-2xl font-bold">
                      Your total payment due for <span className="text-pink-600">Axolotl</span> is{" "}
                      <span className="text-pink-600">$29.88</span>/fortnight
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">Promotion applied: First month free offer*</span>
                    </div>
                    <a
                      href="https://www.buddypetinsurance.com.au/promotions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-600 underline hover:no-underline"
                    >
                      *See full terms and conditions
                    </a>
                    <p className="text-sm text-green-700 mt-2">Premium includes GST and Stamp Duty.</p>
                    <p className="text-xs text-green-600 mt-1">
                      Due to receiving your first premium discount you may be slightly different with the remaining
                      installments being a consistent amount.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium">When would you like your policy to start?</Label>
                      <div className="relative mt-2">
                        <Input
                          type="date"
                          value={formData.startDate || ""}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          onBlur={() => handleBlur("startDate")}
                          className={`pr-10 ${hasFieldError("startDate") ? "border-red-500" : ""}`}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-pink-500" />
                      </div>
                      {getFieldError("startDate") && (
                        <p className="text-sm text-red-500 mt-1">{getFieldError("startDate")}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Your policy starts at one minute to midnight (11.59pm) on the policy commencement date. Quote
                        premium may have adjusted based on the start date you selected.
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

                      <div className="flex items-center gap-2 mt-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-700" />
                          <span className="text-sm text-gray-700">All Buddy Pet Insurance forms are secure.</span>
                        </div>
                        <div className="ml-2">
                          <Image
                            src="/creditcards.svg"
                            alt="Accepted credit cards"
                            width={60}
                            height={20}
                            className="h-5 w-auto"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        Our payment forms are secured with 256bit encryption.
                      </p>
                    </div>

                    {formData.paymentMethod === "direct-debit" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="accountName">Account name</Label>
                          <Input
                            id="accountName"
                            value={formData.accountName || ""}
                            onChange={(e) => handleInputChange("accountName", e.target.value)}
                            onBlur={() => handleBlur("accountName")}
                            placeholder="Enter account name"
                            className={`mt-1 ${hasFieldError("accountName") ? "border-red-500" : ""}`}
                          />
                          {getFieldError("accountName") && (
                            <p className="text-sm text-red-500 mt-1">{getFieldError("accountName")}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="bsb">BSB</Label>
                          <Input
                            id="bsb"
                            value={formData.bsb || ""}
                            onChange={(e) => handleInputChange("bsb", e.target.value)}
                            onBlur={() => handleBlur("bsb")}
                            placeholder="000000"
                            className={`mt-1 ${hasFieldError("bsb") ? "border-red-500" : ""}`}
                          />
                          {getFieldError("bsb") && <p className="text-sm text-red-500 mt-1">{getFieldError("bsb")}</p>}
                        </div>

                        <div>
                          <Label htmlFor="accountNumber">Account number</Label>
                          <Input
                            id="accountNumber"
                            value={formData.accountNumber || ""}
                            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                            onBlur={() => handleBlur("accountNumber")}
                            placeholder="Enter account number"
                            className={`mt-1 ${hasFieldError("accountNumber") ? "border-red-500" : ""}`}
                          />
                          {getFieldError("accountNumber") && (
                            <p className="text-sm text-red-500 mt-1">{getFieldError("accountNumber")}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            A valid claim will be paid directly into your nominated bank account.
                          </p>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Credit card number</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber || ""}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            onBlur={() => handleBlur("cardNumber")}
                            placeholder="0000000000000000"
                            className={`mt-1 ${hasFieldError("cardNumber") ? "border-red-500" : ""}`}
                          />
                          {getFieldError("cardNumber") && (
                            <p className="text-sm text-red-500 mt-1">{getFieldError("cardNumber")}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cardName">Name on card</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName || ""}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            onBlur={() => handleBlur("cardName")}
                            placeholder="Full name on card"
                            className={`mt-1 ${hasFieldError("cardName") ? "border-red-500" : ""}`}
                          />
                          {getFieldError("cardName") && (
                            <p className="text-sm text-red-500 mt-1">{getFieldError("cardName")}</p>
                          )}
                        </div>

                        <div>
                          <Label>Card expiry date</Label>
                          <div className="flex gap-2 mt-1">
                            <div className="flex-1">
                              <Input
                                value={formData.expiryMonth || ""}
                                onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
                                onBlur={() => handleBlur("expiryMonth")}
                                placeholder="MM"
                                className={`w-20 ${hasFieldError("expiryMonth") ? "border-red-500" : ""}`}
                                maxLength={2}
                              />
                              {getFieldError("expiryMonth") && (
                                <p className="text-sm text-red-500 mt-1">{getFieldError("expiryMonth")}</p>
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                value={formData.expiryYear || ""}
                                onChange={(e) => handleInputChange("expiryYear", e.target.value)}
                                onBlur={() => handleBlur("expiryYear")}
                                placeholder="YY"
                                className={`w-20 ${hasFieldError("expiryYear") ? "border-red-500" : ""}`}
                                maxLength={2}
                              />
                              {getFieldError("expiryYear") && (
                                <p className="text-sm text-red-500 mt-1">{getFieldError("expiryYear")}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                          You will need to provide your reimbursement bank details before we can pay any claim benefits
                          to you. You should be aware that your authority to debit this account also applies to
                          renewals. If the credit card is not yours, you confirm you have the authority of the
                          cardholder to use it and they have agreed to these terms.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-4">
                      <Button
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 h-14 text-lg font-medium rounded-full"
                        onClick={handleProtectPet}
                        data-gtm-event="step6-protect-pet-submitted"
                        id="step6-protect-your-pet"
                      >
                        Protect my pet
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500">
                      By clicking 'Protect my pet', I authorise PetSure (Australia) Pty Ltd (the Initiator) (User ID
                      647811) to debit my account with the amounts outlined by the Initiator by direct debit. I confirm,
                      I have sole authority{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="relative z-40 p-0 m-0 inline-flex items-center"
                            aria-label="Show tooltip info"
                          >
                            <HelpCircle className="relative -top-[1px] inline-block h-3 w-3 text-gray-500 hover:text-gray-700" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="center"
                          className="relative max-w-xs bg-gray-900 text-white border-gray-900 shadow-lg rounded-lg p-3 z-[9999] overflow-visible"
                          sideOffset={8}
                        >
                          <span className="text-xs leading-relaxed block">
                            Sole authority means you have the ability to transact on the nominated bank account without
                            the joint approval of another account holder.
                          </span>
                          {/* Triangle arrow pointing down to the help icon */}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </TooltipContent>
                      </Tooltip>{" "}
                      as the account holder over the bank account number above. I have read and accepted the{" "}
                      <a href="#" className="text-pink-600 underline">
                        Direct Debit Service Agreement
                      </a>
                      .
                    </div>

                    <div className="flex flex-col gap-4">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        className="w-full h-14 text-lg font-medium rounded-full border-2 border-pink-500 text-gray-800 bg-transparent hover:bg-pink-50"
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Callout Card - Desktop Only */}
            <div className="hidden lg:block w-full max-w-[424px]">
              <div className="sticky top-48 z-50">
                {/* Triangle arrow pointing left */}
                <div className="absolute -left-4 top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 rotate-45 transform bg-white lg:block"></div>

                {/* Main callout content */}
                <div className="grid w-full grid-cols-[1fr_96px] items-end gap-4 gap-x-2 overflow-hidden bg-white p-4 px-6 pr-0 pt-3 shadow-md md:items-center lg:min-h-24 lg:justify-center lg:rounded-lg lg:p-4 lg:px-6 lg:pr-0">
                  <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                    <div className="flex items-center gap-1">
                      <h2 className="font-semibold text-gray-900 leading-5">Last step!</h2>
                    </div>
                    <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                      Simply enter your payment details to protect <span className="text-pink-600">Axolotl</span>!
                    </p>
                  </div>

                  {/* Charlie image */}
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

          {/* Mobile callout card */}
          <div className="block lg:hidden mx-4 mt-4 mb-6 absolute top-0 left-0 right-0 z-40">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">Congratulations!</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    You're about to protect your beloved pet with comprehensive insurance coverage.
                  </p>
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
    </TooltipProvider>
  )
}
