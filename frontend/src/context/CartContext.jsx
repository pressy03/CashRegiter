import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart')||'[]'))
  const { user } = useAuth()

  useEffect(()=>{localStorage.setItem('cart',JSON.stringify(items))},[items])

  const add = (product, qty = 1) => {
    if (!user || !user.username) {
      alert("🔒 Моля, влез в профила си, за да добавиш продукт в количката.")
      return
    }
  
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id)
      if (idx > -1) {
        const clone = [...prev]
        clone[idx].qty += qty
        return clone
      }
      return [...prev, { ...product, qty }]
    })
  }
  

  const remove = id => setItems(prev=>prev.filter(i=>i.id!==id))
  const clear = () => setItems([])

  const checkout = async (payment_method) => {
    const payload = {
      payment_method,
      items: items.map(i=>({product_id:i.id, quantity:i.qty, price: i.price}))
    }
    const res = await api.post('/addOrder.php', payload)
    clear()
    return res
  }

  return (
    <CartContext.Provider value={{ items, add, remove, clear, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
