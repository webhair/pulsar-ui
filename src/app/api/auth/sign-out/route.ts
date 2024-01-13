import pulsarApi from "@/lib/api/PulsarApi"
import { NextResponse } from "next/server"

export async function POST() {  
  if (process.env.AUTH_CLIENT_ID && process.env.AUTH_CLIENT_SECRET) {
    const res = await pulsarApi.account.signOutSSR()
    return res
  }

  return NextResponse.json(null, { status: 400 })
}