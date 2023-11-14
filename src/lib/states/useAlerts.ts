import { create } from "zustand";

interface Alert {
  readonly message: string,
  readonly severity: 'error' | 'warning' | 'info' | 'success'
}

interface AlertsState {
  readonly isOpen?: boolean,
  readonly autoHideDuration?: number,
  readonly alert?: Alert,
  readonly open: (alert: Alert, autoHideDuration?: number) => void,
  readonly close: () => void,
}

export const useAlerts = create<AlertsState>((set) => ({
  isOpen: undefined,
  alert: undefined,
  selfCloseAfter: undefined,
  open: (alert, autoHideDuration) => {
    set({
      isOpen: true,
      alert: alert,
      autoHideDuration: autoHideDuration ?? 5000
    })
  },
  close: () => set({
    isOpen: undefined,
    autoHideDuration: undefined
  }),
}))