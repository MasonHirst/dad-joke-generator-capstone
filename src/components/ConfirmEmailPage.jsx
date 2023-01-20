import React, { useRef, useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Logo from '../assets/DadJokeLogo.png'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const ConfirmEmailPage = () => {
   const navigate = useNavigate()
   const inputRef = useRef()
   const location = useLocation()
   const { id, email, username } = location.state
   const [error, setError] = useState(null)


   useEffect(() => {
      axios
      .post('/accounts/user/email/confirm_one_time_pass', {
         id,
         pass: inputRef.current.value,
      })
      .then(({ data }) => {
            
      })
      .catch((err) => {
         console.log('ERROR IN CONFIRM EMAIL PAGE: ', err)
      })
   }, [])

   function handleSubmit(e) {
      e.preventDefault()
      axios
         .post('/accounts/user/email/confirm_one_time_pass', {
            id,
            pass: inputRef.current.value,
         })
         .then(({ data }) => {
            if (Array.isArray(data)) {
               Swal.fire({
                  icon: 'success',
                  title: 'Yay!',
                  text: 'You confirmed your email address',
                  width: 340,
                  confirmButtonText: 'Back to Dad Joke Generator',
               })
               .then((res) => {
                  navigate('/fortunes/generator')
                  window.location.reload(false)
               })
            } else setError('Incorrect code')
         })
         .catch((err) => {
            console.log('ERROR IN CONFIRM EMAIL PAGE: ', err)
         })
   }

   function handleResend() {
      setError(null)
      axios
         .post('/accounts/user/email/send_confirm_email', { id, email })
         .then(({ data }) => {
            Swal.fire({
               icon: 'success',
               width: 340,
               text: 'Another code was sent to your email',
            })
         })
         .catch((err) => {
            console.log('ERROR IN CONFIRM EMAIL PAGE: ', err)
         })
   }

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'black',
            position: 'relative',
            zIndex: '5',
            top: '0',
         }}
      >
         <Paper
            elevation={3}
            style={{
               minWidth: 400,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: 40,
            }}
         >
            <img src={Logo} width="200px" style={{ margin: 10 }} />
            <Typography variant="h5">Confirm Email Address</Typography>
            <Typography
               variant="body2"
               style={{ textAlign: 'center', opacity: '.7' }}
            >
               Enter the six digit code that was sent to your email
            </Typography>
            <form
               onSubmit={handleSubmit}
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  gap: 15,
                  position: 'relative',
               }}
            >
               <TextField
                  inputProps={{ ref: inputRef, maxLength: 6 }}
                  variant="outlined"
                  label="6 digit code"
                  fullWidth
                  autoFocus
               />
               {error ? (
                  <div style={{width: '100%', height: '0px', position: 'relative', bottom: '10px',}}>
                     <Typography
                        variant="subtitle2"
                        style={{ color: 'red', marginLeft: '15px' }}
                     >
                        {error}
                     </Typography>
                  </div>
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
                     position: 'relative',
                     top: '45px',
                  }}
               >
                  Confirm
               </Button>
            </form>
            <Button
               variant="text"
               onClick={handleResend}
               style={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '16px',
                  position: 'relative',
                  bottom: '130px',
               }}
            >
               Resend code
            </Button>
         </Paper>
      </div>
   )
}

export default ConfirmEmailPage
