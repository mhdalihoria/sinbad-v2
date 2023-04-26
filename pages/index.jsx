import { useState } from "react";
import { Box, ListItem, styled } from "@mui/material";
import Setting from "components/Setting";
import Footer from "pages-sections/landing/Footer";
import Section1 from "pages-sections/landing/Section1";
import Section2 from "pages-sections/landing/Section2";
import Section3 from "pages-sections/landing/Section3";
import Section4 from "pages-sections/landing/Section4";
import Section6 from "pages-sections/landing/Section6";
import Section5 from "pages-sections/landing/Section5";
import Link from "next/link";

const LI = styled(ListItem)({
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    color: "red",
  },
});

const IndexPage = () => {
  const [filterDemo, setFilterDemo] = useState("");
  return (
    <Box id="top" overflow="hidden" bgcolor="background.paper">
      <div style={{ width: "200px", margin: "0 auto" }}>
        <h1>-*-Site Pages-*-</h1>
        <ol>
          <Link href={"/files"}>
            <LI>Files to Download</LI>
          </Link>
          <Link href={"/blogs"}>
            <LI>News</LI>
          </Link>
          <Link href={"/blogs/9"}>
            <LI>News Article</LI>
          </Link>

          <Link href={"/jobs"}>
            <LI>Jobs</LI>
          </Link>
          <Link href={"/categories"}>
            <LI>Categories</LI>
          </Link>
          <Link href={"/pos"}>
            <LI>Points of Sale</LI>
          </Link>
          <Link href={"/carrier"}>
            <LI>Delivery Locations</LI>
          </Link>
          <Link href={"/login"}>
            <LI>Login</LI>
          </Link>
          <Link href={"/signup"}>
            <LI>Signup</LI>
          </Link>
        </ol>
      </div>

      {/* OLD INDEX PAGE */}
      {/* <Section1 />
      <Section6 setFilterDemo={setFilterDemo} />
      <Section2 />
      <Section5 />
      <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} />
      <Section4 />
      <Footer />
      <Setting /> */}
    </Box>
  );
};
export default IndexPage;
