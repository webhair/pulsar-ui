'use client'
import { Box, Button, Card, Input, Stack, Table, TextField, Typography } from "@mui/material";
import Image from "next/image";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function NDA() {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
  ) {
    return { name, calories, fat, carbs, };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37,),
    createData('Eclair', 262, 16.0, 24),
  ];
  
  
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        margin: 2,
      }}
    >
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={200}>Nome</TableCell>
            <TableCell align="right" width={200}>Email</TableCell>
            <TableCell align="right">Firmato il</TableCell>
            <TableCell align="right">Scadenza NDA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Stack>
  )
}



