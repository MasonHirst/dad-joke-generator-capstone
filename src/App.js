import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import FortuneGenerator from './components/FortuneGenerator'
import FortunesView from './components/FortunesView'
import AddFortune from './components/AddFortune'
import { Authentication } from './context/Authentication'
import AccountPage from './components/AccountPage'
import FavoritesPage from './components/FavoritesPage'

function App() {
   return (
      <Authentication>
            <Header />
            <Routes>
               <Route path="/user/account" element={<AccountPage />} />
               <Route path="/user/favorites" element={<FavoritesPage />} />
               <Route path="/fortunes/generator" element={<FortuneGenerator />} />
               <Route path="/fortunes/add" element={<AddFortune />}/>
               <Route path="/fortunes/search" element={<FortunesView />} />
               <Route path="*" element={<Navigate to="/fortunes/generator" />} />
            </Routes>
      </Authentication>
   )
}

export default App
