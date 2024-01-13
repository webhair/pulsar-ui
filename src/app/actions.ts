"use server"

import { getDecodedToken, isTokenExpired } from "@/lib/tokenUtils"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface IAuthGuard {
  readonly redirect: string,
  readonly redirectOnSuccess?: string,
}

export const authGuard = (opt: IAuthGuard) => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value ?? ''

  const decodedToken = getDecodedToken(accessToken)
  const isExpired = isTokenExpired(decodedToken)

  if (isExpired) {
    return redirect(opt.redirect)
  }

  if(!opt.redirectOnSuccess) 
    return

  return redirect(opt.redirectOnSuccess)
}

export const revalidate = (path: string) => {
  revalidatePath(path)
} 

export const revalidateAll = (path: string, id: string | number) => {
  revalidatePath(path)
  revalidatePath(`${path}/${id}` )
}