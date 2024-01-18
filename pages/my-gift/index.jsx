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
  Card,
  Pagination,
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
import Image from "next/image";
import pageLoader from "../../public/assets/images/loader/pageLoader.gif";
//------------------------------------------------------
//------------------------------------------------------

const FilterBlock = styled(Card)(({ theme }) => ({
  padding: "2rem",
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

const CardFilterBlock = styled(Card)(({ theme }) => ({
  padding: "2rem",
  margin: "1rem 0",
  overflow: "hidden",
  minHeight: "200px",
  maxHeight: "200px",
  position: "relative",

  "& h2": {
    marginBottom: ".5em",
    marginTop: ".5em",
    color: theme.palette.primary.main,
  },

  "& div": {
    fontSize: "1rem",
    padding: ".125em 0",
  },
  '& div input[type="checkbox"]': {
    accentColor: theme.palette.primary.main,
  },
}));

// SeeMoreButton remains the same
const SeeMoreButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: -1,
  left: 0,
  width: "100%",
  background: "rgba(255,255,255,.9)",
}));

const steps = ["", "", "", ""];

//------------------------------------------------------
//------------------------------------------------------

const MyGift = () => {
  const { userToken } = useAppContext();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
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

  const doNotSkipIfValueNotSelected = () => {
    if (activeStep + 1 === 1) {
      if (values.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    if (activeStep + 1 === 2) {
      if (categories.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    if (activeStep + 1 === 3) {
      if (Number(price.max) > 0) {
        return false;
      } else {
        return true;
      }
    }
  };
  // ---------------------------------------------------------------
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "X-localization": "ar" },
    };
    const getProductFilters = async () => {
      const response = await useGetFetch(
        "https://sinbad-store.com/api/v2/products",
        requestOptions
      );
      const filters = await response.data.data.filters;
      const { product_filters } = await filters;

      setCategoryFilters(product_filters);
    };

    getProductFilters();
  }, []);
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
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
  // ---------------------------------------------------------------

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
        <Box sx={{ marginTop: "3rem" }}>
          {activeStep + 1 === 1 && (
            <>
              {categoryFilters === null ? (
                <SectionLoader />
              ) : (
                <StepOne
                  values={values}
                  setValues={setValues}
                  handleCheckboxChange={handleCheckboxChange}
                  categoryFilters={categoryFilters}
                  setCategoryFilters={setCategoryFilters}
                />
              )}
            </>
          )}
          {activeStep + 1 === 2 && (
            <>
              {categoryData === null ? (
                <SectionLoader />
              ) : (
                <StepTwo
                  categories={categories}
                  setCategories={setCategories}
                  handleCheckboxChange={handleCheckboxChange}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              )}
            </>
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
            {activeStep + 1 !== 4 && (
              <Button onClick={handleNext} disabled={doNotSkipIfValueNotSelected()}>
                {activeStep === 2 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const StepOne = ({
  values,
  setValues,
  categoryFilters,
  handleCheckboxChange,
}) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={1}>
      <Grid item xs={12} sm={12} md={12}>
        <h1>فلاتر</h1>
      </Grid>
      {categoryFilters &&
        categoryFilters.map((filter) => (
          <Grid item key={filter.title} xs={12} sm={6} md={4}>
            <FilterBlockWithButton
              filter={filter}
              values={values}
              setValues={setValues}
              mappedArr={filter.filter_values}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Grid>
        ))}
    </Grid>
  );
};

const StepTwo = ({
  categories,
  setCategories,
  categoryData,
  handleCheckboxChange,
}) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={1}>
      <Grid item xs={12} sm={12} md={12}>
        <h1>تصنيفات</h1>
      </Grid>
      {categoryData &&
        categoryData.map((category) => {
          return (
            category.subcategories.length > 0 && (
              <Grid item key={category.id} xs={12} sm={6} md={4}>
                <FilterBlockWithButton
                  filter={category}
                  values={categories}
                  setValues={setCategories}
                  mappedArr={category.subcategories}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </Grid>
            )
          );
        })}
    </Grid>
  );
};

const StepThree = ({ price, setPrice }) => {
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters

    setPrice((prevPrice) => {
      return {
        ...prevPrice,
        [type]: numericValue === "" ? "0" : numericValue,
      };
    });
  };
  return (
    <Container maxWidth="md" sx={{ margin: "3rem 0" }}>
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <h1>السعر</h1>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
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
        </Grid>
      </Grid>
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

  if (filteredProducts === null) {
    return <SectionLoader />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>الهدايا</h1>
      </Grid>
      {filteredProducts?.data.products.length > 0 ? (
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
      {filteredProducts?.data.products.length > 0 && (
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

const FilterBlockWithButton = ({
  filter,
  values,
  setValues,
  mappedArr,
  handleCheckboxChange,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <CardFilterBlock
      style={{ maxHeight: showFullContent ? "fit-content" : "200px" }}
    >
      <h2>{filter.title || filter.category_name}</h2>
      {mappedArr.map((mappedItem, index) => (
        <div key={mappedItem.id}>
          <input
            type="checkbox"
            id={mappedItem.id}
            checked={values.includes(mappedItem.id)}
            onChange={() =>
              handleCheckboxChange(values, setValues, mappedItem.id)
            }
          />
          <label htmlFor={mappedItem.id}>
            {mappedItem.value || mappedItem.category_name}
          </label>
        </div>
      ))}
      {mappedArr.length > 2 && (
        <SeeMoreButton color="primary" onClick={toggleShowFullContent}>
          {showFullContent ? "See Less" : "See More"}
        </SeeMoreButton>
      )}
    </CardFilterBlock>
  );
};

const SectionLoader = () => {
  const loadingContainerStyles = {
    width: "100%",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={loadingContainerStyles}>
      <Image src={pageLoader} width={200} height={200} />
    </div>
  );
};

export default MyGift;
