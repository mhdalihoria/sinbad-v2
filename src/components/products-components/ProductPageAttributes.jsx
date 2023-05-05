import React from 'react'

const ProductPageAttributes = ({attributes, price, setPrice}) => {
  return (
    <div>
        <h6>{attributes.attribute_name}</h6>
    </div>
  )
}

export default ProductPageAttributes