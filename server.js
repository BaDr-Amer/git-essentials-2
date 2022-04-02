import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    id: 1,
    name: "John",
    profile: {
      address1: "address 1",
      address2: "address 2",
    },
  },
  {
    id: 2,
    name: "Doe",
    profile: {
      address1: "address 3",
      address2: "address 4",
    },
  },
  {
    id: 3,
    name: "mark",
    profile: {
      address1: "address 5",
      address2: "address 6",
    },
  },
];

app.post("/", (req, res) => {
  let newId = users[users.length - 1].id + 1;
  let newUser = {
    id: newId,
    ...req.body,
  };
  users.push(newUser);
  res.send(users);
});

app.get("/", (req, res) => {
  res.send(users);
});

app.put("/", (req, res) => {
  let index = users.findIndex((item) => item.id == req.query.id);
  let updatedUser = {
    id: req.query.id,
    ...req.body,
  };
  users[index] = updatedUser;
  res.send(users);
});

app.delete("/", (req, res) => {
  let index = users.findIndex((item) => item.id == req.query.id);
  users.splice(index, 1);
  res.send(users);
});

app.patch("/", (req, res) => {
  let index = users.findIndex((item) => item.id == req.query.id);
  let x = {
    ...users[indx],
    ...req.body,
  };
  users[index] = x;
  res.send(users);
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
