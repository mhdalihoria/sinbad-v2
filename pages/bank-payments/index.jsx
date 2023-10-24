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
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

const BankPayments = () => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [bankPaymentData, setBankPaymentData] = useState(null);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  console.log(bankPaymentData);

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
        `https://sinbad-store.com/api/v2/get-my-bank-payments?page=${currentPage}`,
        requestOptions
      );

      const data = await response.data;
      setBankPaymentData({
        data: data.data.payments,
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
        title="Bank Payments"
        icon={AccountBalanceIcon}
        navigation={<CustomerDashboardNavigation />}
      />

      <Box>
        <H2 color="primary.main" my={3} mx={0.75}>
          Bank Payments:
        </H2>

        <p>No payment records so far</p>

        <Button
          onClick={() => setOpenPaymentForm(true)}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          {" "}
          Add Payment
        </Button>
      </Box>

      {openPaymentForm && (
        <AddPaymentForm
          setOpenPaymentForm={setOpenPaymentForm}
          openPaymentForm={openPaymentForm}
        />
      )}
    </CustomerDashboardLayout>
  );
};

const AddPaymentForm = ({ openPaymentForm, setOpenPaymentForm }) => {
  const theme = useTheme();

  return (
    <Box mt={4}>
      <Divider sx={{ mt: 3 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Add Payment</h2>
        <Button onClick={() => setOpenPaymentForm(false)}>
          {<CloseIcon />}
        </Button>
      </Box>
      <Formik
        initialValues={{
          bank: "",
          balance: "",
          transferNo: "",
          file: null,
        }}
        validationSchema={Yup.object({
          bank: Yup.string().required("Bank is required"),
          balance: Yup.number()
            .required("Balance is required")
            .positive("Balance must be positive"),
          transferNo: Yup.string().required("Transfer No. is required"),
          file: Yup.mixed().required("File is required"),
        })}
        onSubmit={(values) => {
          console.log("Form Values:", values);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="bank">Bank</InputLabel>
                <Field as={Select} name="bank" label="Bank">
                  <MenuItem value="">
                    <em>Select a Bank</em>
                  </MenuItem>
                  {banks.map((bank) => (
                    <MenuItem key={bank.value} value={bank.value}>
                      {bank.name}
                    </MenuItem>
                  ))}
                </Field>
                <div style={{ color: theme.palette.error.main }}>
                  <ErrorMessage name="bank" />
                </div>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                id="balance"
                name="balance"
                label="Balance"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
              <div style={{ color: theme.palette.error.main }}>
                <ErrorMessage name="balance" />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                id="transferNo"
                name="transferNo"
                label="Transfer No."
              />

              <div style={{ color: theme.palette.error.main }}>
                <ErrorMessage name="transferNo" />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <input
                accept=".pdf, .jpg, .jpeg, .png"
                id="file"
                name="file"
                type="file"
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <Button variant="outlined" component="span">
                  Upload File (PDF or Image)
                </Button>
              </label>
              <div style={{ color: theme.palette.error.main }}>
                <ErrorMessage name="file" />
              </div>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 4 }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

const banks = [
  { value: "3", name: "مصرف بنك سورية الدولي الاسلامي" },
  { value: "4", name: "مصرف البنك العربي" },
  { value: "5", name: "بنك المصرف الدولي للتجارة و التمويل" },
  { value: "6", name: "مصرف بنك عودة" },
  { value: "7", name: "حساب بنك سورية الدولي الإسلامي" },
  { value: "8", name: "حساب بنك بيمو السعودي الفرنسي" },
  { value: "9", name: "حساب بنك البركة" },
  { value: "10", name: "الهرم" },
  { value: "11", name: "الأهلية" },
];

export default BankPayments;
