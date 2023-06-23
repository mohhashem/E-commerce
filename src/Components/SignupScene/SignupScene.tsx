import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import IFormStatus from "../../Model/IFormStatus";

import IFormStatusProps from "../../Model/IFormStatusProps";
import { GenerateUser } from "../../Services/SignupServices";

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      background:
        "linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url('ecommerce.jpg') no-repeat center",
      backgroundSize: "cover",
      height: "100vh",
    },

    signin: {
      width: "100%",
      marginTop: "100px",
    },
    admin: {
      width: "100%",
    },

    but: {
      width: "100%",
      marginBottom: "50px",
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
      marginBottom: "100px",
    },
    title: { textAlign: "center", marginTop: "150px" },
    successMessage: { color: "green" },
    errorMessage: { color: "red" },
  })
);

interface ISignUpForm {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Signed up successfully.",
    type: "success",
  },
  duplicate: {
    message: "Email address already exist. Please use different email-id.",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

const SignUpScene = () => {
  const classes = useStyles();

  const [displayFormStatus, setDisplayFormStatus] = useState(false);

  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const formSubmit = (values: ISignUpForm, actions: any) => {
    createNewUser(values, actions.resetForm);
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 500);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Enter a valid email"),
    fullName: Yup.string().required("Please enter full name"),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/)

      .required(
        "Please enter a valid password. One uppercase, one lowercase, one number and no spaces"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "Password musth match", function (value) {
        return this.parent.password === value;
      }),
  });

  const createNewUser = async (data: ISignUpForm, resetForm: Function) => {
    try {
      const res = await GenerateUser(data.fullName, data.password, data.email);

      if (data) {
        setFormStatus(formStatusProps.success);
        resetForm({});
      }

      console.log(res);

      if (!res) {
        setFormStatus(formStatusProps.duplicate);
      }
      if (res) {
        alert("Registered Successfully");
        navigate("/Home");
      }
    } catch (error) {
      const response = error.response;

      if (response.data === "user already exist" && response.status === 400) {
        setFormStatus(formStatusProps.duplicate);
      } else {
        setFormStatus(formStatusProps.error);
      }
    } finally {
      setDisplayFormStatus(true);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <Formik
          initialValues={{
            fullName: "",
            password: "",
            confirmPassword: "",
            email: "",
          }}
          onSubmit={formSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<ISignUpForm>) => {
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
                  marginTop="64px"
                  marginBottom="10px"
                  align="center"
                  color="primary"
                >
                  Sign Up
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
                    name="fullName"
                    id="fullName"
                    label="Full Name"
                    value={values.fullName}
                    type="text"
                    autoComplete="off"
                    helperText={
                      errors.fullName && touched.fullName
                        ? errors.fullName
                        : "Enter your Full Name."
                    }
                    error={errors.fullName && touched.fullName ? true : false}
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
                  className={classes.textField}
                >
                  <TextField
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirm password"
                    value={values.confirmPassword}
                    type="password"
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : "Re-enter password to confirm"
                    }
                    error={
                      errors.confirmPassword && touched.confirmPassword
                        ? true
                        : false
                    }
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
                    name="email"
                    id="email"
                    label="Email-address"
                    value={values.email}
                    type="email"
                    autoComplete="off"
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : "Enter your email-address"
                    }
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid
                  item
                  lg={12}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.signin}
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
                      Submit
                    </Button>

                    <Link
                      type="submit"
                      color="primary"
                      className={classes.signin}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Already have an account? Signin
                    </Link>
                  </Stack>
                </Grid>

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
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpScene;
