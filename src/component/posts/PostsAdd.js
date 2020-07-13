import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  IconButton,
  Button,
  Box,
  CircularProgress,
  Container,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { storage } from "../../helpers/firebase";
import addPostsValidationSchema from "../../validation/addPosts/addPostsValidation";
import posts from "../../api/posts";
import { AuthContext } from "../../auth/AuthContext";
import "./addPosts.css";

export const PostsAdd = ({ history }) => {
  let urlImage = "";
  const {
    user: { access_token, userId },
  } = useContext(AuthContext);

  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    initialErrors: true,
    validationSchema: addPostsValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (image) {
          await storage.ref(`images/${image.name}`).put(image);
          urlImage = await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL();
        } else {
          urlImage = "";
        }

        const payload = {
          ...values,
          image: urlImage,
          idUser: userId,
        };
        await posts.post(payload, access_token);
        formik.resetForm();
        setImage(null);
      } catch (error) {
        if (error.response?.data.message === "jwt expired") {
          history.replace("/login");
        }
      }
    },
  });

  return (
    <Container maxWidth={"xs"} className="container-add">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              fullWidth
              error={formik.touched.title && formik.errors.title ? true : false}
              helperText={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : ""
              }
              label={
                formik.touched.title && formik.errors.title ? "Error" : "Title"
              }
              {...formik.getFieldProps("title")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="content"
              name="content"
              multiline
              rowsMax={4}
              fullWidth
              error={
                formik.touched.content && formik.errors.content ? true : false
              }
              helperText={
                formik.touched.content && formik.errors.content
                  ? formik.errors.content
                  : ""
              }
              label={
                formik.touched.content && formik.errors.content
                  ? "Error"
                  : "Content"
              }
              {...formik.getFieldProps("content")}
            />
          </Grid>
          {image ? (
            <Grid item xs={12}>
              <img
                src={`${URL.createObjectURL(image)}`}
                alt="previsualizacion"
                style={{
                  width: "100%",
                  boxShadow: "0px 0px 48px -12px rgba(0,0,0,0.54)",
                }}
              />
            </Grid>
          ) : null}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            style={{ width: "100%", padding: 10 }}
          >
            <Box component="div">
              <Button
                variant="contained"
                type="submit"
                className="text-light"
                disabled={formik.isValid ? false : true}
                style={{
                  marginRight: 10,
                  backgroundColor: "blue",
                  opacity: 0.5,
                  width: "100px",
                }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} className="buttonProgress" />
                ) : (
                  "Publish"
                )}
              </Button>
            </Box>

            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                aria-label="upload picture"
                component="span"
                style={{ color: "blue", opacity: 0.5 }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </Grid>
      </form>
    </Container>
  );
};
