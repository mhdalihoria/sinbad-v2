import Link from "next/link";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazaarRating from "components/BazaarRating";
import { H1, H2, H3, H5, H6, Span } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";
import productVariants from "data/product-variants";
import ProductImageViewer from "components/products-components/ProductImageViewer";
import ProductPageImportedProduct from "components/products-components/ProductPageImportedProduct";
import usePostFetch from "components/fetch/usePostFetch";

// ================================================================

// ================================================================

const ProductIntro = ({ product, productImages, attributes,favItemsLocalStorage }) => {
  //TODO: thumnail comes undefined someteimes
  const {
    id,
    product_price,
    product_name,
    product_short_description,
    shop_name,
    slug,
    thumbnail,
    has_offer,
    sale_price,
    product_quantity,
    display_quantity,
    with_delivery_fee,
    view_count,
    brand_name,
    brand_logo,
    category_name,
    is_new,
    is_external,
  } = product;
  const { state, dispatch, favItems, setFavItems } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const [selectAttributes, setSelectAttributes] = useState(
    attributes.length > 0
      ? [
          {
            name: attributes[0].attribute_name,
            value: attributes[0].attributes_values[0].name,
          },
        ]
      : []
  );

  // HANDLE CHAMGE TYPE AND OPTIONS
  // const handleChangeVariant = (variantName, value) => () => {
  //   setSelectVariants((state) => ({
  //     ...state,
  //     [variantName.toLowerCase()]: value,
  //   }));
  // };

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find((item) => item.id === id);

  // HANDLE SELECT IMAGE
  const handleImageClick = (ind) => () => setSelectedImage(ind);

  const selectAttr = (name, value) => {
    const existingItem = selectAttributes?.find((item) => item.name === name);
    setSelectAttributes((prevSelectAttributes) => {
      if (existingItem) {
        existingItem.value = value;
        return [existingItem];
      } else {
        return [...prevSelectAttributes, { name, value }];
      }
    });
  };

  const addToWishList = async () => {
    const body = JSON.stringify({
      product: id,
    });
    const headers = {
      "X-localization": "ar",
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };
    const response = await usePostFetch(
      "https://sinbad-store.com/api/v2/add-to-wishlist",
      headers,
      body
    );
    const data = await response.data;
    console.log(data);
  };

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: product_price,
        qty: amount,
        name: product_name,
        imgUrl: thumbnail,
        id,
        slug,
        attributes: selectAttributes,
      },
    });
  };

  useEffect(()=> {
    if(favItemsLocalStorage.length > 0) {
      if(favItemsLocalStorage.find(item => item.id === id)) {
        setIsFavorite(true)
      }
    }
  }, [])

  useEffect(() => {
    const itemData = {
      id,
      slug,
      title: product_name,
      price: product_price,
      imgUrl: `${typeof thumbnail === "undefined" ? "https://placehold.jp/300x300.png": thumbnail}`,
      rating: 4,
      categoryName: category_name,
      salePrice: sale_price,
      description: product_short_description,
      isNew: is_new,
      isExternal: is_external,
      shopName: shop_name,
      isFavorited: isFavorite,
    };
    const favItemsLS = JSON.parse(window.localStorage.getItem("favItems"));
    if (isFavorite) {
      
      if (favItemsLS && typeof favItemsLS !== "undefined") {
        const newFavItemsLS = [...favItemsLS, itemData];
        window.localStorage.setItem("favItems", JSON.stringify(newFavItemsLS));
      } else {
        window.localStorage.setItem("favItems", JSON.stringify([itemData]));
      }
    }

    if (!isFavorite) {
      
      if (favItemsLS && typeof favItemsLS !== "undefined") {
        window.localStorage.setItem("favItems", JSON.stringify(favItemsLS.filter((favItem) => favItem.id !== id)))
      }
    }
  }, [isFavorite]);

  useEffect(() => {
    if (!window) return;
    let token = JSON.parse(window.localStorage.getItem("user_token"));
    if (token && token.length > 0) setUserToken(token);
  }, []);

  const displayAvailable = (productQuantity, displayQuantity) => {
    if (!productQuantity || productQuantity === 0) {
      return "Out Of Stock";
    } else if (displayQuantity && productQuantity > 0) {
      return `${productQuantity} قطعة`;
    } else if (!displayQuantity && product_quantity === null) {
      return "Available";
    }
  };
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <ProductImageViewer productImages={productImages} product={product} />
        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{product_name}</H1>

          <FlexBox alignItems="center" mb={1}>
            <H6>{product_short_description}</H6>
          </FlexBox>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">تقييم:</Box>
            <Box mx={1} lineHeight="1">
              <BazaarRating
                color="warn"
                fontSize="1.25rem"
                value={4}
                readOnly
              />
            </Box>
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          {with_delivery_fee !== false && (
            <Box mb={1}>
              <H5>بدون توصيل</H5>
            </Box>
          )}
          <Box
            pt={1}
            mb={2}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {has_offer ? (
                <>
                  <H2 color="primary.main" mb={0.5} lineHeight="1">
                    {sale_price}
                    {/* {currency(product_price)} */}
                  </H2>
                  <del style={{ color: "grey" }}>{product_price}</del>
                </>
              ) : (
                <H2 color="primary.main" mb={0.5} lineHeight="1">
                  {product_price}
                </H2>
              )}
            </div>
            <Box
              color="inherit"
              style={{
                background: "green",
                color: "white",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {displayAvailable(product_quantity, display_quantity)}
            </Box>
          </Box>

          {attributes.map((attr) => (
            <Box key={attr.attribute_name} mb={2}>
              <H6 mb={1}>{attr.attribute_name}:</H6>

              <div style={{ display: "flex", gap: "5px" }}>
                {attr.attributes_values.map(
                  ({ product_attribute_id, name, code }) => {
                    return code.length > 1 ? (
                      <div
                        style={{
                          width: "30px",
                          minHeight: "30px",
                          background: code,
                        }}
                        key={name}
                        onClick={() => selectAttr(attr.attribute_name, name)}
                      ></div>
                    ) : (
                      <Chip
                        key={product_attribute_id}
                        label={name}
                        // onClick={handleChangeVariant(variant.title, value)}
                        sx={{
                          borderRadius: "4px",
                          mr: 1,
                          cursor: "pointer",
                        }}
                        color="primary"
                        // color={
                        //   selectVariants[name.toLowerCase()] === value
                        //     ? "primary"
                        //     : "default"
                        // }
                      />
                    );
                  }
                )}
              </div>
            </Box>
          ))}

          {view_count && (
            <Box mb={2}>
              <Span>عدد المشاهدات: {view_count}</Span>
            </Box>
          )}
          {(brand_name.length > 1 || brand_logo.length > 1) && (
            <FlexBox alignItems="center" mb={2}>
              <Box>الماركة:</Box>
              <Link href="/" passHref>
                <a>
                  <H6 ml={1}>
                    {brand_name} {brand_logo}
                  </H6>
                </a>
              </Link>
            </FlexBox>
          )}

          {shop_name.length > 1 && (
            <FlexBox alignItems="center" mb={2}>
              <Box>المتجر:</Box>
              <Link href="/" passHref>
                <a>
                  <H6 ml={1}>{shop_name}</H6>
                </a>
              </Link>
            </FlexBox>
          )}
          {category_name && (
            <FlexBox alignItems="center" mb={2}>
              <Box>التصنيف:</Box>
              <H6 ml={1}>{category_name}</H6>
            </FlexBox>
          )}

          {product.is_global == 1 && (
            <ProductPageImportedProduct product={product} />
          )}

          {!cartItem?.qty ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                mt: 2.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5} mt={2.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          <div>
            <div>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}
              >
                <span>
                  <i className="fa-solid fa-code-compare"></i> اضافة للمقارنة
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    color: isFavorite ? "red" : "black",
                  }}
                  onClick={() => {
                    setIsFavorite((prevFav) => !prevFav);
                    userToken && addToWishList();
                  }}
                >
                  <i className="fa-solid fa-heart"></i> اضافة للمفضلة
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <i
                  className="fa-brands fa-whatsapp"
                  style={{
                    color: "white",
                    background: "green",
                    padding: "7px 20px",
                    fontSize: "1rem",
                    borderRadius: "6px",
                  }}
                ></i>
                <i
                  className="fa-brands fa-facebook"
                  style={{
                    color: "white",
                    background: "#3b5998 ",
                    padding: "7px 20px",
                    fontSize: "1rem",
                    borderRadius: "6px",
                  }}
                ></i>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductIntro;
