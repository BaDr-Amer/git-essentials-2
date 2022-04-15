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
  body("date_of_birth")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("birthDate is required")
    .bail()
    .isISO8601()
    .withMessage("invalid date")
    .bail()
    .isBefore()
    .withMessage("invalid date")
    .bail()
    .isBefore(
      new Date().getFullYear -
        20 +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getUTCDate()
    )
    .withMessage("u should be older than 19"),
];

export default validate(rules);
