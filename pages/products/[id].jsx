import React, { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductImageViewer from "../../src/components/products-components/ProductImageViewer";
import ProductPagePrice from "../../src/components/products-components/ProductPagePrice";
import ProductPageAvailableAndRating from "../../src/components/products-components/ProductPageAvailableAndRating";
import ProductPageProductDesc from "../../src/components/products-components/ProductPageProductDesc";
import ProductPageImportedProduct from "../../src/components/products-components/ProductPageImportedProduct";
import ProductPageAttributes from "../../src/components/products-components/ProductPageAttributes";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #e8e8e8",
  width: "80%",
  margin: "0 auto",
}));

const ProductPage = ({ id, productRequest }) => {
  const [productData, setProductData] = useState();
  const { product, attributes } = productData || {};
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(productRequest, id);
    setLoading(true)

    const doFetch = async () => {
      console.log("hello from doFetch")
      const response =  await useGetFetch(
        `https://sinbad-store.com/api/v2/product/${id}`,
        {
          method: "GET",
          headers: { "X-localization": "ar" },
        }
      );
      console.log(response)
      const data = await response
      setProductData(data)
    }

    

    if (typeof productRequest !== "undefined") {
      setLoading(false)
      setProductData(productRequest.data);
      setPrice(productRequest.data.product.product_price);
    } else {
      doFetch()
    }
  }, [loading, productData]);


  if(loading) {
    return <div>Loading...</div>
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
              <ProductPageAttributes
                attributes={attributes}
                price={price}
                setPrice={setPrice}
              />
              {/* -----------------ATTRIBUTES----------------- */}
            </div>

            <div>
              <button disabled={product.is_future}>add To Card</button>
            </div>
          </div>
        </>
      ) }

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
