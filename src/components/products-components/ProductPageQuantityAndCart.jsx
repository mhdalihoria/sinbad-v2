import React from "react";

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
      } else {return 0};
    });
  };

  return (
    <div>
      <div>
        <span>الكمية: </span>
        <button onClick={addQuantity}>+</button>
        <span>{quantity}</span>
        <button onClick={subtractQuantity}>-</button>
      </div>
      <div>
        <button disabled={product.is_future}>add To Card</button>
      </div>
    </div>
  );
};

export default ProductPageQuantityAndCart;
