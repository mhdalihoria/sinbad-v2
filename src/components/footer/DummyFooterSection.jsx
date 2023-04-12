import { Box, styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));
const DummyFooterSection = () => {
  return (
    <Box mr={2} mb={4}>
      <Box
        fontSize="18px"
        fontWeight="600"
        mb={1.5}
        lineHeight="1"
        color="white"
      >
        <i className="fa-solid fa-car"></i> مركبات{" "}
        <span style={{ fontSize: ".6rem" }}>(1112)</span>
      </Box>

      {/* subLink */}
      <div>
        <Link href="/" passHref>
          <StyledLink>{"سيارات"}</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>{"قطع سيارات"}</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>{"دراجات هوائية"}</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>{"دراجات نارية"}</StyledLink>
        </Link>
        <Link href="/" passHref>
          <StyledLink>{"سيارات للأيجار"}</StyledLink>
        </Link>
      </div>
    </Box>
  );
};

export default DummyFooterSection;
