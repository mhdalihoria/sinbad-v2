import { useState } from "react";
import { Box, ListItem, styled, Container } from "@mui/material";
import Setting from "components/Setting";
import Footer from "pages-sections/landing/Footer";
import Section1 from "pages-sections/landing/Section1";
import Section2 from "pages-sections/landing/Section2";
import Section3 from "pages-sections/landing/Section3";
import Section4 from "pages-sections/landing/Section4";
import Section6 from "pages-sections/landing/Section6";
import Section5 from "pages-sections/landing/Section5";
import Adverts from "../src/components/homepage/Adverts"
import Slider from "../src/components/homepage/Slider"
import Categories from "../src/components/homepage/Categories"
import Link from "next/link";


const IndexPage = () => {
  return (
    <Container maxWidth="xl">
      <Adverts />
      <Slider />
      <Categories />
    </Container>
  );
};
export default IndexPage;
