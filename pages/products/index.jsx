import { useEffect, useState } from "react";
import Image from "next/image";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { Grid, Pagination, styled, Button, Card } from "@mui/material";
import { useAppContext } from "../../src/contexts/AppContext";
import Loader from "../../src/components/loader-spinner/Loader";
import PageLoader from "../../src/components/loader-spinner/PageLoader";
import CardLoader from "../../src/components/loader-spinner/CardLoader";
import { useRouter } from "next/router";
import Logo from "../../public/assets/images/header/logo.jpg";

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

const LoaderOverlay = styled("div")(({ theme }) => ({
  // position: "absolute",
  // top: "0",
  // left: "0",
  // zIndex: "999",
  width: "100%",
  height: "300px",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "4rem",
}));

const Products = ({}) => {
  const { userToken, search, setSearch } = useAppContext();
  const router = useRouter();
  const { brands } = router.query;
  const [allProducts, setAllProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const { filters } = allProducts.data || {};
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState(() => (brands ? brands : 0));
  const [valuesFilter, setValuesFilter] = useState([]);
  const [price, setPrice] = useState({ id: 0, min: 0, max: 0 });
  const [withOffer, setWithOffer] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [showFilteredProducts, setShowFilteredProducts] = useState(false);
  const [paginationIndicator, setPaginationIndicator] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

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
        style={{ position: "relative" }}
      >
        {loading && <CardLoader />}
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
    if (
      typeof allProducts.data !== "undefined" &&
      typeof allProducts.data.products !== "undefined"
    ) {
      setProducts(allProducts.data.products);
      setPaginationData(allProducts.pagination);
    }
  }, [allProducts, products, paginationData]);

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
          search: search,
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
        `https://sinbad-store.com/api/v2/filter-products?page=${paginationIndicator}`,
        headers,
        body
      );
      const data = await response.data;
      console.log(data);

      setLoading(false);
      setFilteredProducts(data.data);
      if (
        categoryFilter.length > 0 ||
        brandFilter > 0 ||
        price.id > 0 ||
        valuesFilter.length > 0 ||
        withOffer !== 0 ||
        (search && search.length > 0)
      ) {
        setShowFilteredProducts(true);
      }
    };
    doFetch();
  }, [
    categoryFilter,
    brandFilter,
    price,
    valuesFilter,
    withOffer,
    paginationIndicator,
    search,
  ]);

  useEffect(() => {
    const doFetch = async () => {
      const response = await useGetFetch(
        `https://sinbad-store.com/api/v2/products?page=${paginationIndicator}`,
        {
          method: "GET",
          headers: { "X-localization": "ar" },
        }
      );

      const data = await response.data;

      setAllProducts(data);
    };

    doFetch();
  }, [paginationIndicator]);

  const handleCheckboxChange = (state, stateSetter, id) => {
    setLoading(true);
    if (state.includes(id)) {
      stateSetter(state.filter((item) => item !== id));
    } else {
      stateSetter([...state, id]);
    }
  };

  const handleSingleOfGroupCheckboxChange = (state, stateSetter, value) => {
    setLoading(true);
    if (state === value) {
      stateSetter(0);
    } else {
      stateSetter(value);
    }
  };

  const handlePriceChange = (id, min, max) => {
    setLoading(true);

    if (price.id === id) {
      setPrice({ id: 0, min: 0, max: 0 });
    } else {
      setPrice({ id: id, min: min, max: max });
    }
  };

  const changeHandler = (page) => {
    setPaginationIndicator(page);
    setLoading(true);
  };

  const handleResetFilter = () => {
    setCategoryFilter([]);
    setBrandFilter(0);
    setValuesFilter([]);
    setPrice({ id: 0, min: 0, max: 0 });
    setWithOffer(0);
    setSearch(null);
    setLoading(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader />
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
                  {typeof filters !== "undefined" &&
                    filters.category.map((category) => (
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
                  {typeof filters !== "undefined" &&
                    filters.brand.map((brand) => (
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
                {typeof filters !== "undefined" &&
                  filters.product_filters.map((filter) => {
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
                <FilterBlock>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResetFilter}
                  >
                    Reset Filters
                  </Button>
                </FilterBlock>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ flex: "1 1 75%" }}>
          {showFilteredProducts ? (
            <Grid container spacing={2}>
              {filteredProducts.data.products.length > 0 ? (
                filteredProducts.data.products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product.id}
                    style={{ position: "relative" }} //position relative is needed to make the card loader work
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
                ))
              ) : (
                <NoProductsAlert />
              )}
              {filteredProducts.data.products.length > 0 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  <Pagination
                    count={filteredProducts.pagination.last_page}
                    color="primary"
                    onChange={(event, page) => changeHandler(page)}
                  />
                </div>
              )}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <h1>Products</h1>
              </Grid>
              {ProductCardElements}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "2rem",
                  marginTop: "4rem",
                }}
              >
                {paginationData && (
                  <Pagination
                    count={paginationData.last_page}
                    color="primary"
                    onChange={(event, page) => changeHandler(page)}
                  />
                )}
              </div>
            </Grid>
          )}
        </div>
      </div>
    </>
  );
};

const NoProductsAlert = () => {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "1.25rem",
        marginTop: "1rem",
        padding: "3rem",
      }}
    >
      <Image src={Logo} width={160} height={110} />
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: 0 }}>Oops, No Products Here</p>

        <p style={{ fontSize: "1rem", marginTop: 0 }}>
          Try different search words or filters
        </p>
      </div>
    </Card>
  );
};

export const getStaticProps = async ({ locale, params }) => {
  // const brand = params?.brand;
  return {
    props: {
      // brand
    },
    // props: { ...(await serverSideTranslations(locale, ["common"])) },
  };
};

export default Products;
