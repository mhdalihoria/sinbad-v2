import Link from "next/link";
import { Box, Card, styled } from "@mui/material";
import Image from "components/BazaarImage";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "relative",
  borderRadius: "10px",
  margin: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 625px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
}));

const BlogInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  marginLeft: "1.5rem",
  padding: "0 1rem",
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 625px)": {
    flexWrap: "wrap",
    height: "370px",
    padding: "0 .0rem",
  },
}));

const BlogCardTitle = styled(Box)({
  "& h1": {
    fontSize: "1.5rem",
  },
  "@media only screen and (max-width: 625px)": {
    "& h1": {
      fontSize: "1rem",
    },
  },
});
const BlogPostMetaData = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  overflow: "hidden",
  "& span": {
    padding: "0 .8rem 0 0 ",
  },
  "& span i": {
    paddingRight: ".25rem",
  },
});
const BlogDesc = styled(Box)(({ theme }) => ({
  marginTop: "1.7rem",
  "& span": {
    color: theme.palette.primary.main,
    cursor: "pointer",
    padding: ".2rem",

  },
}));

// =========================================================

// =========================================================

const MainBlogCard = (props) => {
  const {
    id,
    category_name,
    title,
    image,
    description,
    short_description,
    author_name,
    created_date,
    view_count,
  } = props;

  return (
    <Wrapper>
      <Image
        alt={category_name}
        width={280}
        height={280}
        style={{ objectFit: "cover" }}
        display="block"
        src={"https://sinbad-store.com" + image}
      />

      {/* <div>{short_description?.replace(/(<([^>]+)>)/ig, '')}</div> */}

      <BlogInfo>
        <BlogCardTitle>
          <h1>{title}</h1>
        </BlogCardTitle>
        <BlogPostMetaData>
          {author_name && (
            <span>
              <i className="fa-solid fa-user"></i> {author_name}
            </span>
          )}
          {category_name && (
            <span>
              <i className="fa-solid fa-folder"></i> {category_name}
            </span>
          )}
          {view_count && (
            <span>
              <i className="fa-solid fa-eye"></i>
              {view_count}
            </span>
          )}
          {created_date && (
            <span>
              <i className="fa-regular fa-calendar-days"></i>
              {created_date}
            </span>
          )}
        </BlogPostMetaData>
        <BlogDesc>
          {(description ?? short_description).replace(/(<([^>]+)>)/gi, "").slice(0, 200)}
          <Link href={"/"}>
            <span>...المزيد</span>
          </Link>
        </BlogDesc>
      </BlogInfo>
    </Wrapper>
  );
};
export default MainBlogCard;
