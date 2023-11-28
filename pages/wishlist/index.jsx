import React, { useEffect, useState } from "react";
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
import DialogPrompt from "../../src/components/dialog-prompt/DialogPrompt";
// ==================================================================

const WishList = () => {
  const { userToken } = useAppContext();
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(products && typeof products.data);

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
        `https://sinbad-store.com/api/v2/get-my-wishlist?page=${currentPage}`,
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
  }, [userToken, currentPage]);

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
        products &&
        products.status &&
        products.data &&
        products.data.length !== 0 ? (
          <>
            {/* PRODUCT LIST AREA */}
            <Grid container spacing={3}>
              {products.data.map((item) => (
                <React.Fragment key={item.id}>
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
                        isFavorited={true}
                      />
                    </Grid>
                  )}
                </React.Fragment>
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
          <DialogPrompt
            title={"No Products"}
            description={
              "There's no products here, visit store page to get some..."
            }
            buttons={
              <Button
                onClick={() => router.push("/")}
                variant="contained"
                color="primary"
              >
                Store
              </Button>
            }
          />
        )
      ) : (
        <DialogPrompt
          title={"You Are Not Logged In"}
          description={"To view this Page, you need to be logged in"}
          buttons={
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          }
        />
      )}
    </CustomerDashboardLayout>
  );
};

export default WishList;
