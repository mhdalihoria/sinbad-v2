import { useEffect, useState } from "react";
import useGetFetch from "../../src/components/fetch/useGetFetch";
import ProductCard from "../../src/components/products-components/ProductCard";

const Products = ({ allProducts }) => {
    const [products, setProducts] = useState([]);

const ProductCardElements = products.map((product, idx)=> {
    return <ProductCard key={idx} product={product} />
})

  useEffect(()=> {
    if(typeof allProducts.data.products !== "undefined") {
        setProducts(allProducts.data.products)
    }
  }, [products])

  return (
    <div>
      <h1>Products</h1>
      {ProductCardElements}
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  const allProducts = await useGetFetch(
    "https://sinbad-store.com/api/v2/products",
    {
      method: "GET",
      headers: { "X-localization": "ar" },
    }
  );
  return {
    props: { allProducts: allProducts },
  };
};

export default Products;
