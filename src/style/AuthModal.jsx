import React from "react"
import Paper from '@mui/material/Paper'

export function AuthModal({ children }) {
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'black',
         }}
      >
         <Paper
            elevation={3}
            style={{
               width: 400,
               // height: 610,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: 40,
            }}
         >
            {children}
         </Paper>
      </div>
   )
}