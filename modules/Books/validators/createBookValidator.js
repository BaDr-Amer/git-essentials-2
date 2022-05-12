import { body } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
const rules = [
  body("name").isLength({ min: 1, max: 30 }).isAlphanumeric('en-US', {ignore: ' '}).notEmpty(),
  body("ISBN").isISBN().withMessage("must be a valid ISBN number").notEmpty(),

  body("author_id")
    .isMongoId()
    .withMessage("must be a valid Mongo ID")
    .notEmpty(),
  body("book_cover_image").isURL().notEmpty(),
];

export default validate(rules);
