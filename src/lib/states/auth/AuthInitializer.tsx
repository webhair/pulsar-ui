"use client"

import { StoreInitializer } from "@/lib/StoreInitializer"
import useAuth, { AuthState } from "./useAuth"


export function AuthInitializer(props: { state: Partial<AuthState> }) {
  return (
    <StoreInitializer
      state={props.state}
      store={useAuth}
    />
  )
}