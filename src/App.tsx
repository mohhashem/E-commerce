import Signin from "./Layouts/Signin";
import Signup from "./Layouts/Signup";
import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Layouts/Home";
import Routess from "./routes/Routess";
import Header from "./Components/HomeScene/Components/Header";

const App = () => {
  return (
    <>
    
      <Routess />
    </>
  );
};

export default App;
