import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login(){
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [form,setForm]=useState({username:'',password:''})
  const [error,setError]=useState('')
  if(user) return <Navigate to='/' replace/>
  const submit=async e=>{
    e.preventDefault()
    try{
      await login(form)
      navigate('/')
    }catch{
      setError('Грешно потребителско име или парола')
    }
  }
  return(
    <main className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Вход</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <form onSubmit={submit} className='border rounded p-4 flex flex-col gap-2 bg-white'>
        <input required value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder='Потребителско име' className='border p-2 rounded'/>
        <input required type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder='Парола' className='border p-2 rounded'/>
        <button className='bg-blue-600 text-white p-2 rounded'>Вход</button>
      </form>
    </main>
  )
}
export default Login
