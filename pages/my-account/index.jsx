import Link from "next/link";
import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { currency } from "lib";
import api from "utils/__api__/users";
import { Formik } from "formik";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { useAppContext } from "../../src/contexts/AppContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageLoader from "../../src/components/loader-spinner/PageLoader";
import usePostFetch from "../../src/components/fetch/usePostFetch";

// ============================================================

const LoginSection = styled(Card)(({ theme }) => ({
  maxWidth: "350px",
  margin: "4rem auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",

  "& .loginBtn": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: "5px",
    marginTop: "1em",
    cursor: "pointer",
  },
}));

// ============================================================

const MyAccount = ({ userInfo }) => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [profileStateResponse, setProfileStateResponse] = useState(null);
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  // SECTION TITLE HEADER LINK
  //   const HEADER_LINK = (
  //     <Link href={`/profile/${user.id}`} passHref>
  //       <Button
  //         color="primary"
  //         sx={{
  //           px: 4,
  //           bgcolor: "primary.light",
  //         }}
  //       >
  //         Edit Profile
  //       </Button>
  //     </Link>
  //   );

  useEffect(() => {
    setTimeout(() => {
      if (!userToken) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    }, 2000);
  }, [userToken]);

  const INITIAL_VALUES = {
    full_name: userInfo.full_name || "",
    nickname: userInfo.nickname || "",
    code: userInfo.code || "",
    username: userInfo.username || "",
    mobile: userInfo.mobile || "",
    address: userInfo.address || "",
    old_password: "",
    new_password: "",
  };

  const checkoutSchema = yup.object().shape({
    full_name: yup.string().required("required"),
    nickname: yup.string().required("required"),
    code: yup.number().required("required"),
    username: yup.string().required("required"),
    mobile: yup.number().required("required"),
    address: yup.string().required("required"),
    old_password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    new_password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleFormSubmit = async (values) => {
    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      full_name: values.full_name,
      nickname: values.nickname,
      address: values.address,
      old_password: values.old_password,
      new_password: values.new_password,
    });
    const response = await usePostFetch(
      "https://sinbad-store.com/api/v2/update-profile",
      headers,
      body
    );

    if (response) {
      setProfileStateResponse(response.data);
      console.log(response.data);
    }
  };

  console.log("something", profileStateResponse);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setProfileStateResponse(null);
  };
  return (
    <>
      <PageLoader />
      {isLogged ? (
        <CustomerDashboardLayout>
          {/* TITLE HEADER AREA */}
          <UserDashboardHeader
            icon={Person}
            title="Profile Info"
            // button={HEADER_LINK}
            navigation={<CustomerDashboardNavigation />}
          />

          {/* USER PROFILE INFO */}
          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={INITIAL_VALUES}
                  validationSchema={checkoutSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box mb={4}>
                        <Grid container spacing={3}>
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              name="full_name"
                              label="Full Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.full_name}
                              error={!!touched.full_name && !!errors.full_name}
                              helperText={touched.full_name && errors.full_name}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              name="username"
                              label="User Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.username}
                              error={!!touched.username && !!errors.username}
                              helperText={touched.username && errors.username}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              name="mobile"
                              label="Mobile"
                              onBlur={handleBlur}
                              value={values.mobile}
                              onChange={handleChange}
                              error={!!touched.mobile && !!errors.mobile}
                              helperText={touched.mobile && errors.mobile}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Nickname"
                              name="nickname"
                              onBlur={handleBlur}
                              value={values.nickname}
                              onChange={handleChange}
                              error={!!touched.nickname && !!errors.nickname}
                              helperText={touched.nickname && errors.nickname}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Address"
                              name="address"
                              onBlur={handleBlur}
                              value={values.address}
                              onChange={handleChange}
                              error={!!touched.address && !!errors.address}
                              helperText={touched.address && errors.address}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Code"
                              name="code"
                              onBlur={handleBlur}
                              value={values.code}
                              onChange={handleChange}
                              error={!!touched.code && !!errors.code}
                              helperText={touched.code && errors.code}
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Old Password"
                              type="password"
                              name="old_password"
                              onBlur={handleBlur}
                              value={values.old_password}
                              onChange={handleChange}
                              error={
                                !!touched.old_password && !!errors.old_password
                              }
                              helperText={
                                touched.old_password && errors.old_password
                              }
                            />
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="New Password"
                              type="password"
                              name="new_password"
                              onBlur={handleBlur}
                              value={values.new_password}
                              onChange={handleChange}
                              error={
                                !!touched.new_password && !!errors.new_password
                              }
                              helperText={
                                touched.new_password && errors.new_password
                              }
                            />
                          </Grid>
                        </Grid>

                        {/* we can do the following if we want to dynamically show everything in its form shape */}
                        {/* <Grid container spacing={3}>
                      {Object.entries(userInfo).map(([key, value]) => (
                        <Grid item md={6} xs={12} key={key}>
                          <TextField
                            fullWidth
                            name={key}
                            label={
                              key.charAt(0).toUpperCase() +
                              key.slice(1).replace("_", " ")
                            }
                            onBlur={handleBlur}
                            value={value || ""}
                            onChange={handleChange}
                            error={!!touched[key] && !!errors[key]}
                            helperText={touched[key] && errors[key]}
                          />
                        </Grid>
                      ))} 
                    </Grid> */}
                      </Box>

                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
          {profileStateResponse && (
            <div>
              <Snackbar
                open={profileStateResponse?.status !== null}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity={profileStateResponse?.status ? "success" : "error"}
                >
                  {profileStateResponse?.message}
                </Alert>
              </Snackbar>
            </div>
          )}
        </CustomerDashboardLayout>
      ) : (
        <LoginSection>
          <p>You should be logged in...</p>
          <button
            className="loginBtn"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log In
          </button>
        </LoginSection>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
  };
  const response = await useGetFetch(
    "https://sinbad-store.com/api/v2/get-profile-info",
    requestOptions
  );

  return {
    props: {
      userInfo: response.data.profile,
    },
  };
};
export default MyAccount;
