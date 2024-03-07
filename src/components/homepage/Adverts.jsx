import Image from "next/image";
import { Grid, Box } from "@mui/material";
import { useRouter } from "next/router";

const contentObj = [
  {
    menu_title: "تصنيفات",
    menu_link: "sinbad-store.com/categories",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
  {
    menu_title: "عروض",
    menu_link: "sinbad-store.com/offers",
    menu_image: "http://placehold.jp/200x100.png",
  },
];

const Adverts = () => {
  const router = useRouter();

  const handleRedirects = (link) => {
    router.push(link);
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {contentObj.map((item, index) => (
        <Grid
          item
          key={index}
          xs={6}
          md={3}
          style={{
            position: "relative",
            height: "200px",
            overflow: "hidden",
            margin: "0.5rem auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            padding: ".5em 0",
            cursor: "pointer",
          }}
          sx={{
            "&:hover": {
              opacity: "0.8",
            },
          }}
          onClick={() => handleRedirects(item.menu_link)}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: "-1",
              top: "0",
              width: "98%",
              height: "200px",
              margin: "0 auto",
            }}
          >
            <Image
              src={item.menu_image}
              alt="background image"
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            style={{
              textAlign: "center",
              minWidth: "100px",
              maxWidth: "200px",
              margin: "0 auto",
              background: "gray",
              color: "white",
              borderRadius: "20px",
              padding: ".2em",
            }}
          >
            {item.menu_title}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Adverts;
