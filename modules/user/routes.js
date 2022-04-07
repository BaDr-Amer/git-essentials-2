import express from "express";
const router = express.Router();
import createUserValidator from "./validators/createUserValidator.js";
import * as controller from "./controller.js";

router.post("/signup", createUserValidator, controller.create);

router.post("/login", controller.login);

router.get("/", controller.find);

router.get("/:id", controller.findById);

router.put("/:id", createUserValidator, controller.update);

router.delete("/:id", controller.remove);
router.post("/token", controller.createPost);

export default router;
