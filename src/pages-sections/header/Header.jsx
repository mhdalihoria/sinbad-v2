import { Box, Grid, TextField, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "next/image";
import LeftSectionItem from "./LeftSectionItem";
import Logo from "../../../public/assets/images/header/logo.jpg";

const AppStoreSection = styled(Box)({
  width: "145px",
  display: "flex",
  alignItems: "center",
  height: "100%",
});

const LeftSideSection = styled(Box)({
  display: "flex",
  width: "100%",
  height: "250px",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "flex-end",
  margin: "auto 0",
  // flexWrap: "wrap",

  "& div": {
    // height: "15px",
  },
});

const LogoSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",
});

const Header = () => {
  return (
    <div
      style={{
        boxShadow: "0px 3px 7px -1px rgba(0,0,0,0.25)",
        paddingBottom: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={6}
          order={{ lg: 1, md: 1, sm: 2, xs: 2 }}
        >
          <AppStoreSection>
            <AppStore />
          </AppStoreSection>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          order={{ lg: 2, md: 2, sm: 1 }}
        >
          <LogoSection>
            <Image
              src={Logo}
              width={"300x"}
              height={"185px"}
              objectFit="cover"
            />
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={{ width: "80%" }}
            />
          </LogoSection>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={6}
          xs={6}
          order={{ lg: 3, md: 3, sm: 3, xs: 3 }}
        >
          <LeftSideSection>
            <LeftSectionItem iconClass={"fa-regular fa-comments"} topText={"Chat"} bottomText={"with us"} />
            <LeftSectionItem iconClass={"fa-regular fa-comments"} topText={"Chat"} bottomText={"with us"} />
            <LeftSectionItem iconClass={"fa-regular fa-comments"} topText={"Chat"} bottomText={"with us"} />
            <LeftSectionItem iconClass={"fa-regular fa-comments"} topText={"Chat"} bottomText={"with us"} />
          </LeftSideSection>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
