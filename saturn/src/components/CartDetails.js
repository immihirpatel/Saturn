import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import productContext from '../context/products/ProductContext'

const CartDetails = () => {
  const location = useLocation()
  const specificproduct =location.state
  const context = useContext(productContext)
  const {getCart,cart} = context
  const [subtotal, setsubtotal] = useState(0)
  const [crt_qty, setcrt_qty] = useState(JSON.parse(localStorage.getItem('crt_qty'))||{});
  const [amt, setamt] = useState(JSON.parse(localStorage.getItem('amt'))||{});
  let net_total =0

  useEffect(()=>{
    getCart()
  },[cart])
  
  useEffect(()=>{
    const updatedqty = {};
    const updatedtotal = {};
    cart && cart.map((crt,index)=>{
      net_total = net_total + crt.total
      updatedqty[index]=crt.qty
      updatedtotal[index] = crt.total
      return net_total
    })
    setcrt_qty(updatedqty)
    setamt(updatedtotal)
    localStorage.setItem('crt_qty',JSON.stringify(updatedqty));
    localStorage.setItem('amt',JSON.stringify(updatedtotal));
    setsubtotal(net_total)
  },[cart])


 
  return (
    <div className="row my-5 d-flex justify-content-center">
      <div className='col-md-6 my-5 col-sm-12 d-flex flex-column align-items-center border-md-right border-sm-0' style={{borderRight:"1px solid black"}}  >
      <img src={specificproduct.product && require(`${process.env.REACT_APP_PATHOFIMAGES}/${specificproduct.product.image}`)} alt="Loading..." className='cartdetailimage img-fluid' />
      <p className='text-center' style={{fontSize:"x-large"}}>
        <i className="fa-solid fa-circle-check my-2" style={{color: "#286520"}}></i>
         &nbsp; Added to Cart
         </p>
         This item is eligible for FREE Delivery
      </div>
      <div className='col-md-6 col-sm-12 my-4  d-flex flex-column align-items-center'>
          <p className='my-3' style={{fontSize:"x-large"}}>Cart Subtotal:{subtotal}$</p>
         <Link to="/checkout" state={cart} type="button" className="btn cstm_btn btn-dark">Proceed to Checkout</Link>
    
         <Link to="/cart" state={specificproduct} type="button" className="btn cstm_btn btn-outline-dark my-2">Go to Cart</Link>
          
      </div>
      
  </div>
  )
}

export default CartDetails