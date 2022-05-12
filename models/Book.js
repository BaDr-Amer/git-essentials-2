import mongoose from 'mongoose'
const schemaBook = new mongoose.Schema({
    name : {type : String  ,required :true},
    ISBN : {type : String , unique :true,required: true},
    author_id : {type : mongoose.Schema.Types.ObjectId ,required :true} ,
    book_cover_image : {type : String  ,required :true}
},{timestamps :true})

export default mongoose.model('BookZ', schemaBook)