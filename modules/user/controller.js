import User from "../../models/User.js";
import * as service from "./service.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  const { email, password, firstName, lastName, date_of_birth } = req.body;
  const user = await service.create({
    email,
    password,
    firstName,
    lastName,
    date_of_birth,
  });
  res.send(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await service.login({ email, password });
    res.send({ token });
  } catch (error) {
    res.send(error.message);
  }
};

export const find = async (req, res) => {
  const users = await User.aggregate([
    {
      $addFields: {
        age: {
          $dateDiff: {
            startDate: "$date_of_birth",
            endDate: "$$NOW",
            unit: "year",
          },
        },
      },
    },
  ]);
  return res.send(users);
};

export const findUserLikes = async (req, res) => {
  const result = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.userId),
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "user_id",
        as: "like",
      },
    },
    // {
    //     $addFields: {
    //         count: { $size: "$like" }
    //     }
    // },
    {
      $unwind: "$like",
    },
    {
      $lookup: {
        from: "contents",
        localField: "like.post_id",
        foreignField: "_id",
        as: "post",
      },
    },
    {
      $unwind: "$post",
    },
    {
      $project: {
        "like.post_id": 0,
        "like.user_id": 0,
        "like.__v": 0,
        "post.__v": 0,
      },
    },
    {
      $count: "count",
    },
  ]);
  return res.send(result);
};

export const findUserbetween20and30 = async (req, res) => {
  const result = await User.aggregate([
    { $match: { age: { $gt: 20, $lt: 30 } } },
  ]);
  return res.send(result);
};
export const findUserbetween30and40 = async (req, res) => {
  const result = await User.aggregate([
    { $match: { age: { $gt: 30, $lt: 40 } } },
  ]);
  return res.send(result);
};
const percentage = (count, count2) => {
  return count2 / count;
};
export const findUserMoreThan40 = async (req, res) => {
  const result = await User.aggregate([{ $match: { age: { $gt: 40 } } }]);
  return res.send(result);
};
export const findById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  // const user = await User.findById(req.id)
  return res.send(user);
};

export const update = async (req, res) => {
  res.send(req.body);
};

export const remove = async (req, res) => {
  // await User.deleteOne({ _id: req.params.id })
  // res.status(204).send()

  const user = User.findById(req.params.id);
  if (!user) {
    throw new Error("user not found");
  }
  user.delete();
  res.status(204).send();
};
