import post from '../../models/post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const create = async ({password ,email, idpost, type }) => {
    
    return await post.create({password ,email, idpost, type })

}

export const addlike = async ( {email ,idpost})=>{
    
const user = await findByEmail(email)
if (!user) return Promise.reject('incorrect email or password')

const _idpost = await findidpost(idpost)
if (!_idpost) return Promise.reject('idpost')

 await  post.findOneAndUpdate({idpost:_idpost}, {$push: {arrayOfUserPutLike:email }});
 return user
};
/*export const login = async ({ email, password }) => {
    const user = await findByEmail(email)
    if (!user) return Promise.reject('incorrect email or password')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return Promise.reject('incorrect email or password')
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, fs.readFileSync('./privateKey'), { algorithm: 'RS256' });

    return token
}
*/
export const findByEmail = async email => {
    return await post.findOne({ email })
}
export const findidpost = async idpost => {
    return await post.findOne({ idpost })
}
