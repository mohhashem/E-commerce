import React, { useState, useContext } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ISignInForm from "../../Model/ISignInForm";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IFormStatus from "../../Model/IFormStatus";
import IFormStatusProps from "../../Model/IFormStatusProps";

import { Context } from "../../Context/UserContext";
import { useEffect } from "react";
// import { getUser } from "../../Services/LoginServices";

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      height: "100vh",
      background:
        "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url('ecommerce.jpg') no-repeat center",
      backgroundSize: "cover",
    },

    signup: {
      width: "100%",
      marginBottom: "20px",
      marginTop: "100px",
    },

    but: {
      marginBottom: "20px",
      width: "100%",
    },
    root: {
      maxWidth: "450px",

      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      verticalAlign: "middle",
    },
    textField: {
      "& > *": {
        width: "100%",
        marginBottom: "5px",
        marginTop: "5px",
      },
    },
    submitButton: {
      marginTop: "24px",
    },
    title: { textAlign: "center", marginTop: "150px" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

const formStatusProps: IFormStatusProps = {
  error: {
    message: "user not registered, Sign up.",
    type: "error",
  },
};

const SigninScene = () => {
  const { setUsername } = useContext(Context);
  const { setToken } = useContext(Context);
  const { setSearch } = React.useContext(Context);

  const [admin, setAdmin] = useState(false);

  const handleAdmin = () => {
    if (admin === false) setAdmin(true);

    if (admin === true) setAdmin(false);
  };

  const onSubmit = (values: ISignInForm, actions: any) => {
    Login(values, actions.resetForm);
  };

  useEffect(() => {
    setSearch(false);
    localStorage.clear();
    setToken(false);
    // console.log(admin);
  }, [setToken, setSearch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Enter a valid email"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/)

      .required(
        "Please enter a valid password. One uppercase, one lowercase, one number and no spaces"
      ),
  });

  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const Login = async (data: ISignInForm, resetForm: Function) => {
    if (admin === false) {
      try {
        // const res:Promise<boolean> = getUser(data.email,data.password);
        const res = await axios.get("https://localhost:7048/User/UserLogin", {
          params: { email: data.email, password: data.password },
        });

        if (res.data === " ") {
          setFormStatus(formStatusProps.error);
        } else {
          setUsername(data.email);
          console.log(res.data);
          localStorage.setItem("user", data.email);
          localStorage.setItem("token", res.data);
          setToken(true);
          setSearch(true);
          navigate("/Home");
        }

        resetForm({});
      } catch (error) {
        const response = error.response;
        alert("connection error");

        if (response.data === "false" && response.status === 400) {
          setFormStatus(formStatusProps.error);
        }
      } finally {
        setDisplayFormStatus(true);
      }
    } else if (admin === true) {
      try {
        // const res:Promise<boolean> = getUser(data.email,data.password);
        const res = await axios.get("https://localhost:7048/Admin/Login", {
          params: { email: data.email, password: data.password },
        });

        if (res.data === " ") {
          alert("youre not an admin, not authorized to enter!");
        } else {
          console.log(res.data);

          navigate("/Admin");

          resetForm({});
        }
      } catch (error) {
        const response = error.response;
        alert(response);

        if (response.data === "false" && response.status === 400) {
          setFormStatus(formStatusProps.error);
        }
      } finally {
        setDisplayFormStatus(true);
      }
    }
  };

  return (
    <div className={classes.main} style={{ height: "100vh" }}>
      <div className={classes.root}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<ISignInForm>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
            } = props;
            return (
              <Form>
                <Typography
                  component="h1"
                  variant="h5"
                  marginTop="150px"
                  marginBottom="10px"
                  align="center"
                  color="primary"
                >
                  Sign In
                </Typography>

                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="email"
                    id="email"
                    label="Email-address"
                    value={values.email}
                    type="email"
                    autoComplete="off"
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : "Enter email address"
                    }
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <TextField
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={
                      errors.password && touched.password
                        ? "Please enter valid password. One uppercase, one lowercase, one number and no spaces"
                        : "One uppercase, one lowercase, one number and no spaces"
                    }
                    error={errors.password && touched.password ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.but}
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>

                    <Link
                      type="submit"
                      color="primary"
                      onClick={() => {
                        navigate("Signup");
                      }}
                    >
                      Doesn't have an account? Signup
                    </Link>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch />}
                        label="admin?"
                        onClick={handleAdmin}
                      />
                    </FormGroup>
                  </Stack>

                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === "error" ? (
                        <p className={classes.errorMessage}>
                          {formStatus.message}
                        </p>
                      ) : formStatus.type === "success" ? (
                        <p className={classes.successMessage}>
                          {formStatus.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SigninScene;
