import * as Yup from "yup";

const addPostsValidation = Yup.object({
  title: Yup.string()
    .min(3, "Must be almost 8 characters")
    .max(60, "Must be 60 characters or less")
    .required("Required"),
  content: Yup.string().required("Required"),
});

export default addPostsValidation;
