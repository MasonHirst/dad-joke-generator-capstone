import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const HeaderButton = ({ href, children }) => {
   const navigate = useNavigate()
   
   return (
      <Button variant="text" onClick={() => navigate(href)} style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '15px',
               }}>
         {children}
      </Button>
   )
}

export default HeaderButton
