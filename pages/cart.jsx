import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import NoCartItemsCard from "../src/pages-sections/checkout/NoCartItemsCard";
import { useAppContext } from "contexts/AppContext";
import countryList from "data/countryList";
import { currency } from "lib";
const Cart = () => {
  const { state } = useAppContext();
  const cartList = state.cart;
  cartList;
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />
      {cartList.length > 0 ? (
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid item md={8} xs={12}>
            {cartList.map((item) => (
              <ProductCard7 key={item.id} {...item} />
            ))}
          </Grid>

          {/* CHECKOUT FORM */}
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
              }}
            >
              <FlexBetween mb={2}>
                <Span color="grey.600">Total:</Span>

                <Span fontSize={18} fontWeight={600} lineHeight="1">
                  {currency(getTotalPrice())}
                </Span>
              </FlexBetween>

              <Divider
                sx={{
                  mb: 2,
                }}
              />

              <Link href="/checkout" passHref legacyBehavior>
                <Button variant="contained" color="primary" fullWidth>
                  Checkout Now
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <NoCartItemsCard />
      )}
    </CheckoutNavLayout>
  );
};
const stateList = [
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "chicago",
    label: "Chicago",
  },
];
export default Cart;
