import { Box, styled } from "@mui/material";
import allFiles from "../../src/utils/__api__/files";
import EmptyFiles from "../../src/pages-sections/files/EmptyFiles";

const PageContainer = styled(Box)({
  border: "1px solid #eaeaea",
  width: "80%",
  margin: "2rem auto",
  padding: "2rem",
})

const Files = ({ allFiles }) => {
  const {data} = allFiles.files
  return (
    <PageContainer>
    {data.length === 0 ? <EmptyFiles />: <p>something</p>}
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
