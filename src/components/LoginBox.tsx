"use client"

import { Status } from "@/lib/abstractions/Status";
import { useAlerts } from "@/lib/states/useAlerts";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";
import { PasswordField } from "./PasswordFiled";
import authApi from "@/lib/api/AuthApi";


const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginForm = z.infer<typeof LoginFormSchema>;

export default function LoginBox() {
  const { open: openAlert } = useAlerts()
  const router = useRouter()

  const [formFields, setFormFields] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (key: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('idle');
    setFormFields({
      ...formFields,
      [key]: e.target.value,
    })
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle');

    const data = LoginFormSchema.safeParse(formFields);

    if (!data.success) {
      handleError()
      return
    }

    setStatus('loading');
    authApi
      .login({
        email: formFields.email ?? '',
        password: formFields.password ?? ''
      })
      .then(handleSuccess)
      .catch(() => handleError())
  }

  const handleSuccess = () => {
    setStatus('success')

    router.push('/protected')

    openAlert({
      severity: 'success',
      message: "Login effettuato!"
    }, 6000)
  }

  const handleError = () => {
    setStatus('error')
  }
  
  return (
    <Stack
      component="section"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        sx={{ padding: 3 }}
      >
        <Stack
          component='form'
          direction="column"
          spacing={2}
          onSubmit={handleFormSubmit}
        >
          <Typography
            variant="h6"
          >
            Login
          </Typography>
          <TextField
            size="small"
            id="login-username"
            label="Email"
            type="text"
            variant="outlined"
            error={status === 'error'}
            value={formFields.email}
            onChange={handleChange("email")}
          />
          <PasswordField
            size="small"
            id="login-password"
            label="Password"
            variant="outlined"
            error={status === 'error'}
            value={formFields.password}
            onChange={handleChange("password")}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={3}
          >
            <LoadingButton
              id="login-submit"
              type="submit"
              variant="contained"
              loading={status === 'loading'}
            >
              Login
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}