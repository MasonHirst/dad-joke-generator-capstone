import React, { useState, useEffect, useContext } from 'react'
import { getUser } from '../data'
import axios from 'axios'
import FavoriteCard from './FavoriteCard'
import { AuthContext } from '../context/Authentication'

import BlackPage from '../style/BlackBackground'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { ClipLoader } from 'react-spinners'

const FavoritesPage = () => {
   const { user } = useContext(AuthContext)
   const [favs, setFavs] = useState(null)

   useEffect(() => {
      if (user) {
         axios
            .post('/fortunes/get/user/favorites', { id: user.id })
            .then(({ data }) => {
               setFavs(data)
            })
            .catch((err) => {
               console.log('ERROR IN THE FAVORITES PAGE: ', err)
            })
      }
   }, [user])

   let displayedFortunes
   if (favs) {
      if (favs.length > 0) {
         console.log(favs)
         displayedFortunes = favs.map((fav) => {
            return <FavoriteCard fav={fav} key={fav.id} />
         })
      } else {
         displayedFortunes = (
            <Typography
               variant="body"
               style={{
                  color: 'black',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginLeft: '40px',
               }}
            >
               No favorites! Try adding some from the search section.
            </Typography>
         )
      }
   } else displayedFortunes = <ClipLoader size={40}/>


   return (
      <BlackPage>
         <Paper
            elevation={3}
            style={{
               minWidth: 500,
               width: '60%',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: 40,
            }}
         >
            <Typography
               variant="h5"
               style={{ fontSize: '30px', fontWeight: '600' }}
            >
               {user ? `${user.username}'s favorites` : ''}
            </Typography>
            <div
               style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
               {displayedFortunes}
            </div>
         </Paper>
      </BlackPage>
   )
}

export default FavoritesPage
