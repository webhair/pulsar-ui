"use client"

import { Button, Stack, Typography } from "@mui/material"
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
        Clienti
      </Typography>
      <GridSearch
        addLabel="Nuovo Cliente"
        onAdd={(e) => console.log("WIP NUOVO CLIENTE", e)}
      />
      <DataGrid
        getRowId={(row) => row.email}
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            minWidth: 200
          },
          {
            field: 'email',
            headerName: 'Email',
            minWidth: 400,
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
          { name: 'Jacopo Zanti', email: 'jacopo.zanti@webion.it' },
          { name: 'Jacopo Zanti', email: 'jacopo.zanti2@webion.it' },
          { name: 'Jacopo Zanti', email: 'jacopo.zanti3@webion.it' },
          { name: 'Jacopo Zanti', email: 'jacopo.zanti4@webion.it' },
        ]}
      />
    </Stack>
  )
}