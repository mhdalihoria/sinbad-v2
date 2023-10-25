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
import Table from "../../src/pages-sections/bank-payment/Table"

const BankPayments = ({ banks }) => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [bankPaymentData, setBankPaymentData] = useState(null);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);
  const [isNewPaymentAdded, setIsNewPaymentAdded] = useState(false);

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
      setIsNewPaymentAdded(false)
    };

    if (userToken) {
      doFetch();
    }
  }, [userToken, currentPage, isNewPaymentAdded]);

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

        {bankPaymentData && bankPaymentData.data.length > 0 ? (
          <>
            <Table bankPaymentData={bankPaymentData}/>

            <FlexBox justifyContent="center" mt={5}>
              <Pagination
                count={bankPaymentData.pagination.last_page}
                color="primary"
                page={currentPage}
                onChange={(event, page) => handleChangePage(page)}
              />
            </FlexBox>
          </>
        ) : (
          <p>No payment records so far</p>
        )}

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
          banks={banks}
          userToken={userToken}
          setIsNewPaymentAdded={setIsNewPaymentAdded}
        />
      )}
    </CustomerDashboardLayout>
  );
};

const AddPaymentForm = ({ banks, setOpenPaymentForm, userToken, setIsNewPaymentAdded }) => {
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
        onSubmit={async (values) => {
          console.log("Form Values:", values);
          try {
            const headers = {
              "X-localization": "ar",
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            };
            const body = JSON.stringify({
              transfer_document: values.file,
              bank_id: `${values.bank}`,
              transfer_no: values.transferNo,
              amount: values.balance,
            });
            const response = await usePostFetch(
              "https://sinbad-store.com/api/v2/add-bank-payment",
              headers,
              body
            );
            console.log(values.file, body, response);
            setIsNewPaymentAdded(true)
          } catch (err) {
            console.error(err);
          }
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
                    <MenuItem key={bank.id} value={bank.id}>
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
              <Field name="balance">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Balance"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                )}
              </Field>
              <div style={{ color: theme.palette.error.main }}>
                <ErrorMessage name="balance" />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Field name="transferNo">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Transfer No."
                  />
                )}
              </Field>
              <div style={{ color: theme.palette.error.main }}>
                <ErrorMessage name="transferNo" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Field name="file">
                {({ field, form }) => (
                  <div>
                    <label htmlFor="file">
                      <Button variant="outlined" component="span">
                        Upload File (PDF or Image)
                      </Button>
                      <input
                        accept=".pdf, .jpg, .jpeg, .png"
                        id="file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          form.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                    </label>
                  </div>
                )}
              </Field>
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

export const getStaticProps = async (ctx) => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
    redirect: "follow",
  };

  const response = await useGetFetch(
    "https://sinbad-store.com/api/v2/get-banks",
    requestOptions
  );

  return {
    props: {
      banks: response.data.banks,
    },
  };
};

export default BankPayments;
