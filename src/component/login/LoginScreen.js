import React, { useContext, useState } from "react";
import {
  FormControl,
  Button,
  TextField,
  Container,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MuiAlert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import api from "../../helpers/api";
import "./login.css";
import { NavLink } from "react-router-dom";
import loginValidationSchema from "../../validation/login/loginValidation";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const [errorAlert, setErrorAlert] = useState({
    message: "",
    open: false,
  });

  const handleClose = () => {
    setErrorAlert({
      ...errorAlert,
      open: false,
    });
  };

  const handleLogin = async (payload) => {
    const { data } = await api.post("users/signin", payload);
    dispatch({
      type: types.login,
      payload: {
        access_token: data.access_token,
        userId: data.userId,
      },
    });
    return data;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // const lastPath = localStorage.getItem("lastPathName");
        handleLogin(values);
        setSubmitting(false);
        history.replace("/");
      } catch (error) {
        setSubmitting(false);
        setErrorAlert({
          message: error.response?.data.message,
          open: true,
        });
      }
    },
  });

  return (
    <Container maxWidth={"xs"} className="container-main">
      {errorAlert.message ? (
        <Snackbar
          open={errorAlert.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            {errorAlert.message}
          </Alert>
        </Snackbar>
      ) : null}

      <LockOpenIcon
        style={{
          fontSize: "90px",
          backgroundColor: "blue",
          opacity: 0.5,
          padding: "15px",
          borderRadius: "50%",
          color: "white",
        }}
      />

      <form onSubmit={formik.handleSubmit} className="mb-4">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                error={
                  formik.errors.email && formik.touched.email ? true : false
                }
                label="Email"
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""
                }
                id="email"
                type="text"
                name="email"
                autoComplete="off"
                variant="outlined"
                {...formik.getFieldProps("email")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                error={
                  formik.errors.password && formik.touched.password
                    ? true
                    : false
                }
                helperText={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ""
                }
                label="Password"
                variant="outlined"
                id="password"
                type="password"
                name="password"
                autoComplete="off"
                {...formik.getFieldProps("password")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              disabled={formik.isSubmitting}
              type="submit"
              fullWidth
              style={{ backgroundColor: "blue", opacity: 0.5, color: "white" }}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} className="buttonProgress" />
              ) : (
                "SignIn"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="text-center">
        <p className="text-muted font-weight-light">
          Don't have an account?
          <NavLink exact to="/signup">
            <span className="ml-2 text-primary font-weight-bolder">
              Sign Up
            </span>
          </NavLink>
        </p>
      </div>
    </Container>
  );
};
