import { Button, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { ReactNode } from "react";

interface GridSearchProps {
  readonly addLabel: string
  readonly onAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  readonly extra?: ReactNode
}

export function GridSearch(props: GridSearchProps) {
  return (
    <Stack
      direction='row'
      spacing={2}
    >
      <OutlinedInput
        size='small'
        placeholder='Cerca'

        startAdornment={
          <InputAdornment
            position='start'
          >
            <SearchIcon />
          </InputAdornment>
        }

        sx={{
          flex: 1
        }}
      />
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        onClick={props.onAdd}
      >
        {props.addLabel}
      </Button>
      {props.extra}
    </Stack>
  )
}