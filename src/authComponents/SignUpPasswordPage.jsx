import React, { useRef, useState } from 'react'
import { AuthModal } from '../style/AuthModal'
import { TextField } from '@mui/material'
import Logo from '../assets/DadJokeLogo.png'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const SignUpPasswordPage = () => {
   const navigate = useNavigate()
   const inputRef = useRef()
   const location = useLocation()
   const [emailState, setEmailState] = useState(location.state.email)
   const [errorMessage, setErrorMessage] = useState(null)

   function handleSubmit(e) {
      e.preventDefault()
      axios
         .post('/accounts/users/create', {
            email: emailState,
            password: inputRef.current.value,
         })
         .then(({ data }) => {
            if (Array.isArray(data)) {
               if (data[0] === 'min') setErrorMessage('Password must be at least 8 characters')
               if (data[0] === 'max') setErrorMessage('Password must be less than 100 characters')
               if (data[0] === 'uppercase') setErrorMessage('Password must contain uppercase letters')
               if (data[0] === 'lowercase') setErrorMessage('Password must contain lowercase letters')
               if (data[0] === 'oneOf') setErrorMessage('Password is too common')
               if (data[0] === 'digits') setErrorMessage('Password must contain a digit')
               if (data[0] === 'spaces') setErrorMessage('Password cannot contain spaces')
            } else if (data === 'server says email is not valid') {
               setErrorMessage("Not a valid email format")
            } else if (data === 'email already in use') {
               setErrorMessage('Email already in use')
            } else if (typeof data === 'object') {
               setErrorMessage(null)
               navigate('/signup/success', {state: {id: data.id, email: emailState}})
            }
         })
         .catch((err) => {
            console.log('ERROR IN SIGNUP PASSWORD PAGE', err)
         })
   }

   return (
      <AuthModal>
         <img src={Logo} width="200px" />
         <Typography
            variant="h5"
            style={{ marginBottom: '25px', marginTop: '5px' }}
         >
            Create Your Account
         </Typography>
         <form
            onSubmit={handleSubmit}
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
               onChange={(e) => setEmailState(e.target.value)}
               value={emailState}
               type="text"
               fullWidth
               
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
            {errorMessage ? (
               <Typography variant="subtitle2" style={{color: 'red', marginLeft: '15px'}}>{errorMessage}</Typography>
            ) : (
               ''
            )}
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
               Already have an account?{' '}
               <Link
                  href="login"
                  underline="none"
                  style={{ fontWeight: '600' }}
               >
                  Log in
               </Link>
            </Typography>
         </div>
      </AuthModal>
   )
}

export default SignUpPasswordPage
