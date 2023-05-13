import ProductCard1 from "../../src/components/product-cards/ProductCard1"
import { useAppContext } from "../../src/contexts/AppContext";


const FavoritePage = () => {
  const { favItems, setFavItems } = useAppContext();

  console.log("from favs",favItems)

  if(favItems.length < 1) {
    return <div>
        <h1>Sorry no fav items here</h1>
    </div>
  }

  return (
    <div>{favItems.map((item, idx)=> {
        return <ProductCard1 {...item} key={idx}/>
    })}</div>
  )
}

export default FavoritePage