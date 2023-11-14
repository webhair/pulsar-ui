import { ApiBase } from '@/lib/ApiBase';
import { refreshTokens } from '@/middleware';
import { AxiosRequestConfig } from 'axios';
import { Tokens } from '../abstractions/Tokens';
import { getDecodedToken, isTokenExpired } from '../tokenUtils';
import { Account } from './account/Account';

class ProjectApi extends ApiBase {
  constructor(config: AxiosRequestConfig) {
    super(config)
    
    this.client.interceptors.request.use(async (config) => {
      const cookieStore = await getTokens()

      if (cookieStore.accessToken) {
        const accessToken = cookieStore.accessToken

        const isExpired = isTokenExpired(getDecodedToken(accessToken))

        if (isExpired) {
          await refreshTokens({
            accessToken: cookieStore.accessToken,
            refreshToken: cookieStore.refreshToken,
          })

          const tokens = await getTokens()

          config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
          return config;
        }

        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config;
    });
  }

  get account() {
    return new Account(this.client)
  }
}

export const getTokens = async (): Promise<Tokens> => {
  const isServer = typeof window === 'undefined';
  
  const action = isServer 
    ? getServerTokens
    : getClientTokens

  return action();
}

const getServerTokens = async () => import('next/headers').then(c => {
  const serverCookies = c.cookies()

  const tokens = {
    accessToken: serverCookies.get('accessToken')?.value,
    refreshToken: serverCookies.get('refreshToken')?.value
  } as Tokens

  return tokens
})

const getClientTokens = async () => import('@/lib/states/auth/useAuth').then(c => {
  c.default.getState().updateTokens()
  return c.default.getState().tokens
}) 

const projectApi = new ProjectApi({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export default projectApi