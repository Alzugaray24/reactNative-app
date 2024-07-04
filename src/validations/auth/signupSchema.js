import { object, string, ref } from "yup";

export const signupSchema = object().shape({
  email: string()
    .trim()
    .required("Email is required")
    .email("Not a valid email"),

  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),

  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
