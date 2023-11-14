import projectApi from "@/lib/api/ProjectApi"
import { NextResponse } from "next/server"

export async function POST() {  
  if (process.env.AUTH_CLIENT_ID && process.env.AUTH_CLIENT_SECRET) {
    const res = await projectApi.account.signOutSSR()
    return res
  }

  return NextResponse.json(null, { status: 400 })
}