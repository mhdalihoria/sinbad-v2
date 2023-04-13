import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";

export default function DeliveryTable({ deliveryData }) {
  //   const { pos } = posData;
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: theme.palette.primary.main }}>
          <TableRow>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              اسم الشركة
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              نوع وسيلة النقل
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              التكلفة
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              التسليم في غضون
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              مدة تاخير التسليم
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveryData.map((location, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ textAlign: "center" }}>
                {location.name}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {location.vehicle}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {location.fee}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {location.delivery_delay}
              </TableCell>
              <TableCell scope="row" style={{ textAlign: "center" }}>
                {location.delivery_within}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
