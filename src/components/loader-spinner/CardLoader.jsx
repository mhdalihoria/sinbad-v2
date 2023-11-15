import React from "react";
import cardLoader from "../../../public/assets/images/loader/cardLoader.gif";
import Image from "next/image";
import { styled } from "@mui/material";

const CardLoaderStyles = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, .9)",
  display: "flex",
  justifyContent: " center",
  alignItems: " center",
  zIndex: "9999",
  color: "white",
  fontSize: "10px",
});

const CardLoader = () => {
  return (
    <CardLoaderStyles>
      <Image src={cardLoader} width={80} height={80}/>
    </CardLoaderStyles>
  );
};

export default CardLoader;
