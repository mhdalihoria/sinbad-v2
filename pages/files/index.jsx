import { Box, Grid, styled } from "@mui/material";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import EmptyFiles from "../../src/pages-sections/files/EmptyFiles";
import FileCard from "../../src/pages-sections/files/FileCard";
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
      {data.length === 0 ? (
        <EmptyFiles />
      ) : (
        <Grid container spacing={6} style={{ width: "100%", margin: "0 auto" }}>
          {data.map((entry, idx) => {
            return (
              <Grid item md={4} lg={3} key={`${entry.created_at}-${entry.name}-${entry.type}-${idx}`}>
                <FileCard
                  type={entry.document_type}
                  name={entry.name}
                  id={entry.id}
                  file={entry.file}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </PageContainer>
  );
};

export const getStaticProps = async (ctx) => {
  const requestOptions= {
    method: "GET",
    headers: {"X-localization": "ar"},
  }
  const url = "https://sinbad-store.com/api/v2/files"
  const everyFile = await useGetFetch(url, requestOptions)

  return {
    props: {
      allFiles: everyFile.data,
    },
  };
};

export default Files;
