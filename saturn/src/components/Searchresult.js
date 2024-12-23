import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Card.css'

const Searchresult = () => {
    const location = useLocation()
  const filterproducts =location.state

  return (
    <div className='row my-4 justify-content-center'>
    {filterproducts.map((prd, index) => (
    <div className="card mx-3 my-2"  style={{width: "18rem"}}>

    <Link to={`/productdetail/${prd._id}`}> <img  src={prd.image && require(`C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/public/images/${prd.image}`)} className="card-img-top my-3"  />
    </Link>
     <div class="card-body">
         <h5 class="card-title">{prd.title}</h5>
         <h3 class="card-text">${prd.price}</h3>
         <Link to={`/productdetail/${prd._id}`} className="btn btn-dark">Buy Now</Link>
     </div>
    </div>
    ))}
    </div>
)
}

export default Searchresult
