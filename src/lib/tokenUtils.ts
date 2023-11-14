import { JwtType } from "./abstractions/JwtType"
import { jwtDecode } from "jwt-decode";

export const getDecodedToken = (token: string) => {
  if(token === '')
    return

  return jwtDecode<JwtType>(token)
}

export const isTokenExpired = (decodedToken?: JwtType) => {
  if(!decodedToken) 
    return true

  const exp = decodedToken.exp * 1000
  return Date.now() > exp
}