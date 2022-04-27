import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from '../Layouts/Signin'
import Signup from '../Layouts/Signup'
import Home from '../Layouts/Home'

const Routess = () => {
    return (
        // <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="Signin" element={<Signin />} />
          <Route path="Home" element={<Home />} />
        </Routes>
      // </BrowserRouter>
    )
}

export default Routess
