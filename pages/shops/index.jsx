import { Grid, Pagination, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../src/components/loader-spinner/Loader";

const ShopsContainer = styled("div")({
  width: "80%",
  margin: "0 auto",

  "& h1": {
    paddingLeft: "3.5rem",
    marginBottom: "0",
    marginTop: "3rem",
  },
});

const ShopItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0 2rem",
  cursor: "pointer",

  "&:hover": {
    opacity: ".8",
    color: "red",
    transform: "scale(1.1)",
  },

  "& .shopName": {
    margin: "0",
    fontSize: "1.1rem",
    fontWeight: "700",
  },
});

const Shops = ({ pagination, pageParam }) => {
  const [allShops, setAllShops] = useState();
  const router = useRouter();
  const page = router.query.page || 1;

  const changeHandler = (e) => {
    console.log(e.target.textContent);
    router.push(`/shops?page=${e.target.textContent}`);
  };

  useEffect(() => {
    const doFetch = async () => {
      const requestOptions = {
        method: "GET",
        headers: { "X-localization": "ar" },
      };
      const url = `https://sinbad-store.com/api/v2/shops?page=${page}`;
      const response = await useGetFetch(url, requestOptions);

      setAllShops();
      setAllShops((prevShops) => {
        return (
          prevShops !== response.data.data.shops && response.data.data.shops
        );
      });
    };

    doFetch();
  }, [page]);

  return (
    <ShopsContainer>
      {typeof allShops !== "undefined" ? (
        <>
          <h1>Shops</h1>
          <Grid container>
            {allShops.map((shop) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={shop.id}>
                <Link href={`/shops/${shop.slug}`}>
                  <ShopItem>
                    <Image
                      src={shop.logo || "https://placehold.jp/150x150.png"}
                      width={200}
                      height={200}
                      alt={"brand"}
                    />
                    <p className="shopName">{shop.name}</p>
                  </ShopItem>
                </Link>
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Pagination
              count={pagination.last_page}
              color="primary"
              onChange={(e) => changeHandler(e)}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size={25} loading={true} />
        </div>
      )}
    </ShopsContainer>
  );
};

export const getStaticProps = async (ctx) => {
  const requestOptions = {
    method: "GET",
    headers: { "X-localization": "ar" },
  };
  const url = `https://sinbad-store.com/api/v2/shops`;
  const everyShop = await useGetFetch(url, requestOptions);

  return {
    props: {
      pagination: everyShop.data.pagination,
    },
  };
};

export default Shops;
