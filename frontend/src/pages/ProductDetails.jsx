import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function ProductDetails(){
  const { id } = useParams()
  const [product,setProduct]=useState(null)
  const { add } = useCart()
  const { user } = useAuth()   
  
  useEffect(()=>{api.get(`/getProduct.php?id=${id}`).then(setProduct)},[id])
  if(!product) return null

  const addToCart = () => add(product,1)
  console.log('User in ProductDetails:', user)

  return(
    <main className='max-w-3xl mx-auto p-4'>
      <img src={product.image_url} alt={product.title} className='w-full h-64 object-cover rounded'/>
      <h1 className='text-3xl font-semibold mt-4'>{product.title}</h1>
      <p className='text-yellow-500 text-xl'>{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</p>
      <p className='text-xl text-blue-600 font-semibold mt-2'>{product.price} лв.</p>
      <p className='mt-4'>{product.description}</p>
      <button onClick={addToCart} className='bg-green-600 text-white p-2 mt-4 rounded'>Добави в количката</button>
      <Link to='/products' className='inline-block mt-6 text-blue-600'>← Назад</Link>
    </main>
  )
}
export default ProductDetails
