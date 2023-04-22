import { Box, styled } from "@mui/material";
import Map from "../src/pages-sections/pos/Map";
import BasicTable from "../src/pages-sections/pos/Table";
import CustomFooter from "../src/pages-sections/footer/CustomFooter";
import PageHeader from "../src/pages-sections/header/PageHeader";
import useGetFetch from "../src/components/fetch/useGetFetch";

const PosConttentContainer = styled(Box)({
  width: "90%",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const Pos = ({ posData }) => {
  return (
    <>
      <PageHeader />
      <PosConttentContainer>
        <BasicTable posData={posData} />
        <Map posData={posData} />
      </PosConttentContainer>
      <CustomFooter />
    </>
  );
};

export const getStaticProps = async () => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
  };

  const posData = await useGetFetch(
    "https://sinbad-store.com/api/v2/pos",
    requestOptions
  );
  return {
    props: { posData: posData.data },
  };
};

export default Pos;
