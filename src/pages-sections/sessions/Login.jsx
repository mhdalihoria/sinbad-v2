import { useCallback, useEffect, useState, useContext } from "react";
import { Button, Card, Box, styled } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import BazaarImage from "components/BazaarImage";
import BazaarTextField from "components/BazaarTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import usePostFetch from "components/fetch/usePostFetch";
import { SettingsContext } from "contexts/SettingContext";
import Loading from "../../components/loader-spinner/Loader"

const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));
const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const { siteSettingsData } = useContext(SettingsContext);

  const [token, setToken] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0)
  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      const data = await usePostFetch(
        "https://sinbad-store.com/api/v2/login",
        {
          "X-localization": "ar",
          "Content-Type": "application/json",
        },
        JSON.stringify(values)
      );
      if (data.data.length > 0) {
        setToken(data.data[0].token);
        setStage(1)
        setLoading(false);
      } else {
        setLoginError(data.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  // Putting the User Token in the localStorage
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("user_token", JSON.stringify(token));
    }
  }, [token]);
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      {stage === 1 && <span>Thank you for Logging in. You'll get redireted soon</span>}
      {stage === 0 && (loading ? (
        <div style={{display: "flex", justifyContent: "center"}}><Loading size={15} loading={loading} /></div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            {siteSettingsData.settings && (
              <BazaarImage
                src={siteSettingsData.settings.Logo}
                width={"160px"}
                height={"90px"}
                sx={{
                  m: "auto",
                }}
              />
            )}
            <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
              Welcome To Sinbad Store
            </H1>

            {loginError && <span style={{ color: "red" }}> {loginError}</span>}

            <BazaarTextField
              mb={1.5}
              fullWidth
              name="username"
              size="username"
              type="text"
              variant="outlined"
              onBlur={handleBlur}
              value={values.username}
              onChange={handleChange}
              label="User Name or Phone Number"
              placeholder="Mohammad1980"
              error={!!touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />

            <BazaarTextField
              mb={2}
              fullWidth
              size="small"
              name="password"
              label="Password"
              autoComplete="on"
              variant="outlined"
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

            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                height: 44,
              }}
            >
              Login
            </Button>
          </form>

          {/* <SocialButtons /> */}

          <FlexRowCenter mt="1.25rem">
            <Box>Don&apos;t have account?</Box>
            <Link href="/signup" passHref legacyBehavior>
              <a>
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Sign Up
                </H6>
              </a>
            </Link>
          </FlexRowCenter>
        </>
      ))}
      {/* <FlexBox justifyContent="center" bgcolor="grey.200" borderRadius="4px" py={2.5} mt="1.25rem">
        Forgot your password?
        <Link href="/reset-password" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox> */}
    </Wrapper>
  );
};
const initialValues = {
  username: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  username: yup.string().required("User name is required"),
});
export default Login;
