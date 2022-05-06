import React, { createContext, useState } from "react";

import { CartItemType } from "../Model/CartItemType";

var items: CartItemType = {
  productDesc: "",
  productName: " ",
  productImageUrl: " ",
  productPrice: 0,
  productSID: 0,
  amount: 0,
};
export type Props = {
  items: CartItemType[];
  setItems: () => void;
};
export const ProductContext = createContext<any>({
  items,
  setItems() {},
});
const ProductContextProvider = (props: any) => {
  //   const [userName, setUserName] = useState<any>("a");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  return (
    <ProductContext.Provider
      value={{ items: cartItems, setItems: setCartItems }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
