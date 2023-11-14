import { Endpoint } from '@/lib/Endpoint';
import { Tokens } from '@/lib/abstractions/Tokens';
import { NextRequest, NextResponse } from 'next/server';

export class Account extends Endpoint {
  get url() {
    return 'account';
  }

  async signInSSR(req: NextRequest, clientId: string, clientSecret: string) {
    const userInfo = await req.json()



    const signinData = {
      ...userInfo,
      clientId,
      clientSecret,
    }
    console.log(this.at('sign-in'))
    console.log("login")
    console.log(signinData)
    //print base url
    console.log(this.client.defaults.baseURL)

    return this
      .client
      .post(this.at('sign-in'), signinData)
      .then<Partial<Tokens>>(res => res.data)
      .then(res => this.setCookie(res))
      .catch(err => NextResponse.json(err.response.data, { status: err.response.status }))
  }

  async signOutSSR() {
    return this.clearCookies()
  }

  setCookie(tokens: Partial<Tokens>) {
    if (tokens.accessToken && tokens.refreshToken) {
      const response = NextResponse.json(tokens, { status: 200 })

      response.cookies.set('accessToken', tokens.accessToken)
      response.cookies.set('refreshToken', tokens.refreshToken)

      return response
    }

    return NextResponse.json(null, { status: 400 })
  }

  clearCookies() {
    const response = NextResponse.json(null, { status: 200 })

    response.cookies.set('accessToken', '')
    response.cookies.set('refreshToken', '')

    return response
  }
}