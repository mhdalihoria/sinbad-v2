import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Container,
  styled,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import CreateIcon from "@mui/icons-material/Create";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { nanoid } from "nanoid";
import usePostFetch from "../../src/components/fetch/usePostFetch";
import { useAppContext } from "../../src/contexts/AppContext";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import NoProductsAlert from "../../src/components/NoProductsAlert";
//------------------------------------------------------
//------------------------------------------------------

const FilterBlock = styled("div")(({ theme }) => ({
  paddingRight: "10px",
  margin: "1rem 0",

  "& h2": {
    marginBottom: ".5em",
    marginTop: ".5em",
    color: theme.palette.primary.main,
  },

  "& div": {
    fontSize: "1rem",
    padding: ".125em 0",
  },
  "& div input[type='checkbox']": {
    accentColor: theme.palette.primary.main,
  },
}));

const steps = ["", "", "", ""];

//------------------------------------------------------
//------------------------------------------------------

const MyGift = () => {
  const { userToken } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({ min: "0", max: "500000" });

  console.log(price);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCheckboxChange = (state, stateSetter, id) => {
    // setLoading(true);
    if (state.includes(id)) {
      stateSetter(state.filter((item) => item !== id));
    } else {
      stateSetter([...state, id]);
    }
  };

  return (
    <Box sx={{ width: "100%", margin: "4rem 0" }}>
      <Container maxWidth={"md"}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption"></Typography>;
            }

            return (
              <Step key={nanoid()} {...stepProps}>
                <StepLabel>{}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep + 1 === 1 && (
              <StepOne
                values={values}
                setValues={setValues}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
            {activeStep + 1 === 2 && (
              <StepTwo
                categories={categories}
                setCategories={setCategories}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
            {activeStep + 1 === 3 && (
              <StepThree price={price} setPrice={setPrice} />
            )}
            {activeStep + 1 === 4 && (
              <StepFour
                price={price}
                categories={categories}
                values={values}
                userToken={userToken}
              />
            )}
            {activeStep + 1 !== 4 && (
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === 2 ? "Finish" : "Next"}
                </Button>
              </Box>
            )}
          </React.Fragment>
        )}
      </Container>
    </Box>
  );
};

const StepOne = ({ values, setValues, handleCheckboxChange }) => {
  // VALUES STEP
  const [categoryFilters, setCategoryFilters] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "X-localization": "ar" },
    };
    const getCategoryFilters = async () => {
      const response = await useGetFetch(
        "https://sinbad-store.com/api/v2/products",
        requestOptions
      );
      const filters = await response.data.data.filters;
      const { product_filters } = await filters;

      setCategoryFilters(product_filters);
    };

    getCategoryFilters();
  }, []);

  return (
    categoryFilters &&
    categoryFilters.map((filter) => {
      return (
        <FilterBlock key={filter.title}>
          <h2>{filter.title}</h2>
          {filter.filter_values.map((filterValue) => (
            <div key={filterValue.id}>
              <input
                type="checkbox"
                id={filterValue.id}
                checked={values.includes(filterValue.id)}
                onChange={(_) =>
                  handleCheckboxChange(values, setValues, filterValue.id)
                }
              />
              <label htmlFor={filterValue.id}>{filterValue.value}</label>
            </div>
          ))}
        </FilterBlock>
      );
    })
  );
};

const StepTwo = ({ categories, setCategories, handleCheckboxChange }) => {
  // VALUES STEP
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "X-localization": "ar" },
    };
    const getCategoryFilters = async () => {
      const response = await useGetFetch(
        "https://sinbad-store.com/api/v2/categories",
        requestOptions
      );
      const data = await response.data;

      setCategoryData(data);
    };

    getCategoryFilters();
  }, []);

  return (
    categoryData &&
    categoryData.map((category) => {
      return (
        category.subcategories.length > 0 && (
          <FilterBlock key={category.id}>
            <h2>{category.category_name}</h2>
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.id}>
                <input
                  type="checkbox"
                  id={subcategory.id}
                  checked={categories.includes(subcategory.id)}
                  onChange={(_) =>
                    handleCheckboxChange(
                      categories,
                      setCategories,
                      subcategory.id
                    )
                  }
                />
                <label htmlFor={subcategory.id}>
                  {subcategory.category_name}
                </label>
              </div>
            ))}
          </FilterBlock>
        )
      );
    })
  );
};

const StepThree = ({ price, setPrice }) => {
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters

    setPrice((prevPrice) => {
      return {
        ...prevPrice,
        [type]: numericValue,
      };
    });
  };
  return (
    <Container maxWidth="md" sx={{ margin: "3rem 0" }}>
      <Stack direction="column" spacing={2}>
        <h2>السعر</h2>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 3, md: 4 }}
        >
          <TextField
            id="from"
            label="من"
            type="number"
            value={price.min}
            onInput={(e) => handleInputChange(e, "min")}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
          <TextField
            id="to"
            label="إلى"
            type="number"
            value={price.max}
            onInput={(e) => handleInputChange(e, "max")}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

const StepFour = (values, price, categories, userToken) => {
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [paginationIndicator, setPaginationIndicator] = useState(1);
  console.log(filteredProducts);

  const changeHandler = (page) => {
    setPaginationIndicator(page);
    // setLoading(true);
  };

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
          category: categories,
          min_price: price.min,
          max_price: price.max,
          values: values,
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

      setFilteredProducts({
        data: response.data.data.data,
        pagination: response.data.data.pagination,
      });
    };
    doFetch();
  }, []);
  return (
    <Grid container spacing={2}>
      {filteredProducts && filteredProducts.data.products.length > 0 ? (
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
      {filteredProducts && filteredProducts.data.products.length > 0 && (
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
  );
};

export default MyGift;
