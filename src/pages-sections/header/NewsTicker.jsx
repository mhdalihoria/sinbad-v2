import { Box, styled } from "@mui/material";
import useGetFetch from "components/fetch/useGetFetch";
import React, { useEffect, useState } from "react";

const NewsContainer = styled(Box)(({theme}) => ({
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   boxShadow: "0 4px 8px -4px rgba(0, 0, 0, 0.3)",
  //   border: "1px solid black",

  "& .title": {
    position: "absolute",
    background: theme.palette.primary.main,
    height: "41px",
    display: "flex",
    alignItems: "center",
    padding: " 0 24px",
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    zIndex: "200",
  },

  "& ul": {
    display: " flex",
    listStyle: "none",
    margin: "0",
    animation: "scroll 25s infinite linear",
  },

  "& ul li": {
    whiteSpace: " nowrap",
    padding: "10px 24px",
    position: "relative",
  },

  "& ul li::after ": {
    // content: "",
    width: "1px",
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
  },

  "& ul li:last-child::after": {
    display: "none",
  },

  "@keyframes scroll": {
    from: {
      transform: "translateX(-100%)",
    },

    to: {
      transform: "translateX(1083px)",
    },
  },
})
)
const NewsTicker = () => {
  const [news, setNews] = useState();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const data = await useGetFetch(
          "https://sinbad-store.com/api/v2/news-ticker",
          {
            method: "GET",
            headers: {
              "X-localization": "ar",
            },
          }
        );
        if (data.data) setNews(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    doFetch();
  }, []);

  const newsElements = news?.map((item) => {
    return <li key={item.slug}> | {item.title} | </li>;
  });
  return (
    <NewsContainer>
      <div className="title">الأخبار</div>

      <ul>{newsElements}</ul>
    </NewsContainer>
  );
};

export default NewsTicker;
