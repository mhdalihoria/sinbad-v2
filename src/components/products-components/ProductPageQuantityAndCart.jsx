import { Button, ButtonGroup, styled, useTheme } from "@mui/material";
import React from "react";

const Count = styled("span")(({ theme }) => ({
  padding: "1em 2em",
  fontSize: ".7rem",
  fontWeight: "600",
  margin: "auto",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: "inset 0px 0px 8px 3px rgba(0,0,0,0.39)",
}));
const AddToCart = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  "&:hover": {
    background: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  },
}));

const ProductPageQuantityAndCart = ({ product, quantity, setQuantity }) => {
  const addQuantity = () => {
    setQuantity((quantity) => {
      return quantity + 1;
    });
  };
  const subtractQuantity = () => {
    setQuantity((quantity) => {
      if (quantity > 0) {
        return quantity - 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        width: "80%",
        margin: "0 auto"
      }}
    >
      <div style={{display: "flex", flexDirection: "column", gap: "10"}}>
        <span
          style={{ fontSize: "1rem", fontWeight: "700", paddingBottom: " .5em" }}
        >
          الكمية:{" "}
        </span>
        <ButtonGroup>
          <Button onClick={addQuantity}>+</Button>
          <Count>{quantity}</Count>
          <Button onClick={subtractQuantity}>-</Button>
        </ButtonGroup>
      </div>
      <div>
        <AddToCart disabled={product.is_future}>add To Card</AddToCart>
      </div>
    </div>
  );
};

export default ProductPageQuantityAndCart;
