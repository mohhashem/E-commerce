import React from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { CartItemType } from "../../../../Model/CartItemType";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Typography>{item.productName}:</Typography>

      <Typography>Price: $ {item.productPrice}</Typography>

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <DeleteIcon
          onClick={() => removeFromCart(item.productSID)}
        ></DeleteIcon>

        <p>{item.amount}</p>
        <AddShoppingCartIcon
          onClick={() => addToCart(item)}
        ></AddShoppingCartIcon>
      </Stack>
    </Stack>
  );
};

export default CartItem;
