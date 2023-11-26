import MainHeader from "pages-sections/header/MainHeader";
import CustomFooter from "pages-sections/footer/CustomFooter";
import React, { useMemo } from "react";
import { Box } from "@mui/material";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: 1,
};

const MainLayout = ({ children }) => {
  const memoizedHeader = useMemo(() => <MainHeader />, []);
  return (
    <Box sx={containerStyle}>
      {memoizedHeader}
      <Box sx={contentStyle}>{children}</Box>
      <CustomFooter />
    </Box>
  );
};

export default MainLayout;
