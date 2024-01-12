export const scopes = [
  "commissions",
  "elections",
  "prints",
  "users",
  "electoral_lists"
] as const

export type Scope = typeof scopes[number]

export interface JwtType {
  readonly sub: string
  readonly exp: number
  readonly name: string
  readonly email: string
  readonly scopes: Scope[]
}