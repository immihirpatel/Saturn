// src/components/Footer.js
import React from 'react';
import 'C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/css/Footer.css';  // Ensure you have this CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
        <section className="newsletter" id="contact">
      <h2>Subscribe to Newsletter</h2>
      <div className='news-box'>
        <input type="email" className="form-control" placeholder="Enter your email...."/>
        <Link to="/" class="btn btn-dark">Subscribe</Link>
      </div>
    </section>
   <section className='footer' id="footer">
        <div className='footer-box'>
            <h2>Saturn</h2>
            <p>At Saturn, we prioritize quality and customer satisfaction. Explore our wide range of products and experience seamless shopping.</p>
            <div className='social'>
                <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
                &nbsp;<Link to="/"><i className="fa-brands fa-twitter"></i></Link>
                &nbsp;<Link to="/"><i className="fa-brands fa-instagram"></i></Link>
            </div>
        </div>
        <div className='footer-box'>
            <h3>Services</h3>
            <li><Link to="/">Product</Link></li>
            <li><Link to="/">Help & Support</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">FAQ</Link></li>
        </div>
        <div className='footer-box'>
            <h3>Product</h3>
            <li><Link to="/">Grocery</Link></li>
            <li><Link to="/">Home Appliances</Link></li>
            <li><Link to="/">Fashion</Link></li>
            <li><Link to="/">Electronics</Link></li>
        </div>
        <div class="footer-box contact-info">
            <h3>Contact</h3>
            <span>New York City, USA 10004</span>
            <span>+1 100 1004 0001</span>
            <span>mihir@saturn.com</span>
            
        </div>
   </section> 
   <div class="copyright">
        <p>&#169; Saturn 2024 All Right Reserved.</p>
    </div>
    </>
    );
}

export default Footer;
