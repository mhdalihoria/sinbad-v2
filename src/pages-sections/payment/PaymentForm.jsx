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
import usePostFetch from "components/fetch/usePostFetch";

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
  const {
    state,
    orderData,
    setOrderData,
    userToken,
    discount,
    orderSummeryResponse,
  } = useAppContext();
  const cartList = state.cart;
  const [bankForm, setBankForm] = useState("");
  const [amountForm, setAmountForm] = useState("");
  const [transferNumForm, setTransferNumForm] = useState("");
  const [transferDoc, setTransferDoc] = useState(null);
  const [bankFormError, setBankFormError] = useState(null);
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
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
            transferNo: null,
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
            transferNo: null,
          };
        });
      }
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (
      bankForm > 0 &&
      amountForm > 0 &&
      transferNumForm.length > 0 &&
      transferDoc
    ) {
      setOrderData((prevOrder) => {
        return {
          ...prevOrder,
          bank: bankForm,
          totalPrice: amountForm,
          transferDocument: transferDoc,
          transferNo: transferNumForm,
        };
      });
      setBankFormError(null);
    }
  }, [bankForm, amountForm, transferNumForm, transferDoc]);

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

  useEffect(() => {
    const totalPrice = cartList
      ? cartList.reduce(
          (acc, current) => acc + Number(current.qty) * Number(current.price),
          0
        ) +
        +(orderData.shippingCost ? orderData.shippingCost : 0) -
        (discount ? discount : 0)
      : 0;
    setAmountForm(totalPrice);
  }, [ cartList]);

  const submitOrder = async () => {
    const headers = {
      "X-localization": "ar",
      // "Authorization": `Bearer oUTWx6fGaSVBZLJAseilg9TBk8Il4xLWrD6r7jLuZtOHFhEmS4T2f7nR3Kd5`,
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      coupon_code: orderData.couponCode,
      carrier_id: orderData.carrierId,
      total_price: orderData.totalPrice,
      shipping_cost: orderData.shippingCost,
      shipped_mobile: orderData.shippedMobile,
      shipped_location_id: orderData.shippedLocation_id,
      shipped_full_name: orderData.shippedFull_name,
      shipped_address: orderData.shippedAddress,
      payment_method: orderData.paymentMethod,
      notes: orderData.notes,
      reference_no: orderData.referenceNo,
      cart_items: state.cart,
    });

    if (
      paymentMethod === "bank-transfer" &&
      bankForm > 0 &&
      amountForm > 0 &&
      transferNumForm.length > 0 &&
      !!transferDoc
    ) {
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/add-order",
        headers,
        body
      );

      console.log(response);
    } else {
      setBankFormError("الرجاء ملئ كل الحقول");
    }
  };

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
          <>
            {bankFormError && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "1rem",
                  color: "red",
                  fontSize: "1.3rem",
                  fontWeight: "600",
                }}
              >
                {bankFormError}
              </div>
            )}
            <form>
              <Box mb={3}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <Form
                      data={banks}
                      label={"Banks"}
                      selected={bankForm}
                      setSelected={(nextValue) => setBankForm(nextValue)}
                      style={{ marginBottom: "1rem", width: "100%" }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="amount"
                      label="Money Amount"
                      placeholder="9874513"
                      onChange={(e) => setAmountForm(e.target.value)}
                      value={amountForm}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="transferNum"
                      value={transferNumForm}
                      label="Transfer Number"
                      onChange={(e) => setTransferNumForm(e.target.value)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <div
                      style={{
                        marginTop: "-0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>وصل التحويل البنكي:</div>
                      <FileButton variant="outlined" component="label">
                        Choose File
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={(event) => {
                            setTransferDoc(event.currentTarget.files[0]);
                          }}
                          accept=".doc, .docx,.txt,.pdf,.png,.jpg,.jpeg"
                          name="transferDoc"
                        />
                      </FileButton>
                      {transferDoc && (
                        <span style={{ marginRight: "1rem" }}>
                          {transferDoc.name} {" - "}(
                          {(transferDoc.size / 1000000).toFixed(2)} MB)
                        </span>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          type="button"
          fullWidth
          onClick={submitOrder}
        >
          Submit Order
        </Button>
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/delivery" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to Delivery
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
