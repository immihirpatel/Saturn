import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ProductState from './context/products/ProductState';
import ProductDetails from './components/ProductDetails';
import CartDetails from './components/CartDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
function App() {
  return (
    <>
    <ProductState>
    <Router>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/productdetail/:id" element={<ProductDetails/>} />
        <Route exact path="/cartdetail" element={<CartDetails/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
      </Routes>
    </div>
  </Router>
  </ProductState>
  </>
  );
}

export default App;
