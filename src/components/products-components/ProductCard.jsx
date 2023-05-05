import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, styled, useTheme } from "@mui/material";
import Link from "next/link";

const ProductCardActionArea = styled(CardActionArea)({});

const CardContentStyling = styled(CardContent)(({ theme }) => ({
  "& .card-title": {
    fontWeight: "700",
  },
  "& .shop-name": {
    fontWeight: "600",
  },
}));

const PricesSection = styled(Box)({
  marginTop: "1rem",
  "& .price-count": {
    display: "flex",
    justifyContent: "space-around",
  },
});

const SaleAndPrices = styled(Box)(({ theme }) => ({
  "& .sale-rate": {
    position: "absolute",
    top: 0,
    left: 0,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: ".5em 1em",
    fontSize: "1rem",
    fontWeight: "700",
  },
}));
const Original = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: ".5em 1em",
  fontSize: "1rem",
  fontWeight: "700",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  background: "rgba(79, 79, 79, 0.54)",
  opacity: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& button": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: "100px",
    padding: "10px 17px",
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.primary.contrastText,
      animation: "wiggle 2s linear infinite",

      "@keyframes wiggle": {
        "0%, 7%": {
          transform: "rotateZ(0)",
        },
        "15%": {
          transform: "rotateZ(-15deg)",
        },
        "20%": {
          transform: "rotateZ(10deg)",
        },
        "25% ": {
          transform: "rotateZ(-10deg)",
        },
        "30% ": {
          transform: "rotateZ(6deg)",
        },
        "35% ": {
          transform: "rotateZ(-4deg)",
        },
        "40%, 100%": {
          transform: "rotateZ(0)",
        },
      },
    },
  },

  "&: hover": {
    opacity: "1",
    animation: "fadeIn 2s",

    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
}));

const ComingSoon = styled(CardActionArea)({
  filter: "brightness(30%)",
});

export const ProductCard = ({ product }) => {
  const theme = useTheme();
  const calculateSalePercentage = (productPrice, salePrice) => {
    const numProductPrice = Number(productPrice);
    const numSalePrice = Number(salePrice);
    const amountReduced = numProductPrice - numSalePrice;
    const saleRate = (amountReduced / productPrice) * 100;

    return Math.round(saleRate);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1rem auto", position: "relative" }}>
      {product.is_future ? (
        <ComingSoon>
          {/*this component is responsible for the touch effect when clicking it */}
          <CardMedia
            component="img"
            height="200"
            image={product.product_image}
            alt={product.product_name}
          />
          <CardContentStyling>
            <span
              style={{
                color: theme.palette.primary.main,
                fontSize: "1.5rem",
                fontWeight: "700",
                filter: "brightness(100%)",
              }}
            >
              Coming Soon
            </span>
          </CardContentStyling>
        </ComingSoon>
      ) : (
        <Link href={`/products/${product.id}`}>
          <ProductCardActionArea>
            {/*this component is responsible for the touch effect when clicking it */}
            <CardMedia
              component="img"
              height="200"
              image={product.product_image}
              alt={product.product_name}
            />
            <CardContentStyling>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="card-title"
              >
                <span>{product.product_name}</span>{" "}
                {product.is_new && (
                  <span style={{ color: "red" }}>({product.is_new})</span>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.product_description
                  .replace(/(<([^>]+)>)/gi, "")
                  .replace(/\&nbsp;/g, "")}
              </Typography>
              {product.shop_name && (
                <span className="shop-name">المتجر: {product.shop_name}</span>
              )}
              {product.is_external && <Original>أصلي</Original>}
              <PricesSection>
                {product.display_price ? (
                  product.has_offer ? (
                    <SaleAndPrices>
                      <div className="price-count">
                        <Typography
                          variant="h6"
                          color={theme.palette.primary.main}
                          sx={{ width: "65px" }}
                        >
                          {product.product_price - product.sale_price}
                          {/* {product.sale_price} */}
                        </Typography>
                        <Typography
                          variant="h6"
                          color={theme.palette.grey[500]}
                          sx={{
                            textDecoration: "line-through",
                            width: "65px",
                          }}
                        >
                          {product.product_price}
                        </Typography>
                      </div>
                      <div className="sale-rate">
                        {calculateSalePercentage(
                          product.product_price,
                          product.sale_price
                        )}
                        %
                      </div>
                    </SaleAndPrices>
                  ) : (
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      {" "}
                      {product.product_price}{" "}
                    </Typography>
                  )
                ) : (
                  <Typography variant="h6" color={theme.palette.primary.main}>
                    Contact Us
                  </Typography>
                )}
              </PricesSection>
            </CardContentStyling>
            <Overlay>
              <button disabled={product.is_future}>
                <i className="fa-solid fa-heart"></i>
              </button>
              <button>
                <i className="fa-sharp fa-solid fa-less-than-equal"></i>
              </button>
            </Overlay>
          </ProductCardActionArea>
        </Link>
      )}
    </Card>
  );
};

export default ProductCard;
