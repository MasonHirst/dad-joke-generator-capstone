import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import { setFortunes } from '../redux/slices/fortunesSlice'
import { selectFortunes } from '../redux/slices/fortunesSlice'
import FortuneCard from './FortuneCard'
import axios from 'axios'

const FortunesView = () => {
   const dispatch = useDispatch()
   let currentFortunes = useSelector(selectFortunes)
   const [inputValue, setInputValue] = useState('')

   useEffect(() => {
      dispatch(setLoadingTrue())
      axios
         .get(`/fortunes/randomAll`)
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
            return <FortuneCard fortune={item} key={item.id}/>
         })

         if (display.length > 0) {
            fortunesDisplay = display
            // console.log('fortunes display: ', fortunesDisplay)
         } else {
            fortunesDisplay = <h3>No results</h3>
         }
   } else {
      if (currentFortunes) {
         const display = currentFortunes.map((item) => {
            return <FortuneCard fortune={item} key={item.id}/>
         })
         
         fortunesDisplay = display
         // console.log('fortunes display: ', fortunesDisplay)
      }
   }

   return (
      <div className="page-div">
         <input
            placeholder="Find a fortune"
            onChange={(e) => setInputValue(e.target.value)}
         />

         <div className="FortunesDisplay-container">
            {fortunesDisplay}
         </div>
      </div>
   )
}

export default FortunesView
