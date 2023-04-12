const getAllCountries = (async () => {
  //---------------------------------------
  // FETCH HEADER OPTIONS
  //---------------------------------------

  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  //---------------------------------------
  // FETCH HEADER OPTIONS
  //---------------------------------------

  try {
    const response = await fetch(
      "https://sinbad-store.com/api/v2/countries",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
})();

const allCountries = await getAllCountries;
export default allCountries;
