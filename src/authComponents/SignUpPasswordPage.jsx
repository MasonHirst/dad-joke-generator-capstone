import React, { useRef, useState } from 'react'
import { AuthModal } from '../style/AuthModal'
import { TextField } from '@mui/material'
import Logo from '../assets/LiveCode-icon.png'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const SignUpPasswordPage = () => {
   const navigate = useNavigate()
   const inputRef = useRef()
   const location = useLocation()
   const emailData = location.state.email
   const [emailState, setEmailState] = useState(emailData)
   const [errorMessage, setErrorMessage] = useState(null)

   function handleSubmit(e) {
      e.preventDefault()
      console.log(inputRef.current.value)
      axios
         .post('/accounts/users/create', {
            email: emailState,
            password: inputRef.current.value,
         })
         .then(({ data }) => {
            console.log(data)
            if (Array.isArray(data)) {
               if (data[0] === 'min') setErrorMessage('Password must be at least 8 characters')
               if (data[0] === 'max') setErrorMessage('Password must be less than 100 characters')
               if (data[0] === 'uppercase') setErrorMessage('Password must contain uppercase letters')
               if (data[0] === 'lowercase') setErrorMessage('Password must contain lowercase letters')
               if (data[0] === 'oneOf') setErrorMessage('Password cannot contain slashes or common passwords')
               if (data[0] === 'digits') setErrorMessage('Password must contain a digit')
            } else if (data === 'not a valid email format') {
               alert("not a valid email format")
            } else {
               setErrorMessage(null)
               navigate('/signup/success')
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
               value={emailData}
               type="text"
               fullWidth
               inputProps={{ onChange: (e) => setEmailState(e.target.value) }}
            />
            <TextField
               variant="outlined"
               label="Password"
               type="password"
               fullWidth
               inputProps={{
                  ref: inputRef,
               }}
            />
            {errorMessage ? (
               <Typography variant="subtitle2" style={{color: 'red'}}>{errorMessage}</Typography>
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
