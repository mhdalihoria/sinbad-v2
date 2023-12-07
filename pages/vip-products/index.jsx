import React, { useCallback, useEffect, useState } from "react";
import {
  styled,
  Grid,
  Pagination,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import NoProductsAlert from "../../src/components/NoProductsAlert";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import BazaarImage from "../../src/components/BazaarImage";
import BazaarTextField from "../../src/components/BazaarTextField";
import { H1, H6 } from "../../src/components/Typography";
import EyeToggleButton from "../../src/pages-sections/sessions/EyeToggleButton";
import { useFormik } from "formik";
import * as yup from "yup";

const StyledContainer = styled("div")(({ theme }) => ({
  width: "80%",
  margin: "4rem auto",
}));

const initialValues = {
  username: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  username: yup.string().required("User name is required"),
});

const VipProducts = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [userCredentials, setUserCredentials] = useState(null);
  const [paginationIndicator, setPaginationIndicator] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = (values) => {
    setUserCredentials(values);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  useEffect(() => {
    setLoading(true);

    const doFetch = async () => {
      try {
        const body = JSON.stringify(userCredentials);

        const headers = {
          "X-localization": "ar",
          "Content-Type": "application/json",
        };

        const response = await usePostFetch(
          `https://sinbad-store.com/api/v2/vip-products?page=${paginationIndicator}`,
          headers,
          body
        );
        const data = response.data;
        console.log(data);
        setLoading(false);
        if (data.status === false) {
          setOpen(true);
          setErrorMsg(data.message)
        }
        if (data.status) {
          setProductDetails({
            pagination: data.data.pagination,
            products: data.data.data.products,
            status: data.status,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (userCredentials) {
      doFetch();
    }
  }, [userCredentials, paginationIndicator]);

  const changeHandler = (page) => {
    setPaginationIndicator(page);
  };

  const productGridElements =
    productDetails &&
    productDetails.products.map((product) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={product.id}
        style={{ position: "relative" }} //position relative is needed to make the card loader work
      >
        <ProductCard1
          id={product.id}
          slug={product.id}
          title={product.product_name}
          price={product.product_price}
          rating={product.rating}
          imgUrl={`${product.thumb}`}
          salePrice={product.sale_price}
          description={product.product_description?.replace(
            /(<([^>]+)>)/gi,
            ""
          )}
          categoryName={product.category_name}
          isNew={product.is_new}
          isExternal={product.is_external}
          shopName={product.shop_name}
          hoverEffect
          // isFavorited={
          //   favItemsLocalStorage.length > 0 &&
          //   favItemsLocalStorage.find(
          //     (favItem) => favItem.id === item.id
          //   ) ?
          //   true : false
          // }
          isFuture={product.is_future}
          loading={loading}
        />
      </Grid>
    ));

  return (
    <StyledContainer>
      {userCredentials && productDetails ? (
        <>
          {productDetails ? (
            <>
              <h1>{productDetails.pageTitle}</h1>
              <Grid container columnSpacing={4} rowSpacing={4}>
                {productGridElements} {/* Fix the variable name here */}
                {productDetails.products.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <Pagination
                      count={productDetails.pagination.last_page}
                      color="primary"
                      onChange={(event, page) => changeHandler(page)}
                    />
                  </div>
                )}
              </Grid>
            </>
          ) : (
            <NoProductsAlert />
          )}
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <BazaarTextField
              mb={1.5}
              fullWidth
              name="username"
              size="username"
              type="text"
              variant="outlined"
              onBlur={handleBlur}
              value={values.username}
              onChange={handleChange}
              label="User Name or Phone Number"
              placeholder="Mohammad1980"
              error={!!touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />

            <BazaarTextField
              mb={2}
              fullWidth
              size="small"
              name="password"
              label="Password"
              autoComplete="on"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              placeholder="*********"
              type={passwordVisibility ? "text" : "password"}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <EyeToggleButton
                    show={passwordVisibility}
                    click={togglePasswordVisibility}
                  />
                ),
              }}
            />

            <LoadingButton
              loading={userCredentials && loading}
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                height: 44,
              }}
            >
              Login
            </LoadingButton>
          </form>
          {userCredentials && (
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMsg ? errorMsg : "Something Went Wrong... Check Your Credentials And Try Again"}
              </Alert>
            </Snackbar>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default VipProducts;
