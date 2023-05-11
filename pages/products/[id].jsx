import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import ProductDescription from "components/products/ProductDescription";
import { getRelatedProducts } from "utils/__api__/related-products";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import api from "utils/__api__/products";

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

const ProductDetails = (props) => {
  const { productRequest } = props;
  const router = useRouter();
  const [productData, setProductData] = useState();
  const {
    product,
    attributes,
    relatedProducts,
    reviews,
    product_images: productImages,
  } = productData || {};
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);

  useEffect(() => {
    if (typeof productRequest !== "undefined") {
      setProductData(productRequest.data);
      // setPrice(productRequest.data.product.product_price);
    }
  }, [productRequest]);
  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
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
            <ProductIntro product={product} productImages={productImages} />
            {/* PRODUCT DESCRIPTION AND REVIEW */}
            <StyledTabs
              textColor="primary"
              value={selectedOption}
              indicatorColor="primary"
              onChange={handleOptionClick}
            >
              <Tab className="inner-tab" label="Description" />
              <Tab className="inner-tab" label="Review (3)" />
            </StyledTabs>

            <Box mb={6}>
              {selectedOption === 0 && <ProductDescription product={product} />}
              {selectedOption === 1 && <ProductReview reviews={reviews}/>}
            </Box>

            {relatedProducts && (
              <RelatedProducts productsData={relatedProducts} />
            )}
          </>
         ) : (
          <H2>Loading...</H2>
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

  const productsParams = allProducts.data.products.map((product) => {
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
  const productRequest = await useGetFetch(
    `https://sinbad-store.com/api/v2/product/${productId}`,
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );
  return {
    props: {
      productRequest,
    },
  };
};
export default ProductDetails;
