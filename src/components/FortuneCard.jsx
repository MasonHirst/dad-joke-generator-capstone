import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'

import { Typography } from '@mui/material'

const FortuneCard = ({ fortune, user, favs }) => {
   const [favorite, setFavorite] = useState(false)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      if (favs && user) {
         const isFav = favs.filter(
            (fav) => fav.userId === user.id && fav.fortuneId === fortune.id
         )
         if (isFav.length > 0) setFavorite(true)
      }
   }, [favs, user, fortune])

   function toggleFav() {
      setLoading(true)
      axios
         .put('/user/favorites/add', { userId: user.id, fortuneId: fortune.id })
         .then(({ data }) => {
            setLoading(false)
            if (data === 'favorite created') setFavorite(true)
            else setFavorite(false)
         })
         .catch((err) => {
            console.log('ERROR IN THE FORTUNE CARD', err)
            setLoading(false)
         })
   }

   return (
      <div style={{ margin: '25px 0' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {loading ? (
               <ClipLoader color="yellow" size={15} />
            ) : favorite ? (
               <AiFillStar
                  style={{ color: 'yellow', width: '30px', height: '30px' }}
                  onClick={toggleFav}
               />
            ) : (
               <AiOutlineStar
                  style={{ color: 'yellow', width: '30px', height: '30px' }}
                  onClick={toggleFav}
               />
            )}

            <Typography
               variant="body1"
               style={{ color: 'white', fontSize: '20px', fontWeight: '600' }}
            >
               {fortune.text}
            </Typography>
         </div>
         <div>
            {fortune?.user?.username ? (
               <Typography
                  style={{
                     color: 'white',
                     display: 'inline',
                     fontSize: '17px',
                     marginLeft: '20px',
                     fontStyle: 'italic',
                     marginLeft: '70px',
                  }}
               >
                  Submitted by{' '}
                  <span
                     style={{
                        color: 'white',
                        display: 'inline',
                        fontWeight: 'bold',
                     }}
                  >
                     {fortune?.user?.username}
                  </span>
               </Typography>
            ) : (
               ''
            )}
         </div>
      </div>
   )
}

export default FortuneCard
