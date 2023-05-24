import { Box, Grid } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import { carouselStyled } from "components/carousel/styles";
import { TramRounded } from "@mui/icons-material";

// ===================================================

const RelatedProducts = ({ productsData, favItemsLocalStorage, offer }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);
  return (
    <Box mb={7.5}>
      <H3 mb={3}>المنتجات المتعلقة:</H3>
      <Carousel
        totalSlides={productsData.length}
        visibleSlides={visibleSlides}
        sx={carouselStyled}
      >
        {productsData.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item.id}
              slug={item.id}
              title={item.product_name}
              price={item.product_price}
              // rating={item.rating}
              imgUrl={`https://sinbad-store.com${item.thumb}`}
              salePrice={item.sale_price}
              description={item.product_description?.replace(
                /(<([^>]+)>)/gi,
                ""
              )}
              categoryName={item.category_name}
              isNew={item.is_new}
              isExternal={item.is_external}
              shopName={item.shop_name}
              hoverEffect
              isFavorited={
                favItemsLocalStorage.length > 0 &&
                favItemsLocalStorage.find(
                  (favItem) => favItem.id === item.id
                ) ?
                true : false
              }
              offer={offer}
            />
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
};
export default RelatedProducts;
