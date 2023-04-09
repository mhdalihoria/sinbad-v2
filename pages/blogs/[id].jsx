import { Box, Card, styled } from "@mui/material";
import Image from "next/image";
import allBlogs from "../../src/utils/__api__/blogsList";
// import getBlogPost from "../../src/utils/__api__/blogSinglePost";

const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "1.5rem",
  padding: "1rem",
  "@media only screen and (max-width: 625px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
}));

const BlogTitle = styled(Box)({
  fontSize: "1.5rem",
  margin: ".5em 0 1em ",
});


const BlogPostMetaData = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  margin: "1em 0",
  "& span": {
    padding: "0 .8rem 0 0 ",
  },
  "& span i": {
    paddingRight: ".25rem",
  },
});

const BlogDesc = styled(Box)(({ theme }) => ({
  marginTop: "1.7rem",
  fontSize: "1rem",
  "@media only screen and (max-width: 625px)": {
    fontSize: ".8rem"
  },
}));
// =========================================================

// =========================================================

const SingleBlogPage = ({ urlId, postData }) => {
  const {
    id,
    category_id,
    category_name,
    slug,
    title,
    description,
    meta_keywords,
    author_name,
    view_count,
    image,
    created_date,
  } = postData;
  return (
    <Wrapper>
      <BlogTitle>{title}</BlogTitle>
      <Image
          src={`https://sinbad-store.com${image}`}
          height={"400"}
          width={"100%"}
          objectFit="cover"
        />
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
      <BlogDesc>{description.replace(/(<([^>]+)>)/gi, "")}</BlogDesc>
    </Wrapper>
  );
};

export const getStaticPaths = (ctx) => {
  const allBlogIDs = allBlogs.data.map((blog) => ({
    params: { id: blog.id.toString() },
  }));

  return {
    paths: allBlogIDs,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  // -----------------------------------
  // Fetch Headers
  // -----------------------------------
  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // -----------------------------------
  // Fetch Headers
  // -----------------------------------

  const urlId = ctx.params.id;
  const postObj = await fetch(
    `http://sinbad-store.com/api/v2/blog/${urlId}`,
    requestOptions
  )
    .then((res) => res.json())
    .catch((error) => console.log("error", error));

  return {
    props: {
      urlId,
      postData: postObj.data,
    },
  };
};

export default SingleBlogPage;
