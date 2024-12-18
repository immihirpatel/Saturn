import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductState from './context/products/ProductState';
import UserState from './context/user/UserState';
import ProductDetails from './components/ProductDetails';
import CartDetails from './components/CartDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Searchresult from './components/Searchresult';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';
import Cancel from './components/Cancel';
import Success from './components/Success';

function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {

    setAlert({
      msg: message,
      type: type
    })
    
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
    <ProductState>
      <UserState>
    <Router>
    <Navbar />
    
    <Alert alert={alert} />
    <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/productdetail/:id" element={<ProductDetails/>} />
        <Route exact path="/cartdetail" element={<CartDetails/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/searchresult" element={<Searchresult/>} />
        <Route exact path="/login" element={<Login  showAlert={showAlert}/>} />
        <Route exact path="/success" element={<Success/>} />
        <Route exact path="/cancel" element={<Cancel/>} />
      </Routes>
    </div>
    <Footer/>
  </Router>
  </UserState>
  </ProductState>
  </>
  );
}

export default App;
