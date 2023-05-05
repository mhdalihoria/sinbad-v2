import React from "react";

const ProductPageAttributes = ({ attributes, price, setPrice }) => {
  const attrs = attributes[0];
  const namesOfAttrs = attrs.attributes_values.map((attr) => {
    return (
      <div
        style={{
          background: attr.code,
          height: "25px",
          width: "25px",
          cursor: "pointer"
        }}
      > 
      </div> 
    );
  });
  return (
    <div>
      <h6>{attrs.attribute_name}</h6>
      {namesOfAttrs}
    </div>
  );
};

export default ProductPageAttributes;
