import express from "express";
const router = express.Router();
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.get("/getLikes", controller.getLikes);
router.use(authenticationMiddleware);
router.post("/addLike", controller.addLike);

export default router;
