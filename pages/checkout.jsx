import { Grid } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutSummary from "pages-sections/checkout/CheckoutSummary";
import useGetFetch from "../src/components/fetch/useGetFetch";
import { useAppContext } from "../src/contexts/AppContext";
import NoCartItemsCard from "../src/pages-sections/checkout/NoCartItemsCard";
const Checkout = ({ allCountries }) => {
  const { userToken, state } = useAppContext();
  const cartList = state.cart;
  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />
      {cartList.length > 0 ? (
        userToken ? (
          <Grid container flexWrap="wrap-reverse" spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              <CheckoutForm allCountries={allCountries} />
            </Grid>

            <Grid item lg={4} md={4} xs={12}>
              <CheckoutSummary />
            </Grid>
          </Grid>
        ) : (
          <div>YOU MUST LOG IN TO CONTINUE</div>
        )
      ) : (
        <NoCartItemsCard />
      )}
    </CheckoutNavLayout>
  );
};
export const getStaticProps = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
  };
  const url = "https://sinbad-store.com/api/v2/countries";
  const everyCountry = await useGetFetch(url, requestOptions);

  return {
    props: {
      allCountries: everyCountry.data.countries,
    },
  };
};
export default Checkout;
