import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";
import Carousel from "react-grid-carousel";

const ProductPageRelatedProducts = ({ relatedProducts }) => {
  const carourselItems = relatedProducts.map((product, idx) => {
    console.log(idx)
    return (
      <Carousel.Item>
        <ProductCard product={product} />
        <h1>{idx}</h1>
      </Carousel.Item>
    );
  });
  return (
    <Carousel cols={3} rows={1} gap={10} loop scroll-snap={true} showDots={true} autoplay={1250}>
      {carourselItems}
    </Carousel>
  );
};
export default ProductPageRelatedProducts;
