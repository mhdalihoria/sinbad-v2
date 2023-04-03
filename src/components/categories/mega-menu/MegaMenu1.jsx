import Link from "next/link";
import { Box, Card, Grid } from "@mui/material";
import StyledMegaMenu from "./StyledMegaMenu";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";

// =========================================================

// =========================================================

const MegaMenu1 = ({
  data: { categories: subcategories, rightImage, bottomImage },
  minWidth,
}) => {
  return subcategories ? (
    <StyledMegaMenu>
      <Card
        elevation={2}
        sx={{
          ml: "1rem",
          minWidth,
        }}
      >
        <FlexBox px={2.5} py={1.75} alignItems="unset">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {subcategories?.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {/* {item.category_url ? <NavLink className="title-link" href={item.href}> */}
                  {item.category_url ? (
                    <NavLink className="title-link" href={item.category_url}>
                      {item.category_name}
                    </NavLink>
                  ) : (
                    <Box className="title-link">{item.category_name}</Box>
                  )}
                  {/* {item.subcategories?.map((sub, ind) => <NavLink className="child-link" href={sub.href} key={ind}> */}
                  {item.subcategories?.map((sub, ind) => (
                    <NavLink className="child-link" href={"/"} key={ind}>
                      {sub.category_name}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* {rightImage && <Box mt={1.5}>
              <Link href={rightImage.href}>
                <a>
                  <LazyImage src={rightImage.imgUrl} objectFit="contain" width={137} height={318} alt="banner" />
                </a>
              </Link>
            </Box>} */}
        </FlexBox>

        {/* {bottomImage && <Link href={bottomImage.href}>
            <a>
              <Box position="relative" height="170px">
                <LazyImage src={bottomImage.imgUrl} layout="fill" objectFit="cover" alt="banner" />
              </Box>
            </a>
          </Link>} */}
      </Card>
    </StyledMegaMenu>
  ) : null;
};
MegaMenu1.defaultProps = {
  minWidth: "760px",
};
export default MegaMenu1;
