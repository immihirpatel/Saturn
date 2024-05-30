import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import productContext from '../context/products/ProductContext';
const Checkout = () => {

    const location = useLocation()
    const { subtotal,crt_qty } = location.state || {}
    const context = useContext(productContext)
    const { cart } = context
    let newqty = 0
    let newtotal = 0 
    let [qty, setqty] = useState(0)
    const [total, settotal] = useState(JSON.parse(localStorage.getItem('total')))
    const [card, setcard] = useState({ name: "", cardnumber: "", expdate:"", cvv:""})

    useEffect(()=>{
        console.log("in use effect1")
        localStorage.setItem("qty",JSON.stringify(qty))
        localStorage.setItem("total",JSON.stringify(total))
    },[qty,total])

    useEffect(() => {
        for (let x in crt_qty){
            qty += crt_qty[x]
        }
        setqty(qty)
    },[])

    const onchange =(e)=>{
        setcard({...card,[e.target.name]:e.target.value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/card/addcard",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NmQ1ZTEyMDg1NzY5OTc2ZjFjNzVjIn0sImlhdCI6MTcxNjc4MDU0N30.gUmL44GDpUfNjc8kXfDcFceAjR0acybi0dlzVQTKi2A"
            },
            body: JSON.stringify({name:card.name,cardnumber:card.cardnumber,expdate:card.expdate,cvv:card.cvv})
        })
        const json = await response.json()

    }

    const tax = (subtotal*13/100).toFixed(2)
    const order_total = (parseFloat(tax) + parseFloat(subtotal)).toFixed(2)
    const ref = useRef(null);
    const selectedpaymentmethod = (method) => {
        if (method === "Debit/Credit"){
            ref.current.click()
        }
        document.getElementById('selectedPaymentMethod').innerText = method;
    }
    const selectedshippingmethod = (method) => {
        document.getElementById('selectedShippingMethod').innerText = method;
    }
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Debit/Credit Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlesubmit}>
                                <div className="mb-3">

                                    <input type="text" placeholder='Name' className="form-control" id="name" name="name" onChange={onchange} />

                                </div>
                                <div className="mb-3">

                                    <input type="text" placeholder='Card Number' className="form-control" id="cardnumber" name="cardnumber" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Expiry Date</label>
                                    <input type="text" style={{ width: "100px" }} placeholder='mm-yyyy' pattern="^(0[1-9]|1[0-2])-(20[2-9][0-9])$" className="form-control" id="expdate" name="expdate" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" style={{ width: "100px" }} maxLength="3" placeholder='CVV' className="form-control" id="cvv" name="cvv" onChange={onchange} />
                                </div>
                                <button type="submit" className="btn btn-dark">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12 my-4' style={{ border: "1px solid black", borderRadius: "20px" }}>
                    <h2>Checkout</h2>
                    <form className='my-4 ' style={{ width: "100%" }}>
                        <div className="form-group">
                            <label for="exampleInputEmail1"><b>Shipping Address</b></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">
                                Same as Shipping Address
                            </label>
                        </div>
                        <div className="form-group my-2">
                            <label ><b>Billing Address</b></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <b>Payment Method</b>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => selectedpaymentmethod('Debit/Credit')} >Debit/Credit</a></li>
                                    <li><a className="dropdown-item" onClick={() => selectedpaymentmethod('Cash on Delivery')} >Cash on Delivery</a></li>
                                </ul>
                                <span id="selectedPaymentMethod" style={{ marginLeft: '10px' }}></span>
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <div className="dropdown">
                                <button className="btn btn-outline-dark dropdown-toggle my-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <b>Shipping Method</b>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => selectedshippingmethod('Standard Shipping(3-4 Business Days)')} >Standard Shipping(3-4 Business Days)</a></li>
                                    <li><a className="dropdown-item" onClick={() => selectedshippingmethod('Same Day Shipping')} >Same Day Shipping </a></li>
                                </ul>
                                <span id="selectedShippingMethod" style={{ marginLeft: '10px' }}></span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark my-1">Place Order</button>
                    </form>
                </div>
                <div className='col-md-5 mx-md-5 col-sm-12 my-4' style={{ border: "1px solid black", borderRadius: "20px" }}>
                    <h2>Order Summary</h2>
                    <table class="table table-hover my-4">
                        <tbody>
                            <tr>
                                <th scope="row">Items({qty}): </th>
                                <td>${subtotal}</td>
                            </tr>
                            <tr>
                                <th scope="row">Shipping & Handling: </th>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Total Before Tax: </th>
                                <td>${subtotal}</td>
                            </tr>
                            <tr>
                                <th scope="row">Estimated Tax: </th>
                                <td>${tax}</td>
                            </tr>
                            <tr >
                                <th scope="row" style={{fontSize:"x-large",color:"maroon"}}>Order Total: </th>
                                <td style={{fontSize:"x-large",color:"maroon"}}>${order_total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/"  type="button" className="btn btn-dark my-5">Shop More</Link>
                </div>
            </div>
        </> 
    )
}

export default Checkout