import React, { useState, useEffect, useRef } from 'react'
import BlackPage from '../style/BlackBackground'
import { getUser } from '../data'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

import { ClipLoader } from 'react-spinners'
import { Paper } from '@mui/material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AccountPage = () => {
   const loc = useLocation()
   const [user, setUser] = useState(false)
   const [editName, setEditName] = useState(false)
   const [newName, setNewName] = useState(null)
   const [errorMessage, setErrorMessage] = useState(null)
   const [loadUser, setLoadUser] = useState(false)
   const [error, setError] = useState(null)

   function handleNewName(e) {
      e.preventDefault()
      if (newName.length > 1) {
         setError(null)
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
               Swal.fire({
                  title: 'Success!',
                  text: 'Username was successfully updated',
                  icon: 'success',
               }).then(() => {
                  window.location.href = loc.pathname
               })
            })
            .catch((err) => {
               console.log('ERROR IN THE ACCOUNT PAGE: ', err)
            })
      } else {
         setError('Username must be at least 2 characters')
      }
   }

   useEffect(() => {
      async function getData() {
         let data = await getUser()
         setUser(data)
      }
      getData()
   }, [loadUser])

   console.log('userState:', user.username)

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
                  <div>
                     <div
                        style={{
                           width: '100%',
                           display: 'flex',
                           justifyContent: 'center',
                           gap: '10px',
                        }}
                     >
                        <form
                           onSubmit={handleNewName}
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
                              style={{ width: '200px' }}
                              onChange={(e) => setNewName(e.target.value)}
                              value={newName}
                           />
                           <Button
                              variant="text"
                              type="submit"
                              style={{ fontSize: '15px', fontWeight: 'bold' }}
                           >
                              Save
                           </Button>
                        </form>
                        <Button
                           variant="text"
                           onClick={() => setEditName(false)}
                           style={{ fontSize: '15px', fontWeight: 'bold' }}
                        >
                           Cancel
                        </Button>
                     </div>
                     {error ? <Typography style={{color: 'red', marginLeft: '15px'}}>{error}</Typography> : ''}
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
