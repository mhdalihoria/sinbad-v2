import { styled } from "@mui/material";
import React from "react";

const Price = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "2rem",
}));

const ScratchedPrice = styled("span")(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: "1.1rem",
  textDecoration: "line-through" ,
  padding: "0 1em"

}));

const ProductPagePrice = ({ product, price, setPrice }) => {
  return (
    <div>
      {product.has_offer ? (
        <>
          <ScratchedPrice>{price}</ScratchedPrice>
          <Price>{product.sale_price}</Price>
        </>
      ) : (
        <Price>{price}</Price>
      )}
    </div>
  );
};

export default ProductPagePrice;
