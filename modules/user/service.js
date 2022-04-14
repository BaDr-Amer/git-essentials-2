import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const create = async ({
  email,
  password,
  firstName,
  lastName,
  date_of_birth,
}) => {
  const hash = await bcrypt.hash(password, 3);
  return await User.create({
    email,
    password: hash,
    firstName,
    lastName,
    date_of_birth,
  });
};

export const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) return Promise.reject("incorrect email or password");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return Promise.reject("incorrect email or password");
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    fs.readFileSync("./privateKey"),
    { algorithm: "RS256" }
  );

  return token;
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUsersAge = async () => {
  const options = [
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
    {
      $project: {
        fullName: 1,
        age: 1,
      },
    },
  ];
  return await User.aggregate(options);
};

export const findUserAgeBetween20To40 = async () => {
  const options = [
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
    {
      $project: {
        fullName: 1,
        age: 1,
      },
    },
    {
      $match: { age: { $gt: 20, $lt: 40 } },
    },
  ];
  return await User.aggregate(options);
};

export const percentBetween20To40 = async () => {
  const options = [
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
    {
      $facet: {
        bucket: [
          {
            $bucket: {
              groupBy: "$age",
              boundaries: [0, 20, 30, 40],
              default: "Other",
              output: {
                count: {
                  $sum: 1,
                },
              },
            },
          },
        ],
        count: [
          {
            $group: {
              _id: null,
              size: {
                $count: {},
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        count: {
          _id: 0,
        },
      },
    },
    {
      $unwind: {
        path: "$bucket",
      },
    },
    {
      $unwind: {
        path: "$count",
      },
    },
    {
      $addFields: {
        percentage: {
          $multiply: [
            {
              $divide: ["$bucket.count", "$count.size"],
            },
            100,
          ],
        },
      },
    },
  ];
  return await User.aggregate(options);
};
