import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function BasicTable({ posData }) {
  const { pos } = posData;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">اسم الفرع</TableCell>
            <TableCell align="center">الوصف</TableCell>
            <TableCell align="center">رقم الموبايل</TableCell>
            <TableCell align="center">العنوان</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pos.data.map((location) => (
            <TableRow
              key={location.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell >{location.name}</TableCell>
              <TableCell >{location.description}</TableCell>
              <TableCell >{location.mobile}</TableCell>
              <TableCell component="th" scope="row">
                {location.address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
