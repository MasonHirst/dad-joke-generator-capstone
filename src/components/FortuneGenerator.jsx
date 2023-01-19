import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFortunes } from '../redux/slices/fortunesSlice'
import { selectFortunes } from '../redux/slices/fortunesSlice'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import cookieLeft from '../assets/FortuneCookieLeft.png'
import cookieRight from '../assets/FortuneCookieRight.png'

import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'

const FortuneGenerator = () => {
   const dispatch = useDispatch()
   let currentFortunes = useSelector(selectFortunes)
   let baseURL = 'http://localhost:3339'

   const [focusedFortune, setFocusedFortune] = useState(null)
   const [includeUserFortunes, setIncludeUserFortunes] = useState(false)

   const getRandomFortune = () => {
      setFocusedFortune(
         currentFortunes[Math.floor(Math.random() * currentFortunes.length)]
      )
   }

   const toggleChecked = () => {
      setIncludeUserFortunes(!includeUserFortunes)
   }

   useEffect(() => {
      if (includeUserFortunes) {
         dispatch(setLoadingTrue())
         axios
            .get(`${baseURL}/fortunes/all`)
            .then((res) => {
               dispatch(setLoadingFalse())
               dispatch(setFortunes(res.data))
               // console.log(res.data)
            })
            .catch((err) => [console.log(err)])
      } else {
         dispatch(setLoadingTrue())
         axios
            .get(`${baseURL}/random/fortunes`)
            .then((res) => {
               dispatch(setLoadingFalse())
               dispatch(setFortunes(res.data))
               // console.log(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }, [includeUserFortunes])

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
         <Paper
            elevation={3}
            style={{
               minWidth: 600,
               width: '80%',
               minHeight: '80%',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 15,
               padding: '5%',
               marginTop: 'calc(0.1 * (100vh - 90px))',
            }}
         >
            <div
               style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  marginBottom: '25px',
               }}
            >
               <Typography
                  variant="h5"
                  style={{
                     fontWeight: 'bold',
                     fontSize: '30px',
                     marginBottom: '15px',
                  }}
               >
                  Are you ready to see your fortune?
               </Typography>
               <Button
                  variant="contained"
                  onClick={getRandomFortune}
                  style={{
                     boxShadow: 'none',
                     textTransform: 'none',
                     width: '400px',
                     fontSize: '25px',
                  }}
               >
                  Get random fortune
               </Button>

               <FormGroup>
                  <FormControlLabel
                     control={<Checkbox onChange={toggleChecked} />}
                     label="Include user-added fortunes"
                  />
               </FormGroup>
            </div>

            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 'calc(100% + 250px)',
                  marginLeft: '15px',
                  height: '200px',
               }}
            >
               <img src={cookieLeft} width="300px" style={{
                  position: 'relative',
                  left: '65px',
                  top: '16px',
               }} />
               <div
                  style={{
                     borderRadius: '2px',
                     display: 'flex',
                     padding: '0 10px',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: '#d3d3d3',
                     height: '75px',
                     width: '100%',
                     zIndex: '1',
                  }}
               >
                  <h3 style={{ textAlign: 'center', fontSize: '18px' }}>
                     {focusedFortune ? focusedFortune.text : ''}
                  </h3>
               </div>
               <img
                  src={cookieRight}
                  width="300px"
                  style={{
                     position: 'relative',
                     right: '72px',
                     top: '6px',
                  }}
               />
            </div>
         </Paper>
      </div>
   )
}

export default FortuneGenerator
