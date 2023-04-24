const usePostFetch = async  (url, headers, body) => {
  
    try {
      const response = await fetch(url, {
        method: "POST", 
        headers: headers,
        body: body
      });;
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  export default usePostFetch
  