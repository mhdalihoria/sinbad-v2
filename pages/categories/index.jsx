import React from "react";
import allCategories from "../../src/utils/__api__/categories";
import AllCategoriesSection from "../../src/pages-sections/categories/AllCategoriesSection";

const Categories = ({ allCategoriesData, ...rest }) => {
  return (
    <div>
      <h1>Categories</h1>
      <AllCategoriesSection products={allCategoriesData} />
    </div>
  );
};

export const getStaticProps = async () => {
  const allCategoriesData = await allCategories.data;

  return {
    props: {
      allCategoriesData,
    },
  };
};

export default Categories;
