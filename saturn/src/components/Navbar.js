// Navbar.js (or any other component name)

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productContext from '../context/products/ProductContext'
import "C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Navbar.css"
import userContext from '../context/user/UserContext';


const Navbar = (props) => {
    const [searchitem, setsearchItem] = useState("");
    const context = useContext(productContext)
    const usercontext = useContext(userContext)
    const [showsuggestion,setshowsuggestion] = useState(true)
    const { product, getProduct } = context
    //const {user,getUser} = usercontext
    const [userName, setUserName] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    
    const fetchuserName = async() => {
        const authtoken = localStorage.getItem("token");
        console.log("Saved token",typeof authtoken) //type of authtoken is string
    
        if(!authtoken){
            console.warn("No auth token found");
            return;
        }
        try{
            const response = await fetch('http://localhost:5000/api/auth/getuser', {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "auth-token":authtoken
                }
              });
              const json = await response.json();
              console.log("Fetched user data:", json);
              setUserName(json.name)
              console.log(json.name)
        }catch(error){
            console.error("Error fetching user data", error)
        }
    }
   

    useEffect(() => {
        getProduct();
        fetchuserName();
    }, [localStorage.getItem("token")])
   
    const filterproducts = product.filter((prd) => {
        if (searchitem == "") {

        }
        else {
            return prd.title.toLowerCase().includes(searchitem.toLowerCase())
        }
    })

    const handlesearch = (e) => {
        e.preventDefault()
        setshowsuggestion(true)
    }

    const handlesuggestionclick = (e) =>{
        setshowsuggestion(false)
    }

    const handleLogout = () =>{
        localStorage.removeItem("token");
        setUserName(null);
    }

   
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
                <div className="container-fluid">
                    <div className='container d-flex col-md'>
                        <div className='d-none d-lg-flex'>
                            <span className='logo'>Saturn</span>
                        </div>
                        <div className='d-lg-none'>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <span className='logo' style={{marginLeft:"10px"}}>Saturn</span>
                        </div>
                        <div className='d-lg-none ms-auto d-flex align-items-center' style={{ marginLeft: "50%" }}>
                            <Link style={{ color: "white", marginRight: "15px" }} to="/cart"> <i className="fa-regular fa-user fa-2xl" style={{ color: "#ffffff;" }}></i></Link>
                            <Link style={{ color: "white" }} to="/cart"><i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: "#121212;" }}></i></Link>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse col-md-4 justify-content-start" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div className='container d-flex justify-content-center'>
                        <form className="d-flex w-75 w-lg-50 my-2" onSubmit={handlesearch} >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => {
                                setsearchItem(e.target.value)
                                setshowsuggestion(true)
                            }} />


                            <Link to={"/searchresult"} state={filterproducts}><button className="btn btn-sm btn-outline-secondary" onClick={handlesuggestionclick} type="submit"> <i className="fa-solid fa-magnifying-glass  fa-2xl" style={{ color: "white", marginTop: "15px" }}></i></button></Link>
                            {showsuggestion && filterproducts.length > 0 && (
                                <div className="suggestion-box">
                                    {filterproducts.map((prd, index) => (
                                        <div key={index} className="suggestion-item">
                                            <Link style={{textDecoration:"none",color:"black"}} to={`/productdetail/${prd._id}`} onClick={handlesuggestionclick}>{prd.title}</Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </form>

                    </div>


                    <div className='d-none ms-auto d-lg-flex  align-items-center'>

                    {userName ? (
                        <div className='dropdown'>
                            <span style={{ color: "white", marginRight: "15px", cursor:"pointer" }}
                            onClick={()=>{setShowDropdown(!showDropdown)}}>
                                Hello, {userName}
                            </span>
                            {
                                showDropdown && (
                                    <div className='dropdown-menu show' style={{position:"absolute",top:"40px",right:"10px"}}>
                                        <button className='dropdown-item' onClick={handleLogout}>Logout</button>
                                    </div>
                            )}
                            </div>
                        ) : (
                            <Link className="mr-3" style={{ color: "white" }} to="/login">
                                <i className="fa-regular fa-user fa-2xl" style={{ color: "#ffffff;" }}></i>
                            </Link>
                        )}
                        <Link style={{ color: "white" }} to="/cart"><i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: "#121212;" }}></i></Link>
                    </div>
                </div>
            </nav>

           

        </>
    );
};

export default Navbar;
