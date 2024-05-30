import React, { useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import productContext from '../context/products/ProductContext'
import '../App.css'


import Mobile from './product_components/Mobile'
import Cloth from './product_components/Cloth'
import Book from './product_components/Book'
import Cosmetic from './product_components/Cosmetic'
import Grocery from './product_components/Grocery'
import Headphone from './product_components/Headphone'
import Television from './product_components/Television'
import Watch from './product_components/Watch'


const ProductDetails = (props) => {
  const context = useContext(productContext)
  const { specificproduct, getSpecificproduct, getcategory, category } = context
  const { id } = useParams()
 


  useEffect(() => {
    getSpecificproduct(id)
    getcategory(id)
    
  }, [id]);

  const categoryname = category && category
  const categoryComponents = {
    Mobile: <Mobile specificproduct={specificproduct} />,
    Book: <Book specificproduct={specificproduct} />,
    Cosmetic: <Cosmetic specificproduct={specificproduct}/>,
    Watch: <Watch specificproduct={specificproduct}/>,
    Grocery: <Grocery specificproduct={specificproduct} />,
    Headphone: <Headphone specificproduct={specificproduct} />,
    Television: <Television specificproduct={specificproduct}/>,
    Cloth: <Cloth specificproduct={specificproduct} />,
  };
  const selectedComponent = categoryComponents[categoryname] || <Mobile specificproduct={specificproduct} />;
  return selectedComponent;

}

  export default ProductDetails