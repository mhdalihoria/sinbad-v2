import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, styled, useTheme } from "@mui/material";

const CardContentStyling = styled(CardContent)(({ theme }) => ({
  "& .card-title": {
    fontWeight: "700",
  },
  "& .shop-name": {
    fontWeight: "600",
  },
}));

const PricesSection = styled(Box)({
    background: "red"
})

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
    <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
      <CardActionArea>
        {" "}
        {/*this component is responsible for the touch effect when clicking it */}
        <CardMedia
          component="img"
          height="300"
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
                  <>
                    <Typography variant="h6" color={theme.palette.primary.main}>
                      {product.product_price - product.sale_price}
                      {/* {product.sale_price} */}
                    </Typography>
                    {" - "}
                    <Typography
                      variant="h6"
                      color={theme.palette.grey[500]}
                      sx={{ textDecoration: "line-through" }}
                    >
                      {product.product_price}
                    </Typography>
                  </>
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
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
