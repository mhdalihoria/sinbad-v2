import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid } from "@mui/material";

const Products = ({ allProducts }) => {
  const [products, setProducts] = useState([]);

  const ProductCardElements = products.map((product, idx) => {
    return (
      <div style={{ width: "300px", margin: "1rem" }} key={idx}>
        <ProductCard1
          id={product.id}
          slug={product.id}
          title={product.product_name}
          price={product.product_price}
          // rating={product.rating}
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
        />
      </div>
    );
  });

  useEffect(() => {
    if (typeof allProducts.data.products !== "undefined") {
      setProducts(allProducts.data.products);
    }
  }, [products]);

  return (
    <div>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {ProductCardElements}
      </div>
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  const allProducts = await useGetFetch(
    "https://sinbad-store.com/api/v2/products",
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );
  return {
    props: { allProducts: allProducts },
  };
};

export default Products;
