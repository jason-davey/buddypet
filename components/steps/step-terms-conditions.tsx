"use client"

import { useState } from "react"
import { useQuote } from "../quote-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
    <div className="flex flex-col min-h-screen bg-buddy-bg-light relative">
      {/* Main Content Container */}
      <div className="flex-grow relative z-20 flex items-start justify-start pt-10 pb-10 px-4 lg:pl-12">
        <div className="flex w-full max-w-7xl gap-8">
          {/* Form Section */}
          <div className="w-full max-w-[632px]">
            <Card className="bg-white shadow-lg rounded-xl">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" id="step5-terms-conditions">
                  Agree to these terms
                </h2>

                <p className="font-bold text-med text-gray-600 mb-6">
                  To proceed, please read all the Terms & Conditions
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto border-t border-b border-gray-300">
                  <div className="space-y-4 text-sm text-gray-700">
                    <section>
                      <p>
                        Any advice provided is general only, has been prepared without taking into account your
                        objectives, financial situation or needs and may not be right for you. Consequently, before
                        acting on this information, you should consider the appropriateness of this information having
                        regard to your objectives, financial situation and needs. It is important that you carefully
                        read the Combined Financial Services Guide and Product Disclosure Statement, as well as the
                        Privacy Collection Notice before deciding to buy or continue to hold this product.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">The Issuer and Distributor</h4>
                      <p>
                        This policy is issued by PetSure (Australia) Pty Ltd ABN 95 075 949 923, AFSL 420183 and
                        promoted and distributed by Greenstone Financial Services Pty Ltd ABN 53 128 692 884, AFSL
                        343079 (GFS). Any advice provided is general only and does not take into account your individual
                        objectives, financial situation or needs. Please consider the Product Disclosure Statement (PDS)
                        to ensure this product meets your needs before purchasing, or choosing to continue with the
                        product. PDS and Target Market Determination available at buddypetinsurance.com.au
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">Your premium</h4>
                      <p>
                        This quote is for a new policy. There is no continuation of cover from any current or previous
                        pet insurance policies you have held. Waiting periods will apply, and any pre-existing
                        conditions that occurred prior to this new policy, will not be covered. After the applicable
                        waiting period has been served, some pre-existing conditions that are temporary conditions which
                        have not existed, occurred or shown noticeable signs, symptoms or abnormality after an 18-month
                        period can be reviewed — refer to your policy terms and conditions and general exclusions for
                        more information.
                        <br />
                        <br />
                        Please contact us if you would like to continue having cover for conditions that were first
                        noted and covered under a policy within the PetSure portfolio of brands. Please note that a
                        policy with continued cover for conditions may be more expensive than the quote currently shown
                        because it includes additional coverage you may be entitled to for existing conditions.
                        <br />
                        <br />
                        The amount payable by you includes the premium payable to the insurer, and all GST, stamp duty
                        and other government taxes, fees and charges.
                        <br />
                        <br />
                        Your premium is calculated based on a combination of factors and these can affect the premium
                        amount depending on whether we believe it increases or decreases the risk to us. These factors
                        include the type of cover and options you have selected, as well as the breed and age of your
                        pet. Your premium may also include discounts or promotional offers which may only apply in the
                        first year of cover. Each year, we'll notify you of changes to your annual premium. Further
                        details on the factors used to calculate your premium are detailed in your PDS.
                        <br />
                        <br />
                        For new policies (excluding policies issued as replacement policies) GFS may receive a
                        commission of $200 per pet per annum, indexed annually at 5%, for pets up until they reach the
                        age of 9 years or for at least 3 years after the issue of the policy, for promoting and
                        distributing Buddy Pet Insurance policies. This commission is used by GFS to cover the costs
                        associated with the marketing and distribution of this product to you.
                        <br />
                        <br />
                        Your premiums will be collected by us directly from your nominated credit card or bank account.
                        You should be aware that unless you tell us otherwise, your authority to debit this account/use
                        this card also applies to any automatic renewal and/or replacement policy as applicable. If the
                        credit card is not yours, you confirm you have the authority of the relevant person to use it
                        and they have agreed to these terms.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">When will your policy commence?</h4>
                      <p>
                        Acceptance of your application is not guaranteed. If accepted, we will issue you a policy
                        number. Cover for your policy starts at 11:59pm (1 minute to midnight) NSW time on the day you
                        have selected to commence your policy from and is subject to waiting periods.
                        <br />
                        <br />
                        There is a two-day waiting period after the commencement date of your first policy period for
                        accidental injuries.
                        <br />
                        <br />
                        The waiting period for cruciate ligament conditions and any conditions arising therefrom
                        irrespective of cause or origin are subject to a six-month waiting period from the commencement
                        date of the first policy period.
                        <br />
                        <br />
                        The cover for Illnesses is subject to a 30-day waiting period from the commencement date of the
                        first policy period. If Booster Care is selected, specified dental conditions will be subject to
                        a six-month waiting period, waiting periods for specialised therapy items apply as per the
                        covered condition and behavioural conditions have a 30-day waiting period.
                        <br />
                        <br />
                        These waiting periods apply from the commencement date of the first policy period.
                        <br />
                        <br />
                        Your policy is set to renew automatically each year, for as long as we continue to provide this
                        product, subject to the terms and conditions of the policy or alternatively, if we no longer
                        issue this policy Buddy Pet Insurance product, we may arrange for an offer of a replacement
                        policy to be provided to you which will automatically commence when your issued policy is due to
                        expire, unless you instruct us beforehand otherwise. You can opt-out of the automatic renewal
                        process and/or automatic policy replacement process at any time in the future by{" "}
                        <a
                          href="https://www.buddypetinsurance.com.au/contact"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 underline hover:no-underline"
                        >
                          contacting us
                        </a>
                        . You should check your policy limits to see if your level of cover is still appropriate for
                        you.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">
                        You will be sent a Welcome Pack and more information about your policy
                      </h4>
                      <p>
                        A Policy Booklet which includes the relevant Combined Financial Services Guide and Product
                        Disclosure Statement (PDS), Policy Terms and Conditions, as well as a Certificate of Insurance,
                        will be sent to you. You should carefully read these documents to ensure the product meets your
                        needs.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">You have a 30-day cooling off period</h4>
                      <p>
                        If you are not satisfied with the policy, you may cancel it within 30 days from the policy's
                        commencement date or renewal date. If we receive your request to cancel your policy within the
                        30-day period after the policy commencement day or renewal date, and as long as you have not
                        made a claim or intend to make a claim, we'll give you a refund of any monies received since
                        that date less any reasonable administrative and other transaction costs incurred by PetSure
                        including any taxes and duties which cannot be refunded.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">
                        You have a duty to take reasonable care not to make a misrepresentation
                      </h4>
                      <p>
                        Before you enter into this contract of insurance, you have a duty to take reasonable care not to
                        make a misrepresentation. What that means is that you need to take reasonable care to provide
                        honest, accurate and complete answers to any questions that we ask. If you are not sure of the
                        answers to any of our questions, you should take the time to find them. It is also important to
                        understand that, in answering the questions, you are answering for yourself and anyone else to
                        whom the questions apply. If any of our questions are not clear to you and you need help, please
                        contact us. This duty to take reasonable care not to make a misrepresentation applies until the
                        contract is entered into (or renewed, replaced, varied, extended or reinstated as applicable).
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">
                        If you do not comply with your duty to take reasonable care not to make a misrepresentation
                      </h4>
                      <p>
                        If you do not take reasonable care in answering our questions or inform us of changes to the
                        information set out in your policy documentation, you may breach your duty. If that happens,
                        your policy may be cancelled, or treated as if never existed, and any claim may be denied or not
                        paid in full.
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">Your personal information</h4>
                      <p>
                        GFS and PetSure are committed to protecting your personal information and complying with
                        Australian privacy laws. You can read about how we collect, use and disclose your personal
                        information in our privacy policies.
                        <br />
                        <br />
                        To obtain the latest version of GFS' Privacy Policy, please visit{" "}
                        <a
                          href="https://www.buddypetinsurance.com.au/privacy-collection-notice"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 underline hover:no-underline"
                        >
                          Privacy Collection Notice
                        </a>
                        <br />
                        <br />
                        If you would like a copy of the privacy policy of PetSure, please visit{" "}
                        <a
                          href="http://petsure.com.au/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 underline hover:no-underline"
                        >
                          petsure.com.au
                        </a>
                      </p>
                    </section>

                    <section>
                      <h4 className="font-bold text-gray-900 mb-2">
                        Combined Financial Services Guide and Product Disclosure Statement
                      </h4>
                      <p>
                        Upon acceptance of your application a Combined Financial Services Guide and Product Disclosure
                        Statement (Policy Booklet) and your Certificate of Insurance will be sent to you within 5 days
                        of your policy commencement date. You should carefully read these documents to ensure the
                        product meets your needs. If you have any questions about your policy, please call Buddy Pet
                        Insurance on <span className="font-semibold">1300 678 489</span>.
                      </p>
                    </section>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-6 text-left">
                  By clicking 'I agree to these terms' you agree that you have read and agree to the terms and
                  conditions of this policy contained in the{" "}
                  <a
                    href="https://www.buddypetinsurance.com.au/useful-documents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 underline hover:no-underline"
                  >
                    Combined Financial Services Guide and Product Disclosure Statement
                  </a>{" "}
                  as well as read the{" "}
                  <a
                    href="https://www.buddypetinsurance.com.au/privacy-collection-notice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 underline hover:no-underline"
                  >
                    Privacy Collection Notice
                  </a>
                </p>

                <div className="flex flex-col gap-4">
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 h-14 text-lg font-medium rounded-3xl"
                    onClick={handleAgree}
                    data-gtm-event="step5-terms-accepted"
                  >
                    I agree to these terms
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full h-14 text-lg font-medium rounded-3xl border-2 border-pink-500 text-gray-800 bg-transparent hover:bg-pink-50"
                  >
                    Back
                  </Button>
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
              <div className="grid w-full grid-cols-[1fr_96px] items-end gap-4 gap-x-2 overflow-hidden bg-white p-4 px-6 pr-0 pt-3 shadow-md md:items-center lg:min-h-24 lg:justify-center lg:rounded-xl lg:p-4 lg:px-6 lg:pr-0">
                <div className="flex flex-col gap-2 pr-5 lg:pr-2">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold text-gray-900 leading-5">Thanks, nearly there!</h2>
                  </div>
                  <p className="text-gray-700 text-sm leading-5 md:text-base md:leading-6">
                    Please read the Terms & Conditions of your Buddy Pet Insurance policy carefully. It's important you
                    understand them.
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
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">Thanks, nearly there!</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Please read the Terms & Conditions of your Buddy Pet Insurance policy carefully. It's important you
                  understand them.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/charlie.webp"
                  alt="Charlie the dog"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-xl"
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
