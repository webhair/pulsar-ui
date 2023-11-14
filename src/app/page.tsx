import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Typography>
        Home
      </Typography>
      <Button
        variant="contained"
        href="https://google.com"
        target="_blank"
      >
        Open Google
      </Button>
    </div>
  )
}
