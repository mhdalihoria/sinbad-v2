import { Fragment } from "react";
import { useRouter } from "next/router";
import { Card, styled, Typography } from "@mui/material";
import { CreditCard, FavoriteBorder, Person, Place } from "@mui/icons-material";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink";

// custom styled components
const MainContainer = styled(Card)(({ theme }) => ({
  paddingTop: "1.5rem",
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
const StyledNavLink = styled(({ children, isCurrentPath, ...rest }) => (
  <NavLink {...rest}>{children}</NavLink>
))(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": {
      color: theme.palette.primary.main,
    },
  },
}));
const Navigations = () => {
  const { pathname } = useRouter();
  return (
    <MainContainer>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          {/* <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography> */}

          {item.list.map((item) => (
            <StyledNavLink
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}
            >
              <FlexBox alignItems="center" gap={1}>
                <item.icon
                  color="inherit"
                  fontSize="small"
                  className="nav-icon"
                />
                <span>{item.title}</span>
              </FlexBox>
            </StyledNavLink>
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
};
const linkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/my-account",
        title: "Profile Info",
        icon: Person,
      },
      {
        href: "/orders",
        title: "Orders",
        icon: ShoppingBagOutlined,
      },
      {
        href: "/wishlist",
        title: "Favorite Categories",
        icon: FavoriteBorder,
      },
      {
        href: "/something",
        title: "Categories",
        icon: CategoryIcon,
      },
      {
        href: "/payments",
        title: "Payments",
        icon: CreditCard,
      },
      {
        href: "/something",
        title: "Bank Payments",
        icon: AccountBalanceIcon,
      },
    ],
  },
];
export default Navigations;
