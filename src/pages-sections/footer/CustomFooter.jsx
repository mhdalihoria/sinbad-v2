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
  Modal,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const addSubInitialValues = {
  phoneNum: "",
};

const activateSubInitialValues = {
  code: "",
};

const addSubSchema = yup.object().shape({
  phoneNum: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone Number must be a valid number"),
});

const activateSubSchema = yup.object().shape({
  code: yup
    .string()
    .required("Activation Code is Required")
    .matches(/^\d+$/, "Activation Code must be a valid number"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CustomFooter = () => {
  const theme = useTheme();
  const { siteSettingsData } = useContext(SettingsContext);
  const {
    social_links: socialLinks,
    offer_pages: offerPages,
    product_pages: productPages,
    site_pages: sitePages,
  } = siteSettingsData;
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [phoneNum, setPhoneNum] = useState(null);
  const [activationCode, setActivationCode] = useState(null);

  const handleClose = (setOpenFunction) => {
    setOpenFunction(false);
  };

  const handleAddSubscriber = async (values) => {
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
      if (response) {
        setOpen(true);
        setPhoneNum(values.phoneNum);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleActivateSub = async (values) => {
    try {
      const headers = {
        "X-localization": "ar",
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        mobile: phoneNum,
        code: values.code,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/active-subscriber",
        headers,
        body
      );
      if (response) {
        setActivationCode({
          status: response.data.status,
          message: response.data.message,
        });
        setSnackbarOpen(true);
      }
    } catch (err) {
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
                    onSubmit={handleAddSubscriber}
                    initialValues={addSubInitialValues}
                    validationSchema={addSubSchema}
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
                            InputProps={{ style: { color: "#fff" } }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phoneNum}
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
      <Modal open={open} >
        <Box sx={{ ...style, width: 400 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => handleClose(setOpen)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <H1>Activate Your Number</H1>
          <p style={{ marginTop: "0" }}>Enter the code you got via message</p>
          <Formik
            onSubmit={handleActivateSub}
            initialValues={activateSubInitialValues}
            validationSchema={activateSubSchema}
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
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                  spacing={2}
                  sx={{ marginTop: "2rem" }}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="filled-basic"
                      label="Activation Code"
                      name="code"
                      variant="standard"
                      color="white"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      helperText={touched.code && errors.code}
                      error={touched.code && Boolean(errors.code)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button type="submit" variant="outlined">
                      Subscribe
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert
          onClose={() => handleClose(setSnackbarOpen)}
          severity={
            activationCode && activationCode?.status ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {activationCode && activationCode.message}
        </Alert>
      </Snackbar>
    </footer>
  );
};

export default CustomFooter;
