export interface Organization {
  readonly id: string
  readonly name: string
  readonly settings?: {
    readonly color: string
  }
}