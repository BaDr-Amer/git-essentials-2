import mongoose from 'mongoose'
const schemaAuthor = new mongoose.Schema({
    firstName : {type : String  ,required :true},
    lastName : {type : String ,required :true},
    author_image : {type :String ,required :true} ,
},{timestamps :true})

export default mongoose.model('AuthorZ', schemaAuthor)