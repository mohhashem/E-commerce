import PaymentScene from "../Components/PaymentScene/PaymentScene";
import ProductContextProvider from "../Context/ProductContext";
import React from "react";

const Payment = () => {
  return (
    <ProductContextProvider>
      <PaymentScene />
    </ProductContextProvider>
  );
};

export default Payment;
