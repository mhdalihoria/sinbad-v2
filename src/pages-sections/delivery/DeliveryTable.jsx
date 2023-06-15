import React, { useEffect, useState } from "react";
import Card1 from "components/Card1";
import {
  Button,
  Grid,
  Paper,
  Radio,
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
import { useAppContext } from "contexts/AppContext";

const DeliveryTable = ({ data, checked, setChecked }) => {
  const theme = useTheme();
  const {setOrderData} = useAppContext()

  useEffect(()=> {
    setOrderData(prevData => {
      return {
        ...prevData, 
        carrierId: checked
      }
    })
  }, [checked])

  return (
    <>
      <Card1>
        <Paper>
          {data &&
          typeof data.carrier_location !== "undefined" &&
          data.carrier_location.length > 0 ? (
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
                    ></TableCell>
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
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={{ textAlign: "center" }}>
                      <Radio
                        checked={checked === 0 ? true : false}
                        color="primary"
                        size="small"
                        onClick={() => setChecked(0)}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      الاستلام من المكتب
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {currency(0)}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}></TableCell>
                    <TableCell style={{ textAlign: "center" }}></TableCell>
                  </TableRow>
                  {data.carrier_location.map((item, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ textAlign: "center" }}>
                        <Radio
                          checked={checked === item.id ? true : false}
                          color="primary"
                          size="small"
                          onClick={() => setChecked(item.id)}
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {item.carrier}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {typeof item.fee === "undefined"
                          ? currency(0)
                          : currency(item.fee)}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {item.delivery_within}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {item.delivery_delay}
                      </TableCell>
                    </TableRow>
                  ))}
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
              Back to Details
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/orderSummery" passHref>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={checked === null ? true : false}
            >
              Proceed
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default DeliveryTable;
