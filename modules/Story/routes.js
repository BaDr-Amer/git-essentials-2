import express from "express";
const router = express.Router();
import * as controller from "./controller.js";
import authenticationMiddleware from "../../middlewares/authentication.js";

router.use(authenticationMiddleware);

router.post("/postStory", controller.postStory);

router.get("/viewStory/:_id", controller.viewStory);

router.delete("/deleteStory/:_id", controller.deleteStory);

router.get("/searchStory");

export default router;
