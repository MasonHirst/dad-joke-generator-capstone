import { useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LiveCodeIcon from '../assets/DadJokeLogo.png'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { AuthModal } from '../style/AuthModal'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import axios from 'axios'
import SocialButton from '../style/SocialButton'


function Login() {
   const inputRef = useRef()
   const [email, setEmail] = useState('')
   const [error, setError] = useState(false)
   const navigate = useNavigate()

   function checkEmail(e) {
      let input = inputRef.current.value
      e.preventDefault()

      axios
         .post('/accounts/find/email', { email: input })
         .then((res) => {
            if (res.data === 'email valid') {
               setError(null)
               navigate('password', { state: { email: input }})
            } else {
               setError('Please enter a valid email')
            }
         })
         .catch((err) => {
            console.log('ERROR IN LOGIN COMPONENT', err)
         })
   }

   return (
      <AuthModal>
         <img src={LiveCodeIcon} width="200px" />
         <Typography variant="h5">Welcome</Typography>

         <form
            onSubmit={checkEmail}
            style={{
               display: 'flex',
               flexDirection: 'column',
               width: '100%',
               gap: 15,
               position: 'relative',
            }}
         >
            <TextField
               inputProps={{
                  ref: inputRef,
                  onChange: (e) => setEmail(e.target.value),
               }}
               autoFocus
               variant="outlined"
               label="Email address"
               fullWidth
            />
            {error ? (
               <Typography variant="subtitle2" style={{color: 'red', marginLeft: '15px'}}>{error}</Typography>
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
               }}
            >
               Continue
            </Button>
         </form>

         <div style={{ width: '100%' }}>
            <Typography align="left" variant="body2">
               Don't have an account?{' '}
               <Link
                  href="signup"
                  underline="none"
                  style={{ fontWeight: '600' }}
               >
                  Sign up
               </Link>
            </Typography>
         </div>
         {/* <div
            style={{
               marginTop: '20px',
               borderTop: '1px solid grey',
               width: '100%',
               opacity: '.3',
               display: 'flex',
               justifyContent: 'center',
            }}
         ></div> */}
         {/* <Typography
            variant="subtitle2"
            style={{
               position: 'relative',
               top: '-26px',
               backgroundColor: 'white',
               padding: '0 15px',
            }}
         >
            OR
         </Typography> */}
         {/* <div
            style={{
               width: '100%',
               display: 'flex',
               flexDirection: 'column',
               gap: '10px',
            }}
         >
            <SocialButton href="https://google.com">
               <FcGoogle size={25} />
               <Typography variant="h2" style={{ fontSize: '18px' }}>
                  Continue with Google
               </Typography>
            </SocialButton>

            <SocialButton href="https://facebook.com">
               <BsFacebook size={22} />
               <Typography variant="h2" style={{ fontSize: '18px' }}>
                  Continue with Facebook
               </Typography>
            </SocialButton>
         </div> */}
      </AuthModal>
   )
}

export default Login
