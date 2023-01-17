import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSignUpInput, clearSignUpInput, selectSignUpInput } from '../../redux/slices/signUpInputSlice'
import PasswordValidator from 'password-validator'
import { FcCheckmark } from 'react-icons/fc'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'
import redX from '../../assets/redX.png'

const SignUpPasswords = () => {
   const inputRef = useRef()
   const inputRef2 = useRef()
   const [password1, setPassword1] = useState('')
   const [password2, setPassword2] = useState('')
   const [validPassword, setValidPassword] = useState(null)
   const [passwordsMatch, setPasswordsMatch] = useState(null)
   const [minReq, setMinReq] = useState(null)
   const [maxReq, setMaxReq] = useState(null)
   const [caseReq, setCaseReq] = useState(null)
   const [digitsReq, setDigitsReq] = useState(null)
   const [spacesReq, setSpacesReq] = useState(null)
   const [blacklistReq, setBlacklistReq] = useState(null)
   const [hidden, setHidden] = useState(true)
   const [hidden2, setHidden2] = useState(true)

   const dispatch = useDispatch()
   let currentInputSlice = useSelector(selectSignUpInput)
   const { emailSlice, usernameSlice } = currentInputSlice

   const validatePassword = (e) => {
      setPassword1(e.target.value)
      let input = inputRef.current.value

      dispatch(setSignUpInput({
         usernameSlice,
         emailSlice,
         passwordSlice: input
      }))
      console.log('CURRENT SLICE: ', currentInputSlice)

      const schema = new PasswordValidator()
      schema
         .is()
         .min(8)
         .is()
         .max(100)
         .has()
         .uppercase()
         .has()
         .lowercase()
         .has()
         .digits()
         .has()
         .not()
         .spaces()
         .is()
         .not()
         .oneOf(['/', '\\', '|', 'Passw0rd', 'Password123'])

      let meetsAllRequirements = schema.validate(input)
      let messages = schema.validate(input, { list: true })
      console.log(meetsAllRequirements, messages)

      if (meetsAllRequirements) {
         setValidPassword(true)
      } else {
         setValidPassword(false)
      }

      if (messages.includes('min')) {
         setMinReq(false)
      } else {
         setMinReq(true)
      }

      if (messages.includes('max')) {
         setMaxReq(false)
      } else {
         setMaxReq(true)
      }

      if (messages.includes('uppercase' || messages.includes('lowercase'))) {
         setCaseReq(false)
      } else {
         setCaseReq(true)
      }

      if (messages.includes('oneOf')) {
         setBlacklistReq(false)
      } else {
         setBlacklistReq(true)
      }

      if (messages.includes('spaces')) {
         setSpacesReq(false)
      } else {
         setSpacesReq(true)
      }

      if (messages.includes('digits')) {
         setDigitsReq(false)
      } else {
         setDigitsReq(true)
      }
   }

   const comparePasswords = () => {
      let input2 = inputRef2.current.value
      setPassword2(input2)

      if (input2.length > 0) {
         if (password1 === input2) {
            setPasswordsMatch(true)
         } else {
            setPasswordsMatch(false)
         }
      } else {
         setPasswordsMatch(false)
      }
   }

   return (
      <div className="passwords-overall-div signup-div">
         <div className="passwords-component">
            <div>
               <div className="password-input-eye-div">
                  <div className="loading-input-div">
                     <input
                        className="password-input"
                        ref={inputRef}
                        type={hidden ? 'password' : 'text'}
                        value={password1}
                        placeholder="Password"
                        onChange={validatePassword}
                     />
                     {validPassword !== null ? (
                        validPassword ? (
                           <FcCheckmark size={20} />
                        ) : (
                           ''
                        )
                     ) : (
                        ''
                     )}
                  </div>
                  <button
                     className="transparent-btn"
                     type="button"
                     onClick={() => {
                        setHidden(!hidden)
                     }}
                  >
                     {hidden ? (
                        <HiOutlineEye size={25} />
                     ) : (
                        <HiOutlineEyeOff size={25} />
                     )}
                  </button>
               </div>
               <div className="requirement-icon-div">
                  <p>- At least 8 characters</p>
                  {validPassword !== null ? (
                     minReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
               <div className="requirement-icon-div">
                  <p>- Less than 100 characters</p>
                  {validPassword !== null ? (
                     maxReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
               <div className="requirement-icon-div">
                  <p>- Has upper and lowercase letters</p>
                  {validPassword !== null ? (
                     caseReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
               <div className="requirement-icon-div">
                  <p>- Has a number</p>
                  {validPassword !== null ? (
                     digitsReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
               <div className="requirement-icon-div">
                  <p>- No spaces</p>
                  {validPassword !== null ? (
                     spacesReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
               <div className="requirement-icon-div">
                  <p>- No slashes or common passwords</p>
                  {validPassword !== null ? (
                     blacklistReq ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
            </div>

            <div>
               <div className="password-input-eye-div">
                  <div className="loading-input-div">
                     <input
                        className="password-input"
                        ref={inputRef2}
                        type={hidden2 ? 'password' : 'text'}
                        placeholder="Confirm Password"
                        onChange={comparePasswords}
                     />
                     {passwordsMatch !== null ? (
                        passwordsMatch ? (
                           <FcCheckmark size={20} />
                        ) : (
                           ''
                        )
                     ) : (
                        ''
                     )}
                  </div>

                  <button
                     type="button"
                     className="transparent-btn"
                     onClick={() => setHidden2(!hidden2)}
                  >
                     {hidden2 ? (
                        <HiOutlineEye size={25} />
                     ) : (
                        <HiOutlineEyeOff size={25} />
                     )}
                  </button>
               </div>
               <div className="requirement-icon-div">
                  <p>- Passwords match</p>
                  {passwordsMatch !== null ? (
                     passwordsMatch ? (
                        <FcCheckmark size={20} />
                     ) : (
                        <img src={redX} width={15} />
                     )
                  ) : (
                     ''
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default SignUpPasswords
