import React, { useState } from 'react'
import Register from './Components/Pages/Register/Register'
import Login from './Components/Pages/Login/Login'

const App = () => {
  const [currentPage, setCurrentPage] = useState('login')

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onSwitch={() => setCurrentPage('register')} />
      ) : (
        <Register onSwitch={() => setCurrentPage('login')} />
      )}
    </div>
  )
}

export default App
