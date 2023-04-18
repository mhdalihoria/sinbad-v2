import { Box, Grid, styled } from "@mui/material";
import allFiles from "../../src/utils/__api__/files";
import EmptyFiles from "../../src/pages-sections/files/EmptyFiles";
import FileCard from "../../src/pages-sections/files/FileCard";
import Doc from "../../public/assets/images/files/doc.png"
import Driver from "../../public/assets/images/files/driver.png"
import Programs from "../../public/assets/images/files/programs.png"

const PageContainer = styled(Box)({
  border: "1px solid #eaeaea",
  width: "80%",
  margin: "2rem auto",
  padding: "2rem",
});

const Files = ({ allFiles }) => {
  const { data } = allFiles.files;
  return (
    <PageContainer>
      {/* {data.length === 0 ? <EmptyFiles /> : <p>something</p>} */}
      <Grid container spacing={6} style={{width: "100%", margin: "0 auto"}} >
        <Grid item md={4} lg={3}><FileCard imgUrl={Doc.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Driver.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Programs.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Doc.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Programs.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Doc.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Driver.src}/></Grid>
        <Grid item md={4} lg={3}><FileCard imgUrl={Programs.src}/></Grid>
      </Grid>
    </PageContainer>
  );
};

export const getStaticProps = async (ctx) => {
  const everyFile = await allFiles;

  return {
    props: {
      allFiles: everyFile.data,
    },
  };
};

export default Files;
