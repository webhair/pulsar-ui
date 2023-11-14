"use client"

import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export function PasswordField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
          </IconButton>
        )
      }}
    />
  )
}