import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  )
}

export default App