import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import ProductForm from '../components/ProductForm'

function Products(){
  const [products,setProducts]=useState([])
  const [filters,setFilters]=useState({minPrice:'',maxPrice:'',rating:'',brand:'',function_type:''})
  const [editProduct,setEditProduct]=useState(null)
  const { user } = useAuth()
  const [hasDiscount,setHasDiscount]=useState(false)

  const load=()=>api.get('/getProducts.php').then(setProducts)
  useEffect(()=>{load()},[])

  useEffect(()=>{
    if(user){
      api.get('/getStats.php').then(s=>{
        if(s && s.consumableQty>=10) setHasDiscount(true)
      })
    }
  },[user])

  const filtered=products.filter(p=>{
    if(filters.minPrice && Number(p.price)<Number(filters.minPrice)) return false
    if(filters.maxPrice && Number(p.price)>Number(filters.maxPrice)) return false
    if(filters.rating && p.rating<filters.rating) return false
    if(filters.brand && p.brand!==filters.brand) return false
    if(filters.function_type && p.function_type!==filters.function_type) return false
    return true
  })

  return(
    <main className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-2'>Продукти</h1>
      <ProductFilter filters={filters} setFilters={setFilters}/>
      {user?.role==='admin' && (
        <ProductForm selected={editProduct} onSaved={()=>{load();setEditProduct(null)}} onCancel={()=>setEditProduct(null)}/>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filtered.map(p=>
          <ProductCard key={p.id} product={p} onDelete={load} onEdit={setEditProduct} discount={hasDiscount && p.category==='consumable'}/>
        )}
      </div>
    </main>
  )
}
export default Products
