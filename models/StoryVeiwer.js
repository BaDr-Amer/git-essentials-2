import mongoose, { Schema } from "mongoose";   


const veiwerSchema = new Schemaa({
Story_id :{type : mongoose. Schema.Types.ObjectId, ref: 'Story'},
user_id : {type : mongoose.Schema.Types.ObjectId,required :true ,ref:'User'},
expireAt :  {type : Date , expires :0 },
text : String 

},{timestamps: true})

export default mongoose.model('StoryVeiwer', veiwerSchema)


