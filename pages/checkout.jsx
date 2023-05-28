import { Grid } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutSummary from "pages-sections/checkout/CheckoutSummary";
import useGetFetch from "../src/components/fetch/useGetFetch";
const Checkout = ({allCountries}) => {
  return <CheckoutNavLayout>
      <SEO title="Checkout" />
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm allCountries={allCountries}/>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>;
};
export const getStaticProps = async () => {
  const requestOptions= {
    method: "GET",
    headers: {"X-localization": "ar"},
  }
  const url = "https://sinbad-store.com/api/v2/countries"
  const everyCountry = await useGetFetch(url, requestOptions)

  return {
    props: {
      allCountries: everyCountry.data.countries,
    },
  };
};
export default Checkout;