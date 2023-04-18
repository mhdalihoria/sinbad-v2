const getAllFiles = (async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-localization", "ar");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://sinbad-store.com/api/v2/files",
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  
    
  }) ();
  
  const allFiles = await getAllFiles;
  export default allFiles ;
  
  
  