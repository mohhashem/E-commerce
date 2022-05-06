import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IProducts from "../../../Model/IProduct";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    img: {
      height: "100%",
      width: "50%",
    },
  })
);

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

export interface IProps {
  products: IProducts;
}

export default function ItemModal(props: IProps) {
  const classes = useStyles();
  const { products } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Learn More</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={products.productImageUrl}
            className={classes.img}
            alt={products.productName}
          ></img>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {products.productName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {products.productDesc}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ${products.productPrice}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
