import React from "react";
import allCategories from "../../src/utils/__api__/categories";

const CategoryPage = ({ slug }) => {
  return <h1>{slug}</h1>;
};

export const getStaticPaths = async () => {
  const allParams = await allCategories.data.map((product) => {
    return {
      params: { slug: product.category_slug },
    };
  });

  return {
    paths: allParams,
    fallback: true,
  };
};

export const getStaticProps = (ctx) => {
  const slugValue = ctx.params.slug;

  return {
    props: {
      slug: slugValue,
    },
  };
};

export default CategoryPage;
