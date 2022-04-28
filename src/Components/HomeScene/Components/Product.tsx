import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ItemModal from "./itemModal";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import IProducts from "../../../Model/IProduct";

const useStyles = makeStyles(() =>
  createStyles({
    card:{
      backgroundColor:"#1976d2"
    },
    main:{
      
    }

  })
);

export interface IProps {
  products: IProducts;
  handleAddToCart: (clickedItem: IProducts) => void;
  openModal: () => void;
}

const Product = (props: IProps) => {
  const { products } = props;
  // const { product } = products;
const classes=useStyles();
  return (
    <Card className={classes.main}>
      <CardMedia
        component="img"
        height="250"
     
        image={products.productImageUrl}
        alt="green iguana"
      />
      <CardContent className={classes.card}>
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
        

        <ItemModal products={products} />
      </CardActions>
    </Card>
  );
};
export default Product;
