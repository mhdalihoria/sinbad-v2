const getAllCategories = (async () => {
  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://sinbad-store.com/api/v2/categories",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }

  
}) ();

const allCategories = await getAllCategories;
export default allCategories ;


