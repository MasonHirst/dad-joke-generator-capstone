import { useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectSignUpInput } from '../redux/slices/signUpInputSlice'
import LiveCodeIcon from '../assets/DadJokeLogo.png'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { AuthModal } from '../style/AuthModal'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import Button from '@mui/material/Button'
import SocialButton from '../style/SocialButton'

const SignUpPage = () => {
   const navigate = useNavigate()
   const inputRef = useRef()
   const [errorState, setErrorState] = useState(null)

   const handleSubmit = (e) => {
      let input = inputRef.current.value
      e.preventDefault()
      axios
         .get(`/accounts/validate/email/${input}`)
         .then(({data}) => {
            if (data === 'email already in use') {
               setErrorState('Email already in use')
            } else if (data === 'not a valid email format') {
               setErrorState('Not a valid email format')
            } else {
               setErrorState(null)
               navigate('password', {state: {email: input}})
            }
         })
         .catch((err) => {
            console.log('ERROR IN SIGNUP PAGE', err)
         })
   }


   return (
      <AuthModal>
         <img src={LiveCodeIcon} width="200px" />
         <Typography variant="h5">Create Your Account</Typography>

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
               inputProps={{
                  ref: inputRef,
               }}
               variant="outlined"
               label="Email address"
               fullWidth
               autoFocus
            />
            {errorState ? (
               <Typography variant="subtitle2" style={{color: 'red', marginLeft: '15px'}}>{errorState}</Typography>
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
         <div
            style={{
               marginTop: '20px',
               borderTop: '1px solid grey',
               width: '100%',
               opacity: '.3',
               display: 'flex',
               justifyContent: 'center',
            }}
         ></div> 
       <Typography
            variant="subtitle2"
            style={{
               position: 'relative',
               top: '-26px',
               backgroundColor: 'white',
               padding: '0 15px',
            }}
         >
            OR
         </Typography> 

          <div
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
         </div>
      </AuthModal>
   )
}

export default SignUpPage
