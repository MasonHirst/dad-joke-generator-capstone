import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
   setSignUpInput,
   clearSignUpInput,
   selectSignUpInput,
} from '../../redux/slices/signUpInputSlice'
import axios from 'axios'
import PasswordValidator from 'password-validator'
import { FcCheckmark } from 'react-icons/fc'
import { ClipLoader } from 'react-spinners'
import redX from '../../assets/redX.png'

const SignUpUsername = () => {
   const inputRef = useRef()
   const [username, setUsername] = useState('')
   const [validUsername, setValidUsername] = useState(null)
   const [fourCharacters, setFourCharacters] = useState(null)
   const [spinnerLoading, setSpinnerLoading] = useState(false)

   const dispatch = useDispatch()
   let currentInputSlice = useSelector(selectSignUpInput)
   const { emailSlice, passwordSlice } = currentInputSlice

   const validateUsername = (e) => {
      setUsername(e.target.value)
      let input = inputRef.current.value
      dispatch(
         setSignUpInput({
            usernameSlice: input,
            emailSlice,
            passwordSlice,
         })
      )

      const schema = new PasswordValidator()
      schema
         .is()
         .min(4)
         .is()
         .max(100)
         .has()
         .not()
         .spaces()
         .has()
         .not()
         .oneOf(['/', '|', '\\'])

      let valid = schema.validate(input)
      let messages = schema.validate(input, { list: true })
      console.log(valid, messages)

      if (messages.includes('min')) {
         setFourCharacters(false)
      } else {
         setFourCharacters(true)
      }

      // console.log(valid)
      if (valid === true) {
         setSpinnerLoading(true)
         setValidUsername(false)
         axios
            .get(`/accounts/validate/username/${input}`)
            .then((res) => {
               if (schema.validate(inputRef.current.value)) {
                  if (res.data === 'username available') {
                     console.log('username available')
                     setValidUsername(true)
                  } else {
                     console.log('username taken')
                     setValidUsername(false)
                  }
                  setSpinnerLoading(false)
               } else {
                  setValidUsername(false)
                  setSpinnerLoading(false)
               }
            })
            .catch((err) => {
               console.log('ERROR IN VALIDATE USERNAME', err)
            })
      } else {
         setValidUsername(false)
      }
   }

   return (
      <div className="signup-div">
         <div className="loading-input-div">
            <input
               ref={inputRef}
               value={username}
               className={
                  validUsername !== null ? (validUsername ? '' : 'error') : ''
               }
               type="text"
               placeholder="Username"
               onChange={validateUsername}
            />
            {validUsername ? (
               <FcCheckmark size={20} />
            ) : (
               <ClipLoader size={18} color="green" loading={spinnerLoading} />
            )}
         </div>

         <div className="requirement-icon-div">
            <p>- At least 4 characters </p>
            {fourCharacters !== null ? (
               fourCharacters ? (
                  <FcCheckmark />
               ) : (
                  <img src={redX} width={15} />
               )
            ) : (
               ''
            )}
         </div>
         <div className="requirement-icon-div">
            <p>- Username available </p>
            {validUsername !== null ? (
               validUsername ? (
                  <FcCheckmark />
               ) : (
                  <img src={redX} width={15} />
               )
            ) : (
               ''
            )}
         </div>
         <div className='username-note'>
            <p>Username will be publically visible</p>
            <button className='transparent-btn'>x</button>
         </div>
      </div>
   )
}

export default SignUpUsername
