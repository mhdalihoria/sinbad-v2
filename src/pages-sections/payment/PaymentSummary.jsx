import { Button, Divider, TextField } from "@mui/material";
import Card1 from "components/Card1";
import usePostFetch from "components/fetch/usePostFetch";
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useEffect, useState } from "react";
const PaymentSummary = () => {
  const { state, setDiscount, discount, setOrderData } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const [userToken, setUserToken] = useState(null);
  const [discountInput, setDiscountInput] = useState(null);
  const [discountResponseMsg, setDiscountResponseMsg] = useState({
    status: false,
    message: "",
  });
  console.log(discountInput);

  const handleCouponFetch = async () => {
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
    const data = response.data
    setDiscount(data.data.total_discount)
    setOrderData(prevData => {
      return {
        ...prevData,
        couponCode: discountInput,
      }
    })

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
    if (!window) return;
    let token = JSON.parse(window.localStorage.getItem("user_token"));
    if (token && token.length > 0) setUserToken(token);
  }, []); //we're using router.isFallback, so the in our case, we set the state when we have the data and when we display the page

  return (
    <Card1>
      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(getTotalPrice())}
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          -
        </Paragraph>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
          {currency(discount)}
        </Paragraph>
      </FlexBetween>

      <Divider
        sx={{
          mb: 2,
        }}
      />

      <Paragraph
        fontSize={25}
        fontWeight={600}
        lineHeight={1}
        textAlign="right"
      >
        {currency(getTotalPrice() - discount)}
      </Paragraph>

      <Divider
        sx={{
          mb: 2,
          mt: 2,
        }}
      />

      {discountResponseMsg.message.length > 0 && (
        <Span style={{color:discountResponseMsg.status ? "green": "red", fontSize: "1rem"}}>{discountResponseMsg.message}</Span>
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
    </Card1>
  );
};
export default PaymentSummary;
