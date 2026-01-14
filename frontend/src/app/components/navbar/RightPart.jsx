import React from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginBtn = () => {
  const navigate = useNavigate()
  const handleLogin = ()=>{
   navigate('/login');
  }
  return (
    <div>
        <button onClick={handleLogin} className='btn btn-primary btn-md'>Login</button>
    </div>
  )
}
