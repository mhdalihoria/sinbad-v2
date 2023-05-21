import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { H3 } from "components/Typography";

// ======================================================

// ======================================================

const ProductFeatures = ({ features }) => {
  const theme = useTheme();
  return (
    <Box>
      {typeof features !== "undefined" ? (
        features.length > 0 && (
          <>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: theme.palette.primary.main }}>
                  <TableRow>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      اسم الصفة
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                      }}
                      align="center"
                    >
                      القيمة
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow
                      key={feature.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{textAlign: "center"}}>{feature.feature_name}</TableCell>
                      <TableCell sx={{textAlign: "center"}}>{feature.feature_value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
      ) : (
        <span>Loading...</span>
      )}
    </Box>
  );
};
export default ProductFeatures;

// <div>
// {
//   product.shop_name.length > 1 && ( //display shop name if the name isn't an empty string
//     <span>
//       المتجر: {product.shop_name && product.shop_name}
//       {/* {product.shop_logo && product.shop_logo} */}
//     </span>
//   );
// }
// <br />;
// {
//   product.brand_name.length > 1 && ( //display shop name if the name isn't an empty string
//     <span>
//       ماركة: {product.brand_name && product.brand_name}
//       {product.brand_logo && product.brand_logo}
//     </span>
//   );
// }
// <br />;
// </div>
