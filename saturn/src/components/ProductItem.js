import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import productContext from '../context/products/ProductContext'

const ProductItem = (props) => {
    const {product} = props
    const context = useContext(productContext)
    const productimage = product.image
  return (
    
    <div className="card mx-2"  style={{width: "18rem"}}>
            <img src={product.image && require(`C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/backend/images/${product.image}`)} className="card-img-top" alt={productimage} />
            <div class="card-body">
                <h5 class="card-title">{product.title}</h5>
                <h3 class="card-text">{product.price}</h3>
                <Link to={`/productdetail/${product._id}`} className="btn btn-dark">Buy Now</Link>
            </div>
        </div>
  )
}

export default ProductItem