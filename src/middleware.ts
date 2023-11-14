import { JwtType } from '@/lib/abstractions/JwtType';
import { Tokens } from '@/lib/abstractions/Tokens';
import { getDecodedToken, isTokenExpired } from '@/lib/tokenUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function refreshTokens(tokensReq?: Tokens): Promise<Response> {
  const tokensRes = await fetch(process.env.NEXT_PUBLIC_SITE_BASE_URL + 'api/auth/refresh-token?' + new URLSearchParams({
    refreshToken: tokensReq?.refreshToken ?? '',
    accessToken: tokensReq?.accessToken ?? '',
  }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return tokensRes
}

export default async function middleware(req: NextRequest) {
  if (!req.cookies.has('accessToken')) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.next();
  }

  const decodedToken = getDecodedToken(accessToken) as JwtType;
  const isTokenValid = !isTokenExpired(decodedToken) 

  if (isTokenValid) {
    return NextResponse.next();
  }

  const refreshResponse = await refreshTokens({
    accessToken,
    refreshToken
  });

  if (refreshResponse.status === 401) {
    return clearTokensAndRedirectToLogin(req.url);
  }

  return updateTokensAndRedirect(req.url, await refreshResponse.json());
}

function clearTokensAndRedirectToLogin(currentURL: string): NextResponse {
  const response = redirectToLogin(currentURL);
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}

function updateTokensAndRedirect(url: string, tokens: Tokens): NextResponse {
  const response = NextResponse.redirect(url);
  response.cookies.set('accessToken', tokens.accessToken);
  response.cookies.set('refreshToken', tokens.refreshToken);
  return response;
}

function redirectToLogin(currentURL: string) {
  return NextResponse.redirect(new URL('/login', currentURL));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};