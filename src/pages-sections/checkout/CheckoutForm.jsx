import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  Divider,
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
      phoneNum: "",
      fullAddress: "",
      fullName: "",
      email: "",
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
    setFieldValue("billing_name", checked ? values.fullName : "");
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
            <Grid
              container
              sx={{
                marginTop: "4rem",
                marginLeft: "3rem",
                justifyContent: "space-between",
              }}
            >
              <Grid item sm={3.5} xs={6}>
                <TextField
                  sx={{
                    mb: 2,
                  }}
                  label="Full Name"
                  onBlur={handleBlur}
                  name="fullName"
                  onChange={handleChange}
                  value={values.fullName}
                  error={!!touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
              </Grid>
              <Grid item sm={4} xs={6}>
                <TextField
                  type="phoneNum"
                  sx={{
                    mb: 2,
                  }}
                  onBlur={handleBlur}
                  name="phoneNum"
                  label="Phone Number"
                  onChange={handleChange}
                  value={values.phoneNum}
                  error={!!touched.phoneNum && !!errors.phoneNum}
                  helperText={touched.phoneNum && errors.phoneNum}
                />
              </Grid>
              <Grid item sm={4} xs={6}>
                <TextField
                  type="email"
                  sx={{
                    mb: 2,
                  }}
                  onBlur={handleBlur}
                  name="email"
                  label="Email Address"
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  type="fullAddress"
                  sx={{
                    mb: 2,
                  }}
                  fullWidth
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  name="fullAddress"
                  label="Full Address"
                  onChange={handleChange}
                  value={values.fullAddress}
                  error={!!touched.fullAddress && !!errors.fullAddress}
                  helperText={touched.fullAddress && errors.fullAddress}
                />
              </Grid>
            </Grid>

            <Divider
              sx={{
                mb: "1rem",
              }}
            />

            <Grid
              container
              sx={{ margin: "2rem", marginLeft: "3rem" }}
              justifyContent={"space-between"}
            >
              <Grid item sm={3} xs={6}>
                <Form
                  data={allCountries}
                  label={"country"}
                  selected={values.country}
                  setSelected={(nextValue) =>
                    setFieldValue("country", nextValue)
                  }
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item sm={3} xs={6}>
                {values.country !== "" && (
                  <Form
                    data={
                      { ...allCountries[Number(values.country) - 1] }.cities
                    }
                    label={"city"}
                    selected={values.city}
                    setSelected={(nextValue) =>
                      setFieldValue("city", nextValue)
                    }
                    style={{ marginBottom: "1rem" }}
                  />
                )}
              </Grid>

              <Grid item sm={4} xs={6}>
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
  country: yup.string().required("required"),
  city: yup.string().required("required"),
  location: yup.string().required("required"),
  phoneNum: yup.string().required("required"),
  fullAddress: yup.string().required("required"),
  fullName: yup.string().required("required"),
  email: yup.string().required("required"),
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
