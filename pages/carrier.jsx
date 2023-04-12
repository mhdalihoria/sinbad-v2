import { Grid } from "@mui/material";
import Form from "../src/pages-sections/carrier/Form";
import allCountries from "../src/utils/__api__/deliveryCountries";
import { useState } from "react";

const Carrier = ({ allCountries }) => {
  const [countrySelect, setCountrySelect] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [locationSelect, setLocationSelect] = useState("");
  const {cities} ={...allCountries[Number(countrySelect)]}
  const {locations} = {...cities[Number(citySelect)]}
  //  console.log({...allCountries[Number(countrySelect)]})
  return (
    <div style={{width: "90%", margin:"0 auto", padding: "5rem 0"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Form
            data={allCountries}
            setSelected={setCountrySelect}
            selected={countrySelect}
            label={"الدولة"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Form 
          data={cities}
          setSelected={setCitySelect}
          selected={citySelect}
          label={"المدينة"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Form 
          data={locations}
          setSelected={setLocationSelect}
          selected={locationSelect}
          label={"الموقع"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const getStaticProps = async () => {
  const everyCountry = await allCountries;
  return {
    props: {
      allCountries: everyCountry.data.countries,
    },
  };
};

export default Carrier;
