import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
   return (
      <div className="page-div">
         <h1>Welcome to Live Code!</h1>
         <h4>
            This is a project in authorization. Login to access your
            super-secret fortune!
         </h4>
         <Link to="/login/signup">
            <button className="landing-page-login-button">
               Go to LiveCode
            </button>
         </Link>
      </div>
   )
}

export default LandingPage
