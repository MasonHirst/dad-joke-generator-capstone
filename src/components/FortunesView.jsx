import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import { setFortunes } from '../redux/slices/fortunesSlice'
import { selectFortunes } from '../redux/slices/fortunesSlice'
import FortuneCard from './FortuneCard'
import axios from 'axios'

import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

const FortunesView = () => {
   const dispatch = useDispatch()
   let currentFortunes = useSelector(selectFortunes)
   const [inputValue, setInputValue] = useState('')

   useEffect(() => {
      dispatch(setLoadingTrue())
      axios
         .get(`/fortunes/all`)
         .then((res) => {
            // console.log(res.data)
            dispatch(setLoadingFalse())
            dispatch(setFortunes(res.data))
         })
         .catch((err) => {
            dispatch(setLoadingFalse())
            console.log('ERROR IN FORTUNES-VIEW USE-EFFECT', err)
         })
   }, [])

   let fortunesDisplay

   if (inputValue.length > 0) {
      const display = currentFortunes
         .filter((item) => {
            return item.text.toLowerCase().includes(inputValue.toLowerCase())
         })
         .map((item) => {
            return <FortuneCard fortune={item} key={item.id} />
         })

      if (display.length > 0) {
         fortunesDisplay = display
      } else {
         fortunesDisplay = <Typography variant='h5' style={{color: 'white', fontSize: '25px', fontWeight: 'bold',}}>No results</Typography>
      }
   } else {
      if (currentFortunes) {
         const display = currentFortunes.map((item) => {
            return <FortuneCard fortune={item} key={item.id} />
         })

         fortunesDisplay = display
         // console.log('fortunes display: ', fortunesDisplay)
      }
   }

   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 90px)',
            background: 'black',
            marginTop: '90px',
         }}
      >
         <div
            style={{
               padding: '50px 0',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               minWidth: 500,
               width: '60%',
            }}
         >
            <TextField
               variant="outlined"
               fullWidth
               placeholder="Search..."
               onChange={(e) => setInputValue(e.target.value)}
               style={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '25px', }}
            />

            <div>{fortunesDisplay}</div>
         </div>
      </div>
   )
}

export default FortunesView
