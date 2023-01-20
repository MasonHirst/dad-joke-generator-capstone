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

const tokenKey = 'accessToken'
const LOADING = "LOADING"
const AUTHENTICATED = "AUTHENTICATED"
const NOT_AUTHENTICATED = "NOT_AUTHENTICATED"

export function Authentication({ children }) {
   const [user, setUser] = useState()
   const [accessToken, setAccessToken] = useState()

   const [authState, setAuthState] = useState(LOADING)

   function logout() {
      localStorage.removeItem(tokenKey)
      setAccessToken(undefined)
      setUser(undefined)
      setAuthState(NOT_AUTHENTICATED)
      window.location.reload(false)
   }

   useEffect(() => {
      ;(async () => {
         try {
            const token = localStorage.getItem(tokenKey)
            if (token) {
               setAccessToken(token)
               const data = await getUser()
               setUser(data)
            } else {
               setAuthState(NOT_AUTHENTICATED)
            }
         } catch(error){
            console.error('you got an error bro', error)
         }
      })()
   }, [])

   useEffect(() => {
      if (user && accessToken) setAuthState(AUTHENTICATED)
   }, [user, accessToken])


   if (authState === LOADING)
      return <div style={{ color: 'white', padding: 10 }}>loading...</div>
   return (
      <AuthContext.Provider value={{ user, accessToken, authState, logout, children }}>
         {authState === AUTHENTICATED ? (
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
               <Route path="*" element={<Navigate to="signup" />} />
            </Routes>
         )}
      </AuthContext.Provider>
   )
}
