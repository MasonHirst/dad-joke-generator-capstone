import React, { useRef, useState } from 'react'
import { AuthModal } from '../style/AuthModal'
import Logo from '../assets/DadJokeLogo.png'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const SignUpSuccessPage = ({ setUser, setAccessToken }) => {
   const navigate = useNavigate()
   const location = useLocation()
   const idData = location.state.id
   const emailData = location.state.email
   const inputRef = useRef()
   const [error, setError] = useState(null)

   function handleSubmit(e) {
      e.preventDefault()
      const input = inputRef.current.value
      if (input.length > 1) {
         setError(null)
         axios
            .post('/accounts/users/update/username', {
               id: idData,
               username: input,
            })
            .then(({ data }) => {
               setUser(data.user)
               setAccessToken(data.accessToken)
               localStorage.setItem('accessToken', data.accessToken)
               axios.post('/accounts/user/email/send_confirm_email', {id: idData, email: emailData, username: input})
                  .then(({data}) => {
                     navigate('/')
                  })
                  .catch(err => {
                     console.log('ERROR IN THE SIGNUP SUCCESS PAGE', err)
                  })
            })
            .catch((err) => {
               console.log('ERROR IN SIGNUP SUCCESS PAGE', err)
            })
      } else {
         setError('Username must be at least 2 characters')
      }
   }

   return (
      <AuthModal>
         <img src={Logo} width="200px" style={{ margin: 10 }} />
         <Typography variant="h5">Almost Done!</Typography>
         <Typography
            variant="body2"
            style={{ textAlign: 'center', opacity: '.7' }}
         >
            Choose a display name that will be visible to other users
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
               inputProps={{ ref: inputRef }}
               variant="outlined"
               label="Display name"
               fullWidth
               autoFocus
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
            <Button
               size="large"
               type="submit"
               variant="contained"
               fullWidth
               style={{
                  padding: '15px',
                  boxShadow: 'none',
                  fontSize: '18px',
                  textTransform: 'none',
                  margin: '25px 0',
               }}
            >
               Finish account creation
            </Button>
         </form>
      </AuthModal>
   )
}

export default SignUpSuccessPage
