import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import allCountries from "../src/utils/__api__/deliveryCountries";
import Form from "../src/pages-sections/carrier/Form";
import DeliveryTable from "../src/pages-sections/carrier/Table";

const Carrier = ({ allCountries }) => {
  const [countrySelect, setCountrySelect] = useState("");
  const [citySelect, setCitySelect] = useState("");
  const [locationSelect, setLocationSelect] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const { cities } = { ...allCountries[Number(countrySelect) - 1] };
  const { locations } =
    citySelect !== "" ? { ...cities[Number(citySelect) - 1] } : {};

  console.log(deliveryDetails);

  useEffect(() => {
    const getDeliveryDetails = async () => {
      try {
        const response = await fetch(
          "https://sinbad-store.com/api/v2/delivery-fee",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ location: Number(locationSelect) }),
          }
        );
        const data = await response.json();
        if (data.data.length > 0) {
          setDeliveryDetails(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDeliveryDetails();
  }, [locationSelect]);

  return (
    <div style={{ width: "90%", margin: "0 auto", padding: "5rem 0" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Form
            data={allCountries}
            setSelected={setCountrySelect}
            selected={countrySelect}
            label={"الدولة"}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Form
            data={cities}
            setSelected={setCitySelect}
            selected={citySelect}
            label={"المدينة"}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Form
            data={locations}
            setSelected={setLocationSelect}
            selected={locationSelect}
            label={"الموقع"}
          />
        </Grid>

        {deliveryDetails && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <DeliveryTable deliveryData={deliveryDetails}/>
          </Grid>
        )}
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
