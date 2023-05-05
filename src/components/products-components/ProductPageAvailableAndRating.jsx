import React from 'react'

const ProductPageAvailableAndRating = ({product}) => {
    const displayAvailable = (productQuantity, displayQuantity) => {
        if (!productQuantity || productQuantity === 0) {
          return "out of stock";
        } else if (displayQuantity && productQuantity > 0) {
          return `${productQuantity} قطعة`;
        } else if (!displayQuantity && product_quantity === null) {
          return "available";
        }
      };
    
  return (
    <div style={{ background: "green", color: "white" }}>
                <span>
                  {displayAvailable(
                    product.product_quantity,
                    product.display_quantity
                  )}
                </span>
              </div>
  )
}

export default ProductPageAvailableAndRating