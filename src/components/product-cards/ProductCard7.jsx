import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
}));

// =========================================================

// =========================================================

const ProductCard7 = (item) => {
  const { dispatch } = useAppContext();
  // handle change cart
  console.log(item)
  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...item,
        qty: amount,
      },
    });
  };
  return (
    <Wrapper>
      <Image
        alt={item.name}
        width={140}
        height={140}
        display="block"
        src={item.imgUrl || "/assets/images/products/iphone-xi.png"}
      />

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{
          position: "absolute",
          right: 15,
          top: 15,
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${item.id}`}>
          <a>
            <Span ellipsis fontWeight="600" fontSize={18}>
              {item.name}
            </Span>
          </a>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.600">
            {currency(item.price)} x {item.qty}
          </Span>

          <Span fontWeight={600} color="primary.main">
            {currency(item.price * item.qty)}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button
            color="primary"
            sx={{
              p: "5px",
            }}
            variant="outlined"
            disabled={item.qty === 1}
            onClick={handleCartAmountChange(item.qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {item.qty}
          </Span>
          <Button
            color="primary"
            sx={{
              p: "5px",
            }}
            variant="outlined"
            onClick={handleCartAmountChange(item.qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};
export default ProductCard7;
