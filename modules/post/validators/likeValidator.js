import { body } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
import { findByEmail } from "../service.js";
const rules = [
 body("email")
    .isEmail()
    .withMessage("invalid email")
    .bail()
    .normalizeEmail()
    .custom(async (email) => {
     
      const user = await findByEmail(email);
      
     if (!user) {
      return Promise.reject("email not exists");
       //Promise.resolve();
      }
    
      
      
    }),
 
    body("like").isBoolean().withMessage("pleast the filde must bee boolean")
];
export default validate(rules);
