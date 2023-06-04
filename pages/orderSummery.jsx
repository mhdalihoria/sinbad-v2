import { Grid } from "@mui/material";
import PaymentForm from "pages-sections/payment/PaymentForm";
import PaymentSummary from "pages-sections/payment/PaymentSummary";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import useGetFetch from "components/fetch/useGetFetch"
const OrderSummery = ({banks}) => {
   return <CheckoutNavLayout>
      <Grid container flexWrap="wrap-reverse" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <PaymentForm />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <PaymentSummary />
        </Grid>
      </Grid>
    </CheckoutNavLayout>;
};

export const getStaticProps = async (ctx) => {
  const requestOptions = {
    method: 'GET',
    headers: {"X-localization": "ar"},
    redirect: 'follow'
  };
  
  const response = await useGetFetch("https://sinbad-store.com/api/v2/get-banks",requestOptions)

  return {
    props: {
      banks: response.data.banks
    }
  }
}
export default OrderSummery;