import {useContext} from "react"
import { SettingsContext } from "contexts/SettingContext";
import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { H1, Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram";
import DummyFooterSection from "components/footer/DummyFooterSection";
import DummyFooterLower from "components/footer/DummyFooterLower";
// import newFooterData from "../../utils/__api__/footerData"

// styled component
const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const FooterTitle = styled(H1)({
  color: "white",
  fontSize: "1.3rem",
  fontWeight: "500",
  borderBottom: "1px solid white",
  width: "140px",
  marginBottom: "2rem",
  paddingBottom: ".5em",
});
const FooterLowerPart = styled(Box)({
  display: "flex",
  paddingLeft: "1.5rem",
  justifyContent: "space-between",
  width: "99%",
  flexWrap: "wrap",

});
const CustomFooter = () => {
  // CONTEXT DATA
  // const {siteSettingsData} = useContext(SettingsContext)
  // if(siteSettingsData) console.log(siteSettingsData)
  // CONTEXT DATA

  return (
    <footer>
      <Box bgcolor="#222935">
        <Box
          py={10}
          overflow="hidden"
          sx={{ maxWidth: "90%", margin: "0 auto" }}
        >
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FooterTitle>صفحات المواقع</FooterTitle>
              <FlexBox flexWrap="wrap" justifyContent={"space-between"}>
                <DummyFooterSection />
                <DummyFooterSection />
                <DummyFooterSection />
                <DummyFooterSection />
                <DummyFooterSection />
                <DummyFooterSection />
                {/* <Box>
                  <Box
                    fontSize="18px"
                    fontWeight="600"
                    mb={1.5}
                    lineHeight="1"
                    color="white"
                  >
                    Customer Care
                  </Box>
                  <div>
                    {customerCareLinks.map((item, ind) => (
                      <Link href="/" key={ind} passHref>
                        <StyledLink>{item}</StyledLink>
                      </Link>
                    ))}
                  </div>
                </Box>

                <Box>
                  <Box
                    fontSize="18px"
                    fontWeight="600"
                    mb={1.5}
                    lineHeight="1"
                    color="white"
                  >
                    Contact Us
                  </Box>

                  <Box py={0.6} color="grey.500">
                    70 Washington Square South, New York, NY 10012, United
                    States
                  </Box>

                  <Box py={0.6} color="grey.500">
                    Email: uilib.help@gmail.com
                  </Box>

                  <Box py={0.6} mb={2} color="grey.500">
                    Phone: +1 1123 456 780
                  </Box>
                </Box> */}
              </FlexBox>
            </Grid>

            {/* <FlexBox flexWrap="wrap" justifyContent={"space-between"}></FlexBox> */}
            <FooterLowerPart>
              <DummyFooterLower />


              <FlexBox className="flex" mx={-0.625}>
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <IconButton
                        sx={{
                          margin: 0.5,
                          fontSize: 12,
                          padding: "10px",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <item.icon
                          fontSize="inherit"
                          sx={{
                            color: "white",
                          }}
                        />
                      </IconButton>
                    </a>
                  ))}
                </FlexBox>
              
              {/* <Grid item lg={3} md={3} sm={4} xs={12}></Grid> */}
            </FooterLowerPart>
          </Grid>
        </Box>
      </Box>
    </footer>
  );
};
const aboutLinks = [
  "Careers",
  "Our Stores",
  "Our Cares",
  "Terms & Conditions",
  "Privacy Policy",
];
const customerCareLinks = [
  "Help Center",
  "How to Buy",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];
const iconList = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/UILibOfficial",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/uilibofficial",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  {
    icon: Google,
    url: "https://www.google.com/search?q=ui-lib.com",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/uilibofficial/",
  },
];
export default CustomFooter;
