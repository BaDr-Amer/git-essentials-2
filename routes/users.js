import express from "express";
const router = express.Router();

const users = [
  {
    id: 1,
    name: "John",
    profile: {
      address1: "address 1 ",
      address2: "address 2 ",
    },
  },
  {
    id: 2,
    name: "Doe",
    profile: {
      address1: "address 3 ",
      address2: "address 4 ",
    },
  },
  {
    id: 3,
    name: "Mark",
    profile: {
      address1: "address 5 ",
      address2: "address 6 ",
    },
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    users,
  });
});
router.post("/", (req, res) => {
  users.push(req.body);

  res.status(201).json({
    status: "Success",
    user: req.body,
  });
});
router.put("/:id", (req, res) => {
  console.log(req.body);
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  console.log(userIndex);
  users[userIndex] = req.body;

  res.status(200).json({
    status: "Success",
    user: req.body,
  });
});
router.delete("/:id", (req, res) => {
  users.splice(req.params.id - 1, 1);
  res.status(204).json({
    status: "Success",
    user: null,
  });
});
router.patch("/:id", (req, res) => {
  console.log(req.params.id);
  const userIndex = users.findIndex(
    (user) => user.id === Number(req.params.id)
  );
  console.log(userIndex);
  for (let key in req.body) {
    users[userIndex][key] = req.body[key];
  }

  res.status(200).json({
    status: "Success",
    user: users[userIndex],
  });
});
export default router;
