import Logo from "../../public/assets/images/header/logo.jpg";
import { Card } from "@mui/material";
import Image from "next/image";

const NoProductsAlert = () => {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        fontSize: "1.25rem",
        marginTop: "1rem",
        padding: "3rem",
      }}
    >
      <Image src={Logo} width={160} height={110} />
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: 0 }}>Oops, No Products Here</p>

        <p style={{ fontSize: "1rem", marginTop: 0 }}>
          Try different search words or filters
        </p>
      </div>
    </Card>
  );
};
export default NoProductsAlert;
