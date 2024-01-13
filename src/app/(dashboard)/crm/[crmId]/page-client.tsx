"use client"

import CrmGrid from '@/components/grids/CrmGrid';
import DocumentsGrid from '@/components/grids/DocumentsCrmGrid';
import ProjectsGrid from '@/components/grids/ProjectsGrid';
import { Stack, Typography } from "@mui/material";

export default function CrmDetailClientPage() {
  const handleEdit = (event: any) => {
    console.log("WIP - MODIFICA")
  }

  const handleDelete = (event: any) => {
    console.log("WIP - ELIMINA")
  }

  return (
    <Stack
      direction='column'
      spacing={2}
    >
      <Typography>
        <span style={{ fontWeight: 'bold' }}>Descrizione: </span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor varius diam vel pretium. Morbi id mi ligula. Cras posuere auctor pretium.
      </Typography>
      <ProjectsGrid
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DocumentsGrid
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Stack>
  )
}