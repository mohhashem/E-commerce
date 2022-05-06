import React, { useContext } from "react";
import Header from "../HomeScene/Components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Context } from "../../Context/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background:
        "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url('ecommerce.jpg') no-repeat center",
      backgroundSize: "cover",
      height: "100vh",
      marginTop: "100px",
    },
    but: {
      left: "700px",
    },
    img: {
      width: "200px",
      height: "140px ",
      marginLeft: "45%",
      marginTop: "20px",
    },
  })
);

const PaymentScene = () => {
  const {  setToken } = useContext(Context);

  const signout = () => {
    setToken(false);
  };
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://localhost:7048/Orders/GetCartItems", {
        params: {
          cart: localStorage.getItem("products"),
          OrderSID: localStorage.getItem("orderid"),
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />

      <main className={classes.root}>
        <Paper>
          <Typography component="h1" variant="h4" align="center">
            <Button onClick={signout}>Sign Out</Button>
          </Typography>

          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #{localStorage.getItem("orderid")}. We have
            emailed your order confirmation to {localStorage.getItem("user")},
            and will send you an update when your order has shipped.
          </Typography>
          <img
            src="checkimage.jpg"
            className={classes.img}
            alt="checkout"
          ></img>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default PaymentScene;
