import Link from "next/link";
import { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
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
import { nanoid } from "nanoid";
import CountDown from "components/products-components/CountDown";
import Image from "next/image";

// ================================================================

// ================================================================

const ProductIntro = ({
  product,
  productImages,
  attributes,
  commission,
  favItemsLocalStorage,
  userToken,
  offer,
  mazad,
}) => {
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
    role_prices,
  } = product;
  const { state, dispatch, favItems, setFavItems } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [itemAmount, setItemAmount] = useState(1);
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
  const [mazadUserValue, setMazadUserValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [mazadUserError, setMazadUserError] = useState(null);
  const [mazadUserMsg, setMazadUserMsg] = useState({
    status: false,
    message: "",
  });
  const [mazadPrice, setMazadPrice] = useState(
    mazad.max_bid ? mazad.max_bid : mazad.start_price
  );
  const theme = useTheme();
  const changeMazadUserValue = (e) => {
    setMazadUserValue(e.target.value);
  };

  const submitMazad = async () => {
    if (/^\d+$/.test(mazadUserValue)) {
      const headers = {
        "X-localization": "ar",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        mazad_id: 3,
        amount: mazadUserValue,
      });
      const response = await usePostFetch(
        "https://sinbad-store.com/api/v2/add-mazad-bid",
        headers,
        body
      );
      if (response.data.status) {
        setMazadPrice(mazadUserValue);
      }
      setMazadUserMsg({
        status: response.data.status,
        message: response.data.message,
      });
      setTimeout(() => {
        setMazadUserValue("");
        setMazadUserMsg({
          status: false,
          message: "",
        });
      }, 1500);
      console.log(response.data);
    } else {
      setMazadUserError("ادحل أرقام فقط");
      setTimeout(() => {
        setMazadUserError(null);
      }, 2500);
    }
    console.log(mazadUserValue);
  };

  const selectAttr = (name, value) => {
    setSelectAttributes((prevSelectAttributes) => {
      const attributesArr = [...prevSelectAttributes];
      const indexOfAttr = attributesArr.findIndex((attr) => attr.name === name);
      attributesArr[indexOfAttr] = {
        ...attributesArr[indexOfAttr],
        value: value,
      };

      return attributesArr;
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
        price: sale_price ? sale_price : product_price,
        qty: amount,
        name: product_name,
        imgUrl: productImages[0],
        id: id,
        nanoId: nanoid(),
        slug,
        attributes: selectAttributes,
        product_attribute_id: "",
      },
    });
    setItemAmount(1);
  };

  useEffect(() => {
    if (favItemsLocalStorage.length > 0) {
      if (favItemsLocalStorage.find((item) => item.id === id)) {
        setIsFavorite(true);
      }
    }
  }, []);

  useEffect(() => {
    const itemData = {
      id,
      slug,
      title: product_name,
      price: product_price,
      imgUrl: `${
        typeof thumbnail === "undefined"
          ? "https://placehold.jp/300x300.png"
          : productImages[0]
      }`,
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
        window.localStorage.setItem(
          "favItems",
          JSON.stringify(favItemsLS.filter((favItem) => favItem.id !== id))
        );
      }
    }
  }, [isFavorite]);

  const displayAvailable = (productQuantity, displayQuantity) => {
    if (productQuantity === 0) {
      return "غير متوفر";
    } else if (displayQuantity && productQuantity > 0) {
      return `${productQuantity} قطعة`;
    } else if (!displayQuantity && productQuantity === null) {
      return "متوفر";
    }
  };
  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <ProductImageViewer productImages={productImages} product={product} />
        {product.is_future ? (
          <Grid item md={6} xs={12} alignItems="center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <H1 color="red">Coming Soon</H1>
            </div>
          </Grid>
        ) : (
          <Grid item md={6} xs={12} alignItems="center">
            <H1 mb={1}>{product_name}</H1>

            <FlexBox alignItems="center" mb={1}>
              <H6>{product_short_description}</H6>
            </FlexBox>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <FlexBox alignItems="center">
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
            </div>

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
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                {role_prices.length > 1 &&
                  role_prices.map((rolePrice) => {
                    return (
                      <div key={rolePrice.price}>
                        <Span style={{ fontSize: ".8rem" }}>
                          {rolePrice.price_name.length > 1
                            ? `${rolePrice.price_name} :`
                            : ""}{" "}
                        </Span>
                        <H2 color="primary.main" mb={0.1} lineHeight="1">
                          {currency(rolePrice.price)}
                        </H2>
                      </div>
                    );
                  })}

                {has_offer ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {role_prices.length > 1 && (
                      <Span style={{ fontSize: ".8rem" }}>سعر العرض: </Span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "baseline",
                      }}
                    >
                      <H2 color="primary.main" mb={0.5} lineHeight="1">
                        {currency(sale_price)}
                        {/* {currency(product_price)} */}
                      </H2>
                      <del style={{ color: "grey" }}>
                        {currency(product_price)}
                      </del>
                    </div>
                  </div>
                ) : (
                  <H2 color="primary.main" mb={0.5} lineHeight="1">
                    {currency(product_price)}
                  </H2>
                )}
              </div>
              {commission && (
                <Box
                  color="inherit"
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  {commission}
                </Box>
              )}
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
                            border:
                              selectAttributes.find(
                                (attrObj) =>
                                  attrObj.name === attr.attribute_name &&
                                  attrObj.value === name
                              ) && "3px solid grey",
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
                  <div
                    style={{ display: "flex", alignItems: "end", gap: "10px" }}
                  >
                    <H1 mb={1} ml={1} style={{ fontSize: ".9rem" }}>
                      {brand_name}
                    </H1>{" "}
                    <Image src={brand_logo} width={"50px"} height={"30px"} />
                  </div>
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

            <FlexBox alignItems="center" mb={1.5} mt={2.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  setItemAmount((prevItem) => {
                    if (prevItem > 1) {
                      return prevItem - 1;
                    }
                    if (prevItem === 1) {
                      return prevItem;
                    }
                  });
                }}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {itemAmount}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  setItemAmount((prevItem) => prevItem + 1);
                }}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(itemAmount)}
              sx={{
                mb: 4.5,
                mt: 2.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Add to Cart
            </Button>

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
                {typeof offer !== undefined && offer && (
                  <div style={{ marginTop: "2rem" }}>
                    <div style={{ marginBottom: ".5rem", fontWeight: "600" }}>
                      العرض:
                    </div>
                    <div>
                      سعر العرض: <span>{offer.offer_price}</span>
                    </div>
                    {has_offer && offer.offer_end_at && (
                      <CountDown direction="row" offer={offer} />
                    )}
                  </div>
                )}
                {mazad.id && (
                  <div style={{ marginTop: "2rem" }}>
                    <div style={{ marginBottom: ".5rem", fontWeight: "600" }}>
                      <p style={{ margin: "0" }}>أعلى مزايدة:</p>
                      <p
                        style={{
                          marginTop: "0rem",
                          marginBottom: "0",
                          fontSize: "1.3rem",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {currency(mazadPrice)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontWeight: "600" }}>الوقع البافي للمزاد:</p>

                      <CountDown endDate={mazad.end_date} direction="row" />
                    </div>
                    <div>
                      {userToken ? (
                        <>
                          <div
                            style={{
                              color: mazadUserMsg.status
                                ? theme.palette.success[900]
                                : theme.palette.error[900],
                              margin: "2rem 0 1rem",
                            }}
                          >
                            {mazadUserMsg.message}
                          </div>

                          <TextField
                            id="outlined-basic"
                            name="mazadUserValue"
                            value={mazadUserValue}
                            label="ادخل قيمة المزاد"
                            variant="outlined"
                            onChange={(e) => changeMazadUserValue(e)}
                            sx={{ marginRight: "1rem" }}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={isButtonDisabled}
                            onClick={submitMazad}
                          >
                            تبث الفيمة
                          </Button>
                          <div>{mazadUserError}</div>
                        </>
                      ) : (
                        <div
                          style={{
                            border: "grey 1px solid",
                            background: "rgb(211,211,211)",
                            fontWeight: "600",
                            padding: "1rem",
                            textAlign: "center",
                          }}
                        >
                          يحب{" "}
                          <Link href={"/signup"}>
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              تسجيل الدخول
                            </span>
                          </Link>{" "}
                          للمشاركة في المزاد
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default ProductIntro;
