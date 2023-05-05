import React from "react";

const ProductPagePrice = ({ product, price, setPrice }) => {
  return (
    <div>
      {product.has_offer ? (
        <>
          <span style={{ color: "red" }}>{product.sale_price}</span>
          <span style={{ textDecoration: "line-through" }}>{price}</span>
        </>
      ) : (
        <h3>{price}</h3>
      )}
    </div>
  );
};

export default ProductPagePrice;
