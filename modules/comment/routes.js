import express from "express";
const router = express.Router();
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.get("/getComments", controller.getComments);
router.get("/getComments/:commentId/likes", controller.getLikes);
router.use(authenticationMiddleware);
router.post("/addComment", controller.addComment);
export default router;
