import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes,Route } from 'react-router'
import Home from './components/Home.jsx'
import AdvanceSearch from './components/AdvanceSearch.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter >
      <Navbar/>
      <Routes >
        <Route index element={<Home />} />
        <Route path="search/:title" element={<AdvanceSearch />} />
        <Route path="search" element={<AdvanceSearch />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    
  </StrictMode>,
)
