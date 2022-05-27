import User, { IUser } from '../../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { ApiError } from '../../errors/ApiError'
import  Redis  from 'ioredis'
const redis =new Redis({});

export const create = async ({ email , password, firstName, lastName ,middleName,isInfected ,createdAt,updatedAt })  => {
    const hash = await bcrypt.hash(password, 3)
    const user  = await User.create({ email, password: hash, firstName, lastName ,middleName,isInfected ,createdAt,updatedAt})
    const obj = { user, emailTemplate: '' }
    return user
}

export const login = async ({ email, password  }) => {
    const user = await findByEmail(email)
    if (!user) throw  ApiError.wrongEmailOrPassword('wrongEmailOrPassword')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw  ApiError.wrongEmailOrPassword('wrongEmailOrPassword')
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        isInfected :user.isInfected
    }, fs.readFileSync('./privateKey'), { algorithm: 'RS256' });
    
    return {token ,user}

}

export const findByEmail = async email => {
    return await User.findOne({ email })
}

export const changeInfection=async  (userId)=> {
const user :IUser =await User.findOneAndUpdate(userId, [{$set:{isInfected:{$eq:[false,"$isInfected"]}}}])
if (!user)
throw ApiError.userNotFoundError('userNotFound')

}






export const updateMany = async( { firstName, updatedFirstName , updatedAt :updatedAt})=> {
return await User.updateMany({firstName},{$set : {firstName : updatedFirstName , updatedAt }})
}

export const deleteByFirstName = async({firstName})=> {
return await User.delete({firstName})


}