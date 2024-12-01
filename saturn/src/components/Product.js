import React, { useContext, useEffect } from 'react'
import ProductItem from './ProductItem'
import productContext from '../context/products/ProductContext'
import "C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Homeproduct.css"

const Product = () => {
    const context = useContext(productContext)
    const { product, getProduct } = context
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
        <section className='shop' id='shop'>
        <div className='heading'>
                <span>
                    Explore Products
                </span>
                <h2>Shop Now</h2>
            </div>
        <div className='shop-container'>
            
                {product.map((prd) => {
                    return <ProductItem key={prd._id} product={prd} />
                })}
              </div>
              </section>
        </>
    )
}

export default Product