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

const JobForm = () => {
  return (
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
            <input type="file" hidden onChange={(e) => handleFileChange(e)} />
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
  );
};

export default JobForm;
