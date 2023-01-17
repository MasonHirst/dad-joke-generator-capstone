import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFortunes } from '../redux/slices/fortunesSlice'
import { selectFortunes } from '../redux/slices/fortunesSlice'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Authentication'

const FortuneGenerator = () => {

   const {user, accessToken } = useContext(AuthContext)

   // console.log("SUCCESS", user, accessToken)

   const dispatch = useDispatch()
   let currentFortunes = useSelector(selectFortunes)
   let baseURL = "http://localhost:3339"

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
            .get(`${baseURL}/fortunes/randomAll`)
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
      <div className="page-div">
         <h2>Are you ready to see your members-only fortune?</h2>
         <button className='random-button' onClick={getRandomFortune}>Random Fortune</button>
         <div>
            <input
               type="checkbox"
               id="include-checkbox"
               onClick={toggleChecked}
            />
            <label htmlFor="include-checkbox">Include user created fortunes</label>
         </div>
         <h1>{focusedFortune ? focusedFortune.text : ''}</h1>

         <div className="fortune-alt-btns">
            <Link to='search'>
               <p>Search</p>
            </Link>
            <Link to='addFortune'>
               <p>Submit fortune</p>
            </Link>
         </div>
      </div>
   )
}

export default FortuneGenerator
