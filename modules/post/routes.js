import express from "express";
const router = express.Router();
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.get("/getPosts", controller.getPosts);
router.get("/getPost/:postId", controller.getPost);
router.get("/getPost/:postId/comments", controller.getComment);
router.get("/getPost/:postId/likes", controller.getLikes);
router.use(authenticationMiddleware);
router.post("/createPost", controller.createPost);

export default router;
