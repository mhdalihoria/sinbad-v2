import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import OrderSummeryTable from "pages-sections/order/OrderSummeryTable";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "../src/contexts/AppContext";
import usePostFetch from "../src/components/fetch/usePostFetch";
import { useRouter } from "next/router";

const OrderSummery = () => {
  const router = useRouter()
  const { state, orderData, userToken } = useAppContext();
  const [orderSummeryResponse, setOrderSummeryResponse] = useState(null);
  // console.log(orderData.couponCode);
  // console.log(state.cart);


  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        "Authorization":
          `Bearer oUTWx6fGaSVBZLJAseilg9TBk8Il4xLWrD6r7jLuZtOHFhEmS4T2f7nR3Kd5`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        "coupon_code": "302539",
        "carrier_id": "5",
        "cart_items": [
          {
            "id": "4608",
            "price": "235000",
            "qty": "2",
            "product_attribute_id": ""
          },
          {
            "id": "7710",
            "price": "1800000",
            "qty": "3",
            "product_attribute_id": ""
          }
        ]
      });
      // const body = JSON.stringify({
      //   "coupon_code": orderData.couponCode,
      //   "carrier_id": orderData.carrierId,
        
      //   "cart_items": state.cart
      // });
      const response = await usePostFetch("https://sinbad-store.com/api/v2/checkout-cart-summary", headers, body);
      const data = response.data.data
        // if(!orderSummeryResponse) {
          setOrderSummeryResponse(data)
        // }
    };

    doFetch()
    // console.log(orderSummeryResponse)
  }, []);

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <OrderSummeryTable data = {orderSummeryResponse}/>
        </Grid>

        {/* <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid> */}
      </Grid>
    </CheckoutNavLayout>
  );
};

export default OrderSummery;
