"use client"

import CrmGrid from '@/components/grids/CrmGrid';
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
      <CrmGrid
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Stack>
  )
}