import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productContext from '../context/products/ProductContext'
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const context = useContext(productContext)
  const { getCart, cart, deletecart,updatecart } = context
  let total = 0
  

  const [crt_qty, setcrt_qty] = useState(JSON.parse(localStorage.getItem('crt_qty'))||{});
  const [amt, setamt] = useState(JSON.parse(localStorage.getItem('amt'))||{});
  const [subtotal, setsubtotal] = useState()
  
 // const [cartitem, setcartitem] = useState(JSON.parse(localStorage.getItem('cartitem'))||{})
 const state = {
  subtotal:subtotal,
  crt_qty: crt_qty,
  cart_whl:cart
};
  useEffect(() => {
    getCart()
  },[Cart]);

  useEffect(()=>{
    let total = 0
    
    if(Object.keys(amt).length<cart.length){
      
      cart && cart.map((crt)=>{
        total += crt.total
      })
      
    }
    else{
      Object.keys(amt).forEach((index)=>{
        total += amt[index]
      })
    }

    setsubtotal((total).toFixed(2))
  },[cart,amt,crt_qty])

  useEffect(()=>{
    localStorage.setItem('crt_qty',JSON.stringify(crt_qty));
    localStorage.setItem('amt',JSON.stringify(amt));
  },[crt_qty,amt,subtotal])

 
//?cartitem.total:crt.product.price*crt.qty
  const handleminus=async(index,id,prdid,price,qty,total)=>{
    let newqty = crt_qty[index] ? crt_qty[index] - 1 : qty - 1;
    let newtotal = amt[index] ? amt[index] - price : total - price;
    if(newqty>=1){
    await updatecart(index,id,prdid,newqty,newtotal)
    setcrt_qty({...crt_qty,[index]:newqty});
    setamt({...amt,[index]:newtotal});
  }
}
//makePayment function is using stripe module for payment integration 
const makePayment = async() => {
  const stripe = await loadStripe("pk_test_51QS3fkRpvZEOPvzhQRhJ0U70nn0omeiVnlDl0yUv6RRpaietIszWn7d4MMUj1G3gg4QZzbv6XJpIVPdTZPxseUNH00tQPsYzb2")
  const body = {
    products:cart
  }
  const response = await fetch ('http://localhost:5000/api/order/create-checkout-session',{
    method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(body)
  })
  const session = await response.json();
  const result = stripe.redirectToCheckout({
    sessionId:session.id
  })
  console.log(session)
  if(result.error){
    console.log(result.error)
  }
}


  const handleplus=async(index,id,prdid,price,qty,total)=>{
  
    let newqty = crt_qty[index] ? crt_qty[index]+ 1 : qty + 1;
    let newtotal = amt[index] ? amt[index]+ price : total + price;

    await updatecart(index,id,prdid,newqty,newtotal)
    setcrt_qty({...crt_qty,[index]:newqty});
    setamt({...amt,[index]:newtotal});

  }
  const handledelete = async(id,index)=>{
    deletecart(id);
    const updatedqty = {}
    const updatedtotal = {}

   Object.keys(crt_qty).forEach(key=>{
    const itemIndex = parseInt(key)
    if(itemIndex !== index){
      updatedqty[itemIndex>index?itemIndex-1:itemIndex] = crt_qty[key]
      updatedtotal[itemIndex>index?itemIndex-1:itemIndex] = amt[key]
    }
   });
   setcrt_qty(updatedqty)
   setamt(updatedtotal)
  }
  return (
    <>
      <div className='container my-5 ' style={{ border: "1px solid black", borderRadius: "5px" }}>
        <h2>Shopping Cart</h2>
        <div className='row mb-4 my-3'>
          {Array.isArray(cart) && cart.map((crt, index) => (
            <div className='row' key={index}>
              <div className='col-md-5 col-sm-12 d-flex flex-column align-items-center my-3'>
                <img src={crt.product && require(`C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/backend/images/${crt && crt.product.image}`)} alt="Loading..." className='cartimage img-fluid' />
              </div>
              <div className='col-md-7  my-3'>
                {crt && crt.product.title} <br />
                <h4>$ {amt[index]?(amt[index]).toFixed(2):(crt.product.price*crt.qty).toFixed(2)}</h4>
                <div className='align-items-center'><button type="button" className="btn btn-dark px-3 d-inline" onClick={()=>handleminus(index,crt._id,crt.product._id,crt.product.price,crt.qty,crt.total)} style={{ marginRight: "10px", fontSize: "20px", fontWeight: "bold" }}>-</button>
                  <b>{crt_qty[index]?crt_qty[index]:crt.qty}</b>
                  <button type="button" className="btn btn-dark px-3 " onClick={()=>handleplus(index,crt._id,crt.product._id,crt.product.price,crt.qty,crt.total)} style={{ marginLeft: "13px", fontSize: "1.2em", fontWeight: "bold" }}>+</button>
                  <i class="fa-solid fa-trash d-flex justify-content-end" onClick={()=>handledelete(crt._id,index)} style={{ color: "#010813", fontSize: "25px" }}></i>
                </div>
              </div>
            </div>
          ))}
        
        </div>
        <div className='d-flex justify-content-end my-2'><Link  state={state} onClick={makePayment} className="btn btn-dark">Proceed To Checkout ${subtotal}</Link></div>
      </div>
    </>
  )
}

export default Cart