import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setSignUpInput, clearSignUpInput, selectSignUpInput } from '../../redux/slices/signUpInputSlice'
import { isEmail } from 'validator'
import { FcCheckmark } from 'react-icons/fc'
import { ClipLoader } from 'react-spinners'
import redX from '../../assets/redX.png'

const SignUpEmail = () => {
   const [emailInput, setEmailInput] = useState('')
   const [validEmail, setValidEmail] = useState(null)
   const [validFormat, setValidFormat] = useState(null)
   const [spinnerLoading, setSpinnerLoading] = useState(false)

   const inputRef = useRef()
   const dispatch = useDispatch()
   let currentInputSlice = useSelector(selectSignUpInput)
   const { usernameSlice, passwordSlice } = currentInputSlice

   const checkEmail = () => {
      let email = inputRef.current.value
      setEmailInput(email)
      
      dispatch(setSignUpInput({
         usernameSlice,
         emailSlice: email,
         passwordSlice,
      }))
      

      if (isEmail(email)) {
         setValidFormat(true)
         setValidEmail(false)
         setSpinnerLoading(true)
         axios
            .get(`/accounts/validate/email/${email}`)
            .then((res) => {
               if (isEmail(inputRef.current.value)) {
                  console.log(res.data)
                  if (res.data === 'email taken') {
                     setValidEmail(false)
                     setSpinnerLoading(false)
                  } else {
                     setValidEmail(true)
                     setSpinnerLoading(true)
                  }
               } else {
                  setValidEmail(false)
                  setSpinnerLoading(false)
               }
            })
            .catch((err) => {
               console.log('ERROR IN SIGNUP CHECK-EMAIL', err)
            })
      } else {
         setValidFormat(false)
         setValidEmail(false)
         setSpinnerLoading(false)
      }
   }

   return (
      <div className='signup-div'>
         <div className="loading-input-div">
            <input
               ref={inputRef}
               className={
                  validEmail !== null ? (validEmail ? '' : 'error') : ''
               }
               type="text"
               placeholder="Email"
               value={emailInput}
               onChange={checkEmail}
            />
            {validEmail ? (
               <FcCheckmark size={20} />
            ) : (
               <ClipLoader size={18} color="green" loading={spinnerLoading} />
            )}
         </div>
         <div className="requirement-icon-div">
            <p>- Valid email format</p>
            {validFormat !== null ? (
               validFormat ? (
                  <FcCheckmark />
               ) : (
                  <img src={redX} width={15} />
               )
            ) : (
               ''
            )}
         </div>
         <div className="requirement-icon-div">
            <p>- Email available</p>
            {validFormat !== null ? (validEmail ? <FcCheckmark size={20} /> : <img src={redX} width={15} />) : ''}
         </div>
      </div>
   )
}

export default SignUpEmail
