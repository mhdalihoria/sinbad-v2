import { Box, styled } from "@mui/material";
import Map from "../src/pages-sections/pos/Map";
import BasicTable from "../src/pages-sections/pos/Table";
import CustomFooter from "../src/pages-sections/footer/CustomFooter"

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
    <PosConttentContainer>
      <BasicTable posData={posData} />
      <Map posData={posData} />
    </PosConttentContainer>
    <CustomFooter />
    </>
  );
};

export const getStaticProps = async () => {
  // --------------------------------------------
  //  FETCH OPTOINS // REQUEST HEADERS
  // --------------------------------------------
  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // --------------------------------------------
  //  FETCH OPTOINS // REQUEST HEADERS
  // --------------------------------------------

  const posData = await fetch(
    "https://sinbad-store.com/api/v2/pos",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return {
    props: { posData: posData.data },
  };
};

export default Pos;
