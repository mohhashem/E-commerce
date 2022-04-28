import React from 'react';

import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';


import SigninScene from '../Components/SigninScene/SigninScene';



const PrivateRoute = ({  ...rest }) => {





return <Route {...rest} element={<SigninScene/>} />;




}

export default PrivateRoute;