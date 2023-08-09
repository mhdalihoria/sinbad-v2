export default function paginateArray(array, itemsPerPage) {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    const paginatedArray = [];
  
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = array.slice(startIndex, endIndex);
      paginatedArray.push({
        page: i + 1,
        items: pageItems
      });
    }
  
    return paginatedArray;
  }
  