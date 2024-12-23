import React, { useContext } from 'react'
import { Link} from 'react-router-dom'

import 'C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Card.css'
const ProductItem = (props) => {
    const {product} = props
    //const context = useContext(productContext)
    const productimage = product.image
  return (
    <>

    <div className='box'>
        <div className='box-img'>
        <Link to={`/productdetail/${product._id}`}> <img  src={product.image && require(`C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/public/images/${product.image}`)} className="card-img-top my-3" alt={productimage} />
        </Link>
        </div>
        <div className='title-price'>
          <h3>{product.title}</h3>
        </div>
        <span>${product.price}</span>
      </div>  
    
        </>
  )
}

export default ProductItem