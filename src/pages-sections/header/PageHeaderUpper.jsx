import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "contexts/SettingContext";
import allCategories from "../../utils/__api__/categories";
import useGetFetch from "components/fetch/useGetFetch";
import Link from "next/link";

const NavBarLowerWrapper = styled(Box)(({ theme, border }) => ({
  background: "white",
  padding: "1rem 0",
}));
const NavBarUpperWrapper = styled(Box)(({ theme, border }) => ({
  width: "90%",
  margin: "1rem auto",
  display: "flex",
  justifyContent: "space-between",
}));
const SignUpButton = styled(Box)({
  cursor: "pointer",

  "&:hover" :{
    opacity: "0.7"
  }
});

const SelectStyling = {
  fontSize: "10px",
};
const SearchFieldStyling = {
  maxWidth: "60%",
};
const SearchButtonStyling = {
  padding: "7px 25px",
};

const PageHeaderUpper = () => {
  const { siteSettingsData } = useContext(SettingsContext);
  const [settingsData, setSettingsData] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (siteSettingsData !== {}) {
      setSettingsData(siteSettingsData.settings);
    }
  }, [siteSettingsData]);

  useEffect(() => {
    const fetchCates = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "X-localization": "ar" },
        };
        const url = "https://sinbad-store.com/api/v2/categories";
        const categoryResponse = await useGetFetch(url, requestOptions);

        setCategories(categoryResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCates();
  }, []);

  const searchHandler = () => {
    console.log("search");
  };

  const categoryMenuItemSelectElements = categories?.map((category, idx) => {
    if (category.parent_id === null) {
      return (
        <MenuItem key={idx} value={category.category_slug}>
          {category.category_name}
        </MenuItem>
      );
    }
  });

  return (
    <>
      <NavBarUpperWrapper>
        {settingsData && (
          <>
            <div>
              <span
                style={{
                  paddingLeft: "1em",
                  marginLeft: "1em",
                  borderLeft: "1px solid black",
                }}
              >
                {settingsData.WebsiteTitle}
              </span>
              <span>اتصل بنا: {settingsData.SupportNumber}</span>
            </div>
            <Link href={"/signup"}>
              <SignUpButton >
                <i className="fa-solid fa-user"></i> تسجيل الدخول
              </SignUpButton>
            </Link>
          </>
        )}
      </NavBarUpperWrapper>
      {/* Hiding Secondary Header */}
      {/* <NavBarLowerWrapper>
        <Grid container>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            order={{ xs: 1, sm: 1, md: 1, lg: 1 }}
          >
            {settingsData && (
              <Image
                src={settingsData.Logo}
                width={170}
                height={100}
                objectFit="cover"
              />
            )}
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            order={{ xs: 2, sm: 2, md: 2, lg: 2 }}
          >
            {settingsData && (
              <FormControl style={{ width: "130px" }}>
                <InputLabel id="demo-simple-select-label">
                  جميع التصنيفات
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  style={SelectStyling}
                  size="medium"
                  label="Age"
                  onChange={searchHandler}
                >
                  {categoryMenuItemSelectElements}
                </Select>
              </FormControl>
            )}
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              style={SearchFieldStyling}
            />

            <button style={SearchButtonStyling} onClick={searchHandler}>
              Search
            </button>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            order={{ xs: 1, sm: 1, md: 3, lg: 3 }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Grid>
        </Grid>
      </NavBarLowerWrapper> */}
    </>
  );
};

export default PageHeaderUpper;
