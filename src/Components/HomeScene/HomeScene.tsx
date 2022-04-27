import React, { useState, useEffect } from "react";
import Products from "./Components/Products";
import Header from "./Components/Header";
import Searchbar from "./Components/SearchBar";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import IProducts from "../../Model/IProduct";
import { makeStyles, createStyles } from "@mui/styles";
import { getResults } from "../../Services/Services";
import Cart from "./Components/Cart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { CartItemType } from "../../Model/CartItemType";

const useStyles = makeStyles(() =>
  createStyles({
   
    styled:{
      position:"fixed",
      display:"center",
      zIndex:"100",
      right:"20px",
      marginTop:"20px"
    },
    root:{
      

      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      verticalAlign: "middle",
    }

  })
  );
  

const HomeScene = () => {

  const classes = useStyles();

  const [products, setProducts] = useState<IProducts[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  React.useEffect(() => {
    var results = getResults().then(function (response: any) {
      setProducts(response.data);
      console.log(response.data);
    });
  }, []);

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
   
    <Stack spacing={2}>
     
        <Drawer
          anchor="left"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <button className={classes.styled}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <ShoppingCartCheckoutIcon onClick={() => setCartOpen(true)} />
          </Badge>
        </button>
       
     
         
       
        <Products products={products} handleAddToCart={handleAddToCart} />
     
    </Stack>
    
  );
};

export default HomeScene;
