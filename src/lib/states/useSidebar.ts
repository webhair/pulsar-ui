import { create } from 'zustand'

interface SidebarState {
  readonly isOpen: boolean,
  readonly toggle: () => void, 
  readonly open: () => void,
  readonly close: () => void,
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))