import { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Box, FormControlLabel } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import usePostFetch from "components/fetch/usePostFetch";
const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState(null);

  console.log(token);
  console.log(loginError);

  const handleFormSubmit = async (values) => {
    const { name, password, address, mobile } = values;

    try {
      // console.log(values);

      // const requestOptions = {
      //   method: "POST",
      //   headers: {
      //     "X-localization": "ar",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ name, password, address, mobile }),
      //   redirect: "follow",
      // };

      // const response = await fetch(
      //   "https://sinbad-store.com/api/v2/register",
      //   requestOptions
      // );
      // const data = await response.json();
      const data = await usePostFetch(
        "https://sinbad-store.com/api/v2/register",
        {
          "X-localization": "ar",
          "Content-Type": "application/json",
        },
        JSON.stringify({ name, password, address, mobile })
      );
      console.log(data);
      if (data.data.length > 0) {
        setToken(data.data[0].token);
      } else {
        setLoginError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("user_token", JSON.stringify(token));
    }
  }, [token]);
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage
          src="/assets/images/bazaar-black-sm.svg"
          sx={{
            m: "auto",
          }}
        />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Create Your Account
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label="Full Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ralph Adwards"
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="mobile"
          size="small"
          type="mobile"
          variant="outlined"
          onBlur={handleBlur}
          value={values.mobile}
          onChange={handleChange}
          label="Phone Number"
          placeholder="0999999999"
          error={!!touched.mobile && !!errors.mobile}
          helperText={touched.mobile && errors.mobile}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="address"
          size="small"
          type="address"
          variant="outlined"
          onBlur={handleBlur}
          value={values.address}
          onChange={handleChange}
          label="Address"
          placeholder="Khalid Ibn Waleed St., Damascus, Syria"
          error={!!touched.address && !!errors.address}
          helperText={touched.address && errors.address}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        {/* <FormControlLabel name="agreement" className="agreement" onChange={handleChange} control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>} /> */}

        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Create Account
        </Button>
      </form>

      {/* <SocialButtons /> */}
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>
        <Link href="/login" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Login
            </H6>
          </a>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};
const initialValues = {
  name: "",
  mobile: "",
  address: "",
  password: "",
  re_password: "",
  // agreement: false
};
const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "Full Name is Too short")
    .required("Name is required"),
  mobile: yup
    .number()
    .min(9, "Phone Number is Too short")
    .required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  // agreement: yup.bool().test("agreement", "You have to agree with our Terms and Conditions!", value => value === true).required("You have to agree with our Terms and Conditions!")
});
export default Signup;
