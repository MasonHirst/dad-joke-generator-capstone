import React, { useState, useEffect, useRef } from 'react'
import BlackPage from '../style/BlackBackground'
import { getUser } from '../data'
import axios from 'axios'

import { ClipLoader } from 'react-spinners'
import { Paper } from '@mui/material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AccountPage = () => {
   const [user, setUser] = useState(false)
   const [editName, setEditName] = useState(false)
   const [newName, setNewName] = useState(null)
   const [errorMessage, setErrorMessage] = useState(null)
   const [loadUser, setLoadUser] = useState(false)

   function handleNewName() {
      console.log(newName)
      if (newName.length > 1) {
         axios
            .put('/accounts/users/change/username', {
               token: localStorage.getItem('accessToken'),
               username: newName,
            })
            .then(({ data }) => {
               console.log(data)
               setNewName('')
               setEditName(false)
               setLoadUser(!loadUser)
            })
            .catch((err) => {
               console.log('ERROR IN THE ACCOUNT PAGE: ', err)
            })
      }
   }

   useEffect(() => {
      async function getData() {
         let data = await getUser()
         setUser(data)
      }
      getData()
   }, [loadUser])

   return (
      <BlackPage>
         <Paper
            elevation={3}
            style={{
               minWidth: '450px',
               width: '400px',
               maxWidth: '99%',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: 40,
            }}
         >
            <Avatar
               sx={{ bgcolor: teal[600] }}
               src="/broken-image.jpg"
               style={{
                  width: '100px',
                  height: '100px',
               }}
            />

            <div
               style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px',
               }}
            >
               {editName ? (
                  <div
                     style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                     }}
                  >
                     <TextField
                        variant="standard"
                        label="New Display Name"
                        style={{ width: '30%' }}
                        onChange={(e) => setNewName(e.target.value)}
                        value={newName}
                     />
                     <Button
                        variant="text"
                        onClick={() => setEditName(false)}
                        style={{ fontSize: '15px', fontWeight: 'bold' }}
                     >
                        Cancel
                     </Button>
                     <Button
                        variant="text"
                        onClick={handleNewName}
                        style={{ fontSize: '15px', fontWeight: 'bold' }}
                     >
                        Save
                     </Button>
                  </div>
               ) : (
                  <div
                     style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                     }}
                  >
                     <Typography
                        variant="h4"
                        style={{ fontSize: '30px', fontWeight: 'bold' }}
                     >
                        {user ? (
                           user.username
                        ) : (
                           <ClipLoader size={18} color="green" loading={true} />
                        )}
                     </Typography>
                     <Button
                        variant="text"
                        style={{ fontSize: '15px', fontWeight: 'bold' }}
                        onClick={() => setEditName(true)}
                     >
                        Edit
                     </Button>
                  </div>
               )}
               {errorMessage ? (
                  <Typography
                     variant="subtitle2"
                     style={{ color: 'red', marginLeft: '15px' }}
                  >
                     {errorMessage}
                  </Typography>
               ) : (
                  ''
               )}
               <Typography variant="body1" style={{ opacity: '.7' }}>
                  {user ? (
                     user.email
                  ) : (
                     <ClipLoader size={18} color="green" loading={true} />
                  )}
               </Typography>
            </div>
         </Paper>
      </BlackPage>
   )
}

export default AccountPage
