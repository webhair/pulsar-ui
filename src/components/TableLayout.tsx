"use client"

import { SearchRounded } from "@mui/icons-material";
import { Paper, Stack, TextField } from "@mui/material";

interface TableLayoutProps {
  readonly children?: React.ReactNode
  readonly actions?: React.ReactNode
  readonly onSearch?: (value: string) => void
}

export function TableLayout(props: TableLayoutProps) {
  return (
    <Stack
      direction="column"
      spacing={2}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: '100%' }}
      >
        <TextField
          size="small"
          label="Cerca"
          variant="outlined"
          onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
          sx={{ flex: 1 }}
          InputProps={{
            endAdornment: <SearchRounded/>
          }}
        />
        {props.actions}
      </Stack>
      <Paper
        sx={{
          height: {
            xs: 'calc(100vh - 240px)',
            md: 'calc(100vh - 208px)'
          }
        }}
      >
        {props.children}
      </Paper>
    </Stack>
  )
}