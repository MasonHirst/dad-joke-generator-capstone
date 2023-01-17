import React from 'react'
import LiveCodeIcon from '../assets/LiveCode-icon.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
   const navigate = useNavigate()
   
   return (
      <header>
         <Link to="/">
            <img src={LiveCodeIcon} width="300px" alt="Live Code Logo" />
         </Link>
         <nav>
            <Link to="/">Fortunes</Link>
            <Link onClick={() => {
               alert('add an account section where they can change password and see info and stuff')
            }}>Account</Link>

            <Link onClick={() => {
               localStorage.clear()
               navigate('/')
            }}>Logout</Link>
         </nav>
      </header>
   )
}

export default Header
