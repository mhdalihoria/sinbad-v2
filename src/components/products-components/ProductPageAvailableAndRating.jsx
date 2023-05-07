import { Chip } from "@mui/material";
import React from "react";

const ProductPageAvailableAndRating = ({ product }) => {

  const displayAvailable = (productQuantity, displayQuantity) => {
    if (!productQuantity || productQuantity === 0) {
      return "out of stock";
    } else if (displayQuantity && productQuantity > 0) {
      return `${productQuantity} قطعة`;
    } else if (!displayQuantity && product_quantity === null) {
      return "available";
    }
  };

  const displayColor = () => {
    if(displayAvailable(product.product_quantity, product.display_quantity) === "out of stock") {
      return "primary"
    } else if(displayAvailable(product.product_quantity, product.display_quantity) === "available"){
      return "success"
    } else {
      return "secondary"
    }
  };

  return (
    <div style={{ color: "white", fontWeight: "600", display: "flex", justifyContent: "space-between", width: "80%", margin: "0 auto" }}>
      <div><span style={{background: "red"}}>rating</span></div>
      <Chip
        label={`${displayAvailable(
          product.product_quantity,
          product.display_quantity
        )}`}
        color={`${displayColor()}`}
      />
    </div>
  );
};

export default ProductPageAvailableAndRating;
