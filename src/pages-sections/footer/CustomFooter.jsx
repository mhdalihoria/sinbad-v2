import { useContext } from "react";
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
  const { siteSettingsData } = useContext(SettingsContext);
  const {
    social_links: socialLinks,
    offer_pages: offerPages,
    product_pages: productPages,
    site_pages: sitePages,
  } = siteSettingsData;

  return (
    <footer>
      {siteSettingsData && (
        <Box bgcolor="#222935">
          <Box
            py={10}
            overflow="hidden"
            sx={{ maxWidth: "90%", margin: "0 auto" }}
          >
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FooterTitle>صفحات المواقع</FooterTitle>
                <FlexBox flexWrap="wrap" justifyContent={"space-around"}>
                  <DummyFooterSection
                    data={offerPages}
                    title={"صفحات العروض"}
                  />
                  <DummyFooterSection
                    data={productPages}
                    title={"صفحات المنتجات"}
                  />
                  <DummyFooterSection data={sitePages} title={"صفحات الموقع"} />
                </FlexBox>
              </Grid>

              <FooterLowerPart>
                <DummyFooterLower />

                <FlexBox className="flex" mx={-0.625}>
                  {socialLinks?.map((item, ind) => {
                    if (item.url.includes("http")) {
                      return (
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
                            <i
                              className={`fa-brands fa-${item.name.toLowerCase()}`}
                              style={{ color: "white" }}
                            ></i>
                          </IconButton>
                        </a>
                      );
                    }
                  })}
                </FlexBox>
              </FooterLowerPart>
            </Grid>
          </Box>
        </Box>
      )}
    </footer>
  );
};

export default CustomFooter;
