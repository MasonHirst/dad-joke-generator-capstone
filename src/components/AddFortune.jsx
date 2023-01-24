import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/Authentication'

import BlackPage from '../style/BlackBackground'
import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const AddFortune = () => {
   const { user } = useContext(AuthContext)
   const dispatch = useDispatch()
   const [inputValue, setInputValue] = useState('')

   const submitHandler = (e) => {
      e.preventDefault()

      let obj = {
         text: inputValue,
         userAdded: true,
         userId: user.id,
      }

      if (inputValue.length > 4) {
         dispatch(setLoadingTrue())
         console.log(inputValue)
         setInputValue('')

         axios
            .post(`/fortunes/add`, obj)
            .then((res) => {
               dispatch(setLoadingFalse())
               console.log(res.data)
               Swal.fire({
                  title: 'Nice job!',
                  text: "I'm sure the fortune you just added was very mature and inspiring :)",
                  icon: 'success',
               })
            })
            .catch((err) => {
               console.log(err)
            })
      } else {
         Swal.fire({
            title: 'Woah there bud!',
            text: 'Fortune must be at least 5 characters',
            icon: 'error',
         })
      }
   }

   return (
      <BlackPage>
         <Paper
            elevation={3}
            style={{
               minWidth: '450px',
               width: '500px',
               maxWidth: '99%',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: 40,
            }}
         >
            <Typography variant='h4' style={{margin: '15px 0',}}>Submit your own joke</Typography>
            <form
               onSubmit={submitHandler}
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '25px',
                  width: '100%',
                  marginBottom: '25px',
               }}
            >
               <TextField
                  variant="outlined"
                  fullWidth
                  inputProps={{maxLength: 120}}
                  label="Your inspiring fortune"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
               />
               <Button variant="contained" type='submit' fullWidth style={{ height: '55px' }}>
                  Submit Fortune
               </Button>
            </form>
            <Typography style={{ textAlign: 'center', opacity: '.6', }}>
               Note: all users can see any added fortunes and who added them, so
               keep it appropriate!
            </Typography>
         </Paper>
      </BlackPage>
   )
}

export default AddFortune
