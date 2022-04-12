import { body } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
import { findByEmail } from "../service.js";
const rules = [
  body("type")
    .equals("post" || "commant")
    .withMessage("Please enter either post or commit"),
 // body("lastName").isLength({ min: 4, max: 20 }),
  body("email")
    .isEmail()
    .withMessage("invalid email")
    .bail()
    .normalizeEmail()
    .custom(async (email) => {
     
      const user = await findByEmail(email);
      
     if (user) {
      return Promise.reject("email not exists");
       //Promise.resolve();
      }
    
      
      
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

   // body("like").isBoolean().withMessage("pleast the filde must bee boolean")
];

export default validate(rules);
