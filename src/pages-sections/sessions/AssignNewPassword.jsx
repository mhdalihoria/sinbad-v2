import { Box, Button, styled } from "@mui/material";
import BazaarTextField from "components/BazaarTextField";
import usePostFetch from "components/fetch/usePostFetch";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import Loader from "../../components/loader-spinner/Loader";

const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "10px 25px",
  marginTop: "1rem",
}));

const ErrorSpan = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1rem",
  marginBottom: "2rem",
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  height: "400px",
  display: "flex", 
  justifyContent: "center",
  alignItems: "center"
}));

const schema = yup.object().shape({
  mobile: yup
    .number()
    .min(9, "Phone Number is Too short")
    .required("Phone Number is required"),
  code: yup
    .number()
    .min(6, "Incorrect Code Format")
    .required("Code is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
});

const AssignNewPassword = ({ input }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  console.log(error);

  const { errors, touched, values, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        mobile: input,
        code: "",
        password: "",
        re_password: "",
      },
      validationSchema: schema,

      onSubmit: async ({ mobile, code, password }) => {
        setLoading(true);
        const { data, response } = await usePostFetch(
          "https://sinbad-store.com/api/v2/reset-password",
          {
            "X-localization": "ar",
            "Content-Type": "application/json",
          },
          JSON.stringify({
            username: mobile,
            code: Number(code),
            password: password,
          })
        );
        console.log(data, response);

        if (!data.status) {
          setError(data.message);
          setLoading(false);
        }
        if (data.status) {
          setLoading(false);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} method="POST">
      {loading ? (
        <LoadingContainer>
          <Loader size={17} loading={loading} />
        </LoadingContainer>
      ) : (
        <>
          {error && <ErrorSpan>{error}</ErrorSpan>}
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="mobile"
            size="small"
            type="mobile"
            variant="outlined"
            onBlur={handleBlur}
            value={values.mobile}
            label="Phone Number"
            placeholder="0999999999"
            error={!!touched.mobile && !!errors.mobile}
            helperText={touched.mobile && errors.mobile}
          />

          <BazaarTextField
            mb={1.5}
            fullWidth
            name="code"
            size="small"
            type="code"
            variant="outlined"
            onBlur={handleBlur}
            value={values.code}
            onChange={handleChange}
            label="Code"
            placeholder="123456"
            error={!!touched.code && !!errors.code}
            helperText={touched.code && errors.code}
          />

          <BazaarTextField
            mb={1.5}
            fullWidth
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            autoComplete="on"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            placeholder="*********"
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
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.re_password}
            placeholder="*********"
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

          <SubmitButton type="submit">Submit</SubmitButton>
        </>
      )}
    </form>
  );
};

export default AssignNewPassword;
