import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import FortuneGenerator from './components/FortuneGenerator'
import LandingPage from './authComponents/LandingPage'
import SignUpPage from './authComponents/SignUpPage'
import LoginPage from './authComponents/LoginPage'
import FortunesView from './components/FortunesView'
import AddFortune from './components/AddFortune'
import LoadingModal from './components/LoadingModal'
import { selectLoading } from './redux/slices/isLoadingSlice'
import { Authentication } from './context/Authentication'

function App() {
   let loadingStatus = useSelector(selectLoading)
   return (
      <Authentication>
         <div className="App">
            {loadingStatus && <LoadingModal />}
            <Header />
            <Routes>
               <Route path="/" element={<FortuneGenerator />} />
               <Route path="addFortune" element={<AddFortune />}/>
               <Route path="search" element={<FortunesView />} />
            </Routes>
         </div>
      </Authentication>
   )
}

export default App
