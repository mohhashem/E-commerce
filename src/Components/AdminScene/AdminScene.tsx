import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminScene = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    marginTop: "80px",
  };

  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageUrl, setProductUrl] = useState("");

  const handleAdmin = () => {
    axios
      .post("https://localhost:7048/Product/AddProduct", {
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,
        productImageUrl: productImageUrl,
      })
      .then((response) => response.status)
      .catch((err) =>
        console.warn("youre not authorized to enter admin panel")
      );

    navigate("/Payment");
  };

  return (
    <Box sx={style}>
      <Stack spacing={2}>
        <Typography>
          Welcome, please fill the product information below
        </Typography>
        <TextField
          name="productName"
          id="productName"
          label="Product Name"
          type="text"
          autoComplete="off"
          onChange={(event) => setProductName(event.target.value)}
        />
        <TextField
          name="productDes"
          id="productDesc"
          label="Product Description"
          type="text"
          autoComplete="off"
          onChange={(event) => setProductDesc(event.target.value)}
        />

        <TextField
          name="productPrice"
          id="productPrice"
          label="Product Price"
          type="number"
          autoComplete="off"
          onChange={(event) => setProductPrice(event.target.value)}
        />

        <TextField
          name="productImageUrl"
          id="productImageUrl"
          label="Product ImageUrl"
          type="text"
          autoComplete="off"
          onChange={(event) => setProductUrl(event.target.value)}
        />

        <Button onClick={handleAdmin}>Submit</Button>
      </Stack>
    </Box>
  );
};

export default AdminScene;
