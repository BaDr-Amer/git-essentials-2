import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
var arr=[];
export const create = async ({ email, password, firstName, lastName ,dateOfBirth}) => {
    const hash = await bcrypt.hash(password, 3)
    return await User.create({ email, password: hash, firstName, lastName ,dateOfBirth })
}

export const login = async ({ email, password }) => {
   
    const user = await findByEmail(email)
    
    if (!user) return Promise.reject('incorrect email or password')
    
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return Promise.reject('incorrect email or password')
   
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, fs.readFileSync('./privateKey'), { algorithm: 'RS256' });
   // arr.push(token)
    return token
}

export const findByEmail = async email => {
   return await User.findOne({ email })
}