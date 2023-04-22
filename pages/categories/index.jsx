import React, { useEffect } from "react";
import allCategories from "../../src/utils/__api__/categories";
import AllCategoriesSection from "../../src/pages-sections/categories/AllCategoriesSection";
import useGetFetch from "../../src/components/fetch/useGetFetch";

const Categories = ({ allCategoriesData, ...rest }) => {

  return (
    <div>
      <h1>Categories</h1>
      <AllCategoriesSection products={allCategoriesData} />
    </div>
  );
};

export const getStaticProps = async () => {
  const requestOptions= {
    method: "GET",
    headers: {"X-localization": "ar"},
  }
  const url = "https://sinbad-store.com/api/v2/categories"
  const getFetch = await useGetFetch(url, requestOptions)

  return {
    props: {
      allCategoriesData: getFetch.data,
    },
  };
};

export default Categories;
