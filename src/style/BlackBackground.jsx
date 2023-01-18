import React from 'react'

const BlackPage = ({ children }) => {
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 90px)',
            background: 'black',
            marginTop: '90px',
         }}
      >
         {children}
      </div>
   )
}

export default BlackPage
