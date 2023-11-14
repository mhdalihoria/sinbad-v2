import React, { useEffect, useState } from "react";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { H5, H2 } from "../../src/components/Typography";
import { useRouter } from "next/router";
import { useAppContext } from "../../src/contexts/AppContext";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import {
  useTheme,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  TableRow,
  Typography,
  Chip,
  Pagination,
  TableHead,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import { currency } from "../../src/lib";
import { format } from "date-fns";
import { FlexBox } from "../../src/components/flex-box";
import Table from "../../src/pages-sections/orders-sinbad/Table"

const Orders = () => {
  const { userToken, isMarketer } = useAppContext();
  const router = useRouter();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData] = useState(null);

  console.log(ordersData);

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
        `https://sinbad-store.com/api/v2/get-my-orders?page=${currentPage}`,
        requestOptions
      );

      const data = await response.data;
      setOrdersData({
        data: data.data.orders,
        status: response.status,
        pagination: data.pagination,
      });
    };

    if (userToken) {
      doFetch();
    }
  }, [userToken, currentPage]);

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        title="Orders"
        icon={AccountBalanceIcon}
        navigation={<CustomerDashboardNavigation />}
      />

      <Box>
        <H2 color="primary.main" my={3} mx={0.75}>
          Orders:
        </H2>

        {ordersData && ordersData.data.length > 0 ? (
          <>
            <Table ordersData={ordersData} isMarketer={isMarketer}/>

            <FlexBox justifyContent="center" mt={5}>
              <Pagination
                count={ordersData.pagination.last_page}
                color="primary"
                page={currentPage}
                onChange={(event, page) => handleChangePage(page)}
              />
            </FlexBox>
          </>
        ) : (
          <p>No Orders</p>
        )}

      </Box>

    </CustomerDashboardLayout>
  );
};

export default Orders