import { create } from "zustand";
import { Tokens } from "../../abstractions/Tokens";
import { JwtType, Scope } from "../../abstractions/JwtType";
import { getDecodedToken } from "../../tokenUtils";

export interface AuthState {
  readonly tokens: Tokens;
  readonly updateTokens: () => void;
  readonly checkScope: (scope: Scope) => boolean;
  readonly getDecodedAccessToken: () => JwtType | undefined;
  readonly getTokens: () => Tokens;
  readonly setTokens: (tokens: Tokens) => void;
  readonly isLogged: () => boolean;
}

const useAuth = create<AuthState>((set, get) => ({
  tokens: {
    accessToken: '',
    refreshToken: ''
  },
  updateTokens: () => {
    const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken'))?.split('=')[1]
    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken'))?.split('=')[1]

    if (accessToken && refreshToken) {
      set({ tokens: { accessToken, refreshToken } })
    }
  },
  checkScope: (scope: Scope) => !!get()
    .getDecodedAccessToken()
    ?.scopes
    ?.includes(scope),
  getDecodedAccessToken: () => getDecodedToken(get().tokens.accessToken),
  getTokens: () => get().tokens,
  setTokens: (tokens: Tokens) => set({ tokens }),
  isLogged: () => !!(get().tokens?.accessToken && get().tokens?.refreshToken)
}))

export default useAuth;