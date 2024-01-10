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
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import CreateIcon from "@mui/icons-material/Create";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import { nanoid } from "nanoid";
//------------------------------------------------------
//------------------------------------------------------

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

const steps = ["", "", "", ""];

const stepsIcons = ["folder", "create", "money", "check"];

//------------------------------------------------------
//------------------------------------------------------

const MyGift = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [categoryFilters, setCategoryFilters] = useState(null);
  const [selectedFilters, setSelectedFiltered] = useState([]);

  console.log(categoryFilters);

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

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "folder":
        return <FolderIcon />;
      case "create":
        return <CreateIcon />;
      case "money":
        return <AttachMoneyIcon />;
      case "check":
        return <LibraryAddCheckIcon />;
      default:
        return;
    }
  };

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

        {categoryFilters &&
          categoryFilters.map((filter) => {
            return (
              <FilterBlock key={filter.title}>
                <h5>{filter.title}</h5>
                {filter.filter_values.map((filterValue) => (
                  <div key={filterValue.id}>
                    <input
                      type="checkbox"
                      id={filterValue.id}
                      checked={selectedFilters.includes(filterValue.id)}
                      onChange={(_) =>
                        handleCheckboxChange(
                          selectedFilters,
                          setSelectedFiltered,
                          filterValue.id
                        )
                      }
                    />
                    <label htmlFor={filterValue.id}>{filterValue.value}</label>
                  </div>
                ))}
              </FilterBlock>
            );
          })}

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
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </Box>
  );
};

export default MyGift;
