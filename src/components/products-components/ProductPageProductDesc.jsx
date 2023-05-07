import React from "react";

const container ={
  display: "flex",
  flexDirection: "column",

  margin: "2rem 0"
}

const ProductPageProductDesc = ({ product }) => {
  return (
    <div style={container}>
      {product.shop_name.length > 1 && ( //display shop name if the name isn't an empty string
        <span>
          المتجر: {product.shop_name && product.shop_name}
          {/* {product.shop_logo && product.shop_logo} */}
        </span>
      )}
      {product.brand_name.length > 1 && ( //display shop name if the name isn't an empty string
        <span>
          ماركة: {product.brand_name && product.brand_name}
          {product.brand_logo && product.brand_logo}
        </span>
      )}
      <span> الحالة: {product.status}</span>
      <span>التصنيف: {product.category_name}</span>
      <span></span>
    </div>
  );
};

export default ProductPageProductDesc;
