import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import api from '../services/api'

function Service(){
  const { user } = useAuth()
  const [description,setDescription]=useState('')
  const [sent,setSent]=useState(false)
  if(!user) return <Navigate to='/login' replace />
  const submit=async e=>{
    e.preventDefault()
    await api.post('/addService.php',{description})
    setSent(true)
    setDescription('')
  }
  return(
    <main className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Заявка за сервиз</h1>
      {sent && <p className='text-green-600'>Заявката е изпратена</p>}
      <form onSubmit={submit} className='border rounded p-4 flex flex-col gap-2 bg-white'>
        <textarea required value={description} onChange={e=>setDescription(e.target.value)} placeholder='Опиши проблема' className='border p-2 rounded'/>
        <button className='bg-blue-600 text-white p-2 rounded'>Изпрати</button>
      </form>
    </main>
  )
}
export default Service
