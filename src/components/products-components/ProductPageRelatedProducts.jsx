import ProductCard from "./ProductCard";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function ProductPageRelatedProducts({ relatedProducts }) {
  console.log(chunkArray(relatedProducts, 3));

  return (
    <Carousel navButtonsAlwaysVisible={true}>
      {chunkArray(relatedProducts, 3).map((productChunk, idx) => {
        return (
          <div style={{ display: "flex" }} key={idx}>
            {productChunk.map((product, i) => {
              return <ProductCard product={product} key={i} />;
            })}
          </div>
        );
      })}
    </Carousel>
  );
}

export default ProductPageRelatedProducts;

const chunkArray = (array, chunkSize) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)].map((value, index) => {
    return array.slice(index * chunkSize, (index + 1) * chunkSize);
  });
};
