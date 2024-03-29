"use client"

import { Stack, Button, Typography, Chip } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { GridSearch } from "./grid/GridSearch"

interface DocumentsGridProps {
  readonly onEdit: (event: any) => void
  readonly onDelete: (event: any) => void
}

export default function DocumentsGrid(props: DocumentsGridProps) {
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
        Documenti
      </Typography>
      <GridSearch
        addLabel='Nuovo Documento'
        onAdd={(e) => console.log("WIP NUOVO DOCUMENTO", e)}
      />
      <DataGrid
        getRowId={(row) => row.name}
        columns={[
          {
            field: 'name',
            headerName: 'Name',
            minWidth: 200
          },
          {
            field: 'tag',
            headerName: 'Etichetta',
            minWidth: 400,
            flex: 1,
            renderCell: (params) => {
              return (
                <Stack
                  direction='row'
                  spacing={1}
                >
                  {
                    params.row.tag.map((tag, i) => {
                      return <Chip key={i} label={tag} />
                    })
                  }
                </Stack>
              )
            }
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
          { name: 'Documento 1', tag: [] },
          { name: 'Documento 2', tag: ['1'] },
          { name: 'Documento 3', tag: ['2'] },
          { name: 'Documento 4', tag: ['1', '2'] },
        ]}
      />
    </Stack>
  )
}