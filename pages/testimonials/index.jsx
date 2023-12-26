import { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Alert,
  Snackbar,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlexBox } from "../../src/components/flex-box";
import BazaarRating from "../../src/components/BazaarRating";
import { H2, H5 } from "../../src/components/Typography";
import { useAppContext } from "../../src/contexts/AppContext";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import useGetFetch from "../../src/components/fetch/useGetFetch";

const Testimonials = () => {
  const { userToken } = useAppContext();
  const [testimonialArr, setTestimonialArr] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
      };
      const body = "";
      const response = await useGetFetch(
        "https://sinbad-store.com/api/v2/testimonials",
        headers,
        body
      );
      const data = response.data.reviews;
      setTestimonialArr(data);
      console.log(data);
    };
    doFetch();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tabs"
          sx={{ mb: 5 }}
        >
          <Tab label="Testimonials" />
          <Tab label="Add Testimonial" />
        </Tabs>
      </Container>
      <Container maxWidth="md">
        {value === 0 ? (
          <PostedTestimonial testimonialArr={testimonialArr} />
        ) : (
          <AddTestimonial userToken={userToken} />
        )}
      </Container>
    </div>
  );
};

const PostedTestimonial = ({ testimonialArr }) => {
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {testimonialArr && testimonialArr.length > 0 ? (
        testimonialArr.map((testimonial) => (
          <Grid item xs={6} sm={6} md={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" color="secondary" gutterBottom>
                  {testimonial.title}
                </Typography>
                <BazaarRating
                  value={testimonial.grade || 0}
                  color="warn"
                  readOnly
                />
                <Typography variant="body2">{testimonial.message}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Paper elevation={2} sx={{padding: "3rem", margin: "2rem"}}>لايوجد شهادات في الوقت الحالي</Paper>
        </Grid>
      )}
    </Grid>
  );
};

const AddTestimonial = ({ userToken }) => {
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    status: null,
    message: null,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    testimonialTitle: Yup.string().required("Title is Required"),
    testimonialBody: Yup.string().required("Body is Required"),
  });

  const initialValues = {
    testimonialTitle: "",
    testimonialBody: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { testimonialTitle, testimonialBody } = values;
    const body = JSON.stringify({
      title: testimonialTitle,
      message: testimonialBody,
    });
    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const response = await usePostFetch(
      "https://sinbad-store.com/api/v2/add-testimonial",
      headers,
      body
    );

    const data = await response.data;

    if (data) {
      console.log(data);
      setOpen(true);
      setSnackbarContent({ status: data.status, message: data.message });
    }
    resetForm();
  };
  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
          dirty,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">عنوان الشهادة</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <TextField
                fullWidth
                name="testimonialTitle"
                variant="outlined"
                onBlur={handleBlur}
                value={values.testimonialTitle}
                onChange={handleChange}
                placeholder="اكتب عنوان الشهادة..."
                error={!!touched.testimonialTitle && !!errors.testimonialTitle}
                helperText={touched.testimonialTitle && errors.testimonialTitle}
              />
            </Box>
            <Box mb={3}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">نص الشهادة</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <TextField
                rows={8}
                multiline
                fullWidth
                name="testimonialBody"
                variant="outlined"
                onBlur={handleBlur}
                value={values.testimonialBody}
                onChange={handleChange}
                placeholder="اكتب نص الشهادة..."
                error={!!touched.testimonialBody && !!errors.testimonialBody}
                helperText={touched.testimonialBody && errors.testimonialBody}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(dirty && isValid)}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarContent.status ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarContent.status
            ? "Thank you for your Testimonial!"
            : snackbarContent.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Testimonials;
