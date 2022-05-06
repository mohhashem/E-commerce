import React from "react";

import Routess from "./routes/Routess";

import ContextProvider from "./Context/UserContext";

const App = () => {
  return (
    <>
      <ContextProvider>
        <Routess />
      </ContextProvider>
    </>
  );
};

export default App;
