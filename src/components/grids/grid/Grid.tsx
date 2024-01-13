"use client"

import { Stack, Typography, Chip, Button } from "@mui/material"
import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid"
import { GridSearch } from "./GridSearch"

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

interface GridProps {
  readonly title: string
  readonly buttonNewLabel: string
  readonly buttonClickHandle: (event: ButtonClickEvent) => void

  readonly columns: GridColDef[]
  readonly rows: any[]

  readonly getRowId: GridRowIdGetter<any>

  readonly onRowEdit?: (event: ButtonClickEvent) => void
  readonly onRowDelete?: (event: ButtonClickEvent) => void
}

export default function Grid(props: GridProps) {
  return (
    <Stack
      direction='column'
      spacing={2}
    >
      <Typography
        variant='h6'
        fontWeight={800}
      >
        {props.title}
      </Typography>
      <GridSearch
        addLabel={props.buttonNewLabel}
        onAdd={props.buttonClickHandle}
      />
      <DataGrid
        getRowId={(row) => row.name}
        columns={[
          ...props.columns,
          {
            field: 'actions',
            headerName: '',
            minWidth: 200,
            align: 'right',
            renderCell: (params) => {
              return (
                <Stack
                  direction='row'
                  spacing={1}
                >
                  <Button
                    color='success'
                    onClick={props.onRowEdit}
                  >
                    Modifica
                  </Button>
                  <Button
                    color='error'
                    onClick={props.onRowDelete}
                  >
                    Elimina
                  </Button>
                </Stack>
              )
            }
          },
        ]
        }
        rows={props.rows}
      />
    </Stack>
  )
}