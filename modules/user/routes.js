import express from "express";
const router = express.Router();
import createUserValidator from "./validators/createUserValidator.js";
import validateLikes from "./validators/createLikeValidator.js";
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.post("/signup", createUserValidator, controller.create);

router.post("/login", controller.login);

router.get("/", controller.find);
router.get("/posts", controller.readPosts);
router.get("/:id", controller.findById);
router.get("/posts/comments/:id", controller.readComments);

router.use(authenticationMiddleware);

router.post("/addPost", controller.addPost);
router.post("/posts/:id", controller.addComment);
router.post("/posts/like/:id",validateLikes, controller.addPostLike);
router.post("/posts/comment/like/:id",validateLikes, controller.addCommentLike);

router.put("/:id", createUserValidator, controller.update);

router.delete("/:id", controller.remove);

export default router;
