import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFortunes } from '../redux/slices/fortunesSlice'
import { selectFortunes } from '../redux/slices/fortunesSlice'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import dadHead from '../assets/JokingDad.png'
import { AuthContext } from '../context/Authentication'

import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'

const FortuneGenerator = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   let currentFortunes = useSelector(selectFortunes)
   let baseURL = ''

   const { user } = useContext(AuthContext)
   const [focusedFortune, setFocusedFortune] = useState(null)
   const [includeUserFortunes, setIncludeUserFortunes] = useState(false)
   const [hideMessage, setHideMessage] = useState(false)
   const [gotFortunes, setGotFortune] = useState(false)

   const getRandomFortune = () => {
      if (currentFortunes) {
         setFocusedFortune(
            currentFortunes[Math.floor(Math.random() * currentFortunes.length)]
         )
      }
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
               setGotFortune(true)
            })
            .catch((err) => [console.log(err)])
      } else {
         dispatch(setLoadingTrue())
         axios
            .get(`${baseURL}/random/fortunes`)
            .then((res) => {
               dispatch(setLoadingFalse())
               dispatch(setFortunes(res.data))
               setGotFortune(true)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }, [includeUserFortunes])

   useEffect(() => {
      getRandomFortune()
   }, [gotFortunes])

   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 90px)',
            background: 'black',
            marginTop: '90px',
            position: 'relative,',
         }}
      >
         {user.confirmedAccount === false ? (
            hideMessage ? (
               ''
            ) : (
               <div
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     position: 'absolute',
                     top: '97px',
                     gap: '10px',
                     backgroundColor: '#303030',
                     padding: '2px 10px',
                     borderRadius: '3px',
                  }}
               >
                  <Typography
                     variant="h6"
                     style={{
                        fontSize: '15px',
                        color: 'white',
                        fontWeight: 'bold',
                     }}
                  >
                     Your email still needs to be verified
                  </Typography>
                  <Button
                     variant="text"
                     onClick={() =>
                        navigate('/user/confirm_email', {
                           state: {
                              id: user.id,
                              email: user.email,
                              username: user.username,
                           },
                        })
                     }
                     style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: '',
                     }}
                  >
                     Finish account
                  </Button>
                  <Button
                     onClick={() => setHideMessage(true)}
                     variant="text"
                     style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: '',
                     }}
                  >
                     dismiss
                  </Button>
               </div>
            )
         ) : (
            ''
         )}
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
               paddingTop: '35px',
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
                  Are you ready to groan?
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
                  Get random dad-joke
               </Button>

               <FormGroup>
                  <FormControlLabel
                     control={<Checkbox onChange={toggleChecked} />}
                     label="Include user-added jokes"
                  />
               </FormGroup>
            </div>

            <div
               style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'left',
                  width: '90%',
                  maxWidth: '90%',
               }}
            >
               <img src={dadHead} width="250px" />
               <h3
                  style={{
                     textAlign: 'center',
                     fontSize: '18px',
                  }}
               >
                  {focusedFortune ? focusedFortune.text : ''}
               </h3>
            </div>
         </Paper>
      </div>
   )
}

export default FortuneGenerator
