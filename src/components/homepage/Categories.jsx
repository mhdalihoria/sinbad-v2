import React from "react";
import { Grid, Typography, Divider, Stack, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const categoryArr = [
  {
    id: 1,
    category_name: "تجهيزات مكتبية",
    category_url: "category_url",
    category_slug: "تجهيزات-مكتبية",
    subcategories: [
      {
        id: 10,
        category_name: "Keyboards",
        category_url: "category_url",
        category_slug: "keyboards",
        category_image: "http://placehold.jp/200x100.png",
      },
      {
        id: 11,
        category_name: "Headset",
        category_url: "category_url",
        category_slug: "headset",
        category_image: "http://placehold.jp/200x100.png",
      },
    ],
  },
  {
    id: 2,
    category_name: "تجهيزات مكتبية",
    category_url: "category_url",
    category_slug: "تجهيزات-مكتبية",
    subcategories: [
      {
        id: 10,
        category_name: "Keyboards",
        category_url: "category_url",
        category_slug: "keyboards",
        category_image: "http://placehold.jp/200x100.png",
      },
      {
        id: 11,
        category_name: "Headset",
        category_url: "category_url",
        category_slug: "headset",
        category_image: "http://placehold.jp/200x100.png",
      },
    ],
  },
  {
    id: 3,
    category_name: "تجهيزات مكتبية",
    category_url: "category_url",
    category_slug: "تجهيزات-مكتبية",
    subcategories: [
      {
        id: 10,
        category_name: "Keyboards",
        category_url: "category_url",
        category_slug: "keyboards",
        category_image: "http://placehold.jp/200x100.png",
      },
      {
        id: 11,
        category_name: "Headset",
        category_url: "category_url",
        category_slug: "headset",
        category_image: "http://placehold.jp/200x100.png",
      },
    ],
  },
];

const Categories = () => {
  const router = useRouter();

  const handleRedirect = (link) => {
    router.push(link);
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={1} sx={{ mt: 3 }}>
      {categoryArr.map((category, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box
            sx={{
              width: "98%",
              margin: "1em auto",
              background: "rgb(189, 195, 199)",
              padding: "1em",
              borderRadius: "10px",
            }}
          >
            <Typography color="primary" variant="body1" textAlign={"center"}>
              {category.category_name}
            </Typography>
            <Divider
              sx={{
                my: 2,
                // background: "grey"
              }}
            />
            <Grid container rowSpacing={1} columnSpacing={1} sx={{ mt: 1 }}>
              {category.subcategories.map((subCategory) => (
                <Grid xs={6}>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
                    onClick={() => handleRedirect(subCategory.category_url)}
                  >
                    <Image
                      src={subCategory.category_image}
                      alt={subCategory.category_name}
                      width={70}
                      height={70}
                      style={{ objectFit: "cover" }}
                    />
                    <Typography variant="body2">
                      {subCategory.category_name}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Typography
              color="primary"
              variant="body1"
              textAlign={"right"}
              onClick={() => handleRedirect(category.category_url)}
              sx={{ mt: 3, fontWeight: 700, cursor: "pointer" }}
            >
              {category.category_name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
