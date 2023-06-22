import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import OrderSummeryTable from "pages-sections/order/OrderSummeryTable";
import OrderSummerySummery from "pages-sections/order/OrderSummerySummery";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "../src/contexts/AppContext";
import useGetFetch from "../src/components/fetch/useGetFetch";
import usePostFetch from "../src/components/fetch/usePostFetch";

const OrderSummery = ({banks}) => {
  const {orderData, userToken, state} = useAppContext();
  const [orderSummeryResponse, setOrderSummeryResponse] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        coupon_code: orderData.couponCode,
        carrier_id: orderData.carrierId,
        cart_items: state.cart,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/checkout-cart-summary",
        headers,
        body
      );
      const data = response.data.data;
      setOrderSummeryResponse(prevOrder=> {
        if(prevOrder !== data) {
          return data
        }
      });
    };
      doFetch()
  }, [orderData.carrierId]);

  console.log("order page", orderSummeryResponse)

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <OrderSummeryTable data={orderSummeryResponse} />
          <PaymentForm banks={banks}/>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <OrderSummerySummery />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export const getStaticProps = async (ctx) => {
  const requestOptions = {
    method: 'GET',
    headers: {"X-localization": "ar"},
    redirect: 'follow'
  };
  
  const response = await useGetFetch("https://sinbad-store.com/api/v2/get-banks",requestOptions)

  return {
    props: {
      banks: response.data.banks
    }
  }
}

export default OrderSummery;
