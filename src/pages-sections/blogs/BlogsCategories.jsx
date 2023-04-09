import { Box, Card, styled } from "@mui/material";
import Link from "next/link";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "@media only screen and (max-width: 625px)": {
    flexWrap: "wrap",
    
  },
}));

const CateTitle = styled(Box)(({ theme }) => ({
  fontSize: "1.2rem",
  marginBottom: ".5em",
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

const CateLink = styled(Box)(({ theme }) => ({
  padding: ".7em 0",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

// =========================================================

// =========================================================

const BlogsCategories = ({ allBlogsCatesData }) => {
  return (
    <Wrapper>
      <CateTitle className="section-title">تصنيفات المقالات</CateTitle>
      {allBlogsCatesData.map((blogCate) => {
        // "Cate" is short for "category"
        return (
          <Link href={"/blogs"} className="cate-name">
            <CateLink>
              <i className="fa-solid fa-circle fa-2xs"></i> {blogCate.name}
            </CateLink>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default BlogsCategories;
