import { body, query } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
const rules = [
  query("name").optional().isAlphanumeric('en-US', {ignore: ' '}),
  query("ISBN").optional().isISBN(),
  query("author_id").optional().isMongoId(),
];

export default validate(rules);
