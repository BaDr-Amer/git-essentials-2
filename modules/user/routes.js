import express from "express";
const router = express.Router();
import createUserValidator from "./validators/createUserValidator.js";
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.post("/signup", createUserValidator, controller.create);

router.post("/login", controller.login);

router.get("/", controller.find);

router.get("/userAge", controller.findUsersAge);
router.get("/userAgeBetween20to40", controller.findUserAgeBetween20To40);
router.get("/percentBetween20To40", controller.percentBetween20To40);
router.use(authenticationMiddleware);

router.get("/likes", controller.findUserLikes);

router.get("/:id", controller.findById);

router.put("/:id", createUserValidator, controller.update);

router.delete("/:id", controller.remove);

export default router;
