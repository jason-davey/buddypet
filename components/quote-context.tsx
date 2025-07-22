"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface Pet {
  type: "dog" | "cat"
  name: string
  breed: string
  gender: "male" | "female"
  desexed: "yes" | "no" | "unknown"
  microchipped: "yes" | "no"
  age: string
}

interface PersonalDetails {
  firstName: string
  lastName: string
  dateOfBirth: string
  postcode: string
  state: string
  phone: string
  email: string
}

interface CoverDetails {
  plan: "gold" | "silver" | "bronze"
  startDate: string
  paymentMethod: "direct-debit" | "credit-card"
  accountName: string
  bsb: string
  accountNumber: string
  cardNumber?: string
  cardExpiry?: string
  cardCVC?: string
}

interface QuoteState {
  currentStep: number
  pet: Partial<Pet>
  personalDetails: Partial<PersonalDetails>
  coverDetails: Partial<CoverDetails>
  termsAccepted: boolean
  devMode: boolean
}

type QuoteAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_PET"; payload: Partial<Pet> }
  | { type: "UPDATE_PERSONAL_DETAILS"; payload: Partial<PersonalDetails> }
  | { type: "UPDATE_COVER_DETAILS"; payload: Partial<CoverDetails> }
  | { type: "ACCEPT_TERMS"; payload: boolean }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "TOGGLE_DEV_MODE" }

const initialState: QuoteState = {
  currentStep: 1,
  pet: {},
  personalDetails: {},
  coverDetails: {},
  termsAccepted: false,
  devMode: false,
}

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "UPDATE_PET":
      return { ...state, pet: { ...state.pet, ...action.payload } }
    case "UPDATE_PERSONAL_DETAILS":
      return { ...state, personalDetails: { ...state.personalDetails, ...action.payload } }
    case "UPDATE_COVER_DETAILS":
      return { ...state, coverDetails: { ...state.coverDetails, ...action.payload } }
    case "ACCEPT_TERMS":
      return { ...state, termsAccepted: action.payload }
    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 6) }
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) }
    case "TOGGLE_DEV_MODE":
      return { ...state, devMode: !state.devMode }
    default:
      return state
  }
}

const QuoteContext = createContext<{
  state: QuoteState
  dispatch: React.Dispatch<QuoteAction>
} | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState)

  return <QuoteContext.Provider value={{ state, dispatch }}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider")
  }
  return context
}
