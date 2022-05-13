import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'


const authorSchema = new mongoose.Schema({
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: true },
    author_image: { type: String }
}, {
    timestamps: true
})

authorSchema.plugin(paginate)
authorSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
authorSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model('Author', authorSchema)