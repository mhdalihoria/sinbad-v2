import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Add, Favorite, Remove, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Skeleton, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";
import { H3, Span } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { FlexBox } from "../flex-box";
import { calculateDiscount, currency } from "lib";
import CountDown from "components/products-components/CountDown";

// styled components
const StyledBazaarCard = styled(BazaarCard)({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  ":hover": {
    "& .hover-box": {
      opacity: 1,
    },
  },
});
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)({
  zIndex: 1,
  fontWeight: 600,
  fontSize: "13px",
  width: "fit-content",

  marginTop: "5px",
  padding: "2px 0",
  left: "10px",
});
const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
});
const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// ========================================================

// ========================================================

const ProductCard1 = ({
  id,
  slug,
  title,
  price,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  showProductSize,
  categoryName,
  salePrice,
  description,
  isNew,
  isExternal,
  shopName,
  isFavorited = false,
  offer = null,
  isFuture = false,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch, favItems, setFavItems } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const cartItem = state.cart.find((item) => item.slug === slug);
  const handleCartAmountChange = (product, type) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: product,
    });
    // SHOW ALERT PRODUCT ADDED OR REMOVE
    if (type === "remove") {
      enqueueSnackbar("Remove from Cart", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
    }
  };

  useEffect(() => {
    const itemData = {
      id,
      slug,
      title,
      price,
      imgUrl,
      rating,
      categoryName,
      salePrice,
      description,
      isNew,
      isExternal,
      shopName,
      isFavorited: true,
    };
    const favItemsLS = JSON.parse(window.localStorage.getItem("favItems"));

    if (isFavorite) {
      if (favItemsLS && typeof favItemsLS !== "undefined") {
        if (!favItemsLS.find((favItem) => favItem.id === id)) {
          const newFavItemsLS = [...favItemsLS, itemData];
          window.localStorage.setItem(
            "favItems",
            JSON.stringify(newFavItemsLS)
          );
        } else {
          return;
        }
      } else {
        window.localStorage.setItem("favItems", JSON.stringify([itemData]));
      }
    }

    if (!isFavorite) {
      if (favItemsLS && typeof favItemsLS !== "undefined") {
        window.localStorage.setItem(
          "favItems",
          JSON.stringify(favItemsLS.filter((favItem) => favItem.id !== id))
        );
      }
    }
  }, [isFavorite]);
  return (
    <>
      {isFuture && isFuture !== 0 ? (
        <h1
          style={{
            position: "absolute",
            top: "70px",
            right: "50px",
            color: "red",
          }}
        >
          Coming Soon
        </h1>
      ) : (
        <span></span>
      )}
      <StyledBazaarCard
        hoverEffect={hoverEffect}
        style={{ opacity: isFuture ? ".2" : "1" }}
      >
        <ImageWrapper>
          <div
            style={{
              zIndex: 1,
              height: "50px",
              display: "flex",
              flexDirection: "column",
              position: "absolute",
            }}
          >
            {!!salePrice && (
              <StyledChip
                color="primary"
                size="small"
                label={`${Math.round(
                  ((price - salePrice) / price) * 100
                )}% off`}
              />
            )}
            {!!isNew && (
              <StyledChip color="warning" size="small" label={`new`} />
            )}
            {!!isExternal && (
              <StyledChip color="secondary" size="small" label={`أصلي`} />
            )}
            {offer && typeof offer !== undefined && (
              <div style={{ marginRight: ".1rem", marginTop: ".5rem" }}>
                <CountDown direction="column" offer={offer} />
              </div>
            )}
          </div>

          <HoverIconWrapper
            className="hover-box"
            style={{ background: "white", borderRadius: "5px" }}
          >
            <IconButton onClick={toggleDialog}>
              <RemoveRedEye color="disabled" fontSize="small" />
            </IconButton>

            <IconButton onClick={toggleIsFavorite}>
              {isFavorite ? (
                <Favorite color="primary" fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" color="disabled" />
              )}
            </IconButton>
          </HoverIconWrapper>

          <Link href={`/products/${slug}`}>
            <a>
              {imgUrl ? (
                <LazyImage
                  src={imgUrl}
                  width={0}
                  height={0}
                  layout="responsive"
                  alt={title}
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}
            </a>
          </Link>
        </ImageWrapper>

        <ProductViewDialog
          openDialog={openModal}
          handleCloseDialog={toggleDialog}
          product={{
            title,
            price: currency(price),
            categoryName,
            salePrice: currency(salePrice),
            description,
            shopName,
            id,
            slug,
            imgGroup: [imgUrl, imgUrl],
          }}
        />

        <ContentWrapper>
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr={1}>
              <Link href={`/products/${slug}`}>
                <a>
                  <H3
                    mb={1}
                    title={title}
                    fontSize="14px"
                    fontWeight="600"
                    className="title"
                    color="text.secondary"
                  >
                    {title}
                  </H3>
                </a>
              </Link>

              {!!shopName ? (
                <>
                  <Span>المتجر: {shopName} </Span> <br />
                  <br />
                </>
              ) : (
                <>
                  <Span></Span> <br />
                  <br />
                </>
              )}
              {!hideRating && (
                <BazaarRating value={rating || 0} color="warn" readOnly />
              )}

              {showProductSize && (
                <Span color="grey.600" mb={1} display="block">
                  {showProductSize}
                </Span>
              )}

              <FlexBox alignItems="center" gap={1} mt={0.5}>
                <Box fontWeight="600" color="primary.main">
                  {/* {calculateDiscount(price, ((price - salePrice) / price) * 100)} */}
                  {!!salePrice ? currency(salePrice) : currency(price)}
                </Box>

                {!!salePrice && (
                  <Box color="grey.600" fontWeight="600">
                    <del>{currency(price)}</del>
                  </Box>
                )}
              </FlexBox>
            </Box>

            {isFuture !== 1 && !isFuture && (
              <FlexBox
                width="30px"
                alignItems="center"
                className="add-cart"
                flexDirection="column-reverse"
                justifyContent={
                  !!cartItem?.qty ? "space-between" : "flex-start"
                }
              >
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={handleCartAmountChange({
                    id,
                    slug,
                    price,
                    imgUrl,
                    name: title,
                    qty: (cartItem?.qty || 0) + 1,
                    product_attribute_id: "",
                  })}
                >
                  <Add fontSize="small" />
                </Button>

                {!!cartItem?.qty && (
                  <Fragment>
                    <Box color="text.primary" fontWeight="600">
                      {cartItem?.qty}
                    </Box>

                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{
                        padding: "3px",
                      }}
                      onClick={handleCartAmountChange(
                        {
                          id,
                          slug,
                          price,
                          imgUrl,
                          name: title,
                          qty: (cartItem?.qty || 0) - 1,
                        },
                        "remove"
                      )}
                    >
                      <Remove fontSize="small" />
                    </Button>
                  </Fragment>
                )}
              </FlexBox>
            )}
          </FlexBox>
        </ContentWrapper>
      </StyledBazaarCard>
    </>
  );
};
export default ProductCard1;
