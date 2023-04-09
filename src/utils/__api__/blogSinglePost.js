const getBlogPost = (async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-localization", "ar");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "http://sinbad-store.com/api/v2/blog/16",
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  
    
  }) ();
  
  const blogPost = await getBlogPost;
  export default blogPost ;
  
  
  