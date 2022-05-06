import React, { useState, useEffect, useContext } from "react";
import Products from "./Components/Products";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import IProducts from "../../Model/IProduct";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { getResults } from "../../Services/ProductServices";
import Cart from "./Components/CartScene/Cart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { CartItemType } from "../../Model/CartItemType";
import { Context } from "../../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    styled: {
      position: "fixed",
      display: "center",
      zIndex: "150",
      right: "50px",
      marginTop: "30px",
    },
    signout: {
      marginRight: "10px",
    },
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90%%",
      verticalAlign: "middle",
    },
  })
);

const HomeScene = () => {
  const classes = useStyles();

  const { token, setToken } = useContext(Context);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const signout = () => {
    setToken(false);
  };

  useEffect(() => {
    getResults().then(async function (response: any) {
      var res = await response.data;

      setProducts(await res);
      console.log(token);
    });
  }, [token]);

  const openModal = () => {};

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(
        (item) => item.productSID === clickedItem.productSID
      );

      if (isItemInCart) {
        return prev.map((item) =>
          item.productSID === clickedItem.productSID
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.productSID === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as IProducts[])
    );
  };

  return (
    <Stack spacing={2} style={{ marginTop: "50px" }}>
      <Drawer anchor="left" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <button className={classes.styled} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <ShoppingCartCheckoutIcon />
        </Badge>
      </button>
      <Button className={classes.signout} onClick={signout}>Sign Out</Button>

      <Products
        products={products}
        openModal={openModal}
        handleAddToCart={handleAddToCart}
      />
    </Stack>
  );
};

export default HomeScene;
