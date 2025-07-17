"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function StepTermsConditions() {
  const { state, dispatch } = useQuote()
  const [agreed, setAgreed] = useState(state.termsAccepted)

  const handleAgree = () => {
    dispatch({ type: "ACCEPT_TERMS", payload: true })
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6" id="step5-terms-conditions">
                Agree to these terms
              </h2>

              <p className="text-sm text-gray-600 mb-6">To proceed, please read all the Terms & Conditions</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto">
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Any advice provided is general only, has been prepared without taking into account your objectives,
                    financial situation or needs and may not be right for you. Consequently, before acting on this
                    information, you should consider the appropriateness of this information having regard to your
                    objectives, financial situation and needs. It is important that you carefully read the Combined
                    Financial Services Guide and Product Disclosure Statement (PDS) and consider whether the insurance
                    meets your needs before you continue to hold this product.
                  </p>

                  <h3 className="font-semibold text-gray-900">The Insurer and Distributor</h3>
                  <p>
                    This policy is issued by PetSure (Australia) Pty Ltd ABN 95 075 949 923, AFSL 420183 and promoted
                    and distributed by Greenstone Financial Services Pty Ltd ABN 53 128 692 884, AFSL 343079. Any advice
                    provided is general only and does not take into account your individual objectives, financial
                    situation or needs. Please consider the Product Disclosure Statement (PDS) available at
                    buddypetinsurance.com.au and the Target Market Determination available at buddypetinsurance.com.au
                    to ensure this product meets your needs before you continue with the product. PDS and Target Market
                    Determination available at buddypetinsurance.com.au.
                  </p>

                  <p>
                    By clicking 'I agree to these terms', you agree that you have read and agree to the terms and
                    conditions of this policy contained in the{" "}
                    <a href="#" className="text-pink-600 underline">
                      Combined Financial Services Guide and Product Disclosure Statement
                    </a>{" "}
                    as well as read the{" "}
                    <a href="#" className="text-pink-600 underline">
                      Privacy Collection Notice
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg font-medium"
                  onClick={handleAgree}
                  data-gtm-event="step5-terms-accepted"
                >
                  I agree to these terms
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
                  style={{ backgroundImage: "url('/dog-mascot.webp')" }}
                />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Thanks, nearly there!</h3>
                  <p className="text-sm text-blue-800">
                    Please read the Terms & Conditions of your Buddy Pet Insurance policy carefully. It's important you
                    understand them.
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
