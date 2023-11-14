"use client"

import { useAlerts } from "@/lib/states/useAlerts";
import { Alert, Snackbar } from "@mui/material";

export function GlobalAlerts() {
  const { isOpen, autoHideDuration, alert, close } = useAlerts();

  return (
    <Snackbar 
      open={isOpen} 
      autoHideDuration={autoHideDuration} 
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <Alert 
        onClose={close} 
        severity={alert?.severity} 
        sx={{ width: '100%' }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  )
}