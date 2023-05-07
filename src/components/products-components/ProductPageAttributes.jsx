import { styled } from "@mui/material";
import React from "react";

const AttrTitle = styled("span")({
  fontSize: ".8rem",
  fontWeight: "600",
  marginBottom: "1em",
  display: "inline-block",
});
const AttrContainer = styled("div")({
  display: "flex",
  marginBottom: "1rem"
});

const ProductPageAttributes = ({ attributes, price, setPrice }) => {
  const attrs = attributes[0];
  const namesOfAttrs = attrs.attributes_values.map((attr) => {
    return (
      <div
        style={{
          background: attr.code,
          height: "25px",
          width: "25px",
          cursor: "pointer",
          marginLeft: "5px",
        }}
        key={attr.code}
        onClick={() => handleColorClick(attr.price)}
      ></div>
    );
  });

  const handleColorClick = (price) => {
    console.log("color variant Clicked!");
    if (price === null) return;
    if (price) setPrice(price);
  };

  return (
    <div>
      <AttrTitle>{attrs.attribute_name} :</AttrTitle>
      <AttrContainer>{namesOfAttrs}</AttrContainer>
    </div>
  );
};

export default ProductPageAttributes;
