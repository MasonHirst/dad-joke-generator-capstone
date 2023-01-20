import React, { useRef, useState } from 'react'
import { AuthModal } from '../style/AuthModal'
import { TextField } from '@mui/material'
import Logo from '../assets/DadJokeLogo.png'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginPasswordPage = ({ setUser, setAccessToken }) => {
   const navigate = useNavigate()
   const inputRef = useRef()
   const location = useLocation()
   const [emailState, setEmailState] = useState(location.state.email)
   const [error, setError] = useState(null)

   function checkLogin(e) {
      e.preventDefault()
      axios
         .post('/accounts/validate/login', {
            email: emailState,
            password: inputRef.current.value,
         })
         .then(({ data }) => {
            if (typeof data === 'object') {
               setError(null)
               setUser(data.user)
               setAccessToken(data.accessToken)
               localStorage.setItem('accessToken', data.accessToken)
               if (inputRef.current.value.length < 8) {
                  Swal.fire({
                     icon: 'warning',
                     title: 'Temporary password used',
                     text: 'Make sure to update your password in account settings',
                  })
               }
               navigate('/')
            } else {
               setError('Incorrect email or password')
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }

   return (
      <AuthModal>
         <img src={Logo} width="200px" />
         <Typography
            variant="h5"
            style={{ marginBottom: '25px', marginTop: '5px' }}
         >
            Enter Your Password
         </Typography>
         <form
            onSubmit={checkLogin}
            style={{
               display: 'flex',
               flexDirection: 'column',
               width: '100%',
               gap: 15,
               position: 'relative',
            }}
         >
            <TextField
               variant="outlined"
               label="Email"
               type="text"
               fullWidth
               onChange={(e) => setEmailState(e.target.value)}
               value={emailState}
            />
            <TextField
               variant="outlined"
               label="Password"
               type="password"
               fullWidth
               autoFocus
               inputProps={{
                  ref: inputRef,
               }}
            />
            {error ? (
               <Typography
                  variant="subtitle2"
                  style={{ color: 'red', marginLeft: '15px' }}
               >
                  {error}
               </Typography>
            ) : (
               ''
            )}
            <div style={{ width: '100%' }}>
               <Typography
                  align="left"
                  variant="subtitle2"
                  style={{ fontWeight: '600' }}
                  fontSize={15}
               >
                  <Link href="forgot_password" underline="none">
                     Forgot password
                  </Link>
               </Typography>
            </div>

            <Button
               size="large"
               type="submit"
               variant="contained"
               fullWidth
               style={{
                  fontSize: '18px',
                  padding: '15px',
                  boxShadow: 'none',
                  marginTop: '8px',
                  textTransform: 'none',
               }}
            >
               Continue
            </Button>
         </form>

         <div style={{ width: '100%' }}>
            <Typography align="left" variant="body2">
               Don't have an account?{' '}
               <Link
                  href="/signup"
                  underline="none"
                  style={{ fontWeight: '600', fontSize: '14px' }}
               >
                  Sign up
               </Link>
            </Typography>
         </div>
      </AuthModal>
   )
}

export default LoginPasswordPage
