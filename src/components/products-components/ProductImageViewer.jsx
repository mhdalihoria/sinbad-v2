import { useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

const ImageSliderContainer = styled(Box)({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});
const ImageSliderLeft = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
const ImageSliderTop = styled(Box)(({ theme }) => ({
  maxWidth: "250px",

  "@media (min-width:800px)": {
    maxWidth: "300px",
  },
}));

const ImageSliderBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "10px",
  overflow: "scroll",
  maxWidth: "250px",
  "@media (min-width:800px)": {
    maxWidth: "300px",
  },

  "& .img_wrap": {
    border: "1px solid #eee",
    cursor: "pointer",
    width: "80px",
    height: "80px",
  },
  "& .active": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));
const ImageSliderRight = styled(Box)({});

const ProductImageViewer = ({ productData }) => {
  const [mainImg, setMainImg] = useState(productData.product_images[0]);

  const refs = useRef([]);
  refs.current = [];

  const handleClick = (image, idx) => {
    setMainImg(image);
    refs.current[idx].classList.add("active");

    for (let j = 0; j < productData.product_images.length; j++) {
      if (idx !== j) {
        refs.current[j].classList.remove("active");
      }
    }
  };

  const addRefs = (element) => {
    if (element && !refs.current.includes(element)) {
      refs.current.push(element);
    }
  };

  return (
    <ImageSliderContainer>
      <ImageSliderLeft>
        <ImageSliderTop>
          <InnerImageZoom
            src={mainImg}
            zoomSrc={mainImg}
            hasSpacer={true}
            width={400}
            height={400}
          />
        </ImageSliderTop>
        <ImageSliderBottom>
          {productData.product_images.map((image, idx) => (
            <div
              className={idx == 0 ? "img_wrap active" : "img_wrap"}
              key={idx}
              onClick={() => handleClick(image, idx)}
              ref={addRefs}
            >
              <Image src={image} width={70} height={70} objectFit="contain" />
            </div>
          ))}
        </ImageSliderBottom>
      </ImageSliderLeft>
      <ImageSliderRight></ImageSliderRight>
    </ImageSliderContainer>
  );
};

export default ProductImageViewer;
