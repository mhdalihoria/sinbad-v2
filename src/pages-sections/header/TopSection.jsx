import Link from "next/link";
import { Fragment, useState, useContext, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Drawer,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Clear, KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import clsx from "clsx";
import Icon from "components/icons";
import { layoutConstant } from "utils/constants";
import Login from "pages-sections/sessions/Login";
import { useAppContext } from "contexts/AppContext";
import Image from "components/BazaarImage";
import MiniCart from "components/MiniCart";
import Category from "components/icons/Category";
import { Paragraph } from "components/Typography";
import MobileMenu from "components/navbar/MobileMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
import CategoryMenu from "components/categories/CategoryMenu";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";

import { SettingsContext } from "contexts/SettingContext";
import useGetFetch from "components/fetch/useGetFetch";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
}));
const StyledContainer = styled("div")({
  gap: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "90%",
  margin: "0 auto",
});

// ==============================================================

// ==============================================================

const TopSection = ({ isFixed, className, searchInput }) => {
  const theme = useTheme();
  const { state, setUserToken } = useAppContext();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);
  const { siteSettingsData } = useContext(SettingsContext);
  const { userToken } = useAppContext();
  const [settingsData, setSettingsData] = useState();
  const [categories, setCategories] = useState();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setPopoverOpen(true);
  };
  const handlePopoverClose = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };

  const handleProfileBtn = () => {
    router.push("/my-account");
    setPopoverOpen(false);
  };

  const handleLogoutBtn = () => {
    window.localStorage.removeItem("user_token");
    setUserToken(null);
    router.reload();
    setPopoverOpen(false);
  };

  useEffect(() => {
    if (siteSettingsData) {
      setSettingsData(siteSettingsData.settings);
    }
  }, [siteSettingsData]);

  useEffect(() => {
    const fetchCates = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "X-localization": "ar" },
        };
        const url = "https://sinbad-store.com/api/v2/categories";
        const categoryResponse = await useGetFetch(url, requestOptions);

        setCategories(categoryResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCates();
  }, []);
  // LOGIN AND MINICART DRAWER
  const DIALOG_DRAWER = (
    <Fragment>
      <Drawer
        open={sidenavOpen}
        anchor="right"
        onClose={toggleSidenav}
        sx={{
          zIndex: 9999,
        }}
      >
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>
    </Fragment>
  );

  // FOR SMALLER DEVICE
  if (downMd) {
    const ICON_STYLE = {
      color: "grey.600",
      fontSize: 20,
    };
    return (
      <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          <FlexBetween width="100%">
            {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
            <Box flex={1}>
              <MobileMenu />
            </Box>

            {/* MIDDLE CONTENT - LOGO */}
            {/* <Link href="/">
              <a>
                <Image
                  height={44}
                  src="/assets/images/bazaar-black-sm.svg"
                  alt="logo"
                />
              </a>
            </Link> */}
            {typeof settingsData !== "undefined" && (
              <div>
                <Link href="/">
                  <span
                    style={{
                      paddingLeft: "1em",
                      marginLeft: "1em",
                      borderLeft: "1px solid black",
                      cursor: "pointer",
                    }}
                  >
                    {settingsData.WebsiteTitle}
                  </span>
                </Link>
                <span>اتصل بنا: {settingsData.SupportNumber}</span>
              </div>
            )}

            {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
            <FlexBox justifyContent="end" flex={1}>
              {/* <Box component={IconButton} onClick={toggleSearchBar}>
                <Icon.Search sx={ICON_STYLE} />
              </Box> */}
              {userToken ? (
                <div>
                  <Box
                    component={IconButton}
                    p={0.75}
                    onClick={(e) => handlePopoverOpen(e)}
                  >
                    <AccountCircleIcon />
                  </Box>
                  <Popover
                    open={popoverOpen}
                    onClose={handlePopoverClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    {/* Content of the popover */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                      }}
                    >
                      <Button onClick={handleProfileBtn}>Profile</Button>
                      <Button onClick={handleLogoutBtn}>Logout</Button>
                    </Box>
                  </Popover>
                </div>
              ) : (
                <Box
                  component={IconButton}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <Icon.User sx={ICON_STYLE} />
                </Box>
              )}
              <Box component={IconButton} onClick={toggleSidenav}>
                <Badge badgeContent={state.cart.length} color="primary">
                  <Icon.CartBag sx={ICON_STYLE} />
                </Badge>
              </Box>
            </FlexBox>
          </FlexBetween>

          {/* SEARCH FORM DRAWER */}
          <Drawer
            open={searchBarOpen}
            anchor="top"
            onClose={toggleSearchBar}
            sx={{
              zIndex: 9999,
            }}
          >
            <Box
              sx={{
                width: "auto",
                padding: 2,
                height: "100vh",
              }}
            >
              <FlexBetween mb={1}>
                <Paragraph>Search to Bazaar</Paragraph>

                <IconButton onClick={toggleSearchBar}>
                  <Clear />
                </IconButton>
              </FlexBetween>

              {/* CATEGORY BASED SEARCH FORM */}
            </Box>
          </Drawer>

          {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
          {DIALOG_DRAWER}
        </StyledContainer>
      </HeaderWrapper>
    );
  }
  return (
    <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        {/* LEFT CONTENT - LOGO AND CATEGORY */}
        <FlexBox mr={2} minWidth="170px" alignItems="center">
          {typeof settingsData !== "undefined" && (
            <div>
              <Link href="/">
                <span
                  style={{
                    paddingLeft: "1em",
                    marginLeft: "1em",
                    borderLeft: "1px solid black",
                    cursor: "pointer",
                  }}
                >
                  {settingsData.WebsiteTitle}
                </span>
              </Link>
              <span>اتصل بنا: {settingsData.SupportNumber}</span>
            </div>
          )}

          {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
          {/* {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <Button color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </Button>
              </FlexBox>
            </CategoryMenu>
          )} */}
        </FlexBox>

        {/* SEARCH FORM */}
        {/* <FlexBox justifyContent="center" flex="1 1 0">
          {searchInput}
        </FlexBox> */}

        {/* LOGIN AND CART BUTTON */}
        <FlexBox gap={1.5} alignItems="center">
          {userToken ? (
            <div>
              <Box
                component={IconButton}
                p={1.25}
                bgcolor="grey.200"
                onClick={(e) => handlePopoverOpen(e)}
              >
                <AccountCircleIcon />
              </Box>
              <Popover
                open={popoverOpen}
                onClose={handlePopoverClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {/* Content of the popover */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                  }}
                >
                  <Button onClick={handleProfileBtn}>Profile</Button>
                  <Button onClick={handleLogoutBtn}>Logout</Button>
                </Box>
              </Popover>
            </div>
          ) : (
            <Box
              component={IconButton}
              p={1.25}
              bgcolor="grey.200"
              onClick={() => {
                router.push("/login");
              }}
            >
              <PersonOutline />
            </Box>
          )}

          <Badge badgeContent={state.cart.length} color="primary">
            <Box
              p={1.25}
              bgcolor="grey.200"
              component={IconButton}
              onClick={toggleSidenav}
            >
              <ShoppingBagOutlined />
            </Box>
          </Badge>
        </FlexBox>

        {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
        {DIALOG_DRAWER}
      </StyledContainer>
    </HeaderWrapper>
  );
};
export default TopSection;
