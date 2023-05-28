import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import Card1 from "components/Card1";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import countryList from "data/countryList";
import Form from "pages-sections/carrier/Form";
const CheckoutForm = ({ allCountries }) => {
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      location: "",
      shipping_zip: "",
      shipping_name: "",
      shipping_email: "",
      shipping_contact: "",
      shipping_company: "",
      shipping_address1: "",
      shipping_address2: "",
      shipping_country: countryList[229],
      billing_zip: "",
      billing_name: "",
      billing_email: "",
      billing_contact: "",
      billing_company: "",
      billing_address1: "",
      billing_address2: "",
      billing_country: countryList[229],
    },
    // Pass the Yup schema to validate the form
    validationSchema: checkoutSchema,

    // Handle form submission
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleFormSubmit = async (values) => {
    // router.push("/payment");
    console.log(values);
  };
  const handleCheckboxChange = (values, setFieldValue) => (e, _) => {
    const checked = e.currentTarget.checked;
    setSameAsShipping(checked);
    setFieldValue("same_as_shipping", checked);
    setFieldValue("billing_name", checked ? values.shipping_name : "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card1
          sx={{
            mb: 4,
          }}
        >
          <Typography fontWeight="600" mb={2}>
            Shipping Address
          </Typography>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                sx={{
                  mb: 2,
                }}
                label="Full Name"
                onBlur={handleBlur}
                name="shipping_name"
                onChange={handleChange}
                value={values.shipping_name}
                error={!!touched.shipping_name && !!errors.shipping_name}
                helperText={touched.shipping_name && errors.shipping_name}
              />
              <TextField
                fullWidth
                type="email"
                sx={{
                  mb: 2,
                }}
                onBlur={handleBlur}
                name="shipping_email"
                label="Email Address"
                onChange={handleChange}
                value={values.shipping_email}
                error={!!touched.shipping_email && !!errors.shipping_email}
                helperText={touched.shipping_email && errors.shipping_email}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Form
                data={allCountries}
                label={"country"}
                selected={values.country}
                setSelected={(nextValue) => setFieldValue("country", nextValue)}
                style={{ marginBottom: "1rem" }}
              />
              <Form
                data={{ ...allCountries[Number(values.country) - 1] }.cities}
                label={"city"}
                selected={values.city}
                setSelected={(nextValue) => setFieldValue("city", nextValue)}
                style={{ marginBottom: "1rem" }}
              />

              

              {values.country !== "" && values.city !== "" && (
                <Form
                  data={
                    { ...allCountries[Number(values.country) - 1] }.cities[
                      Number(values.city) - 1
                    ].locations &&
                    { ...allCountries[Number(values.country) - 1] }.cities[
                      Number(values.city) - 1
                    ].locations
                  }
                  label={"Locations"}
                  selected={values.location}
                  setSelected={(nextValue) =>
                    setFieldValue("location", nextValue)
                  }
                  style={{ marginBottom: "1rem" }}
                />
              )}
            </Grid>
          </Grid>
        </Card1>

        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <Link href="/cart" passHref>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                fullWidth
              >
                Back to Cart
              </Button>
            </Link>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Proceed to Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});
export default CheckoutForm;
