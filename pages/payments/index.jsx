import { Button, Pagination } from "@mui/material";
import { CreditCard, ShoppingBag } from "@mui/icons-material";
import TableRow from "components/TableRow";
import { H5, H2 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import OrderRow from "pages-sections/orders/OrderRow";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/orders";
import React, { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { useAppContext } from "../../src/contexts/AppContext";
import { useRouter } from "next/router";
import DialogPrompt from "../../src/components/dialog-prompt/DialogPrompt";

// ====================================================

const Payments = () => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState(null);
  console.log(orderData);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  useEffect(() => {
    const doFetch = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "X-localization": "ar",
          Authorization: `Bearer ${userToken}`,
        },
        redirect: "follow",
      };

      const response = await useGetFetch(
        `https://sinbad-store.com/api/v2/get-my-payments?page=${currentPage}`,
        requestOptions
      );

      const data = await response.data;
      setOrderData({
        data: data.data.payments,
        status: response.status,
        pagination: data.pagination,
      });
    };

    if (userToken) {
      doFetch();
    }
  }, [userToken, currentPage]);

  const totalBalance = (data) => {
    let balance = 0;
    data.map((order) => {
      if (order.debit === "Credit") {
        balance = balance + parseInt(order.amount);
        console.log(totalBalance);
      } else if (order.debit === "Debit") {
        balance = balance - parseInt(order.amount);
      }
    });

    return balance;
  };

  return (
    <>
      {userToken ? (
        <CustomerDashboardLayout>
          {/* TITLE HEADER AREA */}
          <UserDashboardHeader
            title="My Payments"
            icon={CreditCard}
            navigation={<CustomerDashboardNavigation />}
          />

          {orderData ? (
            <>
              <H2 color="primary.main" my={3} mx={0.75}>
                Balance:{" "}
                <span style={{ color: "black" }}>
                  {totalBalance(orderData.data)}
                </span>
              </H2>

              <TableRow
                elevation={0}
                sx={{
                  padding: "0px 18px",
                  background: "none",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                  Payment Amt
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                  Date
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                  Type
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                  Note
                </H5>

                <H5 color="grey.600" my={0} mx={0.75} textAlign="left">
                  Prev Payments
                </H5>

                <H5
                  my={0}
                  px={2.75}
                  color="grey.600"
                  flex="0 0 0 !important"
                  display={{
                    xs: "none",
                    md: "block",
                  }}
                />
              </TableRow>

              {orderData.data.map((order) => (
                <OrderRow order={order} key={order.id} />
              ))}

              {/* PAGINATION AREA */}
              <FlexBox justifyContent="center" mt={5}>
                <Pagination
                  count={orderData.pagination.last_page}
                  color="primary"
                  page={currentPage}
                  onChange={(event, page) => handleChangePage(page)}
                />
              </FlexBox>
            </>
          ) : (
            <DialogPrompt
              title={"No Orders"}
              description={
                "There's no orders here, visit store page to order products"
              }
              buttons={
                <Button
                  onClick={() => router.push("/")}
                  variant="contained"
                  color="primary"
                >
                  Store
                </Button>
              }
            />
          )}
        </CustomerDashboardLayout>
      ) : (
        <DialogPrompt
          title={"You Are Not Logged In"}
          description={"To view this Page, you need to be logged in"}
          buttons={
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          }
        />
      )}
    </>
  );
};

export default Payments;
