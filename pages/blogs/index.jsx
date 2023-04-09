import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import MainBlogCard from "../../src/pages-sections/blogs/MainBlogCard";

import allBlogs from "../../src/utils/__api__/blogsList";

const BlogList = ({ allBlogsData }) => {
  return (
    <>
      <SEO title="Blogs" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {allBlogsData.map((blogInfo) => (
            <MainBlogCard key={blogInfo.id} {...blogInfo} />
          ))}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              padding: 3,
            }}
          >
            <Divider
              sx={{
                mb: 2,
              }}
            />

            <FlexBox alignItems="center" columnGap={1} mb={2}>
              {/* <Span fontWeight="600">Additional Comments</Span>

              <Span
                p="6px 10px"
                fontSize={12}
                lineHeight="1"
                borderRadius="3px"
                color="primary.main"
                bgcolor="primary.light"
              >
                Note
              </Span> */}
            </FlexBox>

            {/* <Link href="/checkout" passHref legacyBehavior>
              <Button variant="contained" color="primary" fullWidth>
                Checkout Now
              </Button>
            </Link> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticProps = (ctx) => {
  const allBlogsData = allBlogs.data;
  return {
    props: { allBlogsData },
  };
};

export default BlogList;
