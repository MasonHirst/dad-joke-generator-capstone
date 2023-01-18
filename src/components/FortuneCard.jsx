import React from 'react'

import { Typography } from '@mui/material'

const FortuneCard = ({ fortune }) => {
   return (
      <div style={{ margin: '25px 0' }}>
         <Typography
            variant="body1"
            style={{ color: 'white', fontSize: '20px', fontWeight: '600' }}
         >
            {fortune.text}
         </Typography>
         <div>
            {fortune?.user?.username ? (
               <Typography
                  style={{
                     color: 'white',
                     display: 'inline',
                     fontSize: '17px',
                     marginLeft: '20px',
                     fontStyle: 'italic',
                  }}
               >
                  Submitted by{' '}
                  <Typography
                     style={{
                        color: 'white',
                        display: 'inline',
                        fontWeight: 'bold',
                     }}
                  >
                     {fortune?.user?.username}
                  </Typography>
               </Typography>
            ) : (
               ''
            )}
         </div>
      </div>
   )
}

export default FortuneCard
