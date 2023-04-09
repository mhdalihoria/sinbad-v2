import allBlogs from "../../src/utils/__api__/blogsList";
import getBlogPost from "../../src/utils/__api__/blogSinglePost";

const SingleBlogPage = ({ id, postData }) => {
  console.log(postData);
  return <div>{id}</div>;
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

  const currentId = ctx.params.id;
  const postObj = await fetch(
    `http://sinbad-store.com/api/v2/blog/${currentId}`,
    requestOptions
  )
    .then((res) => res.json())
    .catch((error) => console.log("error", error));

  return {
    props: {
      id: currentId,
      postData: postObj,
    },
  };
};

export default SingleBlogPage;
