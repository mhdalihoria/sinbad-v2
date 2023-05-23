import { Box, Button, TextField, Rating } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox } from "components/flex-box";
import ProductComment from "./ProductComment";
import { H2, H5 } from "components/Typography";
import Pagination from "components/pagination/Pagination";
import { useState } from "react";
import usePostFetch from "components/fetch/usePostFetch";

// ===================================================

// ===================================================

const ProductReview = ({ reviews, id, userToken }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFormSubmit = async (values, { resetForm }) => {
    const { rating, commentBody, commentTitle } = values;
    const body = JSON.stringify({
      id: id,
      title: commentTitle,
      message: commentBody,
      grade: rating,
    });
    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const response = await usePostFetch(
      "https://sinbad-store.com/api/v2/add-product-review",
      headers,
      body
    );
    const data = await response.data;
    console.log(data);
    resetForm();
  };
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues: initialValues,
    validationSchema: reviewSchema,
  });
  return (
    <Box>
      {currentReviews.map((item, ind) => (
        <ProductComment {...item} key={ind} />
      ))}
      <Pagination
        reviewsPerPage={reviewsPerPage}
        totalReviews={reviews.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <H2 fontWeight="600" mt={7} mb={2.5}>
        اكتب تقييمك:
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb={2.5}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">كيف تقيم هذا المنتج</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            color="warn"
            size="medium"
            value={values.rating}
            onChange={(_, value) => setFieldValue("rating", value)}
          />
        </Box>

        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">عنوان التقييم</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            fullWidth
            name="commentTitle"
            variant="outlined"
            onBlur={handleBlur}
            value={values.commentTitle}
            onChange={handleChange}
            placeholder="اكتب عنوان التقييم..."
            error={!!touched.commentTitle && !!errors.commentTitle}
            helperText={touched.commentTitle && errors.commentTitle}
          />
        </Box>
        <Box mb={3}>
          <FlexBox mb={1.5} gap={0.5}>
            <H5 color="grey.700">نص التقييم</H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextField
            rows={8}
            multiline
            fullWidth
            name="commentBody"
            variant="outlined"
            onBlur={handleBlur}
            value={values.commentBody}
            onChange={handleChange}
            placeholder="اكتب نص التقييم..."
            error={!!touched.commentBody && !!errors.commentBody}
            helperText={touched.commentBody && errors.commentBody}
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
    </Box>
  );
};

const initialValues = {
  rating: 0,
  commentTitle: "",
  commentBody: "",
  date: new Date().toISOString(),
};
const reviewSchema = yup.object().shape({
  rating: yup.number().required("required"),
  commentTitle: yup.string().required("required"),
  commentBody: yup.string().required("required"),
});
export default ProductReview;
