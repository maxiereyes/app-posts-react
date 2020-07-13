import * as Yup from "yup";

const signUpValidation = Yup.object({
  username: Yup.string()
    .min(8, "Must be almost 8 characters")
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalida email address").required("Required"),
  password: Yup.string()
    .length(10, "Must be 10 characters")
    .required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default signUpValidation;
