import * as yup from "yup";
import "yup-phone";

export const yupSignup = yup.object({
  email: yup
    .string()
    .email()
    .trim()
    .required("Email address is required")
    .matches(
      /^[a-z0-9]+@srmist.edu.in$/g,
      "Only SRMIST Email address will be accepted!"
    ),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Use strong password with uppercase, lowercase and special characters with at least 8 characters"
    ),
});

export type SignupSchema = yup.InferType<typeof yupSignup>;
