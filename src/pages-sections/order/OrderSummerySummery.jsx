import { Button, Divider, TextField, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { Span } from "components/Typography";
import usePostFetch from "components/fetch/usePostFetch";
import { FlexBetween } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const OrderSummerySummery = ({ setCouponToken, data }) => {
  const [discountInput, setDiscountInput] = useState(0);
  const { state, setDiscount, discount, setOrderData, userToken, orderSummeryResponse } =
    useAppContext();
  const [discountResponseMsg, setDiscountResponseMsg] = useState({
    status: false,
    message: "",
  });
  const cartList = state.cart;
  const router = useRouter();

  const handleCouponFetch = async () => {
    const discount = Number(discountInput.replace(/\D/g, ""));

    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer oUTWx6fGaSVBZLJAseilg9TBk8Il4xLWrD6r7jLuZtOHFhEmS4T2f7nR3Kd5`,
      // Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      coupon_code: discountInput,
      cart_items: [
        {
          id: "4608",
          price: "235000",
          qty: "2",
          product_attribute_id: "",
        },
        {
          id: "7710",
          price: "1800000",
          qty: "3",
          product_attribute_id: "",
        },
      ],
    });
    const response = await usePostFetch(
      "https://sinbad-store.com/api/v2/check-coupon-code",
      headers,
      body
    );
    const data = response.data;
    console.log(data);
    setDiscount(data.data.total_discount);
    setCouponToken(discount);

    if (data) {
      setDiscountResponseMsg({
        status: data.status,
        message: data.message,
      });
      setTimeout(() => {
        setDiscountResponseMsg({ status: false, message: "" });
      }, 3500);
    }
  };

  useEffect(() => {
    if (data && data.cart_items && data.shipping_cost) {
      setOrderData((prevData) => {
        return {
          ...prevData,
          shippingCost: data.shipping_cost,
        };
      });
    }
  }, [data]);

  return (
    <Card1>
      {data && data.cart_items && (
        <>
          <FlexBetween mb={1}>
            <Typography color="grey.600">Subtotal:</Typography>
            <Typography fontSize="18px" fontWeight="600" lineHeight="1">
              {currency(
                data.cart_items.reduce(
                  (acc, current) =>
                    acc + Number(current.qty) * Number(current.price),
                  0
                )
              )}
            </Typography>
          </FlexBetween>

          <FlexBetween mb={1}>
            <Typography color="grey.600">Shipping:</Typography>
            <Typography fontSize="18px" fontWeight="600" lineHeight="1">
              {data.shipping_cost ? currency(data.shipping_cost) : "-"}
            </Typography>
          </FlexBetween>

          <FlexBetween mb={2}>
            <Typography color="grey.600">Discount:</Typography>
            <Typography fontSize="18px" fontWeight="600" lineHeight="1">
              {data.total_discount ? currency(data.total_discount) : "-"}
            </Typography>
          </FlexBetween>

          <Divider
            sx={{
              mb: "1rem",
            }}
          />

          <Typography
            fontSize="25px"
            fontWeight="600"
            lineHeight="1"
            textAlign="right"
            mb={3}
          >
            {currency(
              data.cart_items.reduce(
                (acc, current) =>
                  acc + Number(current.qty) * Number(current.price),
                0
              ) +
                (data.shipping_cost ? data.shipping_cost : 0) -
                (data.total_discount ? data.total_discount : 0)
            )}
          </Typography>
        </>
      )}

      {router.pathname === "/delivery" && (
        <>
         <Divider
            sx={{
              mb: 2,
              mt: 2,
            }}
          />
          {discountResponseMsg.message.length > 0 && (
            <Span
              style={{
                color: discountResponseMsg.status ? "green" : "red",
                fontSize: "1rem",
              }}
            >
              {discountResponseMsg.message}
            </Span>
          )}
          <TextField
            placeholder="Voucher"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => setDiscountInput(e.target.value)}
          />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{
              mt: "1rem",
              mb: "30px",
            }}
            disabled={!discountInput && discountInput === ""}
            onClick={handleCouponFetch}
          >
            Apply Voucher
          </Button>
        </>
      )}
    </Card1>
  );
};
export default OrderSummerySummery;
