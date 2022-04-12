import express, { response } from "express";
import user from "../modeuls/user.js";
const router = express.Router();
import User from "../modeuls/user.js";

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({
    email: email, //or can put email bec same name
    password: password,
  });
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.send(users);
});

router.get("/:id", async (req, res) => {
  const users = await User.findOne({ _id: req.params.id }); // or can write user,findbyid(req.params.id)
  return res.send(users);
});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {
  user.findOne({ _id: req.params.id });
  res.status(204).send();
});

router.patch("/", (req, res) => {});

export default router;
