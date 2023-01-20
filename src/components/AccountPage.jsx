import React, { useState, useEffect, useRef, useContext } from 'react'
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
import { AuthContext } from '../context/Authentication'

const AccountPage = () => {
   const loc = useLocation()
   const { user } = useContext(AuthContext)
   const [editName, setEditName] = useState(false)
   const [newName, setNewName] = useState(null)
   const [errorMessage, setErrorMessage] = useState(null)
   const [error, setError] = useState(null)
   const [editPassword, setEditPassword] = useState(false)
   const currPassRef = useRef()
   const newPassRef = useRef()
   const [passError, setPassError] = useState(null)
   const [passError2, setPassError2] = useState(null)

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
               setNewName('')
               setEditName(false)

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

   function handleNewPassSubmit(e) {
      e.preventDefault()
      let input1 = currPassRef.current.value
      let input2 = newPassRef.current.value
      if (input1 === input2) {
         setPassError2('New password cannot match current password')
         return
      }
      if (input1.length < 1) {
         setPassError('Field cannot be blank')
         return
      } else setPassError(null)
      if (input2.length < 1) {
         setPassError2('Field cannot be blank')
         return
      } else setPassError2(null)

      axios
         .put('/accounts/users/update/password', {
            accessToken: localStorage.getItem('accessToken'),
            currPass: input1,
            newPass: input2,
         })
         .then(({ data }) => {
            console.log(data)
            if (Array.isArray(data)) {
               if (data[0] === 'min')
                  setPassError2('Password must be at least 8 characters')
               if (data[0] === 'max')
                  setPassError2('Password must be less than 100 characters')
               if (data[0] === 'uppercase')
                  setPassError2('Password must contain uppercase letters')
               if (data[0] === 'lowercase')
                  setPassError2('Password must contain lowercase letters')
               if (data[0] === 'oneOf') setPassError2('Password is too common')
               if (data[0] === 'digits')
                  setPassError2('Password must contain a digit')
               if (data[0] === 'spaces')
                  setPassError2('Password cannot contain spaces')
            } else if (data === 'Password updated') {
               console.log('updated')
               setEditPassword(false)
               setPassError(null)
               setPassError2(null)
               Swal.fire({
                  icon: 'success',
                  title: 'Password updated',
               })
            } else if (data === 'Current password incorrect')
               setPassError('Password incorrect')
            else
               console.log(
                  'something else happened in account change password function'
               )
         })
         .catch((err) => {
            console.log('ERROR IN THE CHANGE PASSWORD FUNCTION: ', err)
         })
   }

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
                              value={newName || ""}
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
                     {error ? (
                        <Typography
                           style={{ color: 'red', marginLeft: '15px' }}
                        >
                           {error}
                        </Typography>
                     ) : (
                        ''
                     )}
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
            {editPassword ? (
               <div style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', gap: '10px',}}>
                  <form
                     onSubmit={handleNewPassSubmit}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center',
                        width: '80%',
                     }}
                  >
                     <div
                        style={{
                           display: 'flex',
                           flexDirection: 'column',
                           width: '100%',
                        }}
                     >
                        <TextField
                           variant="outlined"
                           label="Current password"
                           type="password"
                           autoFocus
                           fullWidth
                           inputProps={{
                              ref: currPassRef,
                           }}
                        />
                        {passError ? (
                           <p
                              style={{
                                 color: 'red',
                                 marginTop: '5px',
                                 marginLeft: '15px',
                                 marginBottom: '0px',
                                 fontSize: '14px',
                              }}
                           >
                              {passError}
                           </p>
                        ) : (
                           ''
                        )}
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           flexDirection: 'column',
                           width: '100%',
                        }}
                     >
                        <TextField
                           variant="outlined"
                           label="New password"
                           type="password"
                           fullWidth
                           inputProps={{
                              ref: newPassRef,
                           }}
                        />
                        {passError2 ? (
                           <p
                              style={{
                                 color: 'red',
                                 marginTop: '5px',
                                 marginLeft: '15px',
                                 marginBottom: '0px',
                                 fontSize: '14px',
                              }}
                           >
                              {passError2}
                           </p>
                        ) : (
                           ''
                        )}
                     </div>
                     <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        style={{
                           padding: '13px',
                           textTransform: 'none',
                           fontSize: '18px',
                        }}
                     >
                        Change password
                     </Button>
                  </form>
                  <Button
                     variant="text"
                     onClick={() => setEditPassword(false)}
                     style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '16px',
                     }}
                  >
                     cancel
                  </Button>
               </div>
            ) : (
               <Button
                  variant="text"
                  onClick={() => setEditPassword(true)}
                  style={{
                     textTransform: 'none',
                     fontWeight: 'bold',
                     fontSize: '16px',
                  }}
               >
                  Change password
               </Button>
            )}
         </Paper>
      </BlackPage>
   )
}

export default AccountPage
