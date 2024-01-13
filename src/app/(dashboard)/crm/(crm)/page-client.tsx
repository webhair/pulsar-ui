"use client"

import Grid from '@/components/grids/grid/Grid';
import { Stack } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function CrmClientPage() {
  const { push } = useRouter()

  const handleEdit = (event: any) => {
    console.log("WIP - MODIFICA")
    push(`/crm/${'a'}`)
  }

  const handleDelete = (event: any) => {
    console.log("WIP - ELIMINA")
  }

  return (
    <Stack
      direction='column'
      spacing={2}
    >
      <Grid
        title='Clienti'

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
          }
        ]}
        rows={[
          { name: 'JZ', email: 'jz@wb.it' },
          { name: 'JZ2', email: 'jz2@wb.it' },
          { name: 'JZ3 la vendetta', email: 'jz3_lavendetta@wb.it' },
        ]}
        getRowId={(row) => row.name}

        buttonNewLabel='Nuovo Cliente'
        buttonClickHandle={() => console.log("WIP - NUOVO CRM")}

        onRowEdit={handleEdit}
        onRowDelete={handleDelete}
      />
    </Stack>
  )
}