import express from 'express';
import User from '../models/User.js'

const router = express.Router()

const users = [
    {
        id: 1,
        name: 'John',
        profile: {
            address1: 'address 1',
            address2: 'address 2'
        }
    },
    {
        id: 2,
        name: 'Doe',
        profile: {
            address1: 'address 3',
            address2: 'address 4'
        }
    },
    {
        id: 3,
        name: 'mark',
        profile: {
            address1: 'address 5',
            address2: 'address 6'
        }
    }
]
const authentication = (req, res, next) => {
    // validation
    if (req.isAuthenticated) {
        next()
    } else {
        throw new Error('not authenticated')
    }
}
const autheriztion = (req, res, next) => {
    // validation
    if (req.isAuthorized) {
        next()
    } else {
        throw new Error('not authorized')
    }
    next()
}
const handler = (req, res) => {
    console.log("processing the request")
    users.push(req.body)
    res.send(req.body)
}

router.post('/',(req,res)=>{
const {email , password } = req.body
const user = await User.create({email,password}) // create  return a promise so we use await 
res.send(user)
})

router.get('/', (req, res) => {
    const users = await User.find()
   return res.send(users)

})

router.get('/:id', (req, res) => {
    const users = await User.findOne({_id:req.params.id})
   return res.send(users)

})

router.put('/', (req, res) => {

})

router.delete('/:id', async(req, res) => {
await User.deleteOne({_id:req.params.id})
res.status(204).send()
})

router.patch('/', (req, res) => {

})

export default router