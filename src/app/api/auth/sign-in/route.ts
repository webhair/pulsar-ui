import pulsarApi from "@/lib/api/PulsarApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.AUTH_CLIENT_ID || !process.env.AUTH_CLIENT_SECRET) {
    return NextResponse.json(null, { status: 400 })
  }
  
  return await pulsarApi.account.signInSSR(
    req,
    process.env.AUTH_CLIENT_ID,
    process.env.AUTH_CLIENT_SECRET
  )
}