import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import aggregatePaginate  from "mongoose-aggregate-paginate-v2";
import mongoose_delete from 'mongoose-delete'

const ViewerSchema  = new mongoose.Schema({
    story_id :{type : mongoose. Schema.Types.ObjectId, ref: 'Story',required :true},
    user_id : {type : mongoose.Schema.Types.ObjectId,required :true},
    expireAt :  {type : Date , expires :0 },

}).index({story_id :1 })
ViewerSchema.plugin(paginate)
ViewerSchema.plugin(aggregatePaginate)
ViewerSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
ViewerSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })
export default mongoose.model('StoryViewer', ViewerSchema)