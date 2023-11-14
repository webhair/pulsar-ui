import { ApiBase } from "../ApiBase"
import { LoginRequest } from "../abstractions/LoginRequest"
import { Tokens } from "../abstractions/Tokens"
import useAuth from "../states/auth/useAuth"

class AuthApi extends ApiBase {
  login(req: LoginRequest) {
    return this
      .client
      .post<Tokens>('auth/sign-in', req)
      .then(res => res.data)
      .then(tokens => useAuth.setState({ tokens }))
  }
  
  refresh(req: { refreshToken: string, userId: string }) {
    return this
      .client
      .post<Tokens>('refresh-token', req)
      .then(res => res.data)
      .then(tokens => useAuth.setState({ tokens }))
  }

  logout() {
    return this
      .client
      .post<Tokens>('auth/sign-out')
      .then(res => res.data)
      .then(() => useAuth.setState({ 
        tokens: { 
          accessToken: '', 
          refreshToken: '' 
        }
      }))
  }
}

const authApi = new AuthApi({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SITE_BASE_URL + "api/",
})

export default authApi
