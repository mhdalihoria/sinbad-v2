import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import OrderSummeryTable from "pages-sections/order/OrderSummeryTable";
import OrderSummerySummery from "pages-sections/order/OrderSummerySummery";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "../src/contexts/AppContext";
import usePostFetch from "../src/components/fetch/usePostFetch";
import useGetFetch from "../src/components/fetch/useGetFetch";

const OrderSummery = ({banks}) => {
  const { state, orderData, setOrderData, userToken } = useAppContext();
  const [orderSummeryResponse, setOrderSummeryResponse] = useState(null);
  const [couponToken, setCouponToken] = useState(9999999);

  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        "coupon_code": couponToken,
        "carrier_id": orderData.carrierId,
        
        "cart_items": state.cart,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/checkout-cart-summary",
        headers,
        body
      );
      const data = response.data.data;
      setOrderSummeryResponse(data);
    };

    doFetch(state.cart);
    setOrderData((prevData) => {
      return {
        ...prevData,
        couponCode: couponToken,
      };
    });
  }, [couponToken, state.cart]);

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <OrderSummeryTable data={orderSummeryResponse} />
          <PaymentForm banks={banks}/>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <OrderSummerySummery
            setCouponToken={setCouponToken}
            data={orderSummeryResponse}
          />
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
