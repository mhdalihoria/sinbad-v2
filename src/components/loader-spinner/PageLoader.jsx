import { styled } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import pageLoader from "../../../public/assets/images/loader/pageLoader.gif";

const PageLoaderStyles = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: " center",
  alignItems: " center",
  zIndex: "9999",
  color: "white",
  fontSize: "10px",
});

const PageLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      console.log("cleared");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <PageLoaderStyles>
      <Image src={pageLoader} width={200} height={200}/>
    </PageLoaderStyles>
  ) : null;
};

export default PageLoader;
