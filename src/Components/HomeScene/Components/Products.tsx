import React, { useState, useEffect } from "react";
import Product from "./Product";
import Grid from "@mui/material/Grid";
import IProducts from "../../.././Model/IProduct";
import Stack from '@mui/material/Stack';
import Header from "./Header";

export interface IProps {
  products: IProducts[];
  handleAddToCart: (clickedItem: IProducts) => any;
  openModal: () => any;
}

const Products = (props: IProps) => {
  const { products } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (value: string) => {
    console.log(value);
    setSearchTerm(value);
  };

  return (
    <>
    <Stack spacing={4}>


   
    <Header handleFilter={handleFilter}/>
    
      

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        direction="row"
        
      >
        {products
          .filter((e) => {
            if (searchTerm != "") {
              // console.log("aa");
              return (
                e.productName.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }else{
              // console.log(products)
              return (products);
            }
          })

          .map((product: IProducts, index: any) => (
            <Grid item xs={12} sm={4} lg={3} xl={3} key={index}>
              <Product
                products={product}
                openModal={props.openModal}
                handleAddToCart={props.handleAddToCart}
                key={index}
              ></Product>
            </Grid>
          ))}
      </Grid>
     
      </Stack>
    </>
  );
};

export default Products;
