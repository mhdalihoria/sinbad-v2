import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, styled } from "@mui/material";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductImageViewer from "../../src/components/products-components/ProductImageViewer";
import ProductPagePrice from "../../src/components/products-components/ProductPagePrice";
import ProductPageAvailableAndRating from "../../src/components/products-components/ProductPageAvailableAndRating";
import ProductPageProductDesc from "../../src/components/products-components/ProductPageProductDesc";
import ProductPageImportedProduct from "../../src/components/products-components/ProductPageImportedProduct";
import ProductPageAttributes from "../../src/components/products-components/ProductPageAttributes";
import ProductPageQuantityAndCart from "../../src/components/products-components/ProductPageQuantityAndCart";
import ProductPageDescAndRating from "../../src/components/products-components/ProductPageDescAndRating";
import ProductPageRelatedProducts from "../../src/components/products-components/ProductPageRelatedProducts";
import Loader from "../../src/components/loader-spinner/Loader";

const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #e8e8e8",
  width: "80%",
  margin: "0 auto",
}));

const ProductPage = ({ id, productRequest }) => {
  const router = useRouter();

  const [productData, setProductData] = useState();
  const { product, attributes, relatedProducts } = productData || {};
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (typeof productRequest !== "undefined") {
      setProductData(productRequest.data);
      setPrice(productRequest.data.product.product_price);
    }
  }, [productRequest]);

  // The following line (if statment) fixes two bugs:
  // 1- when the requestData is unefined because the getStaticPaths's fallback = true... making the API call in getStaticProps return undeifned during **build time**.. using this runs getStaticProps API call again to provide the apropriate data, once router.fallback is true
  // LINK To Solution (1): https://github.com/vercel/next.js/discussions/15944
  // 2- when the following line was on the top of the component, it would cause an early return to show the loading spinner (cuz of undefined getStaticProps), but that would cause the previously rendered useState hooks to not be rendered the second time, and cause a warning (that could potentially cause more problems later on), so it had to be moved to the bottom of the component (before return) to make sure that all of the useStates and useEffects are rendered with each render
  // Link To Solution (2): https://www.adrian-nowicki.com/blog/how-to-overcome-react-detected-change-in-order-hooks
  if (router.isFallback) {
    return (
      <div
        style={{
          width: "100vw",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={20} loading={router.isFallback} />
      </div>
    );
  }

  return (
    <Container>
      {productData && (
        <>
          {/* -----------------IMAGE VIEWER----------------- */}
          <div
            style={product.is_future ? { opacity: "0.5" } : { opacity: "1" }}
          >
            {<ProductImageViewer productData={productData} />}
          </div>
          {/* -----------------IMAGE VIEWER----------------- */}
          <div>
            <h1
              style={product.is_future ? { opacity: "0.5" } : { opacity: "1" }}
            >
              {product.product_name}
            </h1>
            {/* <h6>{product.product_short_description}</h6> */}
            <h4>short description</h4>
            <div>
              <h5>{product.with_delivery_fee && "بدون توصيل"}</h5>

              {/* -----------------PRICE SECTION----------------- */}
              <ProductPagePrice
                product={product}
                price={price}
                setPrice={setPrice}
              />
              {/* -----------------PRICE SECTION----------------- */}

              {/* -----------------IN STOCK SECTION + RATING----------------- */}
              <ProductPageAvailableAndRating product={product} />
              {/* -----------------IN STOCK SECTION + RATING----------------- */}

              {/* -----------------SHOP INFO/DESC----------------- */}
              <ProductPageProductDesc product={product} />
              {/* -----------------SHOP INFO/DESC----------------- */}

              {/* -----------------IMPORTED PRODUCT----------------- */}
              <ProductPageImportedProduct product={product} />
              {/* -----------------IMPORTED PRODUCT----------------- */}

              {/* -----------------ATTRIBUTES----------------- */}
              {typeof attributes[0] !== "undefined" && (
                <ProductPageAttributes
                  attributes={attributes}
                  price={price}
                  setPrice={setPrice}
                />
              )}
              {/* -----------------ATTRIBUTES----------------- */}
            </div>
            
             {/* -----------------QUANTITY AND ADD TO CART----------------- */}
            <ProductPageQuantityAndCart
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              />
              {/* -----------------QUANTITY AND ADD TO CART----------------- */}

              {/* -----------------DESCRIPTION AND RATING----------------- */}
              <ProductPageDescAndRating desc={product.product_description}/>
              {/* -----------------DESCRIPTION AND RATING----------------- */}

              {/* -----------------RELATED PRODUCTS----------------- */}
              <ProductPageRelatedProducts relatedProducts={relatedProducts}/>
              {/* -----------------RELATED PRODUCTS----------------- */}

          </div>
        </>
      )}
    </Container>
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

export const getStaticProps = async (ctx) => {
  const productId = ctx.params.id;
  const productRequest = await useGetFetch(
    `https://sinbad-store.com/api/v2/product/${productId}`,
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );
  return {
    props: {
      id: ctx.params.id,
      productRequest,
    },
  };
};

export default ProductPage;
