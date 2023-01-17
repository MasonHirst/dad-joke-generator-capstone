import React from 'react'
import LiveCodeIcon from '../assets/LiveCode-icon.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'

const Header = () => {
   const location = useLocation()

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'black',
         }}
      >
         <Link to="/">
            <img src={LiveCodeIcon} width="300px" alt="Live Code Logo" />
         </Link>
         <nav>
            <Link to="/">Fortunes</Link>
            <Link
               onClick={() => {
                  alert(
                     'add an account section where they can change password and see info and stuff'
                  )
               }}
            >
               Account
            </Link>

            <Link
               onClick={() => {
                  localStorage.clear()
                  location.reload()
               }}
            >
               Logout
            </Link>
         </nav>
      </div>
   )
}

export default Header

//       <header>
//          <Link to="/">
//             <img src={LiveCodeIcon} width="300px" alt="Live Code Logo" />
//          </Link>
//          <nav>
//             <Link to="/">Fortunes</Link>
//             <Link onClick={() => {
//                alert('add an account section where they can change password and see info and stuff')
//             }}>Account</Link>

//             <Link onClick={() => {
//                localStorage.clear()
//                location.reload()
//             }}>Logout</Link>
//          </nav>
//       </header>
