"use client";

import DeskGrid from "@/components/DeskGrid";
import DeskBookModal from "@/components/desks/BookDeskModal";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CrmClientPage() {
  let [ open, setOpen ] = useState(false);
  const { push } = useRouter();

  const handleCreate = (event: any) => {
    console.log("WIP - ELIMINA");
    push(`/desks/create`);
  };

  const handleToggleModal = () => {
    setOpen(!open);
  };

  return (
    <Stack direction="column" spacing={2}>
      <DeskGrid onBook={handleToggleModal} onCreate={handleCreate} />
      <DeskBookModal open={open} onToggle={handleToggleModal} />
    </Stack>
  );
}
