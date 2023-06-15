import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DeliveryTable from "pages-sections/delivery/DeliveryTable";
import OrderSummerySummery from "pages-sections/order/OrderSummerySummery";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "../src/contexts/AppContext";
import usePostFetch from "../src/components/fetch/usePostFetch";

const Delivery = () => {
  const { state, orderData, setOrderData, userToken } = useAppContext();
  const [orderSummeryResponse, setOrderSummeryResponse] = useState(null);
  const [carrier, setCarrier] = useState(null);
  const [checked, setChecked] = useState(null);
  const [couponToken, setCouponToken] = useState(null);


  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        coupon_code: couponToken,
        carrier_id: checked,
        cart_items: state.cart,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/checkout-cart-summary",
        headers,
        body
      );
      const data = response.data.data;
      setOrderSummeryResponse(data);
    };
    const doCarrierFetch = async () => {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        location_id: orderData.shippedLocation_id?.toString(),
        cart_items: state.cart,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/checkout-get-carriers",
        headers,
        body
      );
      const data = response.data.data;
      setCarrier(data);
    };

    if (state.cart.length > 0) {
      doCarrierFetch();
    }
    doFetch();
    setOrderData((prevData) => {
      return {
        ...prevData,
        couponCode: couponToken,
      };
    });
  }, [couponToken, state.cart, orderData.carrierId, checked]);

  return (
    <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <DeliveryTable
            data={carrier}
            checked={checked}
            setChecked={setChecked}
          />
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

export default Delivery;
