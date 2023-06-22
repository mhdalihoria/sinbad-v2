import React, { useEffect, useState } from "react";
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
import useGetFetch from "components/fetch/useGetFetch";
import Image from "next/image";

const OrderSummeryTable = ({ data }) => {
  const theme = useTheme();
  const [prodImgs, setProdImgs] = useState([]);

  const totalPrice = (cartItems, shippingCost, discountPrice) => {
    const shipping = typeof shippingCost === "undefined" ? 0 : shippingCost;
    const discount = typeof discountPrice === "undefined" ? 0 : discountPrice;
    return (
      cartItems.reduce(
        (acc, current) => acc + Number(current.qty) * Number(current.price),
        0
      ) +
      shipping -
      discount
    );
  };

  useEffect(() => {
    if(data && typeof data.cart_items !== "undefined") {
      data.cart_items.map(async (item) => {
      const response = await useGetFetch(
        `https://sinbad-store.com/api/v2/product/${item.id}`
      );
      const data = await response.data.product;
      if (typeof data.product_image !== "undefined") {
        setProdImgs((prevProd) => {
          return [...prevProd, data.product_image];
        });
      }
    });
    }
  }, [data]);

  console.log(data)

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
                      Prod. Img
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      Prod. Name
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
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      qty
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
                      Total Comission
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
                        {prodImgs.length > 0 && (
                          <Image src={prodImgs[idx]} width={"200px"} height={"400px"} />
                        )}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {item.name}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(item.price)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {item.qty}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.discount === "undefined"
                          ? currency(0)
                          : currency(item.discount)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.commission === "undefined"
                          ? currency(0)
                          : currency(item.commission)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.delivery_commission === "undefined"
                          ? currency(0)
                          : currency(item.delivery_commission)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.total_commission === "undefined"
                          ? currency(0)
                          : currency(item.total_commission)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {currency(Number(item.qty) * item.price)}{" "}
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
                      {/* {currency(data.total_discount)} */}
                      {typeof data.total_discount === "undefined"
                        ? currency(0)
                        : currency(data.total_discount)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(data.shipping_cost)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(
                        totalPrice(
                          data.cart_items,
                          data.shipping_cost,
                          data.total_discount
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
      {/* <Grid container spacing={6} style={{ marginTop: "0rem" }}>
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
      </Grid> */}
    </>
  );
};

export default OrderSummeryTable;
