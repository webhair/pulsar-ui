import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Typography>
        Home
      </Typography>
      <Button
        variant="contained"
        component={Link}
        href="/login"
      >
        Go to login
      </Button>
    </div>
  )
}
