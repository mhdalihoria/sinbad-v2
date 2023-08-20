import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid } from "@mui/material";

const Products = ({ allProducts }) => {
  const [products, setProducts] = useState([]);
  const { filters } = allProducts.data;
  console.log(filters);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(null);

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

  const handleCheckboxChange = (state, stateSetter, id) => {
    // if (categoryFilter.includes(id)) {
    if (state.includes(id)) {
      stateSetter(state.filter((item) => item !== id));
    } else {
      stateSetter([...state, id]);
    }
  };

  const handleBrandChange = (brandId) => {
    setBrandFilter(brandId);
  };

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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h6>التسوق عبر</h6>
            <div>
              {filters.category.map((category) => (
                <div key={category.category_name}>
                  <input
                    type="checkbox"
                    id={category.category_name}
                    checked={categoryFilter.includes(category.id)}
                    onChange={(_) =>
                      handleCheckboxChange(
                        categoryFilter,
                        setCategoryFilter,
                        category.id
                      )
                    }
                  />
                  <label htmlFor={category.category_name}>
                    {category.category_name}
                  </label>
                </div>
              ))}
              <hr />
              {filters.brand.map((brand) => (
                <div key={brand.name}>
                  <input
                    type="checkbox"
                    id={brand.name}
                    checked={brand.id === brandFilter}
                    onChange={(_) => handleBrandChange(brand.id)}
                  />
                  <label htmlFor={brand.name}>{brand.name}</label>
                </div>
              ))}
            </div>
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
