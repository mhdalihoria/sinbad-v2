import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePostFetch from "../../src/components/fetch/usePostFetch"

import Header from "../../src/pages-sections/header/MainHeader";
import CustomFooter from "../../src/pages-sections/footer/CustomFooter";

// ------------STYlED COMPONENTS------------
const FormButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.main}`,

  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
const ErrorSpan = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));
// ------------STYlED COMPONENTS------------

// ---------Setting up Form Validation------

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  number: Yup.number().required(),
});

// ---------Setting up Form Validation------

// -------------EXTERNAL COMPONENT----------
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://sinbad-store.com">
        SinbadV2
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// -------------EXTERNAL COMPONENT----------

export default function SignInSide() {
  const [cv, setCv] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: async ({ name, email, number }) => {
      // Make a request to your backend to store the data

      if (cv?.size < 2500000) {
        // Request Body Data
        const myHeaders = new Headers();
        myHeaders.append("X-localization", "ar");

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("mobile", number);
        formdata.append("cv", cv, cv.name);


        // const requestOptions = {
        //   method: "POST",
        //   headers: myHeaders,
        //   body: formdata,
        //   redirect: "follow",
        // };

        const {data} = await usePostFetch("https://sinbad-store.com/api/v2/job", myHeaders, formdata)
        console.log(data)

        // fetch("https://sinbad-store.com/api/v2/job", requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => console.log(result))
        //   .catch((error) => console.log("error", error));
      }
    },
  });

  const { errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              احصل على فرصة احلامك!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {errors.name && touched.name && (
                <ErrorSpan>{errors.name}</ErrorSpan>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Full Name"
                type="text"
                id="fullName"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <ErrorSpan>{errors.email}</ErrorSpan>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.number && touched.number && (
                <ErrorSpan>enter valid number</ErrorSpan>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="number"
                onBlur={handleBlur}
                onChange={handleChange}
                autoFocus
              />
              {cv?.size > 2500000 && (
                <div>
                  <ErrorSpan>Error - file too big</ErrorSpan>
                </div>
              )}
              <FormButton variant="contained" component="label">
                Upload CV
                <input
                  type="file"
                  name="cv"
                  hidden
                  required
                  accept=".doc, .docx,.txt,.pdf"
                  onChange={(e) => handleFileChange(e)}
                />
              </FormButton>
              {cv && (
                <p>
                  {cv.name} {" - "}({(cv.size / 1000000).toFixed(2)} MB)
                </p>
              )}
              <FormButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Apply
              </FormButton>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
