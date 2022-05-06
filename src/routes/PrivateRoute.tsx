import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import { Context } from "../Context/UserContext";

const PrivateRoute = () => {
  const { token } = useContext(Context);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
