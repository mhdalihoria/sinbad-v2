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
import Header from "../../src/pages-sections/header/Header";
import CustomFooter from "../../src/pages-sections/footer/CustomFooter";

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

export default function SignInSide() {
  const [cv, setCv] = useState(null);
  const [form, setForm] = useState({
    fullName: null,
    email: null,
    phoneNum: null,
  });

  const uplaodToSever = async () => {
    const { fullName, email, phoneNum } = form;

    // Request Body Data
    const body = new FormData();
    body.append("name", fullName);
    body.append("email", email);
    body.append("mobile", phoneNum);
    body.append("cv", cv, cv.name);
    // Request Body Data

    console.log(cv);

    // Request Header Data
    const myHeaders = new Headers();
    myHeaders.append("X-localization", "ar");
    // Request Header Data

    // Fetch API Options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };
    // Fetch API Options

    const response = await fetch(
      "https://sinbad-store.com/api/v2/job",
      requestOptions
    );
    const data = await response;

    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uplaodToSever();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevFrom) => {
      return {
        ...prevFrom,
        [name]: value,
      };
    });
  };

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
              <TextField
                margin="normal"
                required
                fullWidth
                name="fullName"
                label="Full Name"
                type="fullName"
                id="fullName"
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Phone Number"
                name="phoneNum"
                onChange={(e) => handleInputChange(e)}
                autoFocus
              />
              <FormButton variant="contained" component="label">
                Upload CV
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileChange(e)}
                />
              </FormButton>
              {cv && <span style={{ paddingRight: "1rem" }}>{cv.name}</span>}
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
