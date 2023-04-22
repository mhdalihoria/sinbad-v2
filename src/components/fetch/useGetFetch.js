const useGetFetch = async  (url, requestOptions) => {
  
  try {
    const response = await fetch(url, requestOptions);;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default useGetFetch
