import React from "react";
import Card1 from "components/Card1";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { currency } from "lib";
import Link from "next/link";

const OrderSummeryTable = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      <Card1>
        <Paper>
          {data &&
          typeof data.cart_items !== "undefined" &&
          data.cart_items.length > 0 ? (
            <TableContainer>
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
                      Price
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      discount
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      comission
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      delivery comisison
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      delivery fee?
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.cart_items.map((item, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(item.price)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.discount === "undefined"
                          ? currency(0)
                          : currency(item.discount)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(item.commission)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(item.delivery_commission)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        with delivery fee? idk what to do here
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(Number(item.qty) * item.price)}{" "}
                        {`(qty*price)`}
                      </TableCell>
                      {/* // <TableCell scope="row" style={{ textAlign: "center" }}>
            //   {item.delivery_within}
            // </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: theme.palette.primary.main }}>
                  <TableRow>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                      align="center"
                    >
                      Total Discount
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                      align="center"
                    >
                      Shipping Cost
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                      align="center"
                    >
                      Total Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(data.total_discount)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(data.shipping_cost)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(
                        data.cart_items.reduce(
                          (acc, current) =>
                            acc + Number(current.qty) * Number(current.price),
                          0
                        )
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              Something Went Wrong <br /> You Don't Have Access to the Table
            </div>
          )}
        </Paper>
      </Card1>
      <Grid container spacing={6} style={{ marginTop: "0rem" }}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back To Checkout
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/payment" passHref>
            <Button variant="contained" color="primary" type="button" fullWidth>
              Proceed
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSummeryTable;
