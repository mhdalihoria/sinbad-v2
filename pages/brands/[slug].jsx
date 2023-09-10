import React, { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid, Pagination, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Loader from "../../src/components/loader-spinner/Loader";
import { useAppContext } from "../../src/contexts/AppContext";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import paginateArray from "../../src/utils/paginateArray";
import ShopIntroCard from "components/shop/ShopIntroCard";
import useWindowSize from "../../src/hooks/useWindowSize";
import Carousel from "../../src/components/carousel/Carousel";
import { carouselStyled } from "../../src/components/carousel/styles";

const CardsContainer = styled("div")({
  width: "80%",
  margin: "4rem auto",

  // marginBottom: "4rem",
});

const BrandDetails = ({ id, brandData }) => {
  console.log(brandData);

  return (
    <div>
      <CardsContainer>
        <Grid container spacing={2}>
          {brandData.products.length > 0 && <h1>Title here</h1>}
          {brandData.products.length > 0 ? (
            brandData.products.map((product) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  key={product.id}
                  // style={loading ? { opacity: "0.5" } : { opacity: "1" }}
                >
                  <ProductCard1
                    id={product.id}
                    slug={product.id}
                    title={product.product_name}
                    price={product.product_price}
                    rating={product.rating}
                    imgUrl={`${product.thumb}`}
                    salePrice={product.sale_price}
                    description={product.product_description?.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    )}
                    categoryName={product.category_name}
                    isNew={product.is_new}
                    isExternal={product.is_external}
                    shopName={product.shop_name}
                    hoverEffect
                    // isFavorited={
                    //   favItemsLocalStorage.length > 0 &&
                    //   favItemsLocalStorage.find(
                    //     (favItem) => favItem.id === item.id
                    //   ) ?
                    //   true : false
                    // }
                    isFuture={product.is_future}
                  />
                </Grid>
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "red",
              }}
            >
              No Products Here, Try Again Later
            </div>
          )}
        </Grid>
      </CardsContainer>
    </div>
  );
};

export const getStaticPaths = async () => {
  const allBrands = await useGetFetch(
    "https://sinbad-store.com/api/v2/brands",
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );

  const shopsParams = allBrands.data.data.brands.map((shop) => {
    return { params: { slug: shop.slug.toString() } };
  });
  return {
    paths: shopsParams,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const params = ctx.params.slug;
  const brandInfo = await useGetFetch(
    `https://sinbad-store.com/api/v2/brand-products/${params}`,
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );

  return {
    props: {
      id: params,
      brandData: brandInfo.data,
    },
  };
};
export default BrandDetails;

// if (typeof shopData === "undefined" || shopData === null) {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "400px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontSize: "1.4rem",
//       }}
//     >
//       No Items here for now, please try again later
//     </div>
//   );
// }

//   const { state, orderData, setOrderData, userToken } = useAppContext();
//   const width = useWindowSize();
//   const [visibleSlides, setVisibleSlides] = useState(4);
//   useEffect(() => {
//     if (width < 426) setVisibleSlides(1);
//     else if (width < 650) setVisibleSlides(2);
//     else if (width < 1024) setVisibleSlides(3);
//     else if (width < 1200) setVisibleSlides(4);
//     else setVisibleSlides(5);
//   }, [width]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCategoryProducts, setSelectedCategoryProducts] =
//     useState(null);
//   const [
//     selectedCategoryProductsPaginationData,
//     setSelectedCategoryProductsPaginationData,
//   ] = useState(null);
//   const [paginationIndicator, setPaginationIndicator] = useState(1);
//   const [loading, setLoading] = useState(false);

// console.log(BrandData)

// console.log("selectedCategoryProducts", selectedCategoryProducts)
// console.log("selectedCategoryProductsPaginationData", selectedCategoryProductsPaginationData)

// if (typeof shopData === "undefined") {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Loader size={25} loading={typeof shopData === "undefined"} />
//     </div>
//   );
// }

// useEffect(() => {
//   const doFetch = async () => {
//     const headers = {
//       "X-localization": "ar",
//       Authorization: `Bearer ${userToken}`,
//       "Content-Type": "application/json",
//     };
//     const body = JSON.stringify({
//       category: [selectedCategory],
//       shop: [id],
//     });

//     const response = await usePostFetch(
//       `https://sinbad-store.com/api/v2/filter-products?page=${paginationIndicator}`,
//       headers,
//       body
//     );
//     const data = response.data.data.data.products;
//     const pagination = response.data.data.pagination;

//     setSelectedCategoryProducts(data);
//     setSelectedCategoryProductsPaginationData(pagination);
//     setLoading(false);
//   };
//   doFetch();
// }, [selectedCategory, paginationIndicator]);

// const changeHandler = (page) => {
//   setPaginationIndicator(page);
//   setLoading(true);
// };
