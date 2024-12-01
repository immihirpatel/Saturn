import React from 'react'
import Product from './Product'
import "C:/Users/mihir/OneDrive/Desktop/React - Projects/Saturn/saturn/src/App.css"
import { Link } from 'react-router-dom'
const Home = (props) => {
  const {showAlert} = props
  const {product} = props
  return (
    <>
    <section className='home' id='home'>
      <div className='home-text'>
        <h1><span>Revolve Around Savings,</span><br/><span>Only on Saturn!</span></h1>
        <p>Curated collections that bring the best of the cosmos to your door.</p>
        <Link to="/productdetails" className="btn btn-dark">Shop Now</Link>
      </div>
    </section>
   
    <div>
      < Product/>
    </div>

    </>
  )
}

export default Home