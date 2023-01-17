import React from 'react'

const BlackPage = ({ children }) => {
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
         {children}
      </div>
   )
}

export default BlackPage
