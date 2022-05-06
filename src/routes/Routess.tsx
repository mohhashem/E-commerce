import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../Layouts/Signin";
import Signup from "../Layouts/Signup";
import Home from "../Layouts/Home";

import Payment from "../Layouts/Payment";
import Admin from "../Layouts/Admin";
import PrivateRoute from "./PrivateRoute";
const Routess = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="Signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route element={<PrivateRoute />}>
        <Route path="Home" element={<Home />} />
        <Route path="Payment" element={<Payment />} />
      </Route>
      <Route path="Admin" element={<Admin />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default Routess;
