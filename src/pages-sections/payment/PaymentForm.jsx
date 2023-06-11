import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  TextField,
  styled,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import Form from "pages-sections/carrier/Form";
import { useAppContext } from "contexts/AppContext";
import { Formik, Field, ErrorMessage } from "formik";

const FileButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.main}`,

  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const PaymentForm = ({ banks }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [bankPaymentForm, setBankPaymentForm] = useState(null);
  const [transferDoc, setTransferDoc] = useState(null);
  const { state, orderData, setOrderData } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const width = useWindowSize();
  const router = useRouter();
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };
  const initialValues = {
    bank_id: "",
    amount: getTotalPrice() || "",
    transferNum: "",
    transferDoc: "",
  };

  useEffect(() => {
    switch (paymentMethod) {
      case "bank-transfer": {
        setOrderData((prevOrder) => {
          return {
            ...prevOrder,
            paymentMethod: paymentMethod,
          };
        });
      }
      case "wallet": {
        setOrderData((prevOrder) => {
          return {
            ...prevOrder,
            paymentMethod: paymentMethod,
            bank: null, 
            referenceNo: null, 
            transferDocument: null, 
            transferNo: null
          };
        });
      }
      case "cash": {
        setOrderData((prevOrder) => {
          return {
            ...prevOrder,
            paymentMethod: paymentMethod,
            bank: null, 
            referenceNo: null, 
            transferDocument: null, 
            transferNo: null
          };
        });
      }
    }
  }, [paymentMethod]);
  useEffect(() => {
    if (bankPaymentForm) {
      setOrderData((prevOrder) => {
        return {
          ...prevOrder,
          bank: bankPaymentForm.bank_id,
          totalPrice: bankPaymentForm.amount,
          transferDocument: bankPaymentForm.transferDoc,
          transferNo: bankPaymentForm.transferNum,
        };
      });
    }
  }, [bankPaymentForm]);

  return (
    <Fragment>
      <Card1
        sx={{
          mb: 4,
        }}
      >
        <FormControlLabel
          name="cash"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay With Cash</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "cash"}
              color="primary"
              size="small"
            />
          }
        />

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        <FormControlLabel
          name="wallet"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay With Wallet</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "wallet"}
              color="primary"
              size="small"
            />
          }
        />
        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        <FormControlLabel
          sx={{
            mb: 3,
          }}
          name="bank-transfer"
          onChange={handlePaymentMethodChange}
          label={<Paragraph fontWeight={600}>Pay with Bank Transfer</Paragraph>}
          control={
            <Radio
              checked={paymentMethod === "bank-transfer"}
              color="primary"
              size="small"
            />
          }
        />

        {paymentMethod === "bank-transfer" && (
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={paymentSchema}
            onSubmit={(values) => {
              setBankPaymentForm(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                      <Form
                        data={banks}
                        label={"Banks"}
                        selected={values.bank_id}
                        setSelected={(nextValue) =>
                          setFieldValue("bank_id", nextValue)
                        }
                        style={{ marginBottom: "1rem", width: "100%" }}
                      />
                      {touched.bank_id && errors.bank_id && (
                        <p
                          style={{
                            color: "red",
                            margin: "0",
                            marginTop: "-10px",
                          }}
                        >
                          {touched.bank_id && errors.bank_id}
                        </p>
                      )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="amount"
                        label="Money Amount"
                        placeholder="9874513"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.amount}
                        // helperText={touched.amount && errors.amount}
                      />
                      {touched.amount && errors.amount && (
                        <p style={{ color: "red", margin: "0" }}>
                          {touched.amount && errors.amount}
                        </p>
                      )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="transferNum"
                        onBlur={handleBlur}
                        value={values.transferNum}
                        label="Transfer Number"
                        onChange={handleChange}
                      />
                      {touched.transferNum && errors.transferNum && (
                        <p style={{ color: "red", margin: "0" }}>
                          {touched.transferNum && errors.transferNum}
                        </p>
                      )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FileButton variant="outlined" component="label">
                        Choose File
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              "transferDoc",
                              event.currentTarget.files[0]
                            );
                          }}
                          accept=".doc, .docx,.txt,.pdf,.png,.jpg,.jpeg"
                          name="transferDoc"
                        />
                      </FileButton>
                      {values.transferDoc && (
                        <span style={{ marginRight: "1rem" }}>
                          {values.transferDoc.name} {" - "}(
                          {(values.transferDoc.size / 1000000).toFixed(2)} MB)
                        </span>
                      )}
                      {touched.transferDoc && errors.transferDoc && (
                        <p style={{ color: "red", margin: "0" }}>
                          {touched.transferDoc && errors.transferDoc}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  sx={{
                    mb: 4,
                  }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Link href="/orderSummery" passHref>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Review
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const paymentSchema = yup.object().shape({
  bank_id: yup.number().required("required"),
  amount: yup.number().required("required"),
  transferNum: yup.number().required("required"),
  transferDoc: yup.mixed().required("File is required"),
});

export default PaymentForm;
