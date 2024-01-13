"use client"

import { Stack, Button, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { GridSearch } from "./grid/GridSearch"

interface CrmGridProps {
  readonly onEdit: (event: any) => void
  readonly onDelete: (event: any) => void
}

export default function CrmGrid(props: CrmGridProps) {
  const { onEdit, onDelete } = props

  return (
    <Stack
      direction='column'
      spacing={2}
    >
      <Typography
        variant='h6'
        fontWeight={800}
      >
        Progetti
      </Typography>
      <GridSearch
        addLabel="Nuovo Progetto"
        onAdd={(e) => console.log("WIP NUOVO PROGETTO", e)}
      />
      <DataGrid
        getRowId={(row) => row.name}
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
          },
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
                    onClick={onEdit}
                  >
                    Modifica
                  </Button>
                  <Button
                    color='error'
                    onClick={onDelete}
                  >
                    Elimina
                  </Button>
                </Stack>
              )
            }
          },
        ]}
        rows={[
          { name: 'Progetto 1', email: 'jacopo.zanti@webion.it' },
          { name: 'Progetto 2', email: 'jacopo.zanti2@webion.it' },
          { name: 'Progetto 3', email: 'jacopo.zanti3@webion.it' },
          { name: 'Progetto 4', email: 'jacopo.zanti4@webion.it' },
        ]}
      />
    </Stack>
  )
}