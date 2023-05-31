import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Box, Button, Divider, Grid, Radio, TextField, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import Form from "pages-sections/carrier/Form";
import { useAppContext } from "contexts/AppContext";

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
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [transferDoc, setTransferDoc] = useState(null);
  const { state } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const width = useWindowSize();
  const router = useRouter();
  const isMobile = width < 769;
  const handleFormSubmit = async (values) => {
    console.log(values)
    // router.push("/payment")
  };
  console.log(paymentMethod)
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };
  const initialValues = {
    bank_id: "",
    amount: getTotalPrice() || "",
    transferNum: "",
    card_no: "",
    name: "",
    exp_date: "",
    cvc: "",
    shipping_zip: "",
    shipping_country: "",
    shipping_address1: "",
    shipping_address2: "",
    billing_name: "",
    billing_email: "",
    billing_contact: "",
    billing_company: "",
    billing_zip: "",
    billing_country: "",
    billing_address1: "",
    billing_address2: "",
  };

  const handleFileChange = (e) => {
    setTransferDoc(e.target.files[0]);
  };

  return (
    <Fragment>
      <Card1
        sx={{
          mb: 4,
        }}
      >
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

        <Divider
          sx={{
            mb: 3,
            mx: -4,
          }}
        />

        {paymentMethod === "bank-transfer" && (
          <Formik
            onSubmit= { handleFormSubmit }
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
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
                        helperText={touched.amount && errors.amount}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        fullWidth
                        name="transferNum"
                        onBlur={handleBlur}
                        value={values.transferNum}
                        label="Transfer Number"
                        onChange={handleChange}
                        helperText={touched.transferNum && errors.transferNum}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FileButton variant="contained" component="label">
                        Upload Transfer Document
                        <input
                          type="file"
                          name="transferDoc"
                          hidden
                          required
                          accept=".doc, .docx,.txt,.pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e)}
                        />
                      </FileButton>
                      {transferDoc && (
                        <p>
                          {transferDoc.name} {" - "}(
                          {(transferDoc.size / 1000000).toFixed(2)} MB)
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mb: 4,
                  }}
                >
                  Submit
                </Button>

                <Divider
                  sx={{
                    mb: 3,
                    mx: -4,
                  }}
                />
              </form>
            )}
          </Formik>
        )}

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
          <Link href="/orders" passHref>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Review
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const checkoutSchema = yup.object().shape({
  // card_no: yup.string().required("required"),
  // name: yup.string().required("required"),
  // exp_date: yup.string().required("required"),
  // cvc: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default PaymentForm;
