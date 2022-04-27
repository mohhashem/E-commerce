import * as React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";

import IProducts from "../../../Model/IProduct";

export interface IProps {
  products: IProducts;
  handleAddToCart: (clickedItem: IProducts) => void;
}

const Product = (props: IProps) => {
  const { products } = props;
  // const { product } = products;

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={products.productImageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {products.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {products.productDesc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {products.productPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.handleAddToCart(products)}>
          Add To Cart
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default Product;
