import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Service from './pages/Service'

function App(){
  return(
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <div className='min-h-screen flex flex-col'>
          <Navbar/>
          <div className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/products/:id' element={<ProductDetails/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/service' element={<Service/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}
export default App