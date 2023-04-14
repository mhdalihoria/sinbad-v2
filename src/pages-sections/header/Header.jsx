import { Grid, TextField } from "@mui/material";
import AppStore from "components/AppStore";
import React from "react";

const Header = () => {
  return (
    <div>
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={12}
          order={{ lg: 1, md: 1, sm: 2, xs: 2 }}
          style={{ border: "1px solid black" }}
        >
          <div
            style={{
              width: "145px",
              display: "flex",
              alignItems: "center",
              border: "1px solid red",
              height: "100%",
            }}
          >
            <AppStore />
          </div>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          order={{ lg: 2, md: 2, sm: 1 }}
          style={{ border: "1px solid orange" }}
        >
          <div
            style={{ minHeight: "400px", width: "100%", background: "grey" }}
          ></div>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            style={{ width: "100%", border: "5px solid blue" }}
          />
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={12}
          order={{ lg: 3, md: 3, sm: 3, xs: 3 }}
          style={{ border: "1px solid blue" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "70%", 
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ width: "100px", background: "green", height: "50px" }}
            ></div>
            <div
              style={{ width: "100px", background: "green", height: "50px" }}
            ></div>
            <div
              style={{ width: "100px", background: "green", height: "50px" }}
            ></div>
            <div
              style={{ width: "100px", background: "green", height: "50px" }}
            ></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
