import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid } from "@mui/material";

const Products = ({ allProducts }) => {
  const [products, setProducts] = useState([]);
  console.log(allProducts);
  const ProductCardElements = products.map((product, idx) => {
    return (
      // <div style={{ width: "300px", margin: "1rem" }} key={idx}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={product.id}
        // style={loading ? { opacity: "0.5" } : { opacity: "1" }}
      >
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
          isFuture={product.is_future}
        />
      </Grid>
    );
  });

  useEffect(() => {
    if (typeof allProducts.data.products !== "undefined") {
      setProducts(allProducts.data.products);
    }
  }, [products]);

  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        marginTop: "3rem",
        display: "flex",
      }}
    >
      <div style={{ flex: "1 1 25%" }}>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <h1>Products</h1>
          </Grid>
        </Grid>
      </div>
      <div style={{ flex: "1 1 75%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1>Products</h1>
          </Grid>
          {ProductCardElements}
        </Grid>
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
    props: { allProducts: allProducts.data },
  };
};

export default Products;
