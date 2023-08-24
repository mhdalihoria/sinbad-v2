import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid, styled } from "@mui/material";
import { useAppContext } from "../../src/contexts/AppContext";

const FilterBlock = styled("div")(({ theme }) => ({
  paddingRight: "10px",
  margin: "1rem 0",

  "& h5": {
    marginBottom: ".5em",
    marginTop: ".5em",
    color: theme.palette.primary.main,
  },

  "& div": {
    fontSize: ".7rem",
    padding: ".125rem 0",
  },
  "& div input[type='checkbox']": {
    accentColor: theme.palette.primary.main,
  },
}));

const Products = ({ allProducts }) => {
  const { userToken } = useAppContext();
  const [products, setProducts] = useState([]);
  const { filters } = allProducts.data;
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState(0);
  const [valuesFilter, setValuesFilter] = useState([]);
  const [price, setPrice] = useState({ id: 0, min: 0, max: 0 });
  const [withOffer, setWithOffer] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(null);

  console.log(filters);
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

  useEffect(() => {
    const doFetch = async () => {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        

        // Making sure we're filtering out falsy values before doing the fetch
        ...Object.entries({ 
          category: categoryFilter,
          brand: brandFilter,
          min_price: price.min,
          max_price: price.max,
          with_offer: withOffer,
          values: valuesFilter,
          // search: "بطارية",
          // shop: [4],
        }).reduce((acc, [key, value]) => {
          if (Array.isArray(value) && value.length === 0) {
            return acc;
          }
          if (value) {
            acc[key] = value;
          }
          return acc;
        }, {}),
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/filter-products",
        headers,
        body
      );
      // const data = await response.json();

      console.log(response);
      // setFilteredProducts(data);
    };
    doFetch();
  }, [categoryFilter, brandFilter, price, valuesFilter, withOffer]);

  const handleCheckboxChange = (state, stateSetter, id) => {
    if (state.includes(id)) {
      stateSetter(state.filter((item) => item !== id));
    } else {
      stateSetter([...state, id]);
    }
  };

  const handleSingleOfGroupCheckboxChange = (state, stateSetter, value) => {
    if (state === value) {
      stateSetter(0);
    } else {
      stateSetter(value);
    }
  };

  const handlePriceChange = (id, min, max) => {
    if (price.id === id) {
      setPrice({ id: 0, min: 0, max: 0 });
    } else {
      setPrice({ id: id, min: min, max: max });
    }
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
            <div>
              <FilterBlock>
                <h5>التسوق عبر</h5>
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
              </FilterBlock>
              <FilterBlock>
                <h5>الماركات</h5>
                {filters.brand.map((brand) => (
                  <div key={brand.name}>
                    <input
                      type="checkbox"
                      id={brand.name}
                      checked={brand.id === brandFilter}
                      onChange={(_) =>
                        handleSingleOfGroupCheckboxChange(
                          brandFilter,
                          setBrandFilter,
                          brand.id
                        )
                      }
                    />
                    <label htmlFor={brand.name}>{brand.name}</label>
                  </div>
                ))}
              </FilterBlock>
              <FilterBlock>
                <h5>السعر</h5>
                <div>
                  <input
                    type="checkbox"
                    id={"withoffer"}
                    checked={price.id === 1}
                    onChange={(_) => handlePriceChange(1, 0, 500000)}
                  />
                  <label htmlFor={"withoffer"}>اقل من نصف مليون</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={"withoffer"}
                    checked={price.id === 2}
                    onChange={(_) => handlePriceChange(2, 500000, 1500000)}
                  />
                  <label htmlFor={"withoffer"}>500,000 - 1,500,000</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={"withoffer"}
                    checked={price.id === 3}
                    onChange={(_) => handlePriceChange(3, 1500000, 3000000)}
                  />
                  <label htmlFor={"withoffer"}>1,500,000 - 3,000,000</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={"withoffer"}
                    checked={price.id === 4}
                    onChange={(_) =>
                      handlePriceChange(4, 3000000, 1000000000000)
                    }
                  />
                  <label htmlFor={"withoffer"}>اكثر من 3 مليون</label>
                </div>
              </FilterBlock>
              <FilterBlock>
                <h5>مع عرض</h5>
                <div>
                  <input
                    type="checkbox"
                    id={"withoffer"}
                    checked={withOffer === 1 ? true : false}
                    onChange={(_) =>
                      handleSingleOfGroupCheckboxChange(
                        withOffer,
                        setWithOffer,
                        withOffer === 1 ? 0 : 1
                      )
                    }
                  />
                  <label htmlFor={"withoffer"}>مع عرض</label>
                </div>
              </FilterBlock>
              {filters.product_filters.map((filter) => {
                return (
                  <FilterBlock key={filter.title}>
                    <h5>{filter.title}</h5>
                    {filter.filter_values.map((filterValue) => (
                      <div key={filterValue.id}>
                        <input
                          type="checkbox"
                          id={filterValue.id}
                          checked={valuesFilter.includes(filterValue.id)}
                          onChange={(_) =>
                            handleCheckboxChange(
                              valuesFilter,
                              setValuesFilter,
                              filterValue.id
                            )
                          }
                        />
                        <label htmlFor={filterValue.id}>
                          {filterValue.value}
                        </label>
                      </div>
                    ))}
                  </FilterBlock>
                );
              })}
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
