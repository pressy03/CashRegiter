const BRANDS=['','Daisy','Tremol','Datecs','Eltrade']
const FUNCTIONS=['','Преносим','Стационарен']

function ProductFilter({filters,setFilters}){
  return(
    <div className='flex flex-wrap gap-4 my-4'>
      <input type='number' placeholder='Мин. цена' value={filters.minPrice} onChange={e=>setFilters({...filters,minPrice:e.target.value})} className='border p-2 rounded w-32'/>
      <input type='number' placeholder='Макс. цена' value={filters.maxPrice} onChange={e=>setFilters({...filters,maxPrice:e.target.value})} className='border p-2 rounded w-32'/>
      <select value={filters.rating} onChange={e=>setFilters({...filters,rating:e.target.value})} className='border p-2 rounded w-32'>
        <option value=''>Рейтинг</option>
        {[1,2,3,4,5].map(r=><option key={r} value={r}>{r}+</option>)}
      </select>
      <select value={filters.brand} onChange={e=>setFilters({...filters,brand:e.target.value})} className='border p-2 rounded w-40'>
        {BRANDS.map(b=><option key={b} value={b}>{b||'Производител'}</option>)}
      </select>
      <select value={filters.function_type} onChange={e=>setFilters({...filters,function_type:e.target.value})} className='border p-2 rounded w-40'>
        {FUNCTIONS.map(f=><option key={f} value={f}>{f||'Функция'}</option>)}
      </select>
    </div>
  )
}
export default ProductFilter
