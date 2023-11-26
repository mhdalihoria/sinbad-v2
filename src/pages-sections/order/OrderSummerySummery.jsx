import { Button, Divider, TextField, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { Span } from "components/Typography";
import usePostFetch from "components/fetch/usePostFetch";
import { FlexBetween } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const OrderSummerySummery = ({ setCouponToken }) => {
  const [discountInput, setDiscountInput] = useState(0);
  const { state, setDiscount, discount, orderData, setOrderData, userToken } =
    useAppContext();
  const [discountResponseMsg, setDiscountResponseMsg] = useState({
    status: false,
    message: "",
  });
  const cartList = state.cart;
  const router = useRouter();

  console.log(orderData.shippingCost);

  const handleCouponFetch = async () => {
    const discount = Number(discountInput.replace(/\D/g, ""));

    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      coupon_code: discountInput,
      cart_items: cartList,
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

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(
            cartList.reduce(
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
          {orderData.shippingCost ? currency(orderData.shippingCost) : "-"}
        </Typography>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {discount ? currency(discount) : "-"}
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
          cartList.reduce(
            (acc, current) => acc + Number(current.qty) * Number(current.price),
            0
          ) +
            (orderData.shippingCost ? orderData.shippingCost : 0) -
            (discount ? discount : 0)
        )}
      </Typography>
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
            fullWidth={discount ? false : true}
            sx={{
              mt: "1rem",
              mb: "30px",
            }}
            disabled={!discountInput && discountInput === ""}
            onClick={handleCouponFetch}
          >
            Apply Voucher
          </Button>
          {!!discount && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth={discount ? false : true}
              sx={{
                mt: "1rem",
                mb: "30px",
                ml: ".8rem",
              }}
              onClick={() => setDiscount(null)}
            >
              Remove Voucher
            </Button>
          )}
        </>
      )}
    </Card1>
  );
};
export default OrderSummerySummery;
