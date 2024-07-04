import { object, string } from "yup";

export const loginSchema = object().shape({
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
});
