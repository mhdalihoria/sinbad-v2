import { Box, Button, Grid, TextField, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "next/image";
import LeftSectionItem from "./LeftSectionItem";
import Logo from "../../../public/assets/images/header/logo.jpg";
import { useContext, useEffect, useMemo, useState } from "react";
import NewsTicker from "./NewsTicker";
import PageHeaderUpper from "./PageHeaderUpper";
import Navbar from "components/navbar/Navbar";
import TopSection from "./TopSection";
import { SettingsContext } from "contexts/SettingContext";
// import { debounce, throttle } from "lodash";
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
});

const LogoSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",
});

const OptionsButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
}));

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState();
  const { siteSettingsData } = useContext(SettingsContext);
  const { settings } = siteSettingsData;
  const [search, setSearch] = useState("");

  const breakPointMD = 960;
  console.log(search);

  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [windowSize]);

  const searchHandler = () => {
    console.log("searched");
  };

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <TopSection />
      {/* <PageHeaderUpper /> */}
      <div
        style={{
          boxShadow: "0px 3px 7px -1px rgba(0,0,0,0.25)",

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
            {windowSize < breakPointMD && isOpen && (
              <AppStoreSection>
                <AppStore />
              </AppStoreSection>
            )}
            {windowSize > breakPointMD && (
              <AppStoreSection>
                <AppStore android={settings.AndroidApp} />
              </AppStoreSection>
            )}
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

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {windowSize < breakPointMD && (
                  <OptionsButton
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                    style={{}}
                  >
                    <i className={`fa-solid fa-${isOpen ? "x" : "bars"}`}></i>
                  </OptionsButton>
                )}
                <TextField
                  id="outlined-basic"
                  label="Search"
                  name="search"
                  variant="outlined"
                  value={search}
                  style={{ width: "50%" }}
                  onChange={(e) => searchChangeHandler(e)}
                />

                <OptionsButton onClick={searchHandler}>Search</OptionsButton>
              </div>
              <div className="buttons"></div>
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
            {windowSize < breakPointMD && isOpen && (
              <LeftSideSection>
                <LeftSectionItem
                  iconClass={"fa-regular fa-circle-user"}
                  topText={"signup"}
                  bottomText={"login"}
                />
                <LeftSectionItem
                  iconClass={"fa-regular fa-comments"}
                  topText={"Chat"}
                  bottomText={"with us"}
                />
                <LeftSectionItem
                  iconClass={"fa-solid fa-hourglass-clock"}
                  topText={"الوقت المتبقي للمزاد"}
                  bottomText={"20:20:18"}
                />
                <LeftSectionItem
                  iconClass={"fa-solid fa-truck-fast"}
                  topText={"Track"}
                  bottomText={"Your Shipment"}
                />
              </LeftSideSection>
            )}
            {windowSize > breakPointMD && (
              <LeftSideSection>
                <LeftSectionItem
                  iconClass={"fa-regular fa-circle-user"}
                  topText={"signup"}
                  bottomText={"login"}
                />
                <LeftSectionItem
                  iconClass={"fa-regular fa-comments"}
                  topText={"Chat"}
                  bottomText={"with us"}
                />
                <LeftSectionItem
                  iconClass={"fa-solid fa-gavel"}
                  topText={"المتبقي للمزاد"}
                  bottomText={"20:20:18"}
                />
                <LeftSectionItem
                  iconClass={"fa-solid fa-truck-fast"}
                  topText={"Track"}
                  bottomText={"Your Shipment"}
                />
              </LeftSideSection>
            )}
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            order={{ lg: 4, md: 4, sm: 4, xs: 4 }}
          >
            <Navbar />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            order={{ lg: 5, md: 5, sm: 5, xs: 5 }}
          >
            <NewsTicker />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Header;
