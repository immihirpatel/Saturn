import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Cosmetic = (props) => {
  const {specificproduct}=props
  let cart_total = 0
  cart_total = cart_total + (specificproduct.product && specificproduct.product.price)
  const [subtotal, setsubtotal] = useState(null)

  const details = [
    {label:'Brand Name', value:specificproduct.brand_name},
    {label:'Item Type', value:specificproduct.item_type},
    {label:'Item Weight', value:specificproduct.item_weight}
  ]
  const handleclick = async() =>{
    const response = await fetch("http://localhost:5000/api/cart/addtocart",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MGJlOTc4NjRkYjUzMTI0NTMwMGFlIn0sImlhdCI6MTcwMjkzODAyOH0.X6-jB8n5KmKDxbYICsoKPhzzlXdeAxAB_JZ8z0i7aZY",
        "productid":specificproduct.product && specificproduct.product._id
      },
      body: JSON.stringify({total:cart_total})
    });
    const json = await response.json()
    setsubtotal(cart_total)
  }
  return (
   
    <div className='container-xl my-5'>
    <div className='row' >
      <div className='col-sm-4'>
        <img src={specificproduct.product && require(`C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/backend/images/${specificproduct.product.image}`)} alt="Loading..." className='imgsize' />
      </div>
      <div className='col-sm-7'>
        <h3 className='font_style'>{specificproduct.product && specificproduct.product.title}</h3>
        <div>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <div className='my-2'>
          <span style={{ fontSize: "0.7em", display: "inline-block" }}>$</span>
          <span style={{ display: "inline-block", fontSize: "1.5em" }}><h2>{specificproduct.product && specificproduct.product.price}</h2></span>
          <span style={{ fontSize: "0.7em", display: "inline-block" }}>.00</span>
          <span className='mx-4'>{specificproduct.product&&specificproduct.product.qty>0?<span className='qty_style1'>In Stock</span>:<span className='qty_style2'>Out of Stock</span>}</span>
        </div>
        <div>
        
        </div>
        <div className='container d-flex'><button type="button" className="btn btn-dark btn_style ">Buy Now</button>
        <Link to="/cartdetail" state={specificproduct} onClick={handleclick} className="btn btn-dark btn-block btn_style mx-2" >Add to Cart</Link>
        </div>
     
        
        <table className='table mt-4'> 
      <tbody>
        {details.map((detail,index)=>(
          <tr key={index}>
            <td style={{fontWeight:"bold"}}>{detail.label}</td>
            <td>{detail.value}</td>
          </tr>
        ))}
      </tbody>
      </table>
      <div className='font_style'>Overview</div>
        <p style={{ textAlign: "justify" }}>{specificproduct.product && specificproduct.product.description}</p>
      </div>

    </div>
  </div>


  )
}

export default Cosmetic