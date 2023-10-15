import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Favorite } from "@mui/icons-material";
import { Button, Card, Grid, Pagination, styled } from "@mui/material";
import SEO from "components/SEO";
import { FlexBox } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { useAppContext } from "../../src/contexts/AppContext";
import useGetFetch from "../../src/components/fetch/useGetFetch";
// ==================================================================

const PromptSection = styled(Card)(({ theme }) => ({
  maxWidth: "350px",
  margin: "4rem auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",

  "& .loginBtn": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
    borderRadius: "5px",
    marginTop: "1em",
    cursor: "pointer",
  },
}));

// ============================================================
const WishList = () => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(products && products.data);

  useEffect(() => {
    const doFetch = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "X-localization": "ar",
          Authorization: `Bearer ${userToken}`,
        },
        redirect: "follow",
      };

      const response = await useGetFetch(
        "https://sinbad-store.com/api/v2/get-my-wishlist",
        requestOptions
      );
      const data = await response.data;
      const responseStatus = await response.status;

      setProducts({
        data: data.data.wishlist,
        status: responseStatus,
        pagination: data.pagination,
      });
    };
    if (userToken) {
      doFetch();
    }
  }, [userToken]);

  // HANDLE CHANGE PAGINATION
  const handleChangePage = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  // SECTION HEADER TITLE LINK
  const HEADER_BUTTON = (
    <Button
      color="primary"
      sx={{
        px: 4,
        bgcolor: "primary.light",
      }}
    >
      Add All to Cart
    </Button>
  );
  return (
    <CustomerDashboardLayout>
      <SEO title="Wishlist" />

      {/* TOP HEADER AREA */}
      <UserDashboardHeader
        icon={Favorite}
        title="My Wish List"
        navigation={<CustomerDashboardNavigation />}
      />

      {userToken ? (
        products && products.status && products.data ? (
          <>
            {/* PRODUCT LIST AREA */}
            <Grid container spacing={3}>
              {products.data.map((item) => (
                <>
                  {item.product && (
                    <Grid item lg={4} sm={4} xs={6} key={item.id}>
                      <ProductCard1
                        id={item.product.id}
                        slug={item.product.id}
                        title={item.product.product_name}
                        price={item.product.product_price}
                        // rating={item.product.rating}
                        imgUrl={`${item.product.thumb}`}
                        salePrice={item.product.sale_price}
                        description={item.product.product_description?.replace(
                          /(<([^>]+)>)/gi,
                          ""
                        )}
                        categoryName={item.product.category_name}
                        isNew={item.product.is_new}
                        isExternal={item.product.is_external}
                        shopName={item.product.shop_name}
                        hoverEffect
                        isFuture={item.product.is_future}
                      />
                    </Grid>
                  )}
                </>
              ))}
            </Grid>

            {/* PAGINATION AREA */}
            <FlexBox justifyContent="center" mt={5}>
              <Pagination
                count={products.pagination.last_page}
                color="primary"
                page={currentPage}
                onChange={(event, page) => handleChangePage(page)}
              />
            </FlexBox>
          </>
        ) : (
          <PromptSection>
            <p>There is no products here...</p>
            <button
              className="loginBtn"
              onClick={() => {
                router.push("/");
              }}
            >
              Browse Products
            </button>
          </PromptSection>
        )
      ) : (
        <PromptSection>
          <p>You should be logged in...</p>
          <button
            className="loginBtn"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log In
          </button>
        </PromptSection>
      )}
    </CustomerDashboardLayout>
  );
};

export default WishList;
