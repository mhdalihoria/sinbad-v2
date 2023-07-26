import React from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid, styled } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const IntroContainer = styled("div")({
  width: "80%",
  margin: "3rem auto",
});

const ContactContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",

  "& .noContacts": {
    textAlign: "center",
    paddingTop: "115px",
  },
});

const CategoryContainer = styled("div") ({
  "& .categoryTitle": {
    fontSize: "1rem", 
    color: "red"
  },

  "& ul": {
    marginTop: "1em"
  },

  "& ul li": {
    margin: "1em 0",
    transition: "color .7s ease",
    cursor: "pointer"
  },

  "& ul li:hover": {
    color: "red"
  }
})

const CardsContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
});

const ShopDetails = ({ id, shopData }) => {
  const {
    products,
    profile_setting: profileSetting,
    contacts,
    featuredProducts,
    categories,
    offer,
    mazad,
  } = shopData;
  console.log(shopData);
  return (
    <div>
      <IntroContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div
              style={{
                width: "100%",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: " center",
              }}
            >
              <Image
                src={`https://sinbad-store.com${profileSetting.logo}`}
                width={200}
                height={200}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            {contacts.length > 0 ? (
              "something"
            ) : (
              <ContactContainer>
                <h1 className="noContacts">
                  {profileSetting.company_name || "placeholder Title"}
                </h1>
              </ContactContainer>
            )}
          </Grid>
        </Grid>
      </IntroContainer>
      <CardsContainer>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            sm={categories.length > 0 ? 9 : 12}
            md={categories.length > 0 ? 9 : 12}
          >
            {typeof products !== "undefined" && (
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={categories.length > 0 ? 4 : 3}
                    key={product.id}
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
                      offer={offer}
                      isFuture={product.is_future}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          {categories.length > 0 && (
            <Grid item xs={12} sm={3} md={3}>
              <CategoryContainer>
                <h1 className="categoryTitle">تصنيفات المتاجر</h1>
                <ul>
                  {categories.map(category => <Link href={category.category_url} className="categoryLink"><li>{category.category_name}</li></Link>)}
                </ul>
              </CategoryContainer>
            </Grid>
          )}
        </Grid>
      </CardsContainer>
    </div>
  );
};

export const getStaticPaths = async () => {
  const allShops = await useGetFetch("https://sinbad-store.com/api/v2/shops", {
    method: "GET",
    headers: { "X-localization": "ar" },
  });

  const shopsParams = allShops.data.data.shops.map((shop) => {
    return { params: { slug: shop.slug.toString() } };
  });
  return {
    paths: shopsParams,
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const params = ctx.params.slug;
  const shopInfo = await useGetFetch(
    `https://sinbad-store.com/api/v2/shop/${params}`,
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );

  return {
    props: {
      id: params,
      shopData: shopInfo.data,
    },
  };
};
export default ShopDetails;
