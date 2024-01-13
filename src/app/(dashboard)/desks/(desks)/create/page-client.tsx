"use client"

import DeskGrid from '@/components/DeskGrid';
import { Stack } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function CrmClientPage() {
  const { push } = useRouter()

  const handleBook = (event: any) => {
    console.log("WIP - MODIFICA")
    push(`/crm/book`)
  }

  const handleCreate = (event: any) => {
    console.log("WIP - ELIMINA")
    push(`/crm/create`)

  }

  return (
    <Stack
      direction='column'
      spacing={2}
    >
      <DeskGrid
        onBook={handleBook}
        onCreate={handleCreate}
      />
    </Stack>
  )
}