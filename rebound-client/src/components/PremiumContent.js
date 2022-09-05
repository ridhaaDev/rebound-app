import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from '../services/AuthService'

const PremiumContent = () => {
  let navigate = useNavigate();
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name: '';

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login')
  }
  return (
    <div>
        Hello {name} You have been logged in!!

        <input type="button" value="logout" onClick={ logoutHandler } />
    </div>
  )
}

export default PremiumContent