import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import IProducts from "../../../Model/IProduct";
import Grid from "@mui/material/Grid";

type Props = {
  cartItems: IProducts[];
  addToCart: (clickedItem: IProducts) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: IProducts[]) => {
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.productPrice,
      0
    );
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}

      {cartItems.map((item: IProducts) => (
        <CartItem
          key={item.productSID}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: $ {calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
