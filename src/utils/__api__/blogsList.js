const getAllBlogs = (async () => {
  const myHeaders = new Headers();
  myHeaders.append("X-localization", "ar");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://sinbad-store.com/api/v2/blog",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }

  
}) ();

const allBlogs = await getAllBlogs;
export default allBlogs ;


