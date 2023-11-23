import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider }from './Context/Auth'
import { SearchProvider } from './Context/Search'
import { CartProvider } from './Context/Cart'
ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <AuthProvider>
    <SearchProvider>
    <CartProvider>
      <App />
      </CartProvider>
    </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
    

)
