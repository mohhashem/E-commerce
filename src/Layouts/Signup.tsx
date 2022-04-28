import React, { useState } from "react";
import SignUpScene from "../Components/SignupScene/SignupScene";
import Header from "../Components/HomeScene/Components/Header";

const SignUp = () => {
  return (
    <>
      <Header handleFilter={null}></Header>
      <SignUpScene></SignUpScene>
    </>
  );
};

export default SignUp;
