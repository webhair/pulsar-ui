"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Typography, Button } from "@mui/material";

interface DeskGridProps {
  readonly onBook: (event: any) => void;
  readonly onCreate: (event: any) => void;
}

interface DeskProps {
  readonly index: number;
  readonly active?: boolean;
  readonly booked?: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
  width: "250px",
  height: "80px",
  backgroundColor: "#1FA755",
  borderRadius: "10px",
}));

const DeskButton = styled("span")(({ theme }) => ({
  display: "flex",
  border: "none",
  alignContent: "center",
  alignItems: "center",
  backgroundColor: "#1FA755",
  color: theme.palette.background.default,
}));

function Desk(props: DeskProps) {
  const { index, active, booked } = props;
  return (
    <Item style={{ width: "100%" }}>
      <Button style={{ width: "100%", height: "100%" }}>
        <DeskButton> {index} Scrivania</DeskButton>
      </Button>
    </Item>
  );
}

export default function DeskGrid(props: DeskGridProps) {
  const { onBook, onCreate } = props;

  return (
    <Stack direction="column" spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mb: 2,
        }}
      >
        <div style={{ display: "flex", gap: 12, paddingRight: "10px" }}>
          <Button color="inherit" variant="outlined" onClick={onCreate}>
            + Nuova Scrivania
          </Button>
          <Button color="inherit" variant="contained" onClick={onBook}>
            Prenota Scrivania
          </Button>
        </div>
      </Box>
      <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(12)).map((_, index) => (
          <Grid
            xs={2}
            sm={4}
            md={4}
            key={index}
            justifyContent="center"
            style={{ display: "flex" }}
          >
            <Desk index={index} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
