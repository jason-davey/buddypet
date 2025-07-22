"use client"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { QuoteForm } from "@/components/quote-form"
import { QuoteProvider, useQuote } from "@/components/quote-context"
import { ProgressBar } from "@/components/progress-bar"
import Image from "next/image"

function PageContent() {
  const { state } = useQuote()

  return (
    <div className="flex flex-col min-h-screen bg-buddy-bg-light">
      <Header />
      {state.currentStep > 1 && <ProgressBar />}
      <div className="flex-grow relative pb-16">
        <main className="relative z-20">
          <QuoteForm />
        </main>
      </div>

      {/* Background elements with bottoms locked to top of footer */}
      <div className="relative h-0">
        <div className="absolute bottom-0 right-8 z-10 w-1/3 max-w-xs lg:max-w-md hidden lg:block pointer-events-none">
          <Image
            src="/dalmatian-mascot.svg"
            alt="Happy Dalmatian mascot"
            width={500}
            height={750}
            className="w-full h-auto"
          />
        </div>

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

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <QuoteProvider>
      <PageContent />
    </QuoteProvider>
  )
}
