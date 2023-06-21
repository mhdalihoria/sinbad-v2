import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import MainBlogCard from "../../src/pages-sections/blogs/MainBlogCard";
import BlogsCategories from "../../src/pages-sections/blogs/BlogsCategories";

// import allBlogs from "../../src/utils/__api__/blogsList";
// import allBlogCates from "../../src/utils/__api__/blogCategories";
import useGetFetch from "../../src/components/fetch/useGetFetch";

const BlogList = ({ allBlogsData, allBlogsCatesData }) => {
  return (
    <>
      <SEO title="Blogs" />
      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={9} xs={12}>
          {allBlogsData.data.map((blogInfo) => (
            <MainBlogCard key={blogInfo.id} {...blogInfo} />
          ))}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={3} xs={12}>
          <Card
            sx={{
              padding: 3,
            }}
          >
            <BlogsCategories allBlogsCatesData={allBlogsCatesData} />
            <Divider
              sx={{
                mb: 2,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
  };
  const getFetchBlogs = await useGetFetch(
    "https://sinbad-store.com/api/v2/blog",
    requestOptions
  );
  const getFetchBlogCates = await useGetFetch(
    "https://sinbad-store.com/api/v2/blog/categories",
    requestOptions
  );
  return {
    props: {
      allBlogsData: getFetchBlogs.data,
      allBlogsCatesData: getFetchBlogCates.data,
    },
  };
};

export default BlogList;
