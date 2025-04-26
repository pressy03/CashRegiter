import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/me.php')
      .then(u => {
        if (u?.error) throw new Error(u.error)
        setUser(u)
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])
  
  

  const login = async creds => {
    const u = await api.post('/login.php', creds)
    if (!u || u.error) throw new Error('invalid')   // <-- проверка!
    setUser(u)
    return u
  }
  const logout = () => api.post('/logout.php').then(()=>setUser(null))
  const register = creds => api.post('/register.php', creds)

  const value = { user, login, logout, register }
  if(loading) return null
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
