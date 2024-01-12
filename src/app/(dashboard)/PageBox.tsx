"use client"

import authApi from "@/lib/api/AuthApi";
import { useAlerts } from "@/lib/states/useAlerts";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PageBox() {
  const router = useRouter()
  const { open: openAlert } = useAlerts()
  const [loading, setLoading] = useState(false)

  const logout = () => {
    setLoading(true)
    authApi
      .logout()
      .then(() => {
        openAlert({
          severity: "success",
          message: "Logout effettuato",
        })
        router.push("/")
      })
      .catch((err) => {
        openAlert({
          severity: "error",
          message: "Errore durante il logout",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Typography>
        Protected
      </Typography>
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={logout}
      >
        Logout
      </LoadingButton>
    </div>
  )
}
