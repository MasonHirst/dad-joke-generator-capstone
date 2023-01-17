import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import FortuneGenerator from './components/FortuneGenerator'
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
               <Route path="/fortunes/generator" element={<FortuneGenerator />} />
               <Route path="/fortunes/add" element={<AddFortune />}/>
               <Route path="/fortunes/search" element={<FortunesView />} />
               <Route path="*" element={<Navigate to="/fortunes/generator" />} />
            </Routes>
         </div>
      </Authentication>
   )
}

export default App
