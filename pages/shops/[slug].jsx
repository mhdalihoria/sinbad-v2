import React from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";

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
      ShopDetails {id}
      {/* <div>
        {typeof products !== "undefined" &&
          products.map((product) => (
            <ProductCard1 
            key={product.id} 
            id={product.id}
            categoryName={product.category_name}
            description={product.product_short_description}
            imgUrl={product.product_image}

            />
          ))}
      </div> */}
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
