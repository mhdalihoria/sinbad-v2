import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs, useTheme } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import ProductDescription from "components/products/ProductDescription";
import ProductFeatures from "components/products/ProductFeatures";
import { getRelatedProducts } from "utils/__api__/related-products";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { useAppContext } from "../../src/contexts/AppContext";
import api from "utils/__api__/products";
import Link from "next/link";
import Loader from "../../src/components/loader-spinner/Loader";
import PageLoader from "../../src/components/loader-spinner/PageLoader";
// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

// ===============================================================

// ===============================================================

const ProductDetails = ({ productId }) => {
  const router = useRouter();
  const [productRequest, setProductRequest] = useState({});
  const [productData, setProductData] = useState();
  const { userToken, setUserToken } = useAppContext();

  const {
    product,
    attributes,
    relatedProducts,
    reviews,
    features,
    commission,
    offer,
    mazad,
    product_images: productImages,
  } = productData || {};
  const [favItemsLocalStorage, setFavItemsLocalStorage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const theme = useTheme();
  const handleOptionClick = (_, value) => setSelectedOption(value);
  useEffect(() => {
    if (productRequest) {
      setProductData(productRequest.data);
      // setPrice(productRequest.data.product.product_price);
    }
  }, [productRequest]);
  useEffect(() => {
    if (!window) return;
    let token = JSON.parse(window.localStorage.getItem("user_token"));
    if (token && token.length > 0) setUserToken(token);
  }, [router.isFallback]); //we're using router.isFallback, so the in our case, we set the state when we have the data and when we display the page

  useEffect(() => {
    const favItemsLS = JSON.parse(window.localStorage.getItem("favItems"));
    if (favItemsLS && typeof favItemsLS !== "undefined") {
      setFavItemsLocalStorage(favItemsLS);
    }
  }, []);

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("user_token"));
    const productRequest = async (id, token = "") => {
      const response = await useGetFetch(
        `https://sinbad-store.com/api/v2/product/${id}`,
        {
          method: "GET",
          headers: { "X-localization": "ar", Authorization: `Bearer ${token}` },
          // headers: { "X-localization": "ar" },
        }
      );
      setProductRequest(response);
    };

    if (token && typeof token !== "undefined") {
      setProductData()
      productRequest(productId, token);
    } else {
      setProductData()
      productRequest(productId);
    }
  }, [productId, router.isFallback]); //we're using router.isFallback, so the in our case, we set the state when we have the data and when we display the page

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return (
      <PageLoader />
    );
  }
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? (
          <>
            <ProductIntro
              userToken={userToken}
              product={product}
              productImages={productImages}
              attributes={attributes}
              favItemsLocalStorage={favItemsLocalStorage}
              commission={commission}
              offer={offer}
              mazad={mazad}
            />
            {/* PRODUCT DESCRIPTION AND REVIEW */}
            <StyledTabs
              textColor="primary"
              value={selectedOption}
              indicatorColor="primary"
              onChange={handleOptionClick}
            >
              <Tab className="inner-tab" label="الوصف" />
              <Tab
                className="inner-tab"
                label={`التقييمات ${
                  reviews.length > 0 ? "(" + reviews.length + ")" : " "
                }`}
              />
              {typeof features !== "undefined" && features.length > 0 && (
                <Tab className="inner-tab" label="المواصفات" />
              )}
            </StyledTabs>

            <Box mb={6}>
              {selectedOption === 0 && <ProductDescription product={product} />}
              {selectedOption === 1 && (
                <>
                  {userToken && typeof userToken !== "undefined" ? (
                    <ProductReview
                      reviews={reviews}
                      id={product.id}
                      userToken={userToken}
                    />
                  ) : (
                    <p>
                      يجب{" "}
                      <Link href={"/signup"}>
                        <span
                          style={{
                            color: theme.palette.primary.main,
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                          تسجيل الدخول
                        </span>
                      </Link>{" "}
                      لتقييم هذا المنتج
                    </p>
                  )}
                </>
              )}
              {selectedOption === 2 && <ProductFeatures features={features} />}
            </Box>

            {relatedProducts && relatedProducts.length > 0 && (
              <RelatedProducts
                productsData={relatedProducts}
                favItemsLocalStorage={favItemsLocalStorage}
                offer={offer}
              />
            )}
          </>
        ) : (
        //   <div
        //   style={{
        //     width: "100%",
        //     height: "100px",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        //   <Loader loading={product} size={20} />
        // </div>
        <PageLoader />
        )}
      </Container>
    </ShopLayout1>
  );
};
export const getStaticPaths = async () => {
  const allProducts = await useGetFetch(
    "https://sinbad-store.com/api/v2/products",
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );

  const productsParams = allProducts.data.data.products.map((product) => {
    return { params: { id: product.id.toString() } };
  });
  return {
    paths: productsParams,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  // const relatedProducts = await getRelatedProducts();
  // const product = await api.getProduct(params.slug);

  const productId = params.id;

  return {
    props: {
      productId,
    },
  };
};
export default ProductDetails;
