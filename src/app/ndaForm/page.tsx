'use client'
import { Box, Button, Card, Input, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
interface FormData {
  name: string
  email: string
}
interface FormDataProps {
  readonly open: boolean
  readonly onCreate: (organization: FormData) => void
  readonly onClose: () => void
}


export default function NDA() {
  const [formData, setFormData] = React.useState<FormData>({
    name : '',
    email: ''
  })

  const disableSubmit = !formData.name || !formData.email

  const handleChange = <T extends keyof FormData>(key: T, value: FormData[T]) => {
    setFormData({
      ...formData,
      [key]: value
    })
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        margin: 2,
      }}
    >
      <Card
        sx={{
          padding: {xs: 1, sm: 4},
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          padding={{xs: 1, sm: 4}}
          maxWidth={500}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 300,
            }}
          >
            <Image
              src="/welcome.svg"
              fill
              alt="Picture of the author"
            />
          </Box>
          <Typography
            variant="body1"
            textAlign={'center'}
          >
            <b>Benvenuto!</b><br />
            Compila i campi qui sotto per ricevere il documento da firmare per entrare in ufficio
          </Typography>
            <TextField
              variant="outlined"
              label="Nome completo"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <Button
              variant="contained"
              disabled={disableSubmit}
              fullWidth
            >
              Invia email
            </Button>
        </Stack>
      </Card>
    </Stack>
  )
}