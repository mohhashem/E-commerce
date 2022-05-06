import React, { useEffect, useContext } from "react";
import CartItem from "./CartItem";
import IProducts from "../../../../Model/IProduct";

import CheckOutModal from "./CheckoutModal";
import { Context } from "../../../../Context/UserContext";

import { ProductContext } from "../../../../Context/ProductContext";
type Props = {
  cartItems: IProducts[];
  addToCart: (clickedItem: IProducts) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const { setItems } = useContext(ProductContext);

  const { setTotal } = useContext(Context);
  const calculateTotal = (items: IProducts[]) => {
    // setTotal(calculateTotal(cartItems));
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.productPrice,
      0
    );
  };
  useEffect(() => {
    setTotal(calculateTotal(cartItems));
    localStorage.setItem("products", JSON.stringify(cartItems));
    setItems(cartItems);
    // console.log(cartItems);
    // setCartItems(cartItems);
  }, [cartItems, setTotal, setItems]);

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
      <CheckOutModal />
    </div>
  );
};

export default Cart;
