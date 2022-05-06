import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { Context } from "../../../../Context/UserContext";
import { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { GetId } from "../../../../Services/ProductServices";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
};

const useStyles = makeStyles(() =>
  createStyles({
    error: {
      color: "red",
    },
  })
);

export default function CheckOutModal() {
  const { total } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const [fulladdress, setFulladdress] = useState("");

  const [city, setCity] = useState("");

  const [building, setBuilding] = useState("");

  useEffect(() => {
    GetId().then(async function (response: any) {
      var res = await response.data.userSID;
      localStorage.setItem("id", res);

      // console.log(items);
    });
  }, []);

  const handlePayment = () => {
    if (fulladdress === "" || city === "" || building === "") {
      setShow(false);
      setError(true);
    } else {
      localStorage.setItem("total", total.toString());
      axios
        .post("https://localhost:7048/Orders/CreateOrder", {
          address: fulladdress,
          city: city,
          building: building,
          userSID: localStorage.getItem("id"),
          totalprice: total,
        })
        .then((response) => {
          localStorage.setItem("orderid", response.data);
          navigate("/Payment");
        })
        .catch((err) => console.warn(err));
    }
  };
  const classes = useStyles();

  return (
    <div>
      <Button onClick={handleOpen}>Proceed To Payment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography>
              Welcome {localStorage.getItem("user")} please fill the form with
              your info.
            </Typography>

            <TextField
              name="address"
              id="address"
              label="address"
              type="text"
              autoComplete="off"
              error={error}
              required
              onChange={(event) => {
                setFulladdress(event.target.value);
                setShow(true);
                setError(false);
              }}
            />
            <TextField
              name="city"
              id="city"
              label="city"
              type="text"
              required
              error={error}
              autoComplete="off"
              onChange={(event) => {
                setCity(event.target.value);
                setShow(true);
                setError(false);
              }}
            />

            <TextField
              name="building"
              id="address"
              label="building"
              type="text"
              required
              error={error}
              autoComplete="off"
              onChange={(event) => {
                setBuilding(event.target.value);
                setShow(true);
                setError(false);
              }}
            />

            {show ? (
              <p></p>
            ) : (
              <p className={classes.error}>*fill all required fields</p>
            )}

            <Button onClick={handlePayment}>Submit</Button>

            <Typography>
              Your Total is {total} please fill the form with your info
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
