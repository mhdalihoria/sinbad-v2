import { Card, Box, Button, styled } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/assets/images/header/logo.jpg";
import { useRouter } from "next/router";

const CardWrapperStyled = styled(Card)(({ theme }) => ({
  margin: "5rem",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}));

const HeaderStyled = styled("h1")(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: "2.5rem",
  marginBottom: "0",
}));

const NoCartItemsCard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products')
  }

  return (
    <CardWrapperStyled>
      <Image src={Logo} width={160} height={110} />
      <Box>
        <HeaderStyled>No Items Here</HeaderStyled>
        <p>There are no cart items here. Feel free to shop</p>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Shop Now
        </Button>
      </Box>
    </CardWrapperStyled>
  );
};

export default NoCartItemsCard;
