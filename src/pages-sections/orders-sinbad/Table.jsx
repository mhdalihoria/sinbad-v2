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

export default function BasicTable({ ordersData, isMarketer }) {
  const { data } = ordersData;
  const theme = useTheme();
  console.log("isMarketer", isMarketer);
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
              Name
            </TableCell>
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Number
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
              Order Date
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
            {isMarketer && (
              <TableCell
                style={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: "700",
                }}
                align="center"
              >
                Comission
              </TableCell>
            )}
            <TableCell
              style={{
                color: theme.palette.primary.contrastText,
                fontWeight: "700",
              }}
              align="center"
            >
              Bill No.
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
              <Row order={order} isMarketer={isMarketer} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Row = ({ order, isMarketer }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleSubTableOpen = () => {
    setOpen(!open);
  };

  const orderCommissionSum = order.order_details.reduce(
    (orderSum, orderDetail) => {
      return orderSum + orderDetail.commission;
    },
    0
  );

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
          {order.shipped_full_name}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.shipped_mobile}
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
        {isMarketer && (
          <TableCell
            onClick={() => handleSubTableOpen()}
            sx={{ cursor: "pointer" }}
          >
            {currency(orderCommissionSum)}
          </TableCell>
        )}
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.bill_no}
        </TableCell>
        <TableCell
          onClick={() => handleSubTableOpen()}
          sx={{ cursor: "pointer" }}
        >
          {order.transfer_document}
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
            <SubTable order={order} isMarketer={isMarketer} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const SubTable = ({ order, isMarketer }) => {
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
            {isMarketer && (
              <>
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Comission
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: "700",
                  }}
                  align="center"
                >
                  Delivery Comission
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {order.order_details.map((data) => (
            <TableRow key={data.id}>
              <TableCell align="center">{data.product_name}</TableCell>
              <TableCell align="center">{data.quantity}</TableCell>
              <TableCell align="center">{currency(data.price)}</TableCell>
              {isMarketer && (
                <>
                  <TableCell align="center">
                    {currency(data.commission)}
                  </TableCell>
                  <TableCell align="center">
                    {currency(data.delivery_commission)}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
