import * as yup from "yup";
//valdation schema
//export for using the schema in anther file
export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Not vaild email format")
    .required("Email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords Don't Match")
    .required(),
});
