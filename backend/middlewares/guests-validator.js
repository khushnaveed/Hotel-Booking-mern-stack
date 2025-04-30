import { body, validationResult } from "express-validator";

export const validators = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .isString()
    .withMessage("Last name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("phonenumber")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Please enter a valid international phone number."),

  body("address").trim().notEmpty().withMessage("Address is required."),

  body("city").trim().notEmpty().withMessage("City is required."),

  body("zipcode").trim().notEmpty().withMessage("Zip code is required."),

  body("country").trim().notEmpty().withMessage("Country is required."),

  body("password")
    .isStrongPassword()
    .withMessage("Password is too weak.")
    .trim()
    .notEmpty()
    .withMessage("Password is required."),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),

  // Final middleware to check validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ success: false, errors: errors.array() });
  },
];

