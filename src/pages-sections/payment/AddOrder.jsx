import usePostFetch from "components/fetch/usePostFetch";
import { useAppContext } from "contexts/AppContext";
import React, { useEffect } from "react";

const AddOrder = () => {
  const { state, orderData, userToken } = useAppContext();
  console.log(orderData);

  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        "coupon_code": orderData.couponCode,
        "carrier_id": orderData.carrierId,
        "total_price": orderData.totalPrice,
        "shipping_cost": orderData.shippingCost,
        "shipped_mobile": orderData.shippedMobile,
        "shipped_location_id": orderData.shippedLocation_id,
        "shipped_full_name": orderData.shippedFull_name,
        "shipped_address": orderData.shippedAddress,
        "payment_method": orderData.paymentMethod,
        "notes": orderData.notes,
        "reference_no": orderData.referenceNo,
        "cart_items": state.cart
      });
      const response = await usePostFetch("https://sinbad-store.com/api/v2/add-order", headers, body);
      console.log(response.data)
    };

    doFetch()
  }, []);
  return <div>AddOrder</div>;
};

export default AddOrder;
