import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { styled, Grid, Pagination } from "@mui/material";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import NoProductsAlert from "../../src/components/NoProductsAlert";
import PageLoader from "../../src/components/loader-spinner/PageLoader";

const StyledContainer = styled("div")(({ theme }) => ({
  width: "80%",
  margin: "4rem auto",
}));

const CustomProduct = () => {
  const router = useRouter();
  const { query } = router;
  const productID = query.id;
  const [productDetails, setProductDetails] = useState(null);
  const [paginationIndicator, setPaginationIndicator] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  console.log(loading);
  useEffect(() => {
    setLoading(true);

    const doFetch = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "X-localization": "ar" },
          redirect: "follow",
        };
        const response = await useGetFetch(
          `https://sinbad-store.com/api/v2/products-page/${productID}?page=${paginationIndicator}`,
          requestOptions
        );
        const data = response.data;
        setLoading(false);
        setInitialLoad(false);

        if (data) {
          setProductDetails({
            pagination: data.pagination,
            pageTitle: data.data.page_title,
            products: data.data.products,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    doFetch();
  }, [paginationIndicator]);

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
      {initialLoad ? (
        <PageLoader />
        ) : (
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
      )}
    </StyledContainer>
  );
};

export default CustomProduct;
