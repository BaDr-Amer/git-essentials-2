import express from 'express';
const router = express.Router()
import User from'../models/User.js'


router.post('/',async (req,res)=>{
const {email,password}=req.body
const user= await User.create({email,password})
res.send(user)

})

/*router.get('/', async (req, res) => {
const user= await User.find() 
return res.send(user)
})*/
router.get('/:id', async (req,res)=>{
//const user = await User.findOne({ _id : req.params.id})
const user = await User.findById(req.params.id)
return res.send(user)

})

router.put('/:id', (req, res) => {
    
})

router.delete('/', async (req, res) => {
await User.deleteOne({_id: req.params.id})
res.status()
const user =user.findById(req.params.id)
if(!user){
    throw new Error('user not found')
}
user.delete()
res.status(204).send()
})

router.patch('/', (req, res) => {

})

export default router
/*const authentication = (req, res, next) => {
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
}*/