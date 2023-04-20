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
import BazaarCard from "components/BazaarCard";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "contexts/SettingContext";
import Image from "next/image";

const NavBarLowerWrapper = styled(Box)(({ theme, border }) => ({
  background: "white",
  padding: "1rem 0",
}));

const PageHeaderUpper = () => {
  const { siteSettingsData } = useContext(SettingsContext);
  const [settingsData, setSettingsData] = useState();

  useEffect(() => {
    if (siteSettingsData !== {}) {
      setSettingsData(siteSettingsData.settings);
    }
  }, [siteSettingsData]);

  const searchHandler = () => {
    console.log("search");
  };

  return (
    <NavBarLowerWrapper>
      <Grid container>
        <Grid
          item
          lg={3}
          md={3}
          sm={9}
          xs={9}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          order={{ xs: 1, sm: 1, md: 1, lg: 1}}
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
          sm={9}
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          order={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        >
          <FormControl style={{width:"130px"}}>
            <InputLabel id="demo-simple-select-label">جميع التصنيفات</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Age"
              onChange={searchHandler}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            style={{ maxWidth: "50%" }}
          />

          <button onClick={searchHandler}>Search</button>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={3}
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          order={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        >
          something
        </Grid>
      </Grid>
    </NavBarLowerWrapper>
  );
};

export default PageHeaderUpper;
