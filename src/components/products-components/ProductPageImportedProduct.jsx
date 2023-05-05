
const ProductPageImportedProduct = ({ product }) => {
  return (
    <>
      {product.is_global && (
        <div>
          <h5>منتج مستورد</h5>
          <p>
            لن يتم البدء بالاستيراد قبل دفع نسبة مقدمة من ثمن المنتج:{" "}
            {product.global_payment}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductPageImportedProduct;
