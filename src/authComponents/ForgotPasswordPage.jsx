import React, { useRef } from 'react'
import { AuthModal } from '../style/AuthModal'
import Logo from '../assets/DadJokeLogo.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Link } from '@mui/material'

const ForgotPasswordPage = () => {
   const navigate = useNavigate()
   const inputRef = useRef()

   function checkEmail(e) {
      e.preventDefault()
      axios.get(`/accounts/user/forgot_password/${inputRef.current.value}`)
      .then(({data}) => {
         Swal.fire({
            icon: 'success',
            title: 'Email sent',
            text: 'If a user exists with that email, they will receive a temporary password',
         })
         navigate('/login')
      })
      .catch(err => {
         console.log('ERROR IN THE FORGOT PASSWORD PAGE: ', err)
      })
   }

   return (
      <AuthModal>
         <img src={Logo} width="200px" />
         <Typography variant="h5" style={{fontWeight: '500'}}>Forgot Your Password?</Typography>
         <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '8px' }}>
            Enter your email address and we will send you instructions to reset
            your password.
         </Typography>
         <form
            onSubmit={checkEmail}
            style={{
               display: 'flex',
               flexDirection: 'column',
               width: '100%',
               gap: 10,
               position: 'relative',
            }}
         >
            <TextField
               inputProps={{
                  ref: inputRef,
               }}
               variant="outlined"
               label="Email address"
               fullWidth
            />
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
         <Link href="/login" underline="none" style={{ fontWeight: '600', marginBottom: '20px', fontSize: '14px', }}>
            Back to Login
         </Link>
      </AuthModal>
   )
}

export default ForgotPasswordPage
