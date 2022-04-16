import { body } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
import { findByEmail } from "../service.js";
const rules = [
  body("firstName").isLength({ min: 4, max: 20 }),
  body("lastName").isLength({ min: 4, max: 20 }),
  body("email")
    .isEmail()
    .withMessage("invalid email")
    .bail()
    .normalizeEmail()
    .custom(async (email) => {
      const user = await findByEmail(email);
      if (user) {
        return Promise.reject("email already exists");
      }
      return Promise.resolve();
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password should be at least 8 characters, 1 lowercase, 1 uppercase, 1 symbols, 1 numbers"
    ),
  body("date_of_birth").custom(async (date_of_birth) => {
    let dob = new Date(date_of_birth);

    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);

    if (age < 20) {
      return Promise.reject("Your age must be more than 20 years to register");
    }
    return Promise.resolve();
  }),
];

export default validate(rules);
