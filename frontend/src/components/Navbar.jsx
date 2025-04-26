import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar(){
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  return(
    <header className='shadow-md bg-white'>
      <div className='max-w-5xl mx-auto flex items-center justify-between p-4'>
        <Link to='/' className='flex items-center gap-2'>
          <img src='https://png.pngtree.com/png-vector/20190811/ourmid/pngtree-beautiful-calculator-line-black-icon-png-image_1659202.jpg' alt='logo' className='w-8 h-8'/>
          <span className='font-semibold'>Касови апарати</span>
        </Link>
        <nav className='flex gap-4 items-center'>
          <Link to='/' className={pathname==='/'?'font-bold':''}>Начало</Link>
          <Link to='/products' className={pathname.startsWith('/products')?'font-bold':''}>Продукти</Link>
          <Link to='/contact' className={pathname==='/contact'?'font-bold':''}>Контакти</Link>
          <Link to='/cart' className={pathname==='/cart'?'font-bold':''}>Количка</Link>
          {user && <Link to='/service' className={pathname==='/service'?'font-bold':''}>Сервиз</Link>}
          {user ? (
            <>
              <span className='text-sm text-gray-600'>Здрасти, {user.username}{user.role==='admin'&&' (admin)'}</span>
              <button onClick={logout} className='text-blue-600 underline'>Изход</button>
            </>
          ) : (
            <>
              <Link to='/login' className={pathname==='/login'?'font-bold':''}>Вход</Link>
              <Link to='/register' className={pathname==='/register'?'font-bold':''}>Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
export default Navbar