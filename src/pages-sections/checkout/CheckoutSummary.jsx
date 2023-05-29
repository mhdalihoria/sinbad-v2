import { Button, Divider, TextField, Typography } from "@mui/material";
import Card1 from "components/Card1";
import { FlexBetween } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
const CheckoutSummary = () => {
  const {
    state
  } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  
  return <Card1>
      <FlexBetween mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          {currency(getTotalPrice())}
        </Typography>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          -
        </Typography>
      </FlexBetween>

      <FlexBetween mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <Typography fontSize="18px" fontWeight="600" lineHeight="1">
          -
        </Typography>
      </FlexBetween>

      <Divider sx={{
      mb: "1rem"
    }} />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right" mb={3}>
        {currency(getTotalPrice())}
      </Typography>

      
    </Card1>;
};
export default CheckoutSummary;