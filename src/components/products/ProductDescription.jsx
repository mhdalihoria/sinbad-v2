import { Box } from "@mui/material";
import { H3 } from "components/Typography";

// ======================================================

// ======================================================

const ProductDescription = ({ product }) => {
  return (
    <Box>
      <H3 mb={2}>المواصفات:</H3>
      {typeof product !== "undefined" ? (
        <Box>
          {product.shop_name.length > 1 && ( //display shop name if the name isn't an empty string
            <span>
              المتجر: {product.shop_name && product.shop_name}
              {/* {product.shop_logo && product.shop_logo} */}
            </span>
          )}{" "}
          <br />
          {product.brand_name.length > 1 && ( //display shop name if the name isn't an empty string
            <>
              <span>
                ماركة: {product.brand_name && product.brand_name}
                {product.brand_logo && product.brand_logo}
              </span>
              <br />
            </>
          )}
          <span> الحالة: {product.status}</span> <br />
          <span>التصنيف: {product.category_name}</span> <br />
        </Box>
      ) : (
        <span>Loading...</span>
      )}
    </Box>
  );
};
export default ProductDescription;

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
