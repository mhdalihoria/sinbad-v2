import { useEffect, useState } from "react";
import ProductCard1 from "../../src/components/product-cards/ProductCard1";
import { useAppContext } from "../../src/contexts/AppContext";

const FavoritePage = () => {
  // const { favItems, setFavItems } = useAppContext();
  const [favItems, setFavItems] = useState([]);

  console.log("from favs", favItems);

  useEffect(() => {
    const favItemsLS = JSON.parse(window.localStorage.getItem("favItems"));

    if (favItemsLS && typeof favItemsLS !== "undefined") {
      setFavItems(favItemsLS);
    }
  }, []);

  if (favItems.length < 1) {
    return (
      <div>
        <h1>Sorry no fav items here</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        maxWidth: "90%",
        margin: "0 auto"
      }}
    >
      {favItems.map((item, idx) => {
        return (
          <div key={idx} style={{ width: "300px" }}>
            <ProductCard1 {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default FavoritePage;
