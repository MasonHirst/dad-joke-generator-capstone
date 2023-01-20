import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'

const FavoriteCard = ({ fav }) => {
   const [remove, setRemove] = useState(false)

   function handleDelete() {
      console.log(fav.id)
      setRemove(true)
      axios
         .delete(`/user/favorites/delete/${fav.id}`)
         .then(({ data }) => {
            console.log(data)
         })
         .catch((err) => {
            console.log('ERROR IN THE FAVORITE CARD: ', err)
         })
   }

   return (
      <div>
         {remove ? (
            <div></div>
         ) : (
            <div>
               <div
                  style={{
                     display: 'flex',
                     position: 'relative',
                     gap: '15px',
                     alignItems: 'center',
                  }}
               >
                  <button style={{border: 'none', backgroundColor: 'transparent', }}>
                     <AiOutlineDelete
                        style={{
                           color: 'red',
                           width: '20px',
                           height: '25px',
                           width: '25px',
                           position: 'absolute',
                           top: '1px',
                           ':hover': { cursor: 'pointer' },
                        }}
                        onClick={handleDelete}
                     />
                  </button>
                  <Typography
                     variant="body"
                     style={{
                        color: 'black',
                        fontSize: '18px',
                        fontWeight: '600',
                        marginLeft: '40px',
                     }}
                  >
                     {fav.fortune.text}
                  </Typography>
               </div>
               {fav?.fortune?.user?.username ? (
                  <Typography
                     style={{
                        color: 'black',
                        display: 'inline',
                        fontSize: '17px',
                        marginLeft: '30px',
                        fontStyle: 'italic',
                        marginLeft: '70px',
                        position: 'relative',
                        left: '20px',
                     }}
                  >
                     Submitted by{' '}
                     <span
                        style={{
                           color: 'black',
                           display: 'inline',
                           fontWeight: 'bold',
                        }}
                     >
                        {fav?.fortune?.user?.username}
                     </span>
                  </Typography>
               ) : (
                  ''
               )}
            </div>
         )}
      </div>
   )
}

export default FavoriteCard
