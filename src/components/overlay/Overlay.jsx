import { styled } from "@mui/material";
import Loader from "components/loader-spinner/Loader";
import React, { useEffect, useState } from "react";


const OverlayLayer = styled("div")({
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
  fontSize: "24px",
});

const Overlay = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
      console.log("cleared");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showOverlay ? <OverlayLayer><Loader size={20} loading={showOverlay}/></OverlayLayer> : null;
};

export default Overlay;
