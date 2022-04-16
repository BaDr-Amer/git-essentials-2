import User from '../../models/User.js'
import * as service from './service.js'
import mongoose from 'mongoose'

export const create = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    const timestamp = Date.parse(req.body.birthday);
    const bDate = new Date(timestamp);
    const user = await service.create({ email, password, firstName, lastName, bDate })
    res.send(user)
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await service.login({ email, password })
        res.send({ token })
    } catch (error) {
        res.send(error.message)
    }
}

export const find = async (req, res) => {
    const users = await User.find()
    return res.send(users)
}

export const findUserLikes = async (req, res) => {
    const result = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.userId)
            }
        },
        {
            $project: {
                password: 0
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'user_id',
                as: 'like'
            }
        },
        // {
        //     $addFields: {
        //         count: { $size: "$like" }
        //     }
        // },
        {
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
        }
    ])
    return res.send(result)
}

export const getUserAge = async (req, res) => {
    const result = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.userId)
            }
        },
        {
            $addFields:
                { age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } } }
        }, {
            $project: {
                _id: 0,
                __v: 0,
                firstName: 0,
                lastName: 0,
                fullName: 0,
                email: 0,
                password: 0,
                birthday: 0
            }
        }
    ])
    return res.send(result)
}

export const getUsersAge = async (req, res) => {
    const result = await User.aggregate([
        {
            $addFields:
                { age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } } }
        },
        {
            $facet:
            {
                total: [{ $group: { _id: null, count: { $sum: 1 } } }],
                "20-30": [
                    { $match: { age: { $gte: 20, $lte: 30 } } }, { $group: { _id: "$age", count: { $sum: 1 } } }
                ],
                "30-40": [
                    { $match: { age: { $gte: 30, $lte: 40 } } }, { $group: { _id: "$age", count: { $sum: 1 } } }
                ],
                "40": [
                    { $match: { age: { $gte: 40 } } }, { $group: { _id: "$age", count: { $sum: 1 } } }
                ],


            }
        },
        { $unwind: "$20-30" },
        { $unwind: "$30-40" },
        { $unwind: "$40" },
        {
            $project: {
                "20-30%": { $round: [{ $multiply: [{ $divide: ["$20-30.count", { $first: "$total.count" }] }, 100] }, 2] },
                "30-40%": { $round: [{ $multiply: [{ $divide: ["$30-40.count", { $first: "$total.count" }] }, 100] }, 2] },
                "40%": { $round: [{ $multiply: [{ $divide: ["$40.count", { $first: "$total.count" }] }, 100] }, 2] }
            }
        }
    ])
    return res.send(result)
}

export const getUserBetween20and30 = async (req, res) => {
    const d = new Date()
    d.setMonth(d.getMonth() - 1);
    const result = await User.aggregate([
        {
            $addFields:
                { age: { $dateDiff: { startDate: "$birthday", endDate: "$$NOW", unit: "year" } } }
        },

        { $match: { age: { $gte: 20, $lte: 30 } } },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'user_id',
                as: 'like'
            }
        },
        {
            $unwind: '$like'
        }, {
            $match: { 'like.createdAt': { $gte: d } }
        }, {
            $project: {
                '__v': 0,
                'like': 0
            }
        }


    ])
    return res.send(result)
}

export const findById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    // const user = await User.findById(req.id)
    return res.send(user)
}

export const update = async (req, res) => {
    res.send(req.body)
}

export const remove = async (req, res) => {
    // await User.deleteOne({ _id: req.params.id })
    // res.status(204).send()

    const user = User.findById(req.params.id)
    if (!user) {
        throw new Error('user not found')
    }
    user.delete()
    res.status(204).send()
}