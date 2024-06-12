import React, { useContext, useEffect } from 'react'
import ProductItem from './ProductItem'
import productContext from '../context/products/ProductContext'
const Product = (props) => {
    const context = useContext(productContext)
    const { product, getProduct } = context
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className='row my-4'>
                {product.map((prd) => {
                    return <ProductItem key={prd._id} product={prd} />
                })}
            </div>
        </>
    )
}

export default Product