import { useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import ReactImageMagnify from 'react-image-magnify';

const ImageSliderContainer = styled(Box)({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});
const ImageSliderLeft = styled(Box)({
  display: "flex",
});
const ImageSliderLef1 = styled(Box)({
  display: "flex",
  flexDirection: "column",
//   justifyContent: "space-evenly",
  gap: "10px",

  "& .img_wrap": {
    border: "1px solid #eee",
    cursor: "pointer",
    width: "80px",
    height: "80px",
  },
  "& .active": {
    border: "2px solid #e77600",
  },
});
const ImageSliderRight = styled(Box)({});

const ProductImageViewer = ({ productData }) => {
  const [mainImg, setMainImg] = useState(productData.product_images[0]);

  const refs = useRef([]);
  refs.current = [];

  const handleClick = (image, idx) => {
    setMainImg(image);
    refs.current[idx].classList.add("active");

    for (let j = 0; j < productData.product_images.length; j++) {
        if(idx!==j){
            refs.current[j].classList.remove('active')
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
        <ImageSliderLef1>
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
        </ImageSliderLef1>
        <div className="left_2">
        <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: mainImg,
                            },
                            largeImage: {
                                src: mainImg,
                                width: 1200,
                                height: 1800,
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '150%',
                            },
                        }}
                    />
        </div>
      </ImageSliderLeft>
      <ImageSliderRight></ImageSliderRight>
    </ImageSliderContainer>
  );
};

export default ProductImageViewer;
