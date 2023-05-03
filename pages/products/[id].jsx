import React, { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductImageViewer from "../../src/components/products-components/ProductImageViewer";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const ProductPage = ({ id, productRequest }) => {
  const [productData, setProductData] = useState();

  console.log(productData);
  useEffect(() => {
    if (typeof productRequest !== "undefined") {
      setProductData(productRequest.data);
    }
  }, []);

  return <>{productData && <ProductImageViewer productData={productData}/>}</>;
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
    fallback: false,
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
