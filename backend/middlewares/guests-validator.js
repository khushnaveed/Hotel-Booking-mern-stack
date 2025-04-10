import { body, validationResult } from "express-validator";

export const validators = [
  // Validate userName
  body("userName")
    .isString()
    .withMessage("This is not a valid string. Please provide us with a correct name.")
    .trim()
    .notEmpty()
    .withMessage("User name cannot be empty."),

  // Validate email
  body("email")
    .isEmail()
    .withMessage("This is not a valid email!")
    .normalizeEmail(),

  // Validate password
  body("password")
    .isStrongPassword()
    .withMessage("Password is too weak!")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty."),

  // Validate confirmPassword
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),

  // Check if validation results are empty
  (req, res, next) => {
    const results = validationResult(req);
    if (results.isEmpty()) {
      next(); // No validation errors, proceed to the next middleware
    } else {
      console.log("Validation errors:", results.errors); // Log validation errors
      res.status(400).send({ success: false, message: results.errors });
    }
  },
];
