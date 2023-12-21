import { useContext, useState } from "react";
import { SettingsContext } from "contexts/SettingContext";
import Link from "next/link";
import {
  Box,
  TextField,
  Grid,
  IconButton,
  styled,
  Button,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
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
import * as yup from "yup";
import { Formik } from "formik";
import usePostFetch from "components/fetch/usePostFetch";

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

const NewsletterSection = styled("div")({
  maxWidth: "80%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

const INITIAL_VALUES = {
  phoneNum: "",
};

const checkoutSchema = yup.object().shape({
  phoneNum: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone Number must be a valid number"),
});

const CustomFooter = () => {
  const theme = useTheme();
  const { siteSettingsData } = useContext(SettingsContext);
  const {
    social_links: socialLinks,
    offer_pages: offerPages,
    product_pages: productPages,
    site_pages: sitePages,
  } = siteSettingsData;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [newsletterResponse, setNewsletterResponse] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const headers = {
        "X-localization": "ar",
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        mobile: values.phoneNum,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/add-subscriber",
        headers,
        body
      );
      setLoading(false);
      if (response) {
        console.log(response.data);
        setNewsletterResponse({
          status: response.data.status,
          message: response.data.message,
        });
        setOpen(true);
      }
      console.log(values);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <footer style={{ marginTop: "5rem" }}>
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

              <Grid container sx={{ marginBottom: "2rem" }}>
                <Grid item xs={12} sm={12}>
                  <FooterTitle style={{ width: "100%", marginRight: "1.5rem" }}>
                    اشترك بالنشرة البريدية
                  </FooterTitle>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={INITIAL_VALUES}
                    validationSchema={checkoutSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        {console.log(values)}
                        <NewsletterSection>
                          <TextField
                            id="filled-basic"
                            label="Phone Number"
                            name="phoneNum"
                            variant="filled"
                            color="white"
                            InputLabelProps={{
                              style: {
                                color: "#fff",
                              },
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.full_name}
                            helperText={touched.phoneNum && errors.phoneNum}
                            error={touched.phoneNum && Boolean(errors.phoneNum)}
                          />

                          <Button
                            variant="filled"
                            style={{ color: "#fff" }}
                            type="submit"
                          >
                            Subscribe
                          </Button>
                        </NewsletterSection>
                      </form>
                    )}
                  </Formik>
                </Grid>
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            newsletterResponse && newsletterResponse.status
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {newsletterResponse && newsletterResponse.message}
        </Alert>
      </Snackbar>
    </footer>
  );
};

export default CustomFooter;
