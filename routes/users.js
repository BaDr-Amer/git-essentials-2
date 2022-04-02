import express from 'express';
const router = express.Router()
import User from '../models/User.js'

router.post('/', async (req, res) => {
    const {email, password} = req.body
    const user = await User.create({email,password})//we used await because create method return promise, and i want it's value(result)
    res.send(user)
})

router.get('/', async (req, res) => {
    const users = await User.find()//get data from database
    return res.send(users)
})

router.get('/:id', async (req, res) => {
    // const user = await User.findOne({ _id: req.params.id})//get data from database
    //or
    const user = await User.findById(req.params.id)//get data from database
    return res.send(user)
})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {
    // await User.deleteOne({ _id: req.params.id})
    // res.status(204).send()
    //or
    const user = User.findById(req.params.id)
    if(!user){//because id maybe be null
        throw new Error('user not found')
    }
    user.delete()
    res.status(204).send()
})

router.patch('/', (req, res) => {

})

export default router