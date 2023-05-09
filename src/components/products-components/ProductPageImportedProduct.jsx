import { useTheme } from "@mui/material";

const ProductPageImportedProduct = ({ product }) => {
  const theme = useTheme()
  return (
    <>
      {product.is_global && (
        <div style = {{
          border: `1px solid ${theme.palette.primary.main}`,
          background: "rgba(255, 25, 0, 0.03",
        }}>
          <h5 style={{fontSize: "1.3rem", margin: ".5rem", color: theme.palette.primary.main}}>منتج مستورد</h5>
          <p style={{ margin: ".5rem"}}>
            لن يتم البدء بالاستيراد قبل دفع نسبة مقدمة من ثمن المنتج:{" "}
            <span style={{color: theme.palette.primary.main}}>{product.global_payment}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default ProductPageImportedProduct;
