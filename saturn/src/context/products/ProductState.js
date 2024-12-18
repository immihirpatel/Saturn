import productContext from "./ProductContext";
import { useState } from "react";
import React from 'react'

const ProductState = (props) => {
  const host = "http://localhost:5000"
  const productInitial = []
  const specificProd = []
  //const cartInitial = []
  const [product, setProduct] = useState(productInitial)
  const [specificproduct, setSpecificproduct] = useState(specificProd)
  const [category, setcategory] = useState(null)

  const [cart, setcart] = useState([])
  const authtoken = localStorage.getItem("token")
  const getProduct = async () => {
  
    const response = await fetch(`${host}/api/product/getproduct`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    const json = await response.json()
    setProduct(json)
  }
  const getSpecificproduct = async (id) => {
    const response = await fetch(`${host}/api/product/getspecificproduct/${id}`, {
      method: "GET"
    });
    const json = await response.json()
    setSpecificproduct(json)
  }
  const getcategory = async (id) => {
    const response = await fetch(`${host}/api/product/getcategory/${id}`, {
      method: "GET"
    });
    const json = await response.json()
    setcategory(json)
  }
  const getCart = async()=>{
    const response = await fetch(`${host}/api/cart/viewcart`,{
      method:"POST",
      headers:{
        "auth-token":authtoken
      }
    });
    const json = await response.json()
    
    setcart(json)
    

  }
  const deletecart = async(id)=>{
    const response = await fetch(`http://localhost:5000/api/cart/deletecart/${id}`,{
      method:"POST",
      headers:{
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MGJlOTc4NjRkYjUzMTI0NTMwMGFlIn0sImlhdCI6MTcwMjkzODAyOH0.X6-jB8n5KmKDxbYICsoKPhzzlXdeAxAB_JZ8z0i7aZY"
      }
    })
    const newcart = cart.filter((crt)=>{return crt._id!==id})

    setcart(newcart)
  }

 const updatecart = async(index,id,prdid,newqty,newtotal)=>{
 
  const response = await fetch(`http://localhost:5000/api/cart/updatecart/${id}`,{
      method:"PUT",
      headers:{
        "content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MGJlOTc4NjRkYjUzMTI0NTMwMGFlIn0sImlhdCI6MTcwMjkzODAyOH0.X6-jB8n5KmKDxbYICsoKPhzzlXdeAxAB_JZ8z0i7aZY",
        "productid": prdid
      },
      body:JSON.stringify({qty:newqty,total:newtotal})
    })
    let newCart = JSON.parse(JSON.stringify(cart))
    
    for (let index = 0; index<cart.length;index++){
      const element = newCart[index]
     
      if (element._id === id){
        newCart[index].qty = newqty;
        newCart[index].total = newtotal;
      }
    }
    setcart(newCart)
  
 }

 

 
  return (
    <productContext.Provider value={{ product, getProduct, getSpecificproduct, specificproduct, getcategory, category,cart,getCart,deletecart,updatecart }}>
      {props.children}
    </productContext.Provider>
  )
}

export default ProductState