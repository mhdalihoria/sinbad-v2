import { Button, Divider, TextField } from "@mui/material";
import Card1 from "components/Card1";
import usePostFetch from "components/fetch/usePostFetch";
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
import { useEffect, useState } from "react";
const PaymentSummary = () => {
  const { state, discount } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  
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

      
    </Card1>
  );
};
export default PaymentSummary;
