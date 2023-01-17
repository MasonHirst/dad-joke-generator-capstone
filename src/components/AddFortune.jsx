import React, {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoadingFalse, setLoadingTrue } from '../redux/slices/isLoadingSlice'
import Swal from 'sweetalert2'

const AddFortune = () => {
   const dispatch = useDispatch()
   const [inputValue, setInputValue] = useState('')
   
   const submitHandler = (e) => {
      e.preventDefault()

      let obj = {
         text: inputValue,
         userAdded: true,
         userId: null,
         //! come back later and add functionality to grab the logged in user id
      }
      
      if (inputValue.length > 4) {
         dispatch(setLoadingTrue())
         console.log(inputValue)
         setInputValue('')
         
         axios.post(`/fortunes/add`, obj)
         .then((res) => {
            dispatch(setLoadingFalse())
            console.log(res.data)
            Swal.fire({
               title: 'Nice job!',
               text: 'I\'m sure the fortune you just added was very mature and inspiring :)',
               icon: 'success'
            })
         }).catch((err) => {
            console.log(err)
         })
      } else {
         Swal.fire({
            title: 'Woah there bud!',
            text: 'Fortune must be at least 5 characters',
            icon: 'error'
         })
      }
   }

   return (
      <div className="page-div">
         <form onSubmit={submitHandler}>
            <input placeholder='Your inspiring fortune' value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
            <button>Submit Fortune</button>
         </form>
         <p>Note: all users can see any added fortunes and who added them, so keep it appropriate!</p>
      </div>
   )
}

export default AddFortune
