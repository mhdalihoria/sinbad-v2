import allBlogs from "../../src/utils/__api__/blogsList";
import blogPost from "../../src/utils/__api__/blogSinglePost";

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

export const getStaticProps = (ctx) => {
  const currentId = ctx.params.id;
  const postObj = blogPost;

  return {
    props: {
      id: currentId,
      postData: postObj,
    },
  };
};

export default SingleBlogPage;
