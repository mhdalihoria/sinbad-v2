import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, useTheme } from "@mui/material";
import { currency } from "lib";
import { format } from "date-fns";

export default function BasicTable({ ordersData }) {
  const { data } = ordersData;
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
              #
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Address
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Order Data
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Amount
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Order State
            </TableCell>
            {data.some((item) => item.status === "تم الالغاء") && (
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Cancel Reason
              </TableCell>
            )}
            {data.some((item) => item.can_cancel === true) && (
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Cancel Order
              </TableCell>
            )}
            {data.some((item) => item.can_edit === true) && (
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Edit Order
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <React.Fragment key={order.id}>
              <Row order={order} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Row = ({ order }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleSubTableOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.id}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.carrier}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.order_date}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {currency(order.total_price)}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.status}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.cancel_reason}
        </TableCell>
        <TableCell>
          {order.can_cancel ? (
            <Button
              sx={{ color: theme.palette.primary.main }}
              onClick={() => console.log("cancel")}
            >
              cancel
            </Button>
          ) : (
            "no"
          )}
        </TableCell>
        <TableCell>
          {order.can_edit ? (
            <Button
              sx={{ color: theme.palette.secondary.main }}
              onClick={() => console.log("edit")}
            >
              edit
            </Button>
          ) : (
            "no"
          )}
        </TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell colSpan={8}>
            <SubTable order={order} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const SubTable = ({ order }) => {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sub-table">
        <TableHead style={{ background: theme.palette.primary.main }}>
          <TableRow>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Prod Name
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Qnty
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.order_details.map((data) => (
            <TableRow key={data.id}>
              <TableCell align="center">{data.product_name}</TableCell>
              <TableCell align="center">{data.quantity}</TableCell>
              <TableCell align="center">{data.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
