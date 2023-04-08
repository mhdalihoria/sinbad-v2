import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
}));

const BlogBody = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
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
        width={240}
        height={240}
        style={{ objectFit: "cover" }}
        display="block"
        src={"https://sinbad-store.com" + image}
      />

      <BlogBody>
        <div>{category_name}</div>
        <div>{category_name}</div>
        <div>{category_name}</div>
      </BlogBody>
    </Wrapper>
  );
};
export default MainBlogCard;
