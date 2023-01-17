import { useState, createContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../authComponents/LoginPage'
import SignUpPage from '../authComponents/SignUpPage'
import ForgotPasswordPage from '../authComponents/ForgotPasswordPage'
import LoginPasswordPage from '../authComponents/LoginPasswordPage'
import SignUpPasswordPage from '../authComponents/SignUpPasswordPage'
import SignUpSuccessPage from '../authComponents/SignUpSuccessPage'
import { getUser } from '../data'

export const AuthContext = createContext({})

export function Authentication({ children }) {
   const [user, setUser] = useState()
   const [accessToken, setAccessToken] = useState()

   useEffect(() => {
      const token = localStorage.getItem('accessToken')
      console.log('FROM STORAGE: ', token)
      if (token) {
         setAccessToken(token)
         getUser()
      }
   }, [])

   // 1. save token to local storage
   // 2. on page refresh, fetch token from local storate and set it to state
   // 3. if token exists, use it to fetch user

   return (
      <AuthContext.Provider value={{ user, accessToken }}>
         {accessToken ? (
            children
         ) : (
            <Routes>
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<SignUpPage />} />
               <Route path="signup/password" element={<SignUpPasswordPage />} />
               <Route
                  path="signup/success"
                  element={
                     <SignUpSuccessPage
                        setUser={setUser}
                        setAccessToken={setAccessToken}
                     />
                  }
               />
               <Route
                  path="login/password"
                  element={
                     <LoginPasswordPage
                        setUser={setUser}
                        setAccessToken={setAccessToken}
                     />
                  }
               />
               <Route
                  path="login/forgot_password"
                  element={<ForgotPasswordPage />}
               />
               <Route path="*" element={<Navigate to="login" />} />
            </Routes>
         )}
      </AuthContext.Provider>
   )
}
