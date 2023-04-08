import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { currency } from "lib";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { useSnackbar } from "notistack";

// custom styled components
const Card = styled(Box)({
  ":hover": {
    "& .product-actions": {
      right: 10,
    },
    "& img": {
      transform: "scale(1.1)",
    },
    "& .product-view-action": {
      opacity: 1,
    },
  },
});
const CardMedia = styled(Box)(({ theme }) => ({
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  "& img": {
    transition: "0.3s",
  },
}));

// ==============================================================

// ==============================================================

const CategoryCard = ({ product }) => {
  const [defaultImage, setdefaultImage] = useState(
    "https://placehold.jp/300x150.png?text=category+img"
  );
  const [imgSrc, setImgSrc] = useState(product.category_image);

  useEffect(() => {
    setImgSrc(product.category_image);
  }, [product.category_image]);

  return (
    <Card>
      <CardMedia>
        <Link href={`/categories/${product.category_slug}`}>
          <a>
            <Image
              width={1000}
              height={400}
              alt="category"
              objectFit="cover"
              layout="responsive"
              className="product-img"
              src={imgSrc}
              onLoadingComplete={(result) => {
                if (result.naturalWidth === 0) {
                  // If Broken image
                  setImgSrc(defaultImage);
                }
              }}
              onError={() => {
                setImgSrc(defaultImage);
              }}
            />
          </a>
        </Link>
        <h3>{product.category_name}</h3>
      </CardMedia>
    </Card>
  );
};
export default CategoryCard;
