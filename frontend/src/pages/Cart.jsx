import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cart(){
  const { items, remove, checkout } = useCart()
  const [payment,setPayment]=useState('cod')
  const [done,setDone]=useState(false)
  const navigate = useNavigate()

  const total = items.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2)

  const submit = async () => {
    await checkout(payment)
    setDone(true)
    setTimeout(()=>navigate('/'),2000)
  }

  if(done) return <div className='max-w-md mx-auto p-4 text-green-600'>Поръчката е изпратена!</div>

  return(
    <main className='max-w-3xl mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Количка</h1>
      {items.length===0 ? <p>Количката е празна.</p> : (
        <>
          <table className='w-full mb-4 border'>
            <thead><tr><th className='border p-2'>Продукт</th><th className='border p-2'>Цена</th><th className='border p-2'>Кол-во</th><th></th></tr></thead>
            <tbody>
              {items.map(i=>(
                <tr key={i.id}>
                  <td className='border p-2'>{i.title}</td>
                  <td className='border p-2'>{i.price} лв.</td>
                  <td className='border p-2'>{i.qty}</td>
                  <td className='border p-2'><button onClick={()=>remove(i.id)} className='text-red-600'>✖</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className='font-semibold mb-4'>Общо: {total} лв.</p>

          <label className='block mb-2'>Метод на плащане:</label>
          <select value={payment} onChange={e=>setPayment(e.target.value)} className='border p-2 rounded mb-4'>
            <option value='cod'>Наложен платеж</option>
            <option value='iban'>IBAN</option>
            <option value='crypto'>Крипто</option>
          </select>

          {payment==='iban' && (
            <p className='mb-4'>Моля, преведете сумата по IBAN: <strong>BG80BNBG96611020345678</strong></p>
          )}
          {payment==='crypto' && (
            <p className='mb-4'>Крипто портфейл: <strong>0x1234567890abcdef1234567890abcdef12345678</strong></p>
          )}

          <button onClick={submit} className='bg-blue-600 text-white p-2 rounded'>Поръчай</button>
        </>
      )}
    </main>
  )
}

export default Cart
