// Navbar.js (or any other component name)

import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className='d-flex'>
                        <div className='d-none d-lg-flex'>
                            <a className="navbar-brand" href="/#">Saturn</a>
                        </div>
                        <div className='d-lg-none'>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand m-2" href="/#">Saturn</a>
                        </div>
                            <div className='d-lg-none ml-auto'>
                                <Link style={{color:"white"}} to="/cart"><i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: "#121212;" }}></i></Link>
                            </div>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                        <form className="d-flex " style={{ width: "50%" }} >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-sm btn-outline-secondary" type="submit"> <i className="fa-solid fa-magnifying-glass  fa-2xl" style={{ color: "white", marginTop: "15px" }}></i></button>
                        </form>
                    </div>
                    <div className='d-none d-lg-flex '>
                        <Link style={{ color: "white" }} to="/cart"><i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: "#121212;" }}></i></Link>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
