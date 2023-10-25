import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import { currency } from "lib";
import { format } from "date-fns";

export default function BasicTable({ bankPaymentData }) {
  const { data } = bankPaymentData;
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
              Payment Amt
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Bank Name
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Date
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Transfer No.
            </TableCell>

            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Transfer Doc
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Approved
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{currency(order.amount)}</TableCell>
              <TableCell>{order.bank_name}</TableCell>
              <TableCell>
                {order.order_date === "N/A"
                  ? ""
                  : format(new Date(order.order_date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{order.transfer_no}</TableCell>
              <TableCell> {order.transfer_document}</TableCell>
              <TableCell> {order.approved}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
