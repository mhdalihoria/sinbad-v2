import { Container, Grid } from "@mui/material";
import { H2 } from "components/Typography";
import CategoryCard from "./CategoryCard";
// ===================================

const AllCategoriesSection = ({
  products
}) => {
  return <Container sx={{
    mt: 8
  }}>
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Grid container spacing={3}>
        {products.map(product => <Grid item md={3} sm={6} xs={12} key={product.id}>
            <CategoryCard product={product} />
          </Grid>)}
      </Grid>
    </Container>;
};
export default AllCategoriesSection;