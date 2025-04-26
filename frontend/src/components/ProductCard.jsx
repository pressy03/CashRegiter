import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function ProductCard({ product, onDelete, onEdit, discount }) {
  const { user } = useAuth()

  const handleDelete = async () => {
    if (confirm('Сигурен ли си, че искаш да изтриеш този продукт?')) {
      await api.post(`/deleteProduct.php?id=${product.id}`)
      onDelete?.()
    }
  }

  const price = parseFloat(product.price)
  const finalPrice = discount ? (price * 0.9).toFixed(2) : price.toFixed(2)

  return (
    <div className='border rounded-md overflow-hidden hover:shadow-lg transition bg-white relative'>
      <Link to={`/products/${product.id}`}>
        <img src={product.image_url} alt={product.title} className='w-full h-40 object-cover' />
        <div className='p-4'>
          <h3 className='font-semibold text-lg'>{product.title}</h3>
          {discount ? (
            <p className='text-red-600 font-semibold'>
              {finalPrice} лв. <span className='line-through text-gray-500 ml-1'>{price.toFixed(2)} лв.</span> <span className='text-xs'>(отстъпка 10%)</span>
            </p>
          ) : (
            <p className='text-blue-600 font-semibold'>{price.toFixed(2)} лв.</p>
          )}
          <p className='text-yellow-500'>{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
        </div>
      </Link>
      {user?.role === 'admin' && (
        <div className='absolute top-2 right-2 flex gap-1'>
          <button onClick={() => onEdit?.(product)} className='bg-yellow-500 text-white text-xs px-2 py-1 rounded'>Редактирай</button>
          <button onClick={handleDelete} className='bg-red-600 text-white text-xs px-2 py-1 rounded'>Изтрий</button>
        </div>
      )}
    </div>
  )
}
export default ProductCard
