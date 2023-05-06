import { useTheme } from "@mui/material";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";

const ProductPageRelatedProducts = ({ relatedProducts }) => {
  const [windowSize, setWindowSize] = useState();
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const theme = useTheme();

  console.log(windowSize);
  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();

    if (windowSize >= theme.breakpoints.values.md) {
      setCardsPerPage(3);
    } else if (
      windowSize > theme.breakpoints.values.sm &&
      windowSize < theme.breakpoints.values.md
    ) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(1);
    }

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [windowSize]);
  return (
    <Carousel navButtonsAlwaysVisible={true} indicators={false}>
      {chunkArray(relatedProducts, cardsPerPage).map((productChunk, idx) => {
        return (
          <div style={{ display: "flex" }} key={idx}>
            {productChunk.map((product, i) => {
              return <ProductCard product={product} key={i} />;
            })}
          </div>
        );
      })}
    </Carousel>
  );
};

export default ProductPageRelatedProducts;

const chunkArray = (array, chunkSize) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)].map((value, index) => {
    return array.slice(index * chunkSize, (index + 1) * chunkSize);
  });
};
