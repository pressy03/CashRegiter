import { useEffect, useState } from 'react'
import api from '../services/api'

const BRANDS = ['Daisy','Tremol','Datecs','Eltrade']
const SIZES = ['малък','голям']
const FUNCTIONS = ['Преносим','Стационарен']
const CATEGORIES = ['device','consumable']

function ProductForm({ selected, onSaved, onCancel }) {
  const empty = { title:'', price:'', rating:1, description:'', image:'', brand:BRANDS[0], size:SIZES[0], function_type:FUNCTIONS[0], category:'device' }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (selected) {
      setForm({
        title: selected.title || '',
        price: selected.price || '',
        rating: selected.rating || 1,
        description: selected.description || '',
        image: selected.image_url || '',
        brand: selected.brand || BRANDS[0],
        size: selected.size || SIZES[0],
        function_type: selected.function_type || FUNCTIONS[0],
        category: selected.category || 'device'
      })
    } else {
      setForm(empty)
    }
  }, [selected])

  const submit = async e => {
    e.preventDefault()
    if (selected?.id) {
      await api.post(`/updateProduct.php?id=${selected.id}`, form)
    } else {
      await api.post('/addProduct.php', form)
    }
    onSaved()
  }

  return (
    <form onSubmit={submit} className='border rounded p-4 my-4 flex flex-col gap-2 max-w-md bg-white'>
      <input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder='Заглавие' className='border p-2 rounded'/>
      <input required type='number' step='0.01' value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder='Цена' className='border p-2 rounded'/>
      <select value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})} className='border p-2 rounded'>
        {[1,2,3,4,5].map(r=><option key={r} value={r}>{r}</option>)}
      </select>

      <select value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} className='border p-2 rounded'>
        {BRANDS.map(b=><option key={b} value={b}>{b}</option>)}
      </select>

      <select value={form.size} onChange={e=>setForm({...form,size:e.target.value})} className='border p-2 rounded'>
        {SIZES.map(s=><option key={s} value={s}>{s}</option>)}
      </select>

      <select value={form.function_type} onChange={e=>setForm({...form,function_type:e.target.value})} className='border p-2 rounded'>
        {FUNCTIONS.map(f=><option key={f} value={f}>{f}</option>)}
      </select>

      <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className='border p-2 rounded'>
        {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
      </select>

      <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder='Описание' className='border p-2 rounded'/>
      <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder='URL на снимка' className='border p-2 rounded'/>
      <div className='flex gap-2'>
        <button className='bg-blue-600 text-white p-2 rounded'>{selected ? 'Запази промените' : 'Добави'}</button>
        {selected && <button type='button' onClick={onCancel} className='bg-gray-300 p-2 rounded'>Отказ</button>}
      </div>
    </form>
  )
}
export default ProductForm
