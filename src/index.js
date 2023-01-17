import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   //   <React.StrictMode>
   <BrowserRouter>
      <Provider store={store}>
         <CssBaseline>
            <App />
         </CssBaseline>
      </Provider>
   </BrowserRouter>
   //   </React.StrictMode>
)
