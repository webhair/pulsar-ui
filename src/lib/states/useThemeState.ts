import { create } from 'zustand'

interface ThemeState {
  readonly color: string,
  readonly mode: 'light' | 'dark',
  readonly setColor: (color: string) => void,
  readonly setMode: (mode: 'light' | 'dark') => void,
}

export const defaulColor = '#021e2b'

export const useThemeState = create<ThemeState>((set) => ({
  color: defaulColor,
  mode: 'light',
  setColor: (color) => set({ color }),
  setMode: (mode) => set({ mode }),
}))