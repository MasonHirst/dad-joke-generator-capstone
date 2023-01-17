import React from 'react'
import { AuthModal } from '../style/AuthModal'
import Logo from '../assets/LiveCode-icon.png'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SignUpSuccessPage = () => {
   const navigate = useNavigate()

   return (
      <AuthModal>
         <img src={Logo} width="200px" style={{margin: 10}}/>
         <Typography variant="h6">Account Created Successfully!</Typography>
         <Button
            onClick={() => navigate('/login')}
            size="large"
            type="submit"
            variant="contained"
            fullWidth
            style={{
               padding: '15px',
               boxShadow: 'none',
               fontSize: '18px',
               textTransform: 'none',
               margin: '25px'
            }}
         >
            Continue to Login
         </Button>
      </AuthModal>
   )
}

export default SignUpSuccessPage
