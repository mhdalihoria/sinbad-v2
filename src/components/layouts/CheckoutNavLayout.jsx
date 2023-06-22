import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import Stepper from "components/Stepper";
import ShopLayout1 from "./ShopLayout1";
import { useAppContext } from "contexts/AppContext";

/**
 *  Used:
 *  1. cart page
 *  2. checkout page
 *  3. payment page
 */

// ======================================================

// ======================================================

const CheckoutNavLayout = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const {userToken} = useAppContext()
  const router = useRouter();
  const { pathname } = router;
  const handleStepChange = (step) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/delivery");
        break;
      case 3:
        router.push("/orderSummery");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/delivery":
        setSelectedStep(3);
        break;
        break;
      case "/orderSummery":
        setSelectedStep(4);
        break;

      default:
        break;
    }
  }, [pathname]);
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        <Box
          mb={3}
          display={{
            sm: "block",
            xs: "none",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stepper
                stepperList={userToken ? stepperList : disabledStepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>

        {children}
      </Container>
    </ShopLayout1>
  );
};
const stepperList = [
  {
    title: "Cart",
    disabled: false,
  },
  {
    title: "Details",
    disabled: false,
  },
  {
    title: "Delivery",
    disabled: false,
  },
  {
    title: "Summery",
    disabled: false,
  },
];
const disabledStepperList = [
  {
    title: "Cart",
    disabled: false,
  },
  {
    title: "Details",
    disabled: true,
  },
  {
    title: "Delivery",
    disabled: true,
  },
  {
    title: "Summery",
    disabled: true,
  },
];
export default CheckoutNavLayout;
