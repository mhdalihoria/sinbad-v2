import { Box, Grid } from "@mui/material";
import AppStore from "components/AppStore";
import { Paragraph } from "components/Typography";
import Link from "next/link";
import React from "react";
import Image from "components/BazaarImage";

const DummyFooterLower = () => {
  return (
    // <Grid item lg={9} md={9} sm={8} xs={12}> </Grid>
    <>
      {/* <Link href="/">
      <a>
        <Image mb={2.5} src="/assets/images/logo.svg" alt="logo" />
      </a>
    </Link> */}

      <Box maxWidth={400}>
        <Paragraph mb={2.5} color="grey.500">
          <i className="fa-solid fa-location-dot fa-2xl"></i> دمشق -السبع بحرات
          - شارع 29 ايار - اول دخل بعد بنك بيمو - مواجه المؤسسة الاجتماعية
          العسكرية - فوق مفروشات القطان ط1
        </Paragraph>
      </Box>

      <Box maxWidth={400} fontSize={"2.5rem"} color={"white"}>
        <span>
          <i className="fa-solid fa-phone"></i> 011-999
        </span>
      </Box>

      {/* <AppStore /> */}
    </>
  );
};

export default DummyFooterLower;
