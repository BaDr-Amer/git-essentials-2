import User from "../../models/User.js";
import * as service from "./service.js";
import mongoose from "mongoose";
import express from "express";

export const create = async (req, res) => {
  const { email, password, firstName, lastName, dateOfBirth } = req.body;
  const user = await service.create({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
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
  const users = await User.find();
  return res.send(users);
};

export const findUserLikes = async (req, res) => {
  console.log(mongoose.Types.ObjectId(req.body.user_id));
  const result = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.body.user_id),
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
    /* {
      $unwind: '$like'
  },
  {
      $lookup: {
          from: 'contents',
          localField: 'like.post_id',
          foreignField: '_id',
          as: 'post'
      }
  },
  {
      $unwind: '$post'
  },
  {
      $project: {
          'like.post_id': 0,
          'like.user_id': 0,
          'like.__v': 0,
          'post.__v': 0
      }
  },
  {
      $count: 'count'
  }*/
  ]);
  let options = { page: 1, limit: 20 };
  // var myAggregate = myModel.aggregate();
  /*  User.aggregatePaginate(result, options)
    .then((results) => {
      return res.send(results);
    })
    .catch(function (err) {
      console.log(err);
    });*/

  res.send(result);
  //return res.send( User.aggregatePaginate(result,options))
};
export const age = async (req, res) => {
  var today = new Date();
  const result = await User.aggregate([
    {
      $addFields: {
        ages: {
          $subtract: [today.getFullYear(), { $year: "$dateOfBirth" }],
        },
      },
    },
  ]);

  res.send(result);
  //return res.send( User.aggregatePaginate(result,options))
};

let lesThanMonth = (likeDate) => {
  console.log(likeDate);
  var today = likeDate;
  if (new Date().getMonth() - today.getMonth() > 1) {
    return false;
  } else if (new Date().getDay() + today.getDay() > 30) {
    return false;
  }
  return true;
};

export const likeposavg = async (req, res) => {
  var today = new Date();
  let arrayOfID = [];
  const result = await User.aggregate([
    {
      $addFields: {
        ages: {
          $subtract: [today.getFullYear(), { $year: "$dateOfBirth" }],
        },
      },
    },

    {
      $match: { ages: { $gte: 20, $lt: 30 } },
    },

    /* {
      $lookup: {
        from: "Likes",
        localField: "convertedId",
        foreignField: "user_id",
        as: "like",
      },
    },

    {
      $project: {
        email: 0,
        password: 0,
        __v: 0,
      },
    },*/
  ]);

  for (let i = 0; i < result.length; i++) {
    var result11 = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(result[1]._id),
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

      {
        $unwind: "$like",
      },
      {
        $addFields: {
          month: {
            $subtract: [today.getMonth(), { $month: "$like.createdAt"} ]} } 
           
          },
        
      
      {
        $match: {
          month: { 
            
            $gte: 1,
          
        
      },}}
      
    ]);
    arrayOfID.push(result11)
  }

  res.send(arrayOfID);
  // res.send(result1);
  //return res.send( User.aggregatePaginate(result,options))
};

export const findById = async (req, res) => {
  //  const user = await User.findOne({ _id: req.params.id })
  const user = await User.findOne({ user_id: req.params.id });
  // const user = await User.findById(req.id)

  return res.send(user);
};
export const ageGroop = async (req, res) => {
  var today = new Date();
  const { firstNum, sacandNum } = req.query;
  const result = await User.aggregate([
    {
      $addFields: {
        ages: {
          $subtract: [today.getFullYear(), { $year: "$dateOfBirth" }],
        },
      },
    },
    {
      $match: { ages: { $gte: 20, $lt: 30 } },
    },
    {
      $count: "count",
    },
  ]);

  /*  var query = User.find();
 var a= query.count((count,err)=>{
  if (err) console.log(err+"dd")
  else res.send(result/count) 

})*/
  var couunts;
  User.count({}, (err, count) => {
    res.send(result[0].count / count);
  });

  //res.send(result/count)
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
