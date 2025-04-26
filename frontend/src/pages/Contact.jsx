import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Contact(){
  const { user } = useAuth()
  const [description,setDescription]=useState('')
  const [sent,setSent]=useState(false)
  if(!user) return <Navigate to='/login' replace/>
  const submit=async e=>{
    e.preventDefault()
    await api.post('/addMessage.php',{description})
    setSent(true)
    setDescription('')
  }
  return(
    <main className='max-w-5xl mx-auto p-4 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Контакти</h1>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5815.2837179905555!2d27.926504698300015!3d43.21700060332561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a454184de626bb%3A0xeb881ca089ce1fbf!2z0JzQsNGC0LXQvNCw0YLQuNGH0LXRgdC60LAg0JPQuNC80L3QsNC30LjRjyDigJ7QlC3RgCDQn9C10YLRitGAINCR0LXRgNC-0L3igJw!5e0!3m2!1sbg!2sbg!4v1745500475051!5m2!1sbg!2sbg' width='100%' height='450' style={{border:0}} allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'/>
        </div>
        <form onSubmit={submit} className='flex-1 border rounded p-4 flex flex-col gap-2 bg-white'>
          {sent && <span className='text-green-600'>Съобщението е изпратено</span>}
          <textarea required value={description} onChange={e=>setDescription(e.target.value)} placeholder='Описание' className='border p-2 rounded'/>
          <button className='bg-blue-600 text-white p-2 rounded'>Изпрати</button>
        </form>
      </div>
    </main>
  )
}
export default Contact
