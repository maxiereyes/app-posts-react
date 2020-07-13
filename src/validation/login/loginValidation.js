import * as Yup from "yup";

const loginValidation = Yup.object({
  email: Yup.string().email("Invalida email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default loginValidation;
