import { useState } from "react";
import { Avatar, Grid } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import LazyImage from "components/LazyImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";

const ProductImageViewer = ({ productImages, product }) => {
  const {
    id,
    product_price,
    product_name,
    product_short_description,
    shop_name,
    slug,
    thumbnail,
  } = product;
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (ind) => () => setSelectedImage(ind);


  return (
    <Grid item md={6} xs={12} alignItems="center">
      <FlexBox justifyContent="center" mb={6}>
        <InnerImageZoom
          src={productImages[selectedImage]}
          zoomSrc={productImages[selectedImage]}
          hasSpacer={true}
          width={300}
          height={300}
        />

      </FlexBox>

      <FlexBox overflow="auto" style={{maxWidth: "300px", margin: "0 auto"}}>
        {productImages.map((url, ind) => (
          <FlexRowCenter
            key={ind}
            width={64}
            height={64}
            minWidth={64}
            bgcolor="white"
            border="1px solid"
            borderRadius="10px"
            ml={ind === 0 ? "auto" : 0}
            style={{
              cursor: "pointer",
            }}
            onClick={handleImageClick(ind)}
            mr={ind === productImages.length - 1 ? "auto" : "10px"}
            borderColor={selectedImage === ind ? "primary.main" : "grey.400"}
          >
            <Avatar
              src={url}
              variant="square"
              sx={{
                height: 40,
              }}
            />
          </FlexRowCenter>
        ))}
      </FlexBox>
    </Grid>
  );
};

export default ProductImageViewer;
