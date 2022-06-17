import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    Workflow :  [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Stage' }]
}, {
    timestamps: true
})

projectSchema.plugin(paginate)
projectSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
projectSchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })



export default mongoose.model('Project', projectSchema)