import React, { useState, useEffect } from "react";
import Product from "./Product";
import Grid from "@mui/material/Grid";
import axios from "axios";
import IProducts from "../../.././Model/IProduct";
import TextField from "@mui/material/TextField";
import Header from "./Header";

export interface IProps {
  products: IProducts[];
  handleAddToCart: (clickedItem: IProducts) => any;
}

const Products = (props: IProps) => {
  const { products } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <TextField
        type="text"
        placeholder="search"
        onChange={handleFilter}
        style={{ width: "90%" }}
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        direction="row"
      >
        {products
          .filter((e) => {
            return (
              e.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
            );
          })

          .map((product: IProducts, index: any) => (
            <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
              <Product
                products={product}
                handleAddToCart={props.handleAddToCart}
                key={index}
              ></Product>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Products;
