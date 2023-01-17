import React from 'react'
import ButtonBase from '@mui/material/ButtonBase'

function SocialButton({ children, href }) {
   return (
      <ButtonBase
         // fullwidth
         onClick={() => window.location.href = href}
         variant="outlined"
         size="large"
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '12px',
            textTransform: 'none',
            padding: 12,
            border: '1px solid lightgrey',
            borderRadius: 5,
         }}
      >
         {children}
      </ButtonBase>
   )
}

export default SocialButton