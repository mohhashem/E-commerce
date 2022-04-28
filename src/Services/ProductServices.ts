import React from 'react'
import IProducts from '../Model/IProduct';
import axios from 'axios';



  function getResults(): any {
    const results = axios
      .get<IProducts[]>("https://localhost:7048/Product/getProducts");
      return results;
    
      
  }

  export {getResults};
