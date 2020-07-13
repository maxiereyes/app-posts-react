import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";
import { useFormik } from "formik";
import api from "../../helpers/api";
import signUpSchemaValidation from "../../validation/signup/signUpValidation";
import "./signup.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SignUpScreen = ({ history }) => {
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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: signUpSchemaValidation,
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        await api.post("users/signup", payload);
        setSubmitting(false);
        setErrorAlert({
          message: "",
          open: false,
        });
        history.goBack();
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
    <Container maxWidth={"sm"} className="container-main-signup">
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

      <PersonIcon
        style={{
          fontSize: "90px",
          backgroundColor: "blue",
          opacity: 0.5,
          padding: "15px",
          borderRadius: "50%",
          color: "white",
          marginBottom: "2       0%",
        }}
      />

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={
                formik.touched.username && formik.errors.username ? true : false
              }
              helperText={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : ""
              }
              label="Username"
              variant="outlined"
              id="username"
              type="text"
              name="username"
              autoComplete="off"
              fullWidth
              {...formik.getFieldProps("username")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
              label="Email"
              variant="outlined"
              id="email"
              type="text"
              name="email"
              autoComplete="off"
              fullWidth
              {...formik.getFieldProps("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
              label="Password"
              variant="outlined"
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              fullWidth
              {...formik.getFieldProps("password")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? true
                  : false
              }
              helperText={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? formik.errors.passwordConfirm
                  : ""
              }
              label="Confirm Password"
              variant="outlined"
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              autoComplete="off"
              fullWidth
              {...formik.getFieldProps("passwordConfirm")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              disabled={formik.isSubmitting}
              type="submit"
              fullWidth
              style={{ backgroundColor: "blue", opacity: 0.5, color: "white" }}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} className="buttonProgress" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
