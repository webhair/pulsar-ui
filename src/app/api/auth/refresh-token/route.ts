import { JwtType } from "@/lib/abstractions/JwtType";
import { Tokens } from "@/lib/abstractions/Tokens";
import { getDecodedToken } from "@/lib/tokenUtils";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const client = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  })

  const accessToken = cookies().get('accessToken')?.value ?? req.nextUrl.searchParams.get('accessToken');
  const refreshToken = cookies().get('refreshToken')?.value ?? req.nextUrl.searchParams.get('refreshToken');

  const decodedToken = getDecodedToken(decodeURIComponent(accessToken ?? '')) as JwtType;

  try {
    const res = await client
    .post<Tokens>('connect/token/refresh', {
      refreshToken: decodeURIComponent(refreshToken ?? ''),
      userId: decodedToken.sub,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
    })

    const tokens = res.data
    const response = NextResponse.json(tokens, { status: res.status })

    response.cookies.set('accessToken', tokens.accessToken)
    response.cookies.set('refreshToken', tokens.refreshToken)
    return response
  }
  catch (err) {
    return NextResponse.json(null, { status: 401 })

  }
}