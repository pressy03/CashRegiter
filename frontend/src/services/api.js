const base = '/api'

const request = async (endpoint, options={}) => {
  const res = await fetch(base + endpoint, {
    credentials: 'include',
    ...options
  })
  if (res.status === 204) return null
  return res.json()
}
const get = endpoint => request(endpoint)
const post = (endpoint, body) => request(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})
export default { get, post }
